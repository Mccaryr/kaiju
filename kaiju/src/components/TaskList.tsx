import {TaskType} from "../types/task.ts";
import Task from "./Task.tsx";



const taskDesignations = ["TODO", "In Progress", "Implemented", "Completed"]
const mockTaskList: TaskType[] = [
    {id: 1, title: "UI Work", type: "Story", description: "Create more buttons!", assignee:"Rob McCary", points: 7},
    {id: 2, title: "Create Endpoint", type: "Bug", description: "Make Auth endpoint", assignee:"Liam Clarke", points: 3}
]

const TaskList = () => {
    return (
        <div className="flex p-5 h-[80vh] justify-evenly">
            {taskDesignations.map((designation) => (
                <div key={designation} className="flex flex-col h-full items-center gap-2 border-amber-50 border-8 w-[20vw]">
                    <h3>{designation}</h3>
                    {mockTaskList.map((task) => (
                    <Task key={task.id} task={task} />
                    ))}
                </div>
            ))}
        </div>
    )
}
export default TaskList
