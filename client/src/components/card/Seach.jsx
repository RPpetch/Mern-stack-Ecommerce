import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { SearchQuery } from '../reducers/slice/searchReducer'
const Seach = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const search = useSelector((state)=>state.search.text)
    const {text} = search;

    const handleChange = (e) => {
        const value = e.target.value
        dispatch(SearchQuery({
            text:value
        }));
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      navigate("/shop?" + text)
    }

    
  return (
    <form onSubmit={handleSubmit}>
        <input type="search" className='form-control' onChange={handleChange} />

    </form>


  )
}

export default Seach