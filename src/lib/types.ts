export interface GlobalState {
    code: string,
    setCode: (code: string) => void,

    source: string,
    setSource: (source: string) => void,

    params: string,
    setParams: (params: string) => void
}