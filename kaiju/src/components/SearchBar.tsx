import '../styles/components/SearchBar.scss'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setFilter} from "../features/filterSlice.ts";



const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch()


    return (
        <div className="search-container">
            <input
                placeholder={"Search..."}
                type={"search"}
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                    dispatch(setFilter({searchTerm: e.target.value}))
                }}
                className="border-2 rounded-3xl p-3"
            />
            {searchTerm.length === 0 && <i className="fas fa-search search-icon"/>}
        </div>
    )
}
export default SearchBar
