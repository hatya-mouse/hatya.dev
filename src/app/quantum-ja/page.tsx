import LinkCard from "@/components/quantum-ja/LinkCard";
import LinkCardGroup from "@/components/quantum-ja/LinkCardGroup";
import PythonQuiz from "@/components/quantum-ja/PythonQuiz";
import QuantumCredit from "@/components/quantum-ja/QuantumCredit";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Quantum Learning 日本語訳",
    description: "This is the description for SEO purposes.",
};

export default function QuantumLearningHome() {
    return (
        <div className="flex flex-col gap-4 pt-4 pb-8 md:py-12 px-8 md:px-16 w-full max-w-6xl text-base leading-relaxed tracking-wide">
            <h1>Quantum Learning 日本語訳</h1>
            <p>
                これはIBMが開発しているQiskitの公式ドキュメントのうち、量子力学の基礎を学ぶためのチュートリアルを日本語に翻訳したものです。（このトップページは私が独自に作成したものであり、原文の日本語訳ではありません。）このチュートリアルの内容は全て
                <Link
                    className="text-indigo-500 dark:text-indigo-300 hover:underline"
                    href="https://creativecommons.org/licenses/by-sa/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    CC BY-SA 4.0ライセンス
                </Link>
                の元に公開されています。原文は
                <Link
                    className="text-indigo-500 dark:text-indigo-300 hover:underline"
                    href="https://quantum.cloud.ibm.com/docs/en/guides/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    こちら
                </Link>
                から参照ができます。
            </p>
            <p>
                このチュートリアルでは前提知識として行列や複素数の基礎的な知識が必要になります。
            </p>

            <hr className="my-4" />
            <h2>問題について</h2>
            <p>チュートリアルの合間で、以下のような問題が出題されます。</p>
            <PythonQuiz
                message="与えられた2つの値の和を計算するプログラムを記述してください。"
                initialCode={`def add(a, b):
    return # ここにコードを記述`}
                hints={[
                    "引数のaとbを足し合わせ、returnで計算結果を出力します。",
                    "Pythonでは+演算子を使うことで2値の和を求めることができます。",
                ]}
            />
            <p>
                QiskitはPython向けのライブラリであるため、これらの問題もPythonでの回答を想定しています。
                Pythonの知識がない場合は、事前に外部のPythonチュートリアル等でPythonについて学習しておきましょう。
            </p>

            <hr className="my-4" />
            <h2>コースを選択</h2>

            <LinkCardGroup>
                <LinkCard
                    type="link"
                    href="/quantum-ja/basics-of-quantum-info/intro"
                    subtitle="基礎からスタート"
                    title="量子情報の基礎"
                    description="量子コンピュータにおけるデータの表し方や古典ビットとの相違点、量子ビットの状態について学びます。"
                />
            </LinkCardGroup>

            <hr className="my-4" />
            <QuantumCredit notTranslated />
        </div>
    );
}
