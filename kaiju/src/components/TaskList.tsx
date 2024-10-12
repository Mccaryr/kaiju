import Task from "./Task";
import {TaskType} from "../types/task.ts";
import '../styles/pages/TaskList.scss';
// @ts-ignore
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { useState } from "react";

type TaskBucket = {
    [key: string]: TaskType[];
}

const initialTasks: TaskBucket = {
    "TODO": [],
    "IN PROGRESS": [
        { id: "1", title: "UI Work", type: "Story", description: "Create more buttons!", assignee: "Rob McCary", points: 7, status: "IN PROGRESS" }
    ],
    "IMPLEMENTED": [
        { id: "2", title: "Create Endpoint", type: "Bug", description: "Make Auth endpoint", assignee: "Liam Clarke", points: 3, status: "IMPLEMENTED" }
    ],
    "COMPLETED": []
};

const TaskList = () => {
    const [tasks, setTasks] = useState(initialTasks);

    const onDragEnd = (result: any) => {
        const { source, destination } = result;

        // If dropped outside any droppable area
        if (!destination) return;

        const sourceBucket = source.droppableId;
        const destBucket = destination.droppableId;

        // Clone the source items to modify
        const sourceItems = Array.from(tasks[sourceBucket]);
        const [movedTask] = sourceItems.splice(source.index, 1);

        // Clone the destination items and insert the moved task
        const destItems = Array.from(tasks[destBucket]);
        destItems.splice(destination.index, 0, movedTask);

        // Update the tasks state
        if(tasks[sourceBucket] !== tasks[destBucket]) {
            setTasks({
                ...tasks,
                [sourceBucket]: sourceItems,
                [destBucket]: destItems,
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex p-3 h-[85vh] justify-around">
                {Object.keys(tasks).map((designation) => (
                    <Droppable droppableId={designation} key={designation}>
                        {(provided: DroppableProvided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="task-list-container flex flex-col h-full items-center gap-2 border-2 w-[22vw]"
                            >
                                <h5 className='text-left w-full p-5'>{designation.toUpperCase()}</h5>
                                <div className='tasks-container w-full flex flex-col items-center gap-2 pt-4'>
                                {tasks[designation].map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided: DraggableProvided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="w-[100%]"
                                                onClick={() => console.log(typeof(task.id))}
                                            >
                                                <Task task={task} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default TaskList;
