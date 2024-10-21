import OptionsType from "react-select";
import {Option} from "../types/option.ts";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useCreateTaskMutation, useDeleteTaskMutation} from "../features/apiSlice.ts";
import Select from "react-select";
import {closeModal} from "../features/modalSlice.ts";
import {useDispatch} from "react-redux";

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
    assignee: string[],
    points: number
}



const TaskModal: React.FC<TaskModalProps> = ({modalType, modalProps, refetch}) => {
    const [createTask, {isSuccess, error}] = useCreateTaskMutation()
    const [deleteTask] = useDeleteTaskMutation()

    console.log("modalProps: ", modalProps)

    const dispatch = useDispatch();

    // @ts-ignore
    const typeOptions: OptionsType<Option> = [
        {label: "Story", value: "Story"},
        {label: "Bug", value: "Bug"},
        {label: "Other", value: "Other"},
    ]

    // @ts-ignore
    const assigneeOptions: OptionsType<Option> = [
        {label: "Rob McCary", value: "1"},
        {label: "Liam Clarke", value: "2"},
        {label: "Donald Sloth", value: "3"},
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
            backgroundColor: state.isFocused ? 'white' : 'black'
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
        let submissionObj = {title: values.title,
            description: values.description,
            type:values.type.value,
            status: values.status.value,
            assignee: parseInt(values.assignee.value),
            points: values.points}



        await createTask(submissionObj).unwrap()
            .then(() => {
                refetch()
                dispatch(closeModal());
            })
            .catch((error: Error) => console.log(error))
    }

    const handleDeleteTask = async () => {
        await deleteTask(modalProps.id).unwrap()
            .then(() => {
                refetch()
                dispatch(closeModal());
            })
            .catch((error: Error) => console.log(error))
    }


    return (
        <Formik
            initialValues={{
                title: modalProps.title || "",
                description: modalProps.description || "",
                type: modalProps.type ? {label: modalProps.type, value: modalProps.type} : [],
                status: modalProps.status ? {label: modalProps.status, value: modalProps.status} : [],
                assignee: modalProps.assignee || [],
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
                            className='h-[5vh] rounded-lg'
                        />
                        <ErrorMessage name="title" component="div" className="text-red-500" />
                    </div>
                    <button type="button" onClick={() => handleDeleteTask()}>Delete Task</button>
                    <div className='flex flex-col items-center gap-2 w-full h-[50vh]'>
                        <label>Task Description</label>
                       <Field
                           as="textarea"
                           name="description"
                           placeholder="Task Description"
                           className='w-3/4 h-[50vh] rounded-lg'
                       />

                        <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>
                    <div className='flex items-center w-full justify-evenly px-2 py-5'>
                        <div className='w-1/3'>
                            <label>Type</label>
                            <Select
                                styles={customStyles}
                                value={values.type}
                                onChange={(option) => setFieldValue("type", option)}
                                options={typeOptions}
                                placeholder="Select Task Type"
                            />
                            <ErrorMessage name="type" component="div" className="text-red-500"/>
                        </div>
                        <div className='w-1/3'>
                            <label>Status</label>
                            <Select
                                styles={customStyles}
                                value={values.status}
                                onChange={(option) => setFieldValue("status", option)}
                                options={statusOptions}
                                placeholder="Select Status Type"
                            />
                            <ErrorMessage name="type" component="div" className="text-red-500"/>
                        </div>
                        <div className='w-1/3'>
                            <label>Assigned To</label>
                            <Select
                                styles={customStyles}
                                value={values.assignee}
                                onChange={(option) => setFieldValue("assignee", option)}
                                options={assigneeOptions}
                                placeholder="Assigned To"
                            />
                            <ErrorMessage name="assignee" component="div" className="text-red-500"/>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <label>Points</label>
                            <Field
                                name="points"
                                type="number"
                                min={1}
                                defaultValue={1}
                            />
                            <ErrorMessage name="points" component="div" className="text-red-500"/>
                        </div>
                    </div>
                    <div className='flex justify-end px-2'>
                        <button type="submit" disabled={isSubmitting} className='submit-btn'>
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
export default TaskModal
