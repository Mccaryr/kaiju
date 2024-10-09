import {TaskType} from "../types/task.ts";
import Task from "./Task.tsx";
import '../styles/pages/TaskList.scss'


const taskDesignations = ["TODO", "In Progress", "Implemented", "Completed"]
const mockTaskList: TaskType[] = [
    {id: 1, title: "UI Work", type: "Story", description: "Create more buttons!", assignee:"Rob McCary", points: 7, status: "IN PROGRESS"},
    {id: 2, title: "Create Endpoint", type: "Bug", description: "Make Auth endpoint", assignee:"Liam Clarke", points: 3, status: "IN PROGRESS"}
]

const TaskList = () => {
    return (
        <div className="flex p-3 h-[85vh] justify-around">
            {taskDesignations.map((designation) => (
                <div key={designation} className="task-list-container flex flex-col h-full items-center gap-2 border-2 w-[22vw]">
                    <h5 className='text-left w-full p-5'>{designation.toUpperCase()}</h5>
                    {mockTaskList.map((task) => (
                    <Task key={task.id} task={task} />
                    ))}
                </div>
            ))}
        </div>
    )
}
export default TaskList
