import TaskFilter from "../components/TaskFilter.tsx";
import TaskList from "../components/Tasks/TaskList.tsx";
import '../styles/components/LoginForm.scss'
import '../styles/pages/TaskBoard.scss'
import Modal from "../modals/Modal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../features/modalSlice.ts";
import {RootState} from "../app/store.ts";
import {useGetProjectsQuery, useGetTasksQuery} from "../features/apiSlice.ts";
import {useEffect, useState} from "react";
import {skipToken} from "@reduxjs/toolkit/query";
import {Option} from "../types/option.ts";
import CustomSelect from "../components/Common/CustomSelect.tsx";
import {logout} from "../features/authSlice.ts";
import {setSelectedProject} from "../features/projectSlice.ts";
import {TaskType} from "../types/task.ts";


const TaskBoard = () => {
    const dispatch = useDispatch();
    const {isVisible} = useSelector((state: RootState) => state.modal);
    const {searchTerm, taskType, assignee} = useSelector((state: RootState) => state.filter)
    const cachedProjects = useSelector((state: RootState) => state.projects.data)
    const selectedProject = useSelector((state: RootState) => state.projects.selectedProject)
    const [dropdownActive, setDropdownActive] = useState<boolean>(false)
    const [projectOptions, setProjectOptions] = useState<Option[]>();
    const {} = useGetProjectsQuery(undefined, {skip: cachedProjects.length > 0})
    const { data: tasksData, refetch: refetchTasks} = useGetTasksQuery(selectedProject?.id ? {searchTerm, taskType, assignee, sprintId: selectedProject.sprintId, projectId: selectedProject.id || ""}
    : skipToken)

    useEffect(() => {
     const timerId = setTimeout(() => {
         refetchTasks()
     }, 1000)
        return () => {clearTimeout(timerId)}
    }, [searchTerm, taskType, assignee])

    useEffect(() => {
        if (cachedProjects && !projectOptions?.length) {
            const options = cachedProjects.map((item: any) => ({
                label: item.name,
                value: item.id,
            }));
            setProjectOptions(options);
        }
    }, [cachedProjects]);

    const setProject = (newValue: any) => {
        let currentSprintId = cachedProjects.find((project) => project.id === newValue.value)?.currentSprintId;
        dispatch(setSelectedProject({name: newValue.label, id: newValue.value, sprintId: currentSprintId}));
    }

    return (
        <div className='p-4'>
            <div className="flex flex-row justify-between w-full lg:px-10 sm:px-2 items-center">
                <CustomSelect label={'Project'} options={projectOptions} onChange={setProject} value={{label: selectedProject?.name || "", value: selectedProject?.id?.toString() || ""}} />
                <div className="flex items-center gap-7 cursor-pointer">
                    <div className="dropdown cursor-pointer outline-none" onClick={() => setDropdownActive(!dropdownActive)}>
                        <button className='dropdown-btn'>
                            <i className="fas fa-ellipsis-h border-green-100 border-2 p-2 rounded hover:border-green-600 hover:scale-125"/>
                        </button>
                        {dropdownActive && (
                            <div className='dropdown-content sm:mr-12 mr-4'>
                                <a href="#" onClick={() => dispatch(openModal({modalType: "CREATE_TASK", modalProps: {projectId: selectedProject?.id, size:"Large"} }))}>Create
                                    Task</a>
                                {selectedProject &&
                                    <a href="#" onClick={() => dispatch(openModal({
                                        modalType: "SPRINT",
                                        modalProps: {size: "Medium", projectId: selectedProject?.id, tasks: tasksData.filter((task: TaskType) => task.status !== "COMPLETED")}
                                    }))}>
                                        Complete Sprint
                                    </a>
                                }
                                <a href="/" onClick={() => dispatch(logout())}>Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <TaskFilter/>
            <TaskList tasksData={tasksData} refetchTasks={refetchTasks} />
            {isVisible && (
                <div className='w-full h-full flex items-center justify-center z-10 fixed top-0 left-0 right-0 bottom-0'>
                    <div className="absolute w-full h-full" style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}/>
                    <Modal refetchTasks={refetchTasks}/>
                </div>
            )}
        </div>
    )
}
export default TaskBoard
