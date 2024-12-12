import TaskFilter from "../components/TaskFilter.tsx";
import TaskList from "../components/TaskList.tsx";
import '../styles/components/LoginForm.scss'
import '../styles/pages/TaskBoard.scss'
import Modal from "../modals/Modal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../features/modalSlice.ts";
import {RootState} from "../app/store.ts";
import {useAuth} from "../components/AuthProvider.tsx";
import {useGetProjectsQuery, useGetTasksQuery} from "../features/apiSlice.ts";
import {useEffect, useState} from "react";
import {skipToken} from "@reduxjs/toolkit/query";
import {Option} from "../types/option.ts";
import CustomSelect from "../components/CustomSelect.tsx";


const TaskBoard = () => {
    const dispatch = useDispatch();
    const {isVisible} = useSelector((state: RootState) => state.modal);
    const {logout} = useAuth()
    // @ts-ignore
    const searchTerm = useSelector((state: RootState) => state.filter.searchTerm)
    const taskType = useSelector((state: RootState) => state.filter.taskType)
    const [dropdownActive, setDropdownActive] = useState<boolean>(false)
    const [project, setProject] = useState<Option | null>(null)
    const [projectOptions, setProjectOptions] = useState<Option[]>();
    const { data: projectsData} = useGetProjectsQuery({})
    const { data: tasksData, refetch: refetchTasks} = useGetTasksQuery(project?.value ? {searchTerm, taskType, projectId: project.value || ""}
    : skipToken)


    useEffect(() => {
     const timerId = setTimeout(() => {
         refetchTasks()
     }, 1000)
        return () => {clearTimeout(timerId)}
    }, [searchTerm, taskType])

    useEffect(() => {
        if (projectsData) {
            const options = projectsData.map((item: any) => ({
                label: item.name,
                value: item.id,
            }));
            setProjectOptions(options);
            setProject(options[0] || { label: '', value: '' });
        }
    }, [projectsData]);


    return (
        <div className='p-4'>
            <div className="flex flex-row justify-between w-full lg:px-10 sm:px-2 items-center">
                <CustomSelect label={'Project'} options={projectOptions} onChange={setProject} value={project} />
                <div className="flex items-center gap-7 cursor-pointer">
                    <div className="dropdown cursor-pointer outline-none" onClick={() => setDropdownActive(!dropdownActive)}>
                        <button className='dropdown-btn'>
                            <i className="fas fa-ellipsis-h border-green-100 border-2 p-2 rounded hover:border-green-600 hover:scale-125"/>
                        </button>
                        {dropdownActive && (
                            <div className='dropdown-content sm:mr-12 mr-4'>
                                <a href="#" onClick={() => dispatch(openModal({modalType: "CREATE_TASK", modalProps: {projectId: project?.value} }))}>Create
                                    Task</a>
                                <a href="#" onClick={() => alert("Coming soon")}>Complete Sprint</a>
                                <a href="/" onClick={() => logout()}>Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <TaskFilter/>
            <TaskList tasksData={tasksData}/>
            {isVisible && (
                <div className='w-full h-full flex items-center justify-center z-10 fixed top-0 left-0 right-0 bottom-0'>
                    <div className="absolute w-full h-full" style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}/>
                    <Modal refetch={refetchTasks}/>
                </div>
            )}
        </div>
    )
}
export default TaskBoard
