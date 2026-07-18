"use client";

import { useMemo, useState } from "react";
import ReactCodeMirror, { EditorState } from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import {
    AlertTriangle,
    Check,
    Hourglass,
    Lightbulb,
    Play,
    X,
} from "lucide-react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { indentUnit } from "@codemirror/language";
import { usePython } from "react-py";
import TextButton from "./Button";

type ExecResult = "none" | "correct" | "incorrect";

// A character to mark the result in stdout.
const RESULT_MARKER = "__QUIZ_RESULT__";

function toBase64(str: string): string {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
}

type CaseResult = { ok: boolean; out: string };

// Generates a Python script that processes all cases in a single execution.
function buildScript(userCode: string, inputs: Array<string>): string {
    const userB64 = toBase64(userCode);
    const inputsB64 = toBase64(JSON.stringify(inputs));
    return `
import base64 as __b64, io as __io, contextlib as __ctx, json as __json, traceback as __tb

def __quiz_run():
    __user = __b64.b64decode("${userB64}").decode("utf-8")
    __inputs = __json.loads(__b64.b64decode("${inputsB64}").decode("utf-8"))
    __ns = {}
    try:
        exec(compile(__user, "<user>", "exec"), __ns)
    except Exception:
        return {"error": __tb.format_exc()}
    __results = []
    for __src in __inputs:
        __buf = __io.StringIO()
        try:
            with __ctx.redirect_stdout(__buf):
                exec(compile(__src, "<case>", "exec"), __ns)
            __lines = [
                __line for __line in __buf.getvalue().split("\\n") if __line != ""
            ]
            __answer = __lines[-1] if __lines else ""
            __results.append({"ok": True, "out": __answer})
        except Exception:
            __results.append({"ok": False, "out": __tb.format_exc()})
    return {"results": __results}

print("${RESULT_MARKER}" + __json.dumps(__quiz_run()))
`;
}

function InternalPythonQuiz({
    quizNo,
    message = "",
    initialCode = "",
    cases = [],
    hints = [],
}: {
    quizNo?: number;
    message?: string;
    initialCode?: string;
    cases?: Array<[string, string]>;
    hints?: Array<string>;
}) {
    const { runPython, stdout, isLoading, isRunning } = usePython();
    const [hasEvaluated, setHasEvaluated] = useState(false);
    const [selectedCase, setSelectedCase] = useState(0);
    const [code, setCode] = useState(initialCode);
    const [hintOpen, setHintOpen] = useState<Array<boolean>>(
        hints.map(() => false),
    );
    const isDark = useTheme().resolvedTheme === "dark";

    // Parse the result using the RESULT_MARKER. If the marker is present but the JSON is incomplete, return null.
    const parsedResult = useMemo((): {
        error?: string;
        results?: Array<CaseResult>;
    } | null => {
        const markerIndex = stdout.indexOf(RESULT_MARKER);
        if (markerIndex === -1) return null;
        const json = stdout.slice(markerIndex + RESULT_MARKER.length);
        try {
            return JSON.parse(json);
        } catch {
            return null;
        }
    }, [stdout]);

    const runError = parsedResult?.error ?? null;
    const outputs = useMemo(
        () => parsedResult?.results?.map((r) => r.out.trim()) ?? [],
        [parsedResult],
    );

    // If the script has not been evaluated yet or it has an error, make sure to not show any result.
    const resultsReady =
        hasEvaluated &&
        !isRunning &&
        !runError &&
        outputs.length === cases.length;
    const execResult: ExecResult = resultsReady
        ? cases.every(([, answer], index) => outputs[index] === answer)
            ? "correct"
            : "incorrect"
        : "none";

    return (
        <div
            className={clsx(
                "flex flex-col px-3 pt-2 pb-3 my-2 items-start gap-2 rounded-xl border transition-all duration-200 ease-in-out",
                execResult === "correct"
                    ? "border-[--alpha(var(--color-lime-500)/75%)] bg-[--alpha(var(--color-lime-500)/10%)] shadow-[0px_0px_32px_--alpha(var(--color-lime-500)/50%)]"
                    : "bg-neutral-100 dark:bg-zinc-900 border-(--border)",
            )}
        >
            <p>
                <strong>演習{quizNo ? `${quizNo}.` : ""}</strong>
                &nbsp;
                {message}
            </p>
            <ReactCodeMirror
                className="w-full text-base border border-(--border)"
                theme={isDark ? "dark" : "light"}
                value={code}
                onChange={(newCode) => {
                    setCode(newCode);
                }}
                extensions={[
                    python(),
                    indentUnit.of("    "),
                    EditorState.tabSize.of(4),
                ]}
            />
            <div className="flex flex-row flex-wrap gap-2">
                <TextButton
                    variant="green"
                    onClick={() => {
                        setHasEvaluated(true);
                        const script = buildScript(
                            code,
                            cases.map(([input]) => input),
                        );
                        runPython(script);
                    }}
                    disabled={isLoading || isRunning}
                >
                    <Play size={16} />
                    <p className="font-bold">
                        {isLoading
                            ? "読み込み中"
                            : isRunning
                              ? "実行中"
                              : "実行！"}
                    </p>
                </TextButton>

                {hints.map((_, index) => (
                    <TextButton
                        key={index}
                        variant="noOutline"
                        onClick={() => {
                            setHintOpen((prev) => {
                                const newState = [...prev];
                                newState[index] = !newState[index];
                                return newState;
                            });
                        }}
                        selected={hintOpen[index]}
                    >
                        <Lightbulb size={16} />
                        <p className={clsx(hintOpen[index] && "font-bold")}>
                            ヒント {index + 1}
                        </p>
                    </TextButton>
                ))}
            </div>

            {hints.map((hint, index) => (
                <div
                    key={index}
                    className={`w-full px-2 py-1 border border-(--border) bg-neutral-50 dark:bg-zinc-800 rounded-lg ${
                        hintOpen[index] ? "block" : "hidden"
                    }`}
                >
                    <strong>ヒント&nbsp;{index + 1}</strong>
                    <p>{hint}</p>
                </div>
            ))}

            {execResult === "correct" && (
                <div className="font-bold text-lg">🎉 正解！</div>
            )}
            {execResult === "incorrect" && (
                <div className="font-bold text-lg flex flex-row gap-1 items-center">
                    <X className="text-red-600 dark:text-red-400" />
                    不正解
                </div>
            )}
            {runError && (
                <pre className="w-full whitespace-pre-wrap text-sm text-red-600 dark:text-red-400">
                    {runError}
                </pre>
            )}
            {hasEvaluated && !runError && cases.length > 0 && (
                <>
                    <div className="flex flex-row flex-wrap gap-2">
                        {cases.map((_, index) => {
                            const caseReady = index < outputs.length;
                            const isCorrect =
                                caseReady && outputs[index] === cases[index][1];
                            return (
                                <TextButton
                                    key={index}
                                    variant="noOutline"
                                    onClick={() => setSelectedCase(index)}
                                    selected={selectedCase === index}
                                >
                                    {caseReady ? (
                                        isCorrect ? (
                                            <Check
                                                className="text-lime-700 dark:text-lime-400"
                                                size={16}
                                            />
                                        ) : (
                                            <AlertTriangle
                                                className="text-red-600 dark:text-red-400"
                                                size={16}
                                            />
                                        )
                                    ) : (
                                        <Hourglass
                                            className="text-yellow-600 dark:text-yellow-400"
                                            size={16}
                                        />
                                    )}
                                    <p
                                        className={clsx(
                                            selectedCase === index &&
                                                "font-bold",
                                        )}
                                    >
                                        &nbsp;ケース #{index + 1}
                                    </p>
                                </TextButton>
                            );
                        })}
                    </div>
                    <div className="w-full flex flex-col gap-2 px-3 py-2 border border-(--border) bg-neutral-50 dark:bg-zinc-800 rounded-lg">
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                期待される出力
                            </p>
                            <pre className="w-full whitespace-pre-wrap text-sm">
                                {cases[selectedCase][1]}
                            </pre>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                実際の出力
                            </p>
                            <pre
                                className={clsx(
                                    "w-full whitespace-pre-wrap text-sm",
                                    selectedCase < outputs.length
                                        ? outputs[selectedCase] ===
                                          cases[selectedCase][1]
                                            ? "text-lime-700 dark:text-lime-400"
                                            : "text-red-600 dark:text-red-400"
                                        : "text-yellow-600 dark:text-yellow-400",
                                )}
                            >
                                {selectedCase < outputs.length
                                    ? outputs[selectedCase]
                                    : "Evaluating..."}
                            </pre>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

const PythonQuiz = dynamic(() => Promise.resolve(InternalPythonQuiz), {
    ssr: false,
    loading: () => (
        <div className="w-full h-16 bg-neutral-100 dark:bg-zinc-900 border border-(--border) rounded-xl animate-pulse" />
    ),
});

export default PythonQuiz;
