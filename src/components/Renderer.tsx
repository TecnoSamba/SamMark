import { useContext } from "react"
import { GlobalContext } from "../GlobalContext"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { customComponents } from "../lib/customComponents"
import remarkGitHubAlerts from "remark-github-markdown-alerts"

function Renderer() {
    const { code } = useContext(GlobalContext)
    

    return (
        <div className="flex-1 prose p-4">
            <ReactMarkdown remarkPlugins={[ remarkGfm, remarkGitHubAlerts ]} rehypePlugins={[ rehypeRaw ]} components={customComponents}>
                { code }
            </ReactMarkdown>
        </div>
    )
}

export default Renderer