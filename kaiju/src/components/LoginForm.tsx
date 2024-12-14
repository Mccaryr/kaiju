import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import '../styles/components/LoginForm.scss'
import {useAuth} from "./AuthProvider.tsx";
import Button from "./Button.tsx";
import {useState} from "react";
import Loader from "./Loader.tsx";

type LoginFormValues = {
    email: string;
    password: string;
}

const validationSchema = Yup.object ({
    email: Yup.string().email('Invalid Email Address').required('Required'),
    password: Yup.string().required('Required'),
})



const LoginForm = ({setCreatingAccount}: {setCreatingAccount: (creatingAccount: boolean) => void}) => {
    const initialValues: LoginFormValues = { email: 'guest@email.com', password: 'password' };
    const {login, loggedIn} = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async(values: LoginFormValues) => {
        setIsSubmitting(true);

        try {
            login(values)
        } catch(e) {
            console.log(e)
        } finally {
            setTimeout(() => {
                setIsSubmitting(false);
            }, 5000)
        }

    }


    return (
        <div className="login-container relative z-10 py-10">
            <div className="login-form sm:w-1/2">
                {loggedIn && isSubmitting ? (
                    <>
                        <div className='text-[0.8rem] sm:text-[1rem]'>
                            <p>Please be patient on initial authentication call. </p>
                            <br/>
                            <p>This application uses a free tier of hosting that goes to sleep periodically.</p>
                            <br/>
                            <p>    It should be available in about a minute</p>

                        </div>
                        <Loader />
                    </>
                    )
                    :
                    <>
                        <h3>Sign In!</h3>
                        <Formik
                        initialValues={initialValues}
                        validatationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        >
                            {({}) => (
                                <Form>
                                    <div className='form-group'>
                                        <Field type="email" name="email" placeholder="Email" className='input-field'/>
                                        <ErrorMessage name="email" component="div" className='error-msg'/>
                                        <Field type="password" name="password" placeholder="Password" className='input-field'/>
                                        <ErrorMessage name="password" component="div" className='error-msg'/>
                                        <Button text={"Submit"} disabled={isSubmitting} type={"submit"}/>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                            <button className='link-btn' onClick={() => setCreatingAccount(true)}>Create Account</button>
                    </>
                }
            </div>
        </div>
    )
}
export default LoginForm
