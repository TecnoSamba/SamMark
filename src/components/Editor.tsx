import { useContext } from "react"
import { GlobalContext } from "../GlobalContext"

function Editor() {
    const { code, setCode } = useContext(GlobalContext)

    return (
        <div className="flex-1 h-full flex">
            <textarea 
                name="code" 
                id="code" 
                className="flex-1 h-full resize-none p-2 text-lg"

                value={code}
                onChange={e => setCode(e.currentTarget.value)}
                 />
        </div>
    )
}

export default Editor