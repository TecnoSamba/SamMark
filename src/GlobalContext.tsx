import { createContext, useState, type JSX } from "react";
import { type GlobalState } from "./lib/types";

export const GlobalContext = createContext<GlobalState>({ code: '', setCode: () => {} })

export function GlobalContextProvider({ children }: { children: JSX.Element }) {
    const [code, setCode] = useState('')

    return (
        <GlobalContext.Provider value={{ code, setCode }}>
            {
                children
            }
        </GlobalContext.Provider>
    )
}

