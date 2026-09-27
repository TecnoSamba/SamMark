import { createContext, useState, type JSX } from "react";
import { type GlobalState } from "./lib/types";
import { GREETING_CODE } from "./lib/CONSTANTS";

export const GlobalContext = createContext<GlobalState>({ code: '', setCode: () => {}, source: '', setSource: () => {}, params: '', setParams: () => {} })

export function GlobalContextProvider({ children }: { children: JSX.Element }) {
    const [code, setCode] = useState(localStorage.getItem('code') || GREETING_CODE)
    const [source, setSource] = useState(localStorage.getItem('source') || '')
    const [params, setParams] = useState(localStorage.getItem('params') || '')

    return (
        <GlobalContext.Provider value={{ code, setCode, source, setSource, params, setParams }}>
            {
                children
            }
        </GlobalContext.Provider>
    )
}

