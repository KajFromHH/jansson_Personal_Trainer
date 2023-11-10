import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="App">
      <nav>
        <Link to={"/"}>Home  </Link>
        <Link to={"/customer"}>Customer  </Link>
        <Link to={"/training"}>Training  </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App
