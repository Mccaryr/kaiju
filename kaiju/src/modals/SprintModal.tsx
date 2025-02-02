import '../styles/components/Modal.scss'
import Button from "../components/Common/Button.tsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../features/modalSlice.ts";
import {Form, Formik} from "formik";
import CustomInput from "../components/Common/CustomInput.tsx";
import DatePicker from "react-datepicker";
import {useCreateSprintMutation} from "../features/apiSlice.ts";
import "react-datepicker/dist/react-datepicker.css";
import {setSelectedProject} from "../features/projectSlice.ts";
import {RootState} from "../app/store.ts";
import {TaskType} from "../types/task.ts";

type SprintModalProps = {
    modalProps: {
        projectId:number | null;
        size?:string,
        tasks: TaskType[]
    },
    refetchTasks: () => void;
}

const SprintModal:React.FC<SprintModalProps> = ({modalProps, refetchTasks}) => {
    const [completingSprint, setCompletingSprint] = useState<boolean>(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [error, setError] = useState<string>("")
    const selectedProject = useSelector((state: RootState) => state.projects.selectedProject)
    const [createSprint] = useCreateSprintMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if(selectedProject) {
            refetchTasks()
        }
    }, [selectedProject]);


    const setShowCompletingSprint = () => {
        setCompletingSprint(!completingSprint)
    }
    const cancelModal = () => {
        dispatch(closeModal())
        document.body.classList.remove('modal-open');

    }

    const handleSubmit = async (values: any) => {
        let submissionObj = {
            name: values.name,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            projectId: values.projectId,
            tasks: modalProps.tasks
        }
        await createSprint(submissionObj).unwrap()
            .then(async (data) => {
                let updatedProject = {name: selectedProject?.name, id: selectedProject?.id, sprintId: data.id}
                dispatch(setSelectedProject(updatedProject))
                dispatch(closeModal())
            })
            .catch((error: Error) => setError(error.message))
    }


    if(!completingSprint){
        return (
            <div className="flex items-center flex-col justify-evenly p-8 h-full">
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold text-center">Are you sure you want to complete the current sprint?</h2>
                    <p className="text-center">Note: Any uncompleted tasks will be assigned to the next sprint</p>
                </div>
                <div className="flex justify-evenly w-full">
                    <Button type="button" text={"Yes"} action={setShowCompletingSprint}/>
                    <Button type="button" text={"Cancel"} action={cancelModal} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex items-center flex-col justify-evenly p-8 h-full">
                <Formik
                    initialValues={{name: "", startDate: startDate, endDate: endDate, projectId: modalProps.projectId}}
                    onSubmit={handleSubmit}
                >
                    {({values, handleSubmit, isSubmitting}) => (
                        <Form className="flex flex-col justify-evenly items-center gap-2 h-full">

                            <CustomInput label={"Sprint name"} type="text" name={"name"} value={values.name} />
                                    <DatePicker
                                        selected={startDate}
                                        className="w-[75%]"
                                        selectsRange
                                        inline
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={(dates: any) => {
                                            const [start, end] = dates;
                                            setStartDate(start);
                                            setEndDate(end);
                                    }}  />
                            {error && <div className='error-msg'>{error}</div>}
                            <Button type={"submit"} text={"Create Sprint"} action={handleSubmit} disabled={isSubmitting} />
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}
export default SprintModal
