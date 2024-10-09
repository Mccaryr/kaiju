import React from "react";
import '../styles/components/Button.scss'


interface ButtonProps {
    text: string;
    action?: () => void;
}
const Button:React.FC<ButtonProps> = ({text, action}) => {
    return (
        <button className='btn' onClick={action}>
            {text}
        </button>
    )
}
export default Button
