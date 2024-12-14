import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import '../styles/components/LoginForm.scss'
import {useAuth} from "./AuthProvider.tsx";
import Button from "./Button.tsx";
import {useState} from "react";

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


    // @ts-ignore
    const handleSubmit = (values: LoginFormValues) => {
        setIsSubmitting(true);
        setTimeout(() => {
            login(values)
            setIsSubmitting(false);
        }, 400);
    }


    return (
        <div className="login-container relative z-10 py-10">
            <div className="login-form sm:w-1/2">
                {loggedIn && isSubmitting ? (
                        <div>
                            <p>Please be patient on initial authentication call. This application uses a free tier of
                                hosting</p>
                            <p>that goes to sleep periodically. It should be available in about a minute </p>
                        </div>
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
                        <div className="flex justify-between w-full">
                            <button className='link-btn' onClick={() => setCreatingAccount(true)}>Create Account</button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
export default LoginForm
