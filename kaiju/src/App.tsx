import Landing from "./pages/Landing.tsx";
import TaskBoard from "./pages/TaskBoard.tsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store.ts";
import {setIsLoggedIn} from "./features/authSlice.ts";


function App() {
 const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
 const dispatch = useDispatch();


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            dispatch(setIsLoggedIn());
        }
    }, []);

  return (
    <div>
        {!isLoggedIn ? <Landing /> : <TaskBoard />}
    </div>
  )
}

export default App
