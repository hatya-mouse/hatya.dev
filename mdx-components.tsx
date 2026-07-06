import type { MDXComponents } from "mdx/types";
import PythonQuiz from "@/components/quantum-ja/PythonQuiz";
import Button from "@/components/quantum-ja/Button";

const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
    return { ...components, PythonQuiz, Button };
}
