import Task from "./Task";
import {TaskType} from "../types/task.ts";
import '../styles/components/TaskList.scss';
// @ts-ignore
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import {openModal} from "../features/modalSlice.ts";
import {useDispatch} from "react-redux";
import {useUpdateTaskMutation} from "../features/apiSlice.ts";
import {useEffect, useState} from "react";

type TaskBucket = {
    [key: string]: TaskType[];
}

type TasksDataProps = {
    tasksData: TaskType[];
    refetchTasks: () => void;
}

const initialTasks: TaskBucket = {
    "DRAFT": [],
    "TODO": [],
    "IN PROGRESS": [],
    "IMPLEMENTED": [],
    "COMPLETED": []
};

const TaskList: React.FC<TasksDataProps> = ({tasksData, refetchTasks}) => {
    // @ts-ignore
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
            await updateTask(taskToUpdate)
            refetchTasks()
            return true
        } catch(e) {
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

        // Optimistically updates state
        const updatedTasks = {
            ...tasks,
            [sourceBucket]: sourceItems,
            [destBucket]: destItems,
        };
        setTasks(updatedTasks);

        // Revert if it fails
        handleTaskUpdate(movedTask, destBucket).then((success) => {
            if (!success) {
                setTasks(tasks);
                console.log("Failed to Update");
            }
        });
    };



    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex p-3 sm:h-[85vh] justify-around sm:flex-row flex-col gap-2">
                {Object.keys(tasks).map((designation) => (
                    <Droppable droppableId={designation} key={designation}>
                        {(provided: DroppableProvided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="task-list-container flex sm:flex-col h-full items-center gap-2 border-2 sm:w-[18vw] flex-row min-h-[15vh]"
                            >
                                <h5 className='text-left w-full p-5 text-xs sm:text-xl'>{designation.toUpperCase()}</h5>
                                <div className='tasks-container w-full flex sm:flex-col items-center gap-2 pt-4 px-2 flex-row'>
                                {tasks[designation].map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id ? task.id.toString() : null} index={index}>
                                        {(provided: DraggableProvided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="w-[100%]"
                                                onClick={() => dispatch(openModal({modalType: "UPDATE_TASK", modalProps: task}))}
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
