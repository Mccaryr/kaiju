import Landing from "./pages/Landing.tsx";
import TaskBoard from "./pages/TaskBoard.tsx";
import {useAuth} from "./components/AuthProvider.tsx";
import {useEffect} from "react";


function App() {
 const {loggedIn, setLoggedIn } = useAuth();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setLoggedIn(true)
        }
    }, []);

  return (
    <div>
        {!loggedIn ? <Landing /> : <TaskBoard />}
    </div>
  )
}

export default App
