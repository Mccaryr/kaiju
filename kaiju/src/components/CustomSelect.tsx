import Select from "react-select";
import React, {useState} from "react";
import {Option} from "../types/option.ts";
import '../styles/components/CustomSelect.scss'

type CustomSelectProps = {
    label: string,
    options: Option[] | undefined,
    onChange:React.Dispatch<React.SetStateAction<{ value: string; label: string } | null>>
    value: {label: string, value: string} | null
}

const CustomSelect: React.FC<CustomSelectProps> = ({label, options, onChange, value}) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            borderColor: 'white',
            boxShadow: '0 0 0 1px 00FF00',
            padding: '5px',
            backgroundColor: 'rgb(33, 53, 71)',
        }),
        menu: (provided: any) => ({
            ...provided,
            margin: 0,
            border: 'none',
            backgroundColor: 'rgb(33, 53, 71)',
            zIndex: 2,
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            color: 'white',
            backgroundColor: 'rgb(33, 53, 71)',
            border: state.isFocused ? '1px solid #00FF00' : '',
            cursor: 'pointer',
            zIndex: 9999,
            overflowY: 'auto'
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'white',
        })
    }

    return (
        <div className='form-field sm:w-[200px] w-[175px]'>
            <label htmlFor="projectName"
                   className={`floating-label ${focused || value?.value ? 'float-up' : ''}`}>{label}</label>
            <Select id="projectName" styles={customStyles} classNamePrefix="custom-select"
                    className="custom-select-container" onFocus={handleFocus}
                    onBlur={handleBlur} options={options} placeholder="" value={value}
                    onChange={(newValue) => onChange(newValue)}
            />
        </div>
    )
}
export default CustomSelect
