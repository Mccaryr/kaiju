import SearchBar from "./SearchBar.tsx";
import {Option} from "../types/option.ts";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setFilter} from "../features/filterSlice.ts"
import CustomSelect from "./CustomSelect.tsx";


const TaskFilter = () => {
    const [type, setType] = useState(null)
    const dispatch = useDispatch();


    // @ts-ignore
    const typeOptions: Option[] = [
        {label: "Story", value: "Story"},
        {label: "Bug", value: "Bug"},
        {label: "All", value: "All"},
    ]

    const handleChange = (option: any) => {
        setType(option)
        // @ts-ignore
        dispatch(setFilter({taskType: option.value}))
    }


    return (
        <div className='mb-2 p-8 flex gap-5 align-items-center flex-col sm:flex-row'>
            <SearchBar />
            <CustomSelect value={type} options={typeOptions} label={'Task Type'} onChange={handleChange} />
        </div>
    )
}
export default TaskFilter
