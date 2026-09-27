import {Panel, Group, Separator} from "react-resizable-panels"

import Aside from "./components/Aside"
import Editor from "./components/Editor"
import Renderer from "./components/Renderer"

function App() {
  return (
    <main className="flex flex-col w-screen h-screen" id="main_container">
      <Aside />

      <Group className="flex-1" orientation="horizontal">
          <Panel minSize="20%" collapsible>
            <Editor />
          </Panel>

          <Separator className="bg-neutral-600 w-px" />

          <Panel minSize="20%" id="renderer" collapsible>
            <Renderer />
          </Panel>
      </Group>
    </main>
  )
}

export default App
