import SearchBar from "./SearchBar.tsx";
import Select from "react-select";
import OptionsType from "react-select";
import {Option} from "../types/option.ts";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setFilter} from "../features/filterSlice.ts"


const TaskFilter = () => {
    const [type, setType] = useState(null)
    const dispatch = useDispatch();


    // @ts-ignore
    const typeOptions: OptionsType<Option> = [
        {label: "Story", value: "Story"},
        {label: "Bug", value: "Bug"},
        {label: "All", value: "All"},
    ]

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            borderColor: 'white',
            boxShadow: '0 0 0 1px 00FF00',
            padding: '5px',
            backgroundColor: 'rgb(33, 53, 71)',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            color: 'white',
            backgroundColor: 'rgb(33, 53, 71)',
            border: state.isFocused ? '1px solid #00FF00' : '',
            cursor: 'pointer',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'white',
        })
    }


    return (
        <div className='mb-2 p-8 flex flex-row gap-5 align-items-center'>
            <SearchBar />
            <Select
                styles={customStyles}
                value={type}
                onChange={(option) => {
                    setType(option)
                    dispatch(setFilter({taskType: option.value}))
                }}
                options={typeOptions}
                placeholder="Task Type"
            />
        </div>
    )
}
export default TaskFilter
