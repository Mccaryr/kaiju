import React from "react";
import '../../styles/components/Button.scss'
import godzillaLoader from "../../assets/godzillaLoader.gif";


interface ButtonProps {
    text: string;
    action?: () => void;
    disabled?: boolean;
    type?: "submit" | "reset" | "button";
}
const Button:React.FC<ButtonProps> = ({text, action, disabled, type}) => {
    if(disabled) {
        return (
            <>
                <button className='btn flex row text-center items-center'>
                    <span>Loading...</span>
                    <img src={godzillaLoader}
                         alt={'Loading...'}
                         className="w-[50px] h-[40px]"
                    />
                </button>
            </>
        )
    } else {
        return (

            <button className='btn' type={type} onClick={action} disabled={disabled}>
            {text}
            </button>
        )
    }
}
export default Button
