import {TaskType} from "../types/task.ts";
import React from "react";

type TaskProps = {
    task: TaskType;
}

const Task: React.FC<TaskProps> = ({task}) => {
    return (
        <div>
            <div>
                <h3>{task.title}</h3>
                <p>{task.assignee}</p>
            </div>
            <div>
                <p>{task.type}</p>
                <p>{task.points}</p>
            </div>
        </div>
    )
}
export default Task
