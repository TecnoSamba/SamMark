import Logo from "./Logo"
import Tools from "./Tools"

function Aside() {
    return (
        <aside className="w-full min-h-18 border-b border-b-neutral-600 flex items-center justify-between px-4">
            <Logo />
            <Tools />
        </aside>
    )
}

export default Aside