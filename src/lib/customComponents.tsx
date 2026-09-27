import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter"
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { type Components } from "react-markdown"
import Separator from "../components/Separator"
import { AlertCircle, AlertTriangle, Info, Lightbulb, MessageCircleWarning } from "lucide-react"
import React, { useContext, type HTMLAttributes } from "react"
import { GlobalContext } from "../GlobalContext"
import { getStringChildren } from "./utils"

export const customComponents: Components = {
    a: ({href, children}) => {
        if (href?.startsWith('#')) {
            return <a className="underline" href={href}>{ children }</a>
        }

        return <a className="underline" href={href} target="__blank">{ children }</a>
    },

    code: ({className, children}) => {
        const isBlock = /language-(\w+)/.exec(className || '')
        const language = isBlock ? isBlock[1] : ''

        if (isBlock) {
            return (
                    <div className="pt-2 pb-2">
                        <ReactSyntaxHighlighter
                        style={coldarkDark}
                        language={language}
                        PreTag='div'

                        customStyle={{
                            background: '#09090b',
                            borderRadius: '5px',
                            fontFamily: '"Google Sans Code"',
                            fontSize: '0.875rem'
                        }}
                        codeTagProps={{
                            style: {
                                fontFamily: '"Google Sans Code"',
                                fontSize: '0.875rem'
                            }
                        }}
                    >
                        {String(children || '').replace(/\n$/, '')}
                    </ReactSyntaxHighlighter>
                </div>
            )
        }

        return <code className="p-1 bg-neutral-800 rounded-md text-inherit font-code">{children}</code>
    },

    strong: ({children}) => (
        <strong>{children}</strong>
    ),
    
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

    img: ({src, alt}) => {
        const {source, params} = useContext(GlobalContext)

        if (source && source.trim().length > 0) {
            let realSrc = src

            if (src?.startsWith('.')) {
                const splitted = src.split('')
                splitted.reverse()
                splitted.pop()
                splitted.pop()
                splitted.reverse()
                
                realSrc = source + splitted.join('') + params
            }

            if (src?.startsWith('/')) {
                const splitted = src.split('')
                splitted.reverse()
                splitted.pop()
                splitted.reverse()
                
                realSrc = source + splitted.join('') + params
            }

            return <a href={realSrc} target="__blank" className="w-fit h-fit">
                <img src={realSrc} alt={alt} className="mt-2 mb-4" onError={e => { e.currentTarget.innerHTML = '<br><span class="text-gray-600">Not found</span>' }} />
            </a>    
        }

        return <a href={src} target="__blank" className="w-fit h-fit">
            <img src={src} alt={alt} className="mt-2 mb-4" onError={e => { e.currentTarget.innerHTML = '<br><span class="text-gray-600">Not found</span>' }} />
        </a>
    },

    blockquote: ({children}) => (
        <div className="flex flex-row h-fit gap-2 pt-4 pb-4">
            <div className="min-h-full w-1 bg-neutral-600 rounded-md" />
            <div>
                {children}
            </div>
        </div>
    ),

    div: ({className, children}) => {
        if (className?.includes('markdown-alert-note')) { /* NOTE */
            const strContent = getStringChildren(children).split('\n')
            const isSingleLine = strContent.length === 1
            const cleanedContent = isSingleLine ? strContent.join('').split(' ').filter(str => str !== '') : strContent
            
            console.log(cleanedContent)

            cleanedContent.reverse()
            cleanedContent.pop()
            cleanedContent.reverse()

            return (<div className="flex flex-row h-fit gap-2 pt-4 pb-4">
                <div className="min-h-full w-1 bg-blue-600 rounded-md" />

                <div className="flex flex-col gap-2">
                    <span className="text-blue-600 flex items-center gap-2"><Info size={20} /> NOTE</span>
                    {
                        isSingleLine
                        ? <p>{cleanedContent.join(' ')}</p>
                        : cleanedContent.map(str => <p>{str}</p>)
                    }
                </div>
            </div>)
        }

        if (className?.includes('markdown-alert-warning')) { /* WARNING */
            const strContent = getStringChildren(children).split('\n')
            const isSingleLine = strContent.length === 1
            const cleanedContent = isSingleLine ? strContent.join('').split(' ').filter(str => str !== '') : strContent

            cleanedContent.reverse()
            cleanedContent.pop()
            cleanedContent.reverse()

            return (<div className="flex flex-row h-fit gap-2 pt-4 pb-4">
                <div className="min-h-full w-1 bg-yellow-600 rounded-md" />

                <div className="flex flex-col gap-2">
                    <span className="text-yellow-600 flex items-center gap-2"><AlertCircle size={20} /> WARNING</span>
                    {
                        isSingleLine
                        ? <p>{cleanedContent.join(' ')}</p>
                        : cleanedContent.map(str => <p>{str}</p>)
                    }
                </div>
            </div>)
        }

        if (className?.includes('markdown-alert-tip')) { /* TIP */
            const strContent = getStringChildren(children).split('\n')
            const isSingleLine = strContent.length === 1
            const cleanedContent = isSingleLine ? strContent.join('').split(' ').filter(str => str !== '') : strContent

            cleanedContent.reverse()
            cleanedContent.pop()
            cleanedContent.reverse()

            return (<div className="flex flex-row h-fit gap-2 pt-4 pb-4">
                <div className="min-h-full w-1 bg-green-600 rounded-md" />

                <div className="flex flex-col gap-2">
                    <span className="text-green-600 flex items-center gap-2"><Lightbulb size={20} /> TIP</span>
                    {
                        isSingleLine
                        ? <p>{cleanedContent.join(' ')}</p>
                        : cleanedContent.map(str => <p>{str}</p>)
                    }
                </div>
            </div>)
        }

        if (className?.includes('markdown-alert-important')) { /* IMPORTANT */
            const strContent = getStringChildren(children).split('\n')
            const isSingleLine = strContent.length === 1
            const cleanedContent = isSingleLine ? strContent.join('').split(' ').filter(str => str !== '') : strContent

            cleanedContent.reverse()
            cleanedContent.pop()
            cleanedContent.reverse()

            return (<div className="flex flex-row h-fit gap-2 pt-4 pb-4">
                <div className="min-h-full w-1 bg-violet-600 rounded-md" />

                <div className="flex flex-col gap-2">
                    <span className="text-violet-600 flex items-center gap-2"><MessageCircleWarning size={20} /> IMPORTANT</span>
                    {
                        isSingleLine
                        ? <p>{cleanedContent.join(' ')}</p>
                        : cleanedContent.map(str => <p>{str}</p>)
                    }
                </div>
            </div>)
        }

        if (className?.includes('markdown-alert-caution')) { /* CAUTION */
            const strContent = getStringChildren(children).split('\n')
            const isSingleLine = strContent.length === 1
            const cleanedContent = isSingleLine ? strContent.join('').split(' ').filter(str => str !== '') : strContent

            cleanedContent.reverse()
            cleanedContent.pop()
            cleanedContent.reverse()

            return (<div className="flex flex-row h-fit gap-2 pt-4 pb-4">
                <div className="min-h-full w-1 bg-red-600 rounded-md" />

                <div className="flex flex-col gap-2">
                    <span className="text-red-600 flex items-center gap-2"><AlertTriangle size={20} /> CAUTION</span>
                    {
                        isSingleLine
                        ? <p>{cleanedContent.join(' ')}</p>
                        : cleanedContent.map(str => <p>{str}</p>)
                    }
                </div>
            </div>)
        }

        return <div className={className}>{children}</div>
    },

    video: ({src, children}) => (
        <video src={src} controls>{children}</video>
    ),

    ul: ({children}) => (
        <ul className="list-disc pl-8 mt-6 mb-4">
            {children}
        </ul>
    ),
    ol: ({children}) => (
        <ol className="list-decimal pl-8 mt-6 mb-4">
            {children}
        </ol>
    ),
    li: ({children}) => {
        const isCheckBox = React.Children.toArray(children).some(child => React.isValidElement(child) && (child.props as any).type === 'checkbox')

        if (isCheckBox) {
            return (
                <li className="list-none mb-1">
                    {
                        React.Children.map(children, child => {
                            if (React.isValidElement(child) && (child.props as any).type === 'checkbox') {
                                return React.cloneElement(child as React.ReactElement<any>, {
                                    className: 'w-4 h-4 border-neutral-700 bg-neutral-900 text-neutral-200 focus:ring-0 focus:ring-offset-0 accent-neutral-500 cursor-pointer'
                                })
                            }

                            return child
                        })
                    }
                </li>
            )
        }

        return <li>{children}</li>
    },

    hr: () => (
        <Separator />
    ),
    
    p: ({children, ...props}) => (
        <p className="mb-2" {...props}>
            {children}
        </p>
    ),

    table: ({children}) => (
        <div className="w-full overflow-x-auto my-4 border border-neutral-600/50 rounded-lg">
            <table className="w-full text-left border-collapse">
                {children}
            </table>
        </div>
    ),
    thead: ({children}) => (
        <thead className="bg-[#09090b] font-semibold">
            {children}
        </thead>
    ),
    tbody: ({children}) => (
        <tbody className="divide-y divide-neutral-600/50">
            {children}
        </tbody>
    ),
    tr: ({children}) => (
        <tr className="hover:bg-neutral-900/20 transition-colors">
            {children}
        </tr>
    ),
    th: ({style, children}) => (
        <th style={style} className={`px-4 py-3 font-bold ${style?.textAlign != 'right' && 'border-r border-r-neutral-600/50'}`}>
            {children}
        </th>
    ),
    td: ({style, children}) => (
        <td style={style} className={`px-4 py-2.5 align-middle ${style?.textAlign != 'right' && 'border-r border-r-neutral-600/50'}`}>
            {children}
        </td>
    ),

    kbd: ({children}) => (
        <kbd className="p-1 bg-neutral-800 rounded-md text-inherit font-code">{children}</kbd>
    ),

    mark: ({children}) => (
        <mark className="bg-neutral-100 text-black py-1 px-px">
            {children}
        </mark>
    ),

    details: ({style, children}) => (
        <details style={style} className="cursor-pointer my-4">
            {children}
        </details>
    ),

    span: ({className, children, ...props}) => {
        if (className === 'katex-display') {
            return <div className={className + ' ' + 'py-4'}>{children}</div>
        }

        if (className !== 'katex-html') {
            return <span className={className} {...props}>{children}</span>
        }
    },
}