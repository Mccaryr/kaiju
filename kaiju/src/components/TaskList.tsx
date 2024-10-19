import Task from "./Task";
import {TaskType} from "../types/task.ts";
import '../styles/components/TaskList.scss';
// @ts-ignore
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import {openModal} from "../features/modalSlice.ts";
import {useDispatch} from "react-redux";
import {useGetTasksQuery, useUpdateTaskMutation} from "../features/apiSlice.ts";
import {useEffect, useState} from "react";

type TaskBucket = {
    [key: string]: TaskType[];
}

const initialTasks: TaskBucket = {
    "DRAFT": [],
    "TODO": [],
    "IN PROGRESS": [],
    "IMPLEMENTED": [],
    "COMPLETED": []
};

const TaskList = () => {
    // @ts-ignore
    const { data: tasksData, error, isLoading } = useGetTasksQuery()
    const [updateTask, { isSuccess, error: updateError }] = useUpdateTaskMutation();
    const [tasks, setTasks] = useState(initialTasks);

    useEffect(() => {
        if(tasksData) {
            const updatedTaskBucket: TaskBucket = {
                "DRAFT": [],
                "TODO": [],
                "IN PROGRESS": [],
                "IMPLEMENTED": [],
                "COMPLETED": []
            };
            tasksData.forEach((task: TaskType) => {
                if(updatedTaskBucket[task.status]) {
                    updatedTaskBucket[task.status].push(task);
                }
            })
            setTasks(updatedTaskBucket);
        }
    }, [tasksData]);

    const handleTaskUpdate = async(movedTask: any, destBucket: any) => {
        let taskToUpdate = {...movedTask};
        taskToUpdate.status = destBucket;
        try {
            let result = await updateTask(taskToUpdate)
            console.log("result: ", result)
            return true
        } catch(e) {
            console.log("Failed to update: ", e)
            return false
        }


    }


    const dispatch = useDispatch();

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
            handleTaskUpdate(movedTask, Object.keys(destBucket)[0]).then((success) => {
                if(success) {
                    setTasks({
                        ...tasks,
                        [sourceBucket]: sourceItems,
                        [destBucket]: destItems,
                    });
                } else {
                    console.log("Failed to Update")
                }
            })
        }
    };

    if (isLoading) {return(<h1>Loading!</h1>)}
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
                                                onClick={() => dispatch(openModal({modalType: "UPDATE_TASK"}))}
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
