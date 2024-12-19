import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import '../styles/components/LoginForm.scss'
import Button from "./Button.tsx";
import {useAuth} from "./AuthProvider.tsx";


const CreateAccount = ({setCreatingAccount}: {setCreatingAccount: (creatingAccount: boolean) => void}) => {
    const {createAccount} = useAuth()

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email Address').required('Required'),
        password: Yup.string().required('Required')
    })

    const handleSubmit = (userData: {email: string, password: string}) => {
        createAccount(userData);
    }

    return (
        <div className="login-container relative z-10 py-10">
            <div className="login-form sm:w-1/2">
                <h5>Create Account</h5>
                <Formik
                    initialValues={{
                    email: "",
                    password: ""
                }} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {({isSubmitting}) => (
                        <Form>
                            <div className="form-group">
                                <Field
                                    type={"text"}
                                    name={"email"}
                                    placeholder={"Email"}
                                    className={"input-field"}
                                />
                                <ErrorMessage name="email" component="div" className='error-msg'/>
                                <Field
                                    type={"password"}
                                    name={"password"}
                                    placeholder={"Password"}
                                    className={"input-field"}
                                />
                                <ErrorMessage name="password" component="div" className='error-msg'/>
                            </div>
                            <div className="flex flex-row gap-[5vw]">
                                <Button type="button" text="Back" action={() => setCreatingAccount(false)}/>
                                <Button type={"submit"} text="Create Account" disabled={isSubmitting}/>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>

    )
}
export default CreateAccount
