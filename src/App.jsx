import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className="App">
      <nav>
        <Link to={"/jansson_Personal_Trainer"}>Home  </Link>
        <Link to={"/jansson_Personal_Trainer/customer"}>Customer  </Link>
        <Link to={"/jansson_Personal_Trainer/training"}>Training  </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App
