import Header from "../components/Header.tsx";
import LoginForm from "../components/Forms/LoginForm.tsx";
import CreateAccountForm from "../components/Forms/CreateAccountForm.tsx";
import React from "react";
import video from "../assets/landing-video.mp4"

const Landing = () => {
    const [creatingAccount, setCreatingAccount] = React.useState<boolean>(false)
    return (
        <div>
            <Header />
            <div className="relative w-full h-[85vh] overflow-hidden">
                {creatingAccount ?
                    <CreateAccountForm setCreatingAccount={setCreatingAccount}/>
                    :
                    <LoginForm setCreatingAccount={setCreatingAccount}/>
                }
                <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
                    <source src={video} type={"video/mp4"} />
                    Your browser does not support the video
                </video>

            </div>
        </div>
    )
}
export default Landing
