import Header from "../components/Header.tsx";
import LoginForm from "../components/LoginForm.tsx";
import '../styles/layout/Landing.scss'
import CreateAccount from "../components/CreateAccount.tsx";
import React from "react";

const Landing = () => {
    const [creatingAccount, setCreatingAccount] = React.useState<boolean>(false)
    return (
        <div>
            <Header />
            <div className="relative w-full h-[85vh] overflow-hidden">
                {creatingAccount ?
                    <CreateAccount setCreatingAccount={setCreatingAccount}/>
                    :
                    <LoginForm setCreatingAccount={setCreatingAccount}/>
                }
                <div className='landing-bg'/>

            </div>
        </div>
    )
}
export default Landing
