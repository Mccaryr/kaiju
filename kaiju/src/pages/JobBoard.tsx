import TaskFilter from "../components/TaskFilter.tsx";
import TaskList from "../components/TaskList.tsx";

const JobBoard = () => {
    return (
        <div>
            <div className="flex flex-row justify-between w-full">
                <h1>Project Name</h1>
                <p>Time Remaining</p>
                <button>Complete Sprint</button>
            </div>
            <TaskFilter />
            <TaskList />
        </div>
    )
}
export default JobBoard
