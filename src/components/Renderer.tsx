import { useContext } from "react"
import { GlobalContext } from "../GlobalContext"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeRaw from "rehype-raw"
import rehypeKatex from 'rehype-katex'
import { customComponents } from "../lib/customComponents"
import remarkGitHubAlerts from "remark-github-markdown-alerts"
import remarkSupersub from "remark-supersub"

function Renderer() {
    const { code } = useContext(GlobalContext)
    

    return (
        <div className="flex-1 prose p-4 overflow-y-auto min-h-0" id="renderer">
            <ReactMarkdown remarkPlugins={[ remarkGfm, remarkGitHubAlerts, remarkSupersub, remarkMath ]} rehypePlugins={[ rehypeRaw, rehypeKatex ]} components={customComponents}>
                { code }
            </ReactMarkdown>
        </div>
    )
}

export default Renderer