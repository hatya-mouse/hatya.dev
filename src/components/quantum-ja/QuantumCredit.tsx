import Link from "next/link";

export default function QuantumCredit({
    notTranslated = false,
}: {
    notTranslated: boolean;
}) {
    return (
        <div className="text-neutral-500">
            <hr className="mt-6 mb-10" />
            {notTranslated ? (
                <div>
                    <p>
                        © 2026&nbsp;
                        <Link className="credit-link" href="/">
                            Hatya-mouse
                        </Link>
                        .
                    </p>
                    <p>
                        <a
                            className="credit-link"
                            href="https://creativecommons.org/licenses/by-sa/4.0/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Creative Commons Attribution-ShareAlike 4.0
                            International License (CC BY-SA 4.0)
                        </a>
                        &nbsp;のもとで自由に利用・改変・再配布が可能です。
                    </p>
                </div>
            ) : (
                <div>
                    <p className="mb-3">
                        本記事は
                        <a
                            className="credit-link"
                            href="https://quantum.cloud.ibm.com/docs/en/guides"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Qiskit Documentation
                        </a>
                        （英語）を元に日本語への翻訳および一部改変・再構成を行なったものです。原文の著作権はIBM
                        Corp.に帰属します。また、本記事は
                        <a
                            className="credit-link"
                            href="https://creativecommons.org/licenses/by-sa/4.0/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Creative Commons Attribution-ShareAlike 4.0
                            International License (CC BY-SA 4.0)
                        </a>
                        &nbsp;の下で公開されています。
                    </p>

                    <p>
                        翻訳・編集：
                        <Link className="credit-link" href="/">
                            Hatya-mouse
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}
