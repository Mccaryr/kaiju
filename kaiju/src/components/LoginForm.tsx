import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import '../styles/components/LoginForm.scss'
import Button from "./Button.tsx";
import {useState} from "react";
import Loader from "./Loader.tsx";
import {useLoginMutation} from "../features/apiSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {setIsLoggedIn} from "../features/authSlice.ts";

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const [login] = useLoginMutation()
    const dispatch = useDispatch();


    const handleSubmit = async(values: LoginFormValues, setStatus: any) => {
        setIsSubmitting(true);

        try {
          const {data} = await login(values)
            if (data?.jwt) {
                console.log(data.jwt)
                dispatch(setIsLoggedIn(data.jwt))
            }
        } catch(e: any) {
            console.error("Login failed", e.message);
            setStatus(e.message)
        } finally {
            setIsSubmitting(false);
        }

    }


    return (
        <div className="login-container relative z-10 py-10">
            <div className="login-form sm:w-1/2">
                {!isLoggedIn && isSubmitting ? (
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
                            {({status}) => (
                                <Form>
                                    <div className='form-group'>
                                        <Field type="email" name="email" placeholder="Email" className='input-field'/>
                                        <ErrorMessage name="email" component="div" className='error-msg'/>
                                        <Field type="password" name="password" placeholder="Password" className='input-field'/>
                                        <ErrorMessage name="password" component="div" className='error-msg'/>
                                        {status && <div className="error-msg">{status}</div>}
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
