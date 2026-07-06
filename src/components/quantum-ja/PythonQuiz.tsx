"use client";

import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { Play } from "lucide-react";
import TextButton from "./Button";

export default function PythonQuiz({
    quizNo,
    message = "",
    initialCode = "",
}: {
    quizNo?: number;
    message?: string;
    initialCode?: string;
}) {
    const [code, setCode] = useState(initialCode);

    return (
        <div className="flex flex-col px-3 pt-2 pb-3 items-start gap-2 rounded-lg bg-neutral-300 dark:bg-zinc-900 border border-(--border)">
            <p>
                <strong>Practice{quizNo && ` ${quizNo}`}.</strong>
                &nbsp;
                {message}
            </p>
            <ReactCodeMirror
                className="w-full"
                value={code}
                onChange={(newCode) => {
                    setCode(newCode);
                }}
                extensions={[python()]}
            />
            <TextButton>
                <Play size={16} />
                <p>Run</p>
            </TextButton>
        </div>
    );
}
