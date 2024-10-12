import TaskFilter from "../components/TaskFilter.tsx";
import TaskList from "../components/TaskList.tsx";
import '../styles/components/LoginForm.scss'
import Button from "../components/Button.tsx";

const TaskBoard = () => {
    return (
        <div className='p-4'>
            <div className="flex flex-row justify-between w-full px-10">
                <h5>Projects / Kaiju</h5>
                <Button text={"Complete Sprint"} action={() => alert("Sprint Completed")}/>
            </div>
            <TaskFilter />
            <TaskList />
        </div>
    )
}
export default TaskBoard
