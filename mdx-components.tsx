import type { MDXComponents } from "mdx/types";
import PythonQuiz from "@/components/quantum-ja/PythonQuiz";
import Button from "@/components/quantum-ja/Button";

const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
    return {
        a: (props) => (
            <a
                className="text-indigo-500 dark:text-indigo-300 hover:underline"
                {...props}
            />
        ),
        h2: ({ children }) => (
            <div>
                <hr className="my-8" />
                <h2>{children}</h2>
            </div>
        ),
        li: (props) => <li className="my-1" {...props} />,
        ul: (props) => <ul className="list-disc list-inside" {...props} />,
        ol: (props) => <ol className="list-decimal list-inside" {...props} />,
        hr: (props) => <hr className="my-4" {...props} />,
        ...components,
        PythonQuiz,
        Button,
    };
}
