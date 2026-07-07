import type { MDXComponents } from "mdx/types";
import PythonQuiz from "@/components/quantum-ja/PythonQuiz";
import Button from "@/components/quantum-ja/Button";

const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
    return {
        h1: ({ children }) => <h1 className="mt-4 mb-2">{children}</h1>,
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
