import React, {useState} from 'react'

// const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const SearchBar = ({onResults}) => {
    const [query, setQuery] = useState('');
    
    const handleClear = () =>{
        setQuery('');
        onResults([]);
    }
    const handleSearch = async(e)=>{
        e.preventDefault();
    
        try{
            const response = await fetch(`https://discvrai-backend.onrender.com/api/ask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            })
            const data = await response.json();
            onResults(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            onResults([]);
        }
    }
  return (
    <form onSubmit={handleSearch}>
        <input value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search by name...'
        className=' w-fullinline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ' />
        <button type='submit'>Search</button>
        {query && <button type='button' onClick={handleClear}>Clear</button>}
    </form>
    
  )
}

export default SearchBar
