import '../styles/components/Modal.scss'
import Button from "../components/Button.tsx";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {closeModal} from "../features/modalSlice.ts";
import {Form, Formik} from "formik";
import CustomInput from "../components/CustomInput.tsx";
import DatePicker from "react-datepicker";
import {useCreateSprintMutation} from "../features/apiSlice.ts";
import "react-datepicker/dist/react-datepicker.css";



const SprintModal = () => {
    const [completingSprint, setCompletingSprint] = useState<boolean>(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [createSprint] = useCreateSprintMutation();
    const dispatch = useDispatch();

    const setShowCompletingSprint = () => {
        setCompletingSprint(!completingSprint)
    }
    const cancelModal = () => {
        dispatch(closeModal())
        document.body.classList.remove('modal-open');

    }

    const handleSubmit = async (values: any) => {
        console.log(values)
        //await createSprint(values.sprint).unwrap();
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
                    initialValues={{name: "", startDate: null, endDate: null}}
                    onSubmit={handleSubmit}
                >
                    {({values, setFieldValue, handleSubmit, isSubmitting}) => (
                        <Form className="flex flex-col justify-evenly items-center h-full">
                            <CustomInput label={"Sprint name"} type="text" name={"name"} value={values.name} />
                            <div className="flex flex-row justify-evenly gap-4 items-center">

                                    <DatePicker
                                        selected={startDate}
                                        className="w-[75%]"
                                        onChange={(date: any) => {
                                        setStartDate(date)
                                        setFieldValue(date, "startDate")

                                    }}  />


                                    <DatePicker
                                        selected={endDate}
                                        className="w-[75%]"
                                        onChange={(date: any) => {
                                        setEndDate(date)
                                        setFieldValue(date, "endDate")
                                    }}  />

                            </div>
                            <Button type={"submit"} text={"Create Sprint"} action={handleSubmit} disabled={isSubmitting} />
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}
export default SprintModal
