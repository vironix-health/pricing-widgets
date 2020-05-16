import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

import React from 'react';

const code = `
() => {
    const [count, setCount] = React.useState(0);
    return (
        <>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
        </>
    )
}
`;

function App() {
  return (
    <LiveProvider code={code}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
}

export default App;
