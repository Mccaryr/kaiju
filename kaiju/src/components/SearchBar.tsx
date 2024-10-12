import React from 'react'
import '../styles/components/SearchBar.scss'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = React.useState('')


    return (
        <div className="search-container">
            <input
                placeholder={"Search..."}
                type={"search"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-green-100 border-4 rounded-3xl p-3"
            />
            <i className="fas fa-search search-icon"/>
        </div>
)
}
export default SearchBar
