import { useContext, useState } from "react"
import { Code2, Ellipsis, FileIcon, FileCode, FileText, Save, SavePen, Upload, Fullscreen, Link2, ChevronUp, ChevronDown, HelpCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Kbd } from "./ui/kbd"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "./ui/alert-dialog"
import { GlobalContext } from "../GlobalContext"
import { marked } from 'marked'
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "./ui/dialog"
import { Input } from "./ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

function Tools() {
    const [open, setOpen] = useState(false)
    const [dialogState, setDialogState] = useState<'handleNew' | 'handleSetSource'>('handleNew')
    const [collapsed, setCollapsed] = useState(true)
    const [invalidParams, setInvalidParams] = useState(false)
    const { setCode, code, setSource, source, params, setParams } = useContext(GlobalContext)

    const handleNew = () => {
        setOpen(false)
        setCode('')
        localStorage.setItem('code', '')
    }

    const handleOpen = () => {
        const fileInput = document.getElementById('file_input') as HTMLInputElement

        fileInput.accept = '.md,.txt'
        fileInput.onchange = e => {
            const files = (e.currentTarget as HTMLInputElement).files
            if (!files) return

            const selectedFile = files[0]
            if (!selectedFile) return

            const reader = new FileReader()
            reader.onload = () => {
                const code = reader.result as string

                setCode(code)
                localStorage.setItem('code', code)
            }

            reader.readAsText(selectedFile)
        }

        fileInput.click()
    }

    const handleSave = () => {
        const fileName = 'New File.md'
        const downloadURL = URL.createObjectURL(new Blob([code]))
        
        const downloadLink = document.createElement('a')
        downloadLink.download = fileName
        downloadLink.href = downloadURL
        document.body.appendChild(downloadLink)

        downloadLink.click()

        setTimeout(() => document.body.removeChild(downloadLink), 100)
    }

    const handleSaveAsHTML = async () => {
        const result = await marked.parse(code)

        const fileName = 'New File.html'
        const downloadURL = URL.createObjectURL(new Blob([result]))
        
        const downloadLink = document.createElement('a')
        downloadLink.download = fileName
        downloadLink.href = downloadURL
        document.body.appendChild(downloadLink)

        downloadLink.click()

        setTimeout(() => document.body.removeChild(downloadLink), 100)
    }

    const handleSaveAsPlain = async () => {
        const fileName = 'New File.txt'
        const downloadURL = URL.createObjectURL(new Blob([code]))
        
        const downloadLink = document.createElement('a')
        downloadLink.download = fileName
        downloadLink.href = downloadURL
        document.body.appendChild(downloadLink)

        downloadLink.click()

        setTimeout(() => document.body.removeChild(downloadLink), 100)
    }

    const handleFullScreen = () => {
        const container = document.getElementById('main_container') as HTMLDivElement
        if (!container) return

        container.requestFullscreen()
    }

    const handleSetSource = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSource = e.currentTarget.value

        //if (!newSource.endsWith('/')) newSource = newSource + '/'

        setSource(newSource)
        localStorage.setItem('source', newSource)
    }

    const handleParamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.currentTarget.value

        try {
            const _ = new URLSearchParams(raw)
            setInvalidParams(false)
        } catch {
            setInvalidParams(true)
        }

        setParams(raw)
    }

    const handleSetSourceSubmit = () => {
        if (source.trim().length > 0 && !source.endsWith('/')) {
            setSource(source + '/')
            localStorage.setItem('source', source + '/')
        }
        
        try {
            const formattedParams = '?' + (new URLSearchParams(params)).toString()

            setInvalidParams(false)
            setParams(formattedParams)
            localStorage.setItem('params', formattedParams)

            setOpen(false)
        } catch {
            setInvalidParams(true)
        }
    }

    const dropdownMenuItemClass = 'text-base py-2 px-4 gap-3 [&_svg]:size-5! flex items-center justify-between'

    return (
        <div className="flex items-center gap-2">
            <input type="file" className="hidden" id="file_input" />

            <AlertDialog open={open} onOpenChange={setOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger render={ <Button variant='outline' size='icon-xl' /> }>
                        <Ellipsis />
                    </DropdownMenuTrigger>
                        <DropdownMenuContent className='min-w-70 p-2'>
                            <DropdownMenuGroup>
                                <AlertDialogTrigger
                                    render={
                                        <DropdownMenuItem id="new" className='w-full text-base py-2 px-4 gap-3 [&_svg]:size-5! flex items-center justify-between' onClick={() => {setDialogState('handleNew'); setOpen(true)}}>
                                            <span className="flex items-center gap-2"><FileIcon /> New</span>
                                            <span className="flex items-center gap-1"><Kbd>Ctrl</Kbd>+<Kbd>N</Kbd></span>
                                        </DropdownMenuItem>
                                    }
                                />

                                <DropdownMenuItem id="open" className={dropdownMenuItemClass} onClick={handleOpen}>
                                    <span className="flex items-center gap-2"><Upload /> Open</span>
                                    <span className="flex items-center gap-2"><Kbd>Ctrl</Kbd>+<Kbd>O</Kbd></span>
                                </DropdownMenuItem>

                                <DropdownMenuItem id="save" className={dropdownMenuItemClass} onClick={handleSave}>
                                    <span className="flex items-center gap-2"><Save /> Save</span>
                                    <span className="flex items-center gap-1"><Kbd>Ctrl</Kbd>+<Kbd>S</Kbd></span>
                                </DropdownMenuItem>

                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger id="save_as" className={dropdownMenuItemClass}>
                                        <span className="flex items-center gap-2"><SavePen /> Save As</span>
                                    </DropdownMenuSubTrigger>

                                    <DropdownMenuSubContent className='min-w-60 p-2'>
                                        <DropdownMenuItem id="save_markdown" className={dropdownMenuItemClass} onClick={handleSave}>
                                            <span className="flex items-center gap-2"><FileCode /> Markdown</span>
                                            <span className="flex items-center"><Kbd>.md</Kbd></span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem id="save_html" className={dropdownMenuItemClass} onClick={handleSaveAsHTML}>
                                            <span className="flex items-center gap-2"><Code2 /> HTML</span>
                                            <span className="flex items-center"><Kbd>.html</Kbd></span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem id="save_txt" className={dropdownMenuItemClass} onClick={handleSaveAsPlain}>
                                            <span className="flex items-center gap-2"><FileText /> Text</span>
                                            <span className="flex items-center"><Kbd>.txt</Kbd></span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuItem id="fullScreen" className={dropdownMenuItemClass} onClick={() => {setDialogState('handleSetSource'); setOpen(true)}}>
                                    <span className="flex items-center gap-2"><Link2 /> Set Source</span>
                                    <span className="flex items-center gap-2"><Kbd>Alt</Kbd>+<Kbd>S</Kbd></span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuItem id="fullScreen" className={dropdownMenuItemClass} onClick={handleFullScreen}>
                                    <span className="flex items-center gap-2"><Fullscreen /> Full Screen</span>
                                    <span className="flex items-center gap-2"><Kbd>Ctrl</Kbd>+<Kbd>F</Kbd></span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                </DropdownMenu>

               {
                    dialogState === 'handleNew'
                    &&  <AlertDialogContent>
                            <AlertDialogHeader>Create a new file?</AlertDialogHeader>
                            <AlertDialogDescription>Performing this action will delete the code inside of the editor permanently, make sure you have saved it before continuing.</AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction variant='destructive' onClick={handleNew}>Proceed</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
               }

               {
                    dialogState === 'handleSetSource'
                    &&  <DialogContent>
                            <DialogHeader className="flex flex-row items-center gap-2">
                                <span>Set resources source</span>

                                <Tooltip>
                                    <TooltipTrigger className='cursor-auto'>
                                        <HelpCircle size={16}/>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>
                                            The link set bellow will act as the source of any multimedia used in the document. For example, if the path of an image is set to <Kbd>./example.png</Kbd> and the resources source is set to <Kbd>https://example.com</Kbd>, it will be transform to <Kbd>https://example.com/example.png</Kbd>.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </DialogHeader>
                            <DialogDescription>Provide a URL to be used as the link source used in the document:</DialogDescription>
                            
                            <Input placeholder="https://example.com" value={source} onChange={handleSetSource} />

                            <Collapsible open={collapsed} onOpenChange={setCollapsed}>
                                <CollapsibleTrigger className="flex items-center gap-2">{!collapsed ? <ChevronUp /> : <ChevronDown />} URL params</CollapsibleTrigger>

                                <CollapsibleContent className='mt-2'>
                                    <Input placeholder="?raw=true" aria-invalid={invalidParams} value={params} onChange={handleParamsChange} />
                                </CollapsibleContent>
                            </Collapsible>

                            <DialogFooter>
                                <DialogClose render={<Button variant='ghost' />}>Cancel</DialogClose>
                                <Button variant='default' onClick={handleSetSourceSubmit} disabled={invalidParams}>Save</Button>
                            </DialogFooter>
                        </DialogContent>
               }
            </AlertDialog>
        </div>
    )
}

export default Tools