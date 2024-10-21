import TaskFilter from "../components/TaskFilter.tsx";
import TaskList from "../components/TaskList.tsx";
import '../styles/components/LoginForm.scss'
import Button from "../components/Button.tsx";
import '../styles/pages/TaskBoard.scss'
import Modal from "../modals/Modal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../features/modalSlice.ts";
import {RootState} from "../app/store.ts";
import {useAuth} from "../components/AuthProvider.tsx";
import {useGetTasksQuery} from "../features/apiSlice.ts";

const TaskBoard = () => {
    const dispatch = useDispatch();
    const {isVisible} = useSelector((state: RootState) => state.modal);
    const {logout} = useAuth()
    // @ts-ignore
    const { data: tasksData, error, isLoading, refetch} = useGetTasksQuery()

    return (
        <div className='p-4'>
            <div className="flex flex-row justify-between w-full px-10">
                <h5>Projects / Kaiju</h5>
                <div className="flex items-center gap-7 cursor-pointer">
                    <Button text={"Complete Sprint"} action={() => alert("Sprint Completed")}/>
                    <div className="dropdown">
                        <button className='dropdown-btn'>
                            <i className="fas fa-ellipsis-h border-green-100 border-2 p-2 rounded"/>
                        </button>
                        <div className='dropdown-content'>
                            <a href="#" onClick={() => dispatch(openModal({modalType: "CREATE_TASK"}))}>Create Task</a>
                            <a href="#">Sprint Analytics</a>
                            <a href="#">Create Task Template</a>
                            <a href="/" onClick={() => logout()}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
            <TaskFilter/>
            <TaskList tasksData={tasksData}/>
            {isVisible && (
                <div className='w-full h-full flex items-center justify-center z-10 fixed top-0 left-0 right-0 bottom-0'>
                    <div className="absolute w-full h-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)'}}/>
                    <Modal refetch={refetch}/>
                </div>
            )}
        </div>
    )
}
export default TaskBoard
