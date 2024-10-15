import Select from "react-select";
import {Option} from "../types/option.ts";
import Button from "../components/Button.tsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

interface TaskModalProps {
    modalType?: string
}

const TaskModal = ({modalType}: TaskModalProps) => {

    const typeOptions: Option[] = [
        {label: "Story", value: "Story"},
        {label: "Bug", value: "Bug"},
        {label: "Other", value: "Other"},
    ]

    const assigneeOptions: Option[] = [
        {label: "Rob McCary", value: "1"},
        {label: "Liam Clarke", value: "2"},
        {label: "Donald Sloth", value: "3"},
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


    return (
        <Formik
            initialValues={{
                title: "",
                description: "",
                type: null,
                assignee: null,
                points: 1
            }}
            onSubmit={() => console.log("Submitting")}
            validationSchema={validationSchema}
            >
            {({values, setFieldValue, handleSubmit}) => (
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
                    <div className='flex flex-col items-center gap-2 w-full h-[50vh]'>
                        <label>Task Description</label>
                        <textarea
                            className='w-3/4 h-[50vh] rounded-lg'
                            placeholder="Task Description"
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>
                    <div className='flex items-center w-full justify-evenly px-2 py-10'>
                        <div className='w-1/3'>
                            <label>Type</label>
                            <Select
                                styles={customStyles}
                                value={values.type}
                                onChange={(option) => setFieldValue("type", option)}
                                options={typeOptions}
                                placeholder="Select Task Type"
                            />
                            <ErrorMessage name="type" component="div" className="text-red-500" />
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
                            <ErrorMessage name="assignee" component="div" className="text-red-500" />
                        </div>
                        <div className='flex flex-col items-center gap-2 '>
                            <label>Points</label>
                            <Field
                                name="points"
                                type="number"
                                min={1}
                                defaultValue={1}
                            />
                            <ErrorMessage name="points" component="div" className="text-red-500" />
                        </div>
                    </div>
                    <div className='flex justify-end px-2'>
                        <Button text={modalType === "CREATE_TASK" ? "Save Task" : "Update Task"}/>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
export default TaskModal
