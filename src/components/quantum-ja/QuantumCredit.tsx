export default function QuantumCredit() {
    return (
        <div>
            <hr className="mb-2" />
            <p className="text-neutral-500">
                本記事は
                <a
                    className="credit-link"
                    href="https://quantum.cloud.ibm.com/docs/en/guides"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Qiskit Documentation
                </a>
                の日本語訳です。原文の著作権はIBM Corp.に帰属します。
                英語の原文を日本語に翻訳しています。本翻訳は
                <a
                    className="credit-link"
                    href="https://creativecommons.org/licenses/by-sa/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Creative Commons Attribution-ShareAlike 4.0 International
                    License (CC BY-SA 4.0)
                </a>
                &nbsp;の下で公開されています。
            </p>
        </div>
    );
}
