import Select from "react-select";
import {useState} from "react";
import {SingleValue} from "react-select";
import {Option} from "../types/option.ts";
import Button from "../components/Button.tsx";

const TaskModal = () => {
    const [selectedTypeOption, setSelectedTypeOption] = useState<SingleValue<Option>>(null);
    const [selectedAssigneeOption, setSelectedAssigneeOption] = useState<SingleValue<Option>>(null);


    const typeOptions: Option[] = [
        {label: "Story", value: "Story"},
        {label: "Bug", value: "Bug"},
        {label: "Other", value: "Other"},
    ]

    const assigneeOptions: Option[] = [
        {label: "Rob McCary", value: "1"},
        {label: "Liam Clarke", value: "2"},
        {label: "Donald Sloth", value: "3"},
    ]

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isFocused ? 'black' : 'white',
            backgroundColor: state.isFocused ? 'white' : 'black'
        })
    }


    return (
        <div className='flex flex-col items-center gap-4'>
            <div className='flex flex-col items-center gap-2'>
                <h3>Create Task</h3>
                <input type="text" placeholder="Task Title" className='h-[5vh] rounded-lg'/>
            </div>
            <div className='flex flex-col items-center gap-2 w-full h-[50vh]'>
                <label>Task Description</label><textarea className='w-3/4 h-[50vh] rounded-lg' placeholder="Task Description" />
            </div>
            <div className='flex items-center w-full justify-evenly px-2 py-10'>
                <div className='w-1/3'>
                    <label>Type</label>
                    <Select
                        styles={customStyles}
                        value={selectedTypeOption}
                        onChange={(option) => setSelectedTypeOption(option)}
                        options={typeOptions}
                        placeholder="Select Task Type"
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                    />
                </div>
                <div className='w-1/3'>
                    <label>Assigned To</label>
                    <Select
                        styles={customStyles}
                        value={selectedAssigneeOption}
                        onChange={(option) => setSelectedAssigneeOption(option)}
                        options={assigneeOptions}
                        placeholder="Assigned To"
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                    />
                </div>
                <div className='flex flex-col items-center gap-2 '>
                <label>Points</label><input style={{width:'50px'}} type="number" defaultValue={0} />
                </div>
            </div>
            <div className='flex justify-end px-2'>
                <Button text="Save Task"/>
            </div>
        </div>
    )
}
export default TaskModal
