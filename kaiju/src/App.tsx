import Landing from "./pages/Landing.tsx";
import TaskBoard from "./pages/TaskBoard.tsx";
import {useAuth} from "./components/AuthProvider.tsx";


function App() {
 const {loggedIn } = useAuth();
  return (
    <div>
        {!loggedIn ? <Landing /> : <TaskBoard />}
    </div>
  )
}

export default App
