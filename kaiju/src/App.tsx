import Landing from "./pages/Landing.tsx";
import JobBoard from "./pages/JobBoard.tsx";
import {useAuth} from "./components/AuthProvider.tsx";


function App() {
 const {loggedIn } = useAuth();
  return (
    <div>
        {!loggedIn ? <Landing /> : <JobBoard />}
    </div>
  )
}

export default App
