import {TaskType} from "../types/task.ts";
import React from "react";
import '../styles/components/Task.scss'
import {openModal} from "../features/modalSlice.ts";

type TaskProps = {
    task: TaskType;
}

const Task: React.FC<TaskProps> = ({task}) => {
    return (
        <div className='task-container border-2 w-[95%] rounded-lg shadow-lg flex flex-col items-center'
             onClick={() => openModal({modalType: 'VIEW_TASK'})}
        >
            <div className='font-bold text-gray-900 dark:text-gray-400 p-3'>
                <h3>{task.title}</h3>
            </div>
            <div className='flex justify-between w-full'>
                <p className='p-3'>{task.type}</p>
                <div className='flex p-3 gap-2'>
                    <p>{task.points}</p>
                    <p>{task.assignee}</p>
                </div>
            </div>
        </div>
    )
}
export default Task
