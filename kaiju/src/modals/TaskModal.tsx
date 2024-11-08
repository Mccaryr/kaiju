import OptionsType from "react-select";
import {Option} from "../types/option.ts";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} from "../features/apiSlice.ts";
import Select from "react-select";
import {closeModal} from "../features/modalSlice.ts";
import {useDispatch} from "react-redux";
import TextEditor from "../components/TextEditor.tsx";
import '../styles/components/Button.scss'
import '../styles/components/Modal.scss'

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
    const [deleteTask] = useDeleteTaskMutation()


    const dispatch = useDispatch();

    // @ts-ignore
    const typeOptions: OptionsType<Option> = [
        {label: "Story", value: "Story"},
        {label: "Bug", value: "Bug"},
        {label: "Other", value: "Other"},
    ]

    // @ts-ignore
    const assigneeOptions: OptionsType<Option> = [
        {label: "Rob@gmail.com", value: "1"},
        {label: "Liam@yahoo.com", value: "2"},
        {label: "Donald@sloth.com", value: "3"},
    ]

    // @ts-ignore
    const statusOptions: OptionsType<Option> = [
        {label: "DRAFT", value: "DRAFT"},
        {label: "TODO", value: "TODO"},
        {label: "IN PROGRESS", value: "IN PROGRESS"},
        {label: "IMPLEMENTED", value: "IMPLEMENTED"},
        {label: "COMPLETED", value: "COMPLETED"}
    ]

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isFocused ? 'black' : 'white',
            backgroundColor: state.isFocused ? 'white' : 'black',
        })
    }

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
            assignee: values.assignee.label,
            points: values.points,
            id: modalProps.id
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
                .catch((error: Error) => console.log(error))
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
                type: modalProps.type ? {label: modalProps.type, value: modalProps.type} : [],
                status: modalProps.status ? {label: modalProps.status, value: modalProps.status} : [],
                assignee: modalProps.assignee ? {label: modalProps.assignee, value: modalProps.assignee} : [],
                points: modalProps.points || 1
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            >
            {({values, setFieldValue, handleSubmit, isSubmitting}) => (
                <Form className='flex flex-col items-center gap-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center gap-2'>
                        <h3>Create Task</h3>
                        <Field
                            type="text"
                            name="title"
                            placeholder="Task Title"
                            className='h-[5vh] rounded-lg text-center'
                        />
                        <ErrorMessage name="title" component="div" className="text-red-500" />
                    </div>
                    <div className='flex flex-col items-center gap-2 w-full h-[50vh]'>
                        <label>Task Description</label>
                       <Field
                           component={TextEditor}
                           name="description"
                           value={values.description}
                           onChange={(value: string) => setFieldValue("description", value)}
                       />

                        <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>
                    <div className='flex items-center w-3/4 justify-evenly px-4 py-5 gap-2.5'>
                        <div className='w-1/5'>
                            <label>Type</label>
                            <Select
                                styles={customStyles}
                                value={values.type}
                                onChange={(option) => setFieldValue("type", option)}
                                options={typeOptions}
                                placeholder="Task Type"
                            />
                            <ErrorMessage name="type" component="div" className="text-red-500"/>
                        </div>
                        <div className='w-2/5'>
                            <label>Status</label>
                            <Select
                                styles={customStyles}
                                value={values.status}
                                onChange={(option) => setFieldValue("status", option)}
                                options={statusOptions}
                                placeholder="Status Type"
                                menuPlacement={"top"}
                            />
                            <ErrorMessage name="type" component="div" className="text-red-500"/>
                        </div>
                        <div className='w-2/5'>
                            <label>Assigned To</label>
                            <Select
                                styles={customStyles}
                                value={values.assignee}
                                onChange={(option) => setFieldValue("assignee", option)}
                                options={assigneeOptions}
                                placeholder="Assigned To"
                                menuPlacement={"top"}
                            />
                            <ErrorMessage name="assignee" component="div" className="text-red-500"/>
                        </div>
                        <div className='w-1/5 flex flex-col'>
                            <label>Points</label>
                            <Field
                                name="points"
                                type="number"
                                min={1}
                                defaultValue={1}
                                className='rounded-lg bg-white p-2 text-black w-[75%]'
                            />
                            <ErrorMessage name="points" component="div" className="text-red-500"/>
                        </div>
                    </div>
                    <div className='flex px-2 gap-5'>
                        <button type="submit" disabled={isSubmitting} className='btn'>
                            {modalType === "CREATE_TASK" ? "Submit" : "Update"}
                        </button>
                        {modalType === "UPDATE_TASK" &&
                            <button type="button" className='bg-red-700 hover:scale-125' onClick={() => handleDeleteTask()}>
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
