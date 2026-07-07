import type { MDXComponents } from "mdx/types";
import PythonQuiz from "@/components/quantum-ja/PythonQuiz";
import Button from "@/components/quantum-ja/Button";

const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
    return {
        a: ({ children }) => (
            <a className="text-indigo-500 dark:text-indigo-300 hover:underline">
                {children}
            </a>
        ),
        ...components,
        PythonQuiz,
        Button,
    };
}
