import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { type Components } from "react-markdown"
import Separator from "../components/Separator"
import { AlertCircle, AlertTriangle, Info, Lightbulb, MessageCircleWarning } from "lucide-react"

export const customComponents: Components = {
    a: ({href, children}) => (
        <a className="underline" href={href} target="__blank">{ children }</a>
    ),

    code: ({className, children}) => {
        const isBlock = /language-(\w+)/.exec(className || '')
        const language = isBlock ? isBlock[1] : ''

        if (isBlock) {
            return (
                    <div className="pt-2 pb-2">
                        <ReactSyntaxHighlighter
                        style={vscDarkPlus}
                        language={language}
                        PreTag='div'
                    >
                        {String(children || '').replace(/\n$/, '')}
                    </ReactSyntaxHighlighter>
                </div>
            )
        }

        return <code className="p-1 bg-neutral-600 rounded-md text-inherit">{children}</code>
    },
    
    h1: ({children}) => (
        <div>
            <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
            <Separator />
        </div>
    ),
    h2: ({children}) => (
        <div>
            <h2 className="text-3xl font-semibold mt-8 mb-3">{children}</h2>
            <Separator />
        </div>
    ),
    h3: ({children}) => (
        <div>
            <h3 className="text-2xl font-semibold mt-8 mb-3">{children}</h3>
            <Separator />
        </div>
    ),
    h4: ({children}) => (
        <div>
            <h4 className="text-xl font-semibold mt-8 mb-3">{children}</h4>
            <Separator />
        </div>
    ),
    h5: ({children}) => (
        <div>
            <h5 className="text-lg font-semibold mt-8 mb-2">{children}</h5>
            <Separator />
        </div>
    ),
    h6: ({children}) => (
        <div>
            <h6 className="text-base font-semibold mt-8 mb-2">{children}</h6>
            <Separator />
        </div>
    ),

    img: ({src, alt}) => (
        <a href={src} target="__blank" className="w-fit h-fit">
            <img src={src} alt={alt} className="mt-2 mb-4" onError={e => { e.currentTarget.innerHTML = '<br><span class="text-gray-600">Not found</span>' }} />
        </a>
    ),

    blockquote: ({children}) => (
        <div className="flex flex-row h-fit gap-2 pt-4 pb-4">
            <div className="min-h-full w-1 bg-neutral-600 rounded-md" />

            {children}
        </div>
    ),

    div: ({className, children}) => {
        if (className?.includes('markdown-alert-note')) { /* NOTE */
            return (<div className="flex flex-row h-fit gap-2 pt-4 pb-4">
                <div className="min-h-full w-1 bg-blue-600 rounded-md" />

                <div className="flex flex-col gap-2">
                    <span className="text-blue-600 flex items-center gap-2"><Info size={20} /> NOTE</span>
                    {children}
                </div>
            </div>)
        }

        if (className?.includes('markdown-alert-warning')) { /* WARNING */
            return (<div className="flex flex-row h-fit gap-2 pt-4 pb-4">
                <div className="min-h-full w-1 bg-yellow-600 rounded-md" />

                <div className="flex flex-col gap-2">
                    <span className="text-yellow-600 flex items-center gap-2"><AlertCircle size={20} /> WARNING</span>
                    {children}
                </div>
            </div>)
        }

        if (className?.includes('markdown-alert-tip')) { /* TIP */
            return (<div className="flex flex-row h-fit gap-2 pt-4 pb-4">
                <div className="min-h-full w-1 bg-green-600 rounded-md" />

                <div className="flex flex-col gap-2">
                    <span className="text-green-600 flex items-center gap-2"><Lightbulb size={20} /> TIP</span>
                    {children}
                </div>
            </div>)
        }

        if (className?.includes('markdown-alert-important')) { /* IMPORTANT */
            return (<div className="flex flex-row h-fit gap-2 pt-4 pb-4">
                <div className="min-h-full w-1 bg-violet-600 rounded-md" />

                <div className="flex flex-col gap-2">
                    <span className="text-violet-600 flex items-center gap-2"><MessageCircleWarning size={20} /> IMPORTANT</span>
                    {children}
                </div>
            </div>)
        }

        if (className?.includes('markdown-alert-caution')) { /* CAUTION */
            return (<div className="flex flex-row h-fit gap-2 pt-4 pb-4">
                <div className="min-h-full w-1 bg-red-600 rounded-md" />

                <div className="flex flex-col gap-2">
                    <span className="text-red-600 flex items-center gap-2"><AlertTriangle size={20} /> CAUTION</span>
                    {children}
                </div>
            </div>)
        }

        return <div className={className}>{children}</div>
    }
}