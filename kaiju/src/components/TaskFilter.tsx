import SearchBar from "./SearchBar.tsx";
import {Option} from "../types/option.ts";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setFilter} from "../features/filterSlice.ts"
import CustomSelect from "./CustomSelect.tsx";


const TaskFilter = () => {
    const [type, setType] = useState(null)
    const [assignee, setAssignee] = useState(null)
    const dispatch = useDispatch();


    // @ts-ignore
    const typeOptions: Option[] = [
        {label: "Story", value: "Story"},
        {label: "Bug", value: "Bug"},
        {label: "All", value: "All"},
    ]

    const assigneeOptions: Option[] = [
        {label: "Rob.mccary", value: "robert.tyler.mccary@gmail.com"},
        {label: "erinhealey", value: "erinhealey07@yahoo.com"},
        {label: "All", value: "All"}
    ]

    const handleTypeChange = (option: any) => {
        setType(option)
        // @ts-ignore
        dispatch(setFilter({taskType: option.value}))
    }

    const handleAssigneeChange = (option: any) => {
        setAssignee(option)
        // @ts-ignore
        dispatch(setFilter({assignee: option.value}))
    }


    return (
        <div className='mb-2 p-8 flex gap-5 align-items-center flex-col sm:flex-row'>
            <SearchBar />
            <div className='flex flex-row gap-4 sm:pt-0 align-items-center pt-4'>
                <CustomSelect value={type} options={typeOptions} label={'Type'} onChange={handleTypeChange} />
                <CustomSelect value={assignee} options={assigneeOptions} label={'Assignee'} onChange={handleAssigneeChange} />
            </div>
        </div>
    )
}
export default TaskFilter
