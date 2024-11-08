import React from "react";
import '../styles/components/Button.scss'


interface ButtonProps {
    text: string;
    action?: () => void;
    disabled?: boolean;
    type?: "submit" | "reset" | "button";
}
const Button:React.FC<ButtonProps> = ({text, action, disabled, type}) => {
    return (
        <button className='btn' type={type} onClick={action} disabled={disabled}>
            {text}
        </button>
    )
}
export default Button
