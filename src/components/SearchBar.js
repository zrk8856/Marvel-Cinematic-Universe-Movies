import React, { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

function SearchBar({ setMovies }) {
    const [input, setInput] = useState('')       
    const delayedSearchMovies = useCallback(debounce(searchMovies, 1000), [input])

    async function searchMovies() {
        const response = await fetch('https://mcuapi.herokuapp.com/api/v1/movies')
        const data = await response.json()
        const searchedMovies = data.data.filter((movie) => {
            if (input === '') {
                return movie.trailer_url !== null
            } else {
                return movie.title.toLowerCase().includes(input.toLowerCase()) && movie.trailer_url !== null
            }
        })
        setMovies(searchedMovies)
    }     

    useEffect(() => {
        delayedSearchMovies()
        return delayedSearchMovies.cancel
    }, [input, delayedSearchMovies])

    return (
        <div className="searchbar">
            <form className="searchbar__form">
                <input type="text" className="searchbar__input" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit" className="searchbar__button">Search</button>
            </form>
        </div>
    )
}

export default SearchBar
