import Header from "../components/Header.tsx";
import LoginForm from "../components/LoginForm.tsx";
import apocalypticLandscape from "../assets/apocalypticLandscape.webp";
import CreateAccount from "../components/CreateAccount.tsx";
import React from "react";

const Landing = () => {
    const [creatingAccount, setCreatingAccount] = React.useState<boolean>(false)
    return (
        <div>
            <Header />
            <div className="relative w-full h-[75vh] overflow-hidden">
                {creatingAccount ?
                    <CreateAccount setCreatingAccount={setCreatingAccount} />
                    :
                    <LoginForm setCreatingAccount={setCreatingAccount} />
                }
                <div style={{backgroundImage:`url(${apocalypticLandscape})`}} className='absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center z-0' />
            </div>
        </div>
    )
}
export default Landing
