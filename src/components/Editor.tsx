import { useContext } from "react"
import { GlobalContext } from "../GlobalContext"
import AceEditor from 'react-ace'

import "ace-builds/src-noconflict/mode-markdown"
import "ace-builds/src-noconflict/theme-dracula"

import "ace-builds/src-noconflict/ext-language_tools"

function Editor() {
    const { code, setCode } = useContext(GlobalContext)

    const handleOnChange = (code: string) => {
        setCode(code)
        localStorage.setItem('code', code)
    }

    const handleScroll = (editor: any) => {
        if (editor && editor.session) {
            const scrollY = editor.session.getScrollTop() as number
            const renderer = document.querySelector('#renderer div') as HTMLDivElement

            const editorScrollHeight = editor.renderer.layerConfig.maxHeight || editor.session.getScreenLength() * editor.renderer.lineHeight
            const editorClientHeight = editor.renderer.$size.height
            const editorMaxScroll = editorScrollHeight - editorClientHeight

            const rendererMaxScroll = renderer.scrollHeight - renderer.clientHeight

            if (editorMaxScroll > 0 && rendererMaxScroll > 0) {
                const proportionalScroll = scrollY / editorMaxScroll
                
                renderer.scrollTop = proportionalScroll * rendererMaxScroll
            }
        }
    }

    return (
        <div className="flex-1 h-full flex pl-4 pt-4">
            <AceEditor
                mode='markdown'
                theme="dracula"
                value={code}
                onChange={handleOnChange}
                name="code_editor"
                width="100%"
                height="100%"
                fontSize={16}

                onScroll={handleScroll}

                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: true,
                    showLineNumbers: false,
                    tabSize: 4,
                    useWorker: false,
                    showGutter: false,
                    showPrintMargin: false
                }}

                style={{
                    fontFamily: 'var(--google-sans-code)',
                    background: '#000000',
                    padding: '20px'
                }}
            />
        </div>
    )
}

export default Editor