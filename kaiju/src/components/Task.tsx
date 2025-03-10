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
             onClick={() => {
                 openModal({modalType: 'VIEW_TASK'})
                 document.body.classList.add('modal-open')
             }}
        >
            <div className='font-bold text-white sm:p-3 p-1'>
                <h3 className='sm:text-base text-sm'>{task.title}</h3>
            </div>
            <div className='flex justify-between w-full'>
                <p className='sm:text-base text-sm p-3'>{task.type}</p>
                <div className='sm:text-base text-sm flex p-3 gap-2'>
                    <p>{task.points}</p>
                    <p>{task.assignee?.match(/^[^@]+/)?.[0].slice(0,12) || 'Unassigned'}</p>
                </div>
            </div>
        </div>
    )
}
export default Task
