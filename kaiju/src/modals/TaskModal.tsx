import OptionsType from "react-select";
import {Option} from "../types/option.ts";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} from "../features/apiSlice.ts";
import {closeModal} from "../features/modalSlice.ts";
import {useDispatch} from "react-redux";
import TextEditor from "../components/TextEditor.tsx";
import '../styles/components/Button.scss'
import '../styles/components/Modal.scss'
import CustomSelect from "../components/CustomSelect.tsx";
import CustomInput from "../components/CustomInput.tsx";
import {useState} from "react";

interface TaskModalProps {
    modalType?: string,
    modalProps: any,
    refetch: () => void,
}

type TaskFormValues = {
    title: string,
    description: string,
    type: any,
    status: any,
    assignee: any,
    points: number,
    id?: string
}



const TaskModal: React.FC<TaskModalProps> = ({modalType, modalProps, refetch}) => {
    const [createTask] = useCreateTaskMutation()
    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const [error, setError] = useState<Error>()


    const dispatch = useDispatch();

    // @ts-ignore
    const typeOptions: OptionsType<Option> = [
        {label: "Story", value: "Story"},
        {label: "Bug", value: "Bug"},
        {label: "Other", value: "Other"},
    ]

    // @ts-ignore
    const assigneeOptions: OptionsType<Option> = [
        {label: "Robert.tyler.mccary", value: "Robert.tyler.mccary@gmail.com"},
        {label: "Erinhealey07", value: "erinhealey07@yahoo.com"},
        {label: "Don", value: "Donald@sloth.com"},
    ]

    // @ts-ignore
    const statusOptions: OptionsType<Option> = [
        {label: "DRAFT", value: "DRAFT"},
        {label: "TODO", value: "TODO"},
        {label: "IN PROGRESS", value: "IN PROGRESS"},
        {label: "IMPLEMENTED", value: "IMPLEMENTED"},
        {label: "COMPLETED", value: "COMPLETED"}
    ]


    const validationSchema = Yup.object({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        type: Yup.object().required("Required"),
        assignee: Yup.object().required("Required"),
        points: Yup.number().required("Required"),
    })

    const handleSubmit = async (values: TaskFormValues) => {
        // @ts-ignore
        let submissionObj = {
            title: values.title,
            description: values.description,
            type:values.type.value,
            status: values.status.value,
            assignee: values.assignee.value,
            points: values.points,
            id: modalProps.id,
            projectId: modalProps.projectId
        }


        if(modalType === "CREATE_TASK") {
            await createTask(submissionObj).unwrap()
                .then(() => {
                    refetch()
                    dispatch(closeModal());
                })
                .catch((error: Error) => console.log(error))
        }

        if(modalType === "UPDATE_TASK") {
            await updateTask(submissionObj).unwrap()
            .then(() => {
                refetch()
                dispatch(closeModal());
            })
                .catch((error: Error) => setError(error))
        }
    }

    const handleDeleteTask = async () => {
        await deleteTask(modalProps.id).unwrap()
            .then(() => {
                refetch()
                dispatch(closeModal());
            })
            .catch((error: Error) => console.log(error))
    }


    // @ts-ignore
    return (
        <Formik
            initialValues={{
                title: modalProps.title || "",
                description: modalProps.description || "",
                type: modalProps.type ? {label: modalProps.type, value: modalProps.type} : null,
                status: modalProps.status ? {label: modalProps.status, value: modalProps.status} : null,
                assignee: modalProps.assignee ? {label: modalProps.assignee, value: modalProps.assignee} : null,
                points: modalProps.points || 1
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            >
            {({values, setFieldValue, handleSubmit, isSubmitting}) => (
                <Form className='flex flex-col items-center gap-[2rem]' onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center gap-2 pt-10'>
                        <CustomInput type={"text"} name={"title"} label={`${modalType === "CREATE_TASK" ? "Create Task" : "Update Task"}`} value={values.title} />
                        <ErrorMessage name="title" component="div" className="text-red-500" />
                    </div>
                    <div className='flex flex-col items-center gap-2 w-full'>
                        <label className="w-[70%] text-left">Task Description</label>
                       <Field
                           component={TextEditor}
                           name="description"
                           value={values.description}
                           onChange={(value: string) => setFieldValue("description", value)}
                       />

                        <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>
                    <div className='grid grid-cols-2 items-center sm:w-3/4 w-full justify-evenly px-4 sm:py-2 gap-8'>
                        <div>
                            <CustomSelect label={'Type'} options={typeOptions} onChange={(option) => setFieldValue("type", option)} value={values.type}/>
                            <ErrorMessage name="type" component="div" className="text-red-500"/>
                        </div>
                        <div className='flex justify-end'>
                            <CustomSelect label={'Status'} options={statusOptions} onChange={(option) => setFieldValue("status", option)} value={values.status}/>
                            <ErrorMessage name="type" component="div" className="text-red-500"/>
                        </div>
                        <div>
                            <CustomSelect label={'Assigned To'} options={assigneeOptions} onChange={(option) => setFieldValue("assignee", option)} value={values.assignee}/>
                            <ErrorMessage name="assignee" component="div" className="text-red-500"/>
                        </div>
                        <div className='flex justify-end'>
                            <CustomInput label={"Points"} type={"number"} name={"points"} value={values.points} />
                            <ErrorMessage name="points" component="div" className="text-red-500"/>
                        </div>
                    </div>
                    <div className='flex px-2 gap-5'>
                        {error &&
                            <div className='error-msg'>{error.message}</div>
                        }
                        <button type="submit" disabled={isSubmitting} className='btn'>
                            {modalType === "CREATE_TASK" ? "Submit" : "Update"}
                        </button>
                        {modalType === "UPDATE_TASK" &&
                            <button type="button" disabled={isSubmitting} className='bg-red-700 hover:scale-125' onClick={() => handleDeleteTask()}>
                                Delete
                            </button>
                        }
                    </div>
                </Form>
            )}
        </Formik>
    )
}
export default TaskModal
