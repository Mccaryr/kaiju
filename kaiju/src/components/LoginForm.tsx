import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import '../styles/components/LoginForm.scss'
import {useAuth} from "./AuthProvider.tsx";

type LoginFormValues = {
    email: string;
    password: string;
}

const validationSchema = Yup.object ({
    email: Yup.string().email('Invalid Email Address').required('Required'),
    password: Yup.string().required('Required'),
})

const LoginForm = () => {
    const initialValues: LoginFormValues = { email: '', password: '' };
    const { setLoggedIn } = useAuth();

    // @ts-ignore
    const handleSubmit = (values: LoginFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void}) => {
        setTimeout(() => {
            setLoggedIn(true)
            //alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }


    return (
        <div className="login-container relative z-10 py-10">
            <div className="login-form sm:w-1/2">
                <h3>Sign In!</h3>
                <Formik
                    initialValues={initialValues}
                    validatationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div className='form-group'>
                                <Field type="email" name="email" placeholder="Email" className='input-field'/>
                                <ErrorMessage name="email" component="div" className='error-msg'/>
                                <Field type="password" name="password" placeholder="Password" className='input-field'/>
                                <ErrorMessage name="password" component="div" className='error-msg'/>

                            <button type="submit" disabled={isSubmitting} className='submit-btn'>
                                Submit
                            </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="flex justify-between w-full">
                    <button className='link-btn'>Forgot Email?</button>
                    <button className='link-btn'>Forgot Password?</button>
                </div>
            </div>
        </div>
    )
}
export default LoginForm
