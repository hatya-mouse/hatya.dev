"use client";

import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { Lightbulb, Play } from "lucide-react";
import TextButton from "./Button";
import clsx from "clsx";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

function InternalPythonQuiz({
    quizNo,
    message = "",
    initialCode = "",
    hints = [],
}: {
    quizNo?: number;
    message?: string;
    initialCode?: string;
    hints?: Array<string>;
}) {
    const [code, setCode] = useState(initialCode);
    const [wasCorrect, setWasCorrect] = useState(false);
    const [hintOpen, setHintOpen] = useState<Array<boolean>>(
        hints.map(() => false),
    );
    const isDark = useTheme().resolvedTheme === "dark";

    return (
        <div
            className={clsx(
                "flex flex-col px-3 pt-2 pb-3 my-2 items-start gap-2 rounded-xl border transition-all duration-200 ease-in-out",
                wasCorrect
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
                extensions={[python()]}
            />
            <div className="flex flex-row gap-2">
                <TextButton
                    variant="green"
                    onClick={() => {
                        setWasCorrect(!wasCorrect);
                    }}
                >
                    <Play size={16} />
                    <p className="font-bold">実行！</p>
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

            {wasCorrect && <div className="font-bold text-lg">🎉 正解！</div>}
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
