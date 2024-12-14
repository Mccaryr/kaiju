import {Field} from "formik";
import React, {useState} from "react";
import '.././styles/components/CustomInput.scss'

type CustomInputProps = {
    label: string;
    type: string;
    name: string;
    value: string;
}
const CustomInput: React.FC<CustomInputProps> = ({label, type, name, value}) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);


    return (
        <div className="form-field">
            {type === "number" ?
                <>
                    <label className={`floating-label ${focused || value ? 'float-up' : ''}`}>{label}</label>
                    <Field
                        name={name}
                        type={type}
                        min={0}
                        defaultValue={0}
                        className='custom-input rounded-[0.2rem] p-2 sm:w-[200px] w-[150px] h-[45px]'
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </>
                :
                <>
                    <label className={`floating-label ${focused || value ? 'float-up' : ''}`}>{label}</label>
                    <Field
                    name={name}
                    type={type}
                    placeholder=""
                    className='custom-input rounded-[0.2rem] p-2 sm:w-[200px] w-[175px]'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    />
                </>
            }
        </div>
    )
}
export default CustomInput
