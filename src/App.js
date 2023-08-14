import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers";
import { useState } from "react";
import Content from './Content'
import Memo from './Memo'

function App() {
  const [show, setShow] = useState(false)
  const [count, setCount] = useState(0)

  function Increase() {
    setCount(count + 1)
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setShow(!show)}>Submit</button>
      {show && <Content />}
      <Memo />
      <h1>{count}</h1>
      <button onClick={Increase}>Click Me!</button>
    </div>
  )
}

export default App;
