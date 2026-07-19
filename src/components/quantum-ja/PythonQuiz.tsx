"use client";

import { useEffect, useMemo, useState } from "react";
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
import Markdown from "react-markdown";
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

type CaseResult = { ok: boolean; out: string; is_correct: boolean };

// Generates a Python script that processes all cases in a single execution.
function buildScript(userCode: string, cases: Array<[string, string, boolean]>): string {
    const userB64 = toBase64(userCode);
    const casesB64 = toBase64(JSON.stringify(cases));
    return `
import base64 as __b64, io as __io, contextlib as __ctx, json as __json, traceback as __tb

def __quiz_run():
    __user = __b64.b64decode("${userB64}").decode("utf-8")
    __cases = __json.loads(__b64.b64decode("${casesB64}").decode("utf-8"))
    __ns = {}
    try:
        exec(compile(__user, "<user>", "exec"), __ns)
    except Exception:
        return {"error": __tb.format_exc()}
    __results = []
    for __src, __expected_str, _ in __cases:
        __buf = __io.StringIO()
        try:
            with __ctx.redirect_stdout(__buf):
                exec(compile(f"print({__src})", "<case>", "exec"), __ns)
            __lines = [__l for __l in __buf.getvalue().split("\\n") if __l != ""]
            __actual_str = __lines[-1] if __lines else ""
            try:
                __actual_obj = eval(__actual_str, {})
                __expected_obj = eval(__expected_str, {})
                __is_correct = __actual_obj == __expected_obj
            except Exception:
                __is_correct = __actual_str.strip() == __expected_str.strip()
            __results.append({"ok": True, "out": __actual_str, "is_correct": __is_correct})
        except Exception:
            __results.append({"ok": False, "out": __tb.format_exc(), "is_correct": False})
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
    cases?: Array<[string, string, boolean]>;
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

    // Parse the result using the RESULT_MARKER. If the marker is present but the JSON is incomplete, return null
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
    const caseResults = useMemo(
        () => parsedResult?.results ?? [],
        [parsedResult],
    );

    // If the script has not been evaluated yet or it has an error, make sure to not show any result
    const resultsReady =
        hasEvaluated &&
        !isRunning &&
        !runError &&
        caseResults.length === cases.length;
    const execResult: ExecResult = resultsReady
        ? caseResults.every((r) => r.is_correct)
            ? "correct"
            : "incorrect"
        : "none";

    useEffect(() => {
        if (window && execResult === "correct") {
            import("@hiseb/confetti").then((module) => {
                const confetti = module.default;
                confetti({
                    position: { x: 0, y: 0 },
                    count: 200,
                    size: 3,
                    velocity: 400,
                    fade: false,
                });
                confetti({
                    position: { x: window.innerWidth, y: 0 },
                    count: 200,
                    size: 3,
                    velocity: 400,
                    fade: false,
                });
            });
        }
    }, [execResult]);

    return (
        <div
            className={clsx(
                "flex flex-col px-3 pt-2 pb-3 my-2 items-start gap-2 rounded-xl border transition-all duration-200 ease-in-out",
                execResult === "correct"
                    ? "border-[--alpha(var(--color-lime-500)/75%)] bg-[--alpha(var(--color-lime-500)/10%)] shadow-[0px_0px_32px_--alpha(var(--color-lime-500)/50%)]"
                    : "bg-neutral-100 dark:bg-zinc-900 border-(--border)",
            )}
        >
            <Markdown>
                {`**演習${quizNo ? `${quizNo}.` : ""}** ${message}`}
            </Markdown>
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
                        const script = buildScript(code, cases);
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
                    <Markdown>{hint}</Markdown>
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
                        {cases
                            .filter((c) => c[2])
                            .map((_, index) => {
                                const caseReady = index < caseResults.length;
                                const isCorrect =
                                    caseReady && caseResults[index].is_correct;
                                return (
                                    <TextButton
                                        key={index}
                                        variant="noOutline"
                                        onClick={() => setSelectedCase(index)}
                                        selected={selectedCase === index}
                                    >
                                        {caseStatusIcon(caseReady, isCorrect)}
                                        <p
                                            className={clsx(
                                                selectedCase === index &&
                                                    "font-bold",
                                            )}
                                        >
                                            ケース #{index + 1}
                                        </p>
                                    </TextButton>
                                );
                            })}
                        {showHiddenCases(cases, caseResults)}
                    </div>
                    <div className="w-full flex flex-col gap-2 px-3 py-2 border border-(--border) bg-neutral-50 dark:bg-zinc-800 rounded-lg">
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                テストコード
                            </p>
                            <pre className="w-full whitespace-pre-wrap text-sm">
                                {cases[selectedCase][0]}
                            </pre>
                        </div>
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
                                    selectedCase < caseResults.length
                                        ? caseResults[selectedCase].is_correct
                                            ? "text-lime-700 dark:text-lime-400"
                                            : "text-red-600 dark:text-red-400"
                                        : "text-yellow-600 dark:text-yellow-400",
                                )}
                            >
                                {selectedCase < caseResults.length
                                    ? caseResults[selectedCase].out
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

function caseStatusIcon(caseReady: boolean, isCorrect: boolean) {
    return caseReady ? (
        isCorrect ? (
            <Check className="text-lime-700 dark:text-lime-400" size={16} />
        ) : (
            <AlertTriangle
                className="text-red-600 dark:text-red-400"
                size={16}
            />
        )
    ) : (
        <Hourglass className="text-yellow-600 dark:text-yellow-400" size={16} />
    );
}

function showHiddenCases(
    cases: Array<[string, string, boolean]>,
    caseResults: Array<CaseResult>,
) {
    // Create an array of all cases with their original index
    const casesWithIndex = cases.map((c, i) => ({ data: c, globalIndex: i }));
    // Then filter the array to get only the hidden cases
    const hiddenCases = casesWithIndex.filter((item) => !item.data[2]);
    if (hiddenCases.length === 0) {
        return null;
    }

    const numberOfCorrect = hiddenCases.filter(
        (item) => caseResults[item.globalIndex]?.is_correct,
    ).length;

    const areCorrect = numberOfCorrect === hiddenCases.length;
    return (
        <TextButton key="hiddenCases" variant="noOutline" disabled>
            {caseStatusIcon(caseResults.length === cases.length, areCorrect)}
            <p>
                隠しケース ({numberOfCorrect}/{hiddenCases.length})
            </p>
        </TextButton>
    );
}
