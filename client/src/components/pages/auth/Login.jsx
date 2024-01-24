import React, { useState } from 'react'
import { login } from '../../function/auth'
import { useDispatch } from "react-redux";
import { userLogin } from '../../reducers/slice/userReducer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const[value,setValue] = useState({
        username:"",
        password:""
    })
    const location = useLocation()

    const roleBaseRedirect = (role) =>{
        let intended = location.state
        if(intended){
            navigate('../'+intended)
        }else{
            if(role === 'admin'){
                navigate('/admin/index')
              }else{
                navigate('/user/index')
              }
            }
        
    }

    const handleInput = (e) => {
       setValue({...value,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(value)
        .then(res=>{
            dispatch(userLogin({
                token: res.data.token,
                username: res.data.payload.user.username,
                role: res.data.payload.user.role,
                type: res.data.payload.user.type
            }));
            localStorage.setItem('token',res.data.token)
            roleBaseRedirect(res.data.payload.user.role)
        }).catch(err=>{
            alert(err.response.data)
        })
    }

    return (
        <div className='AccountContainer'>
            <form method='Post' onSubmit={handleSubmit}>
            <div className='header'> 
            <h3>Login</h3>
            </div>
            <div>
                <label>Username</label>
                <input className='form-control' type="text" value={value.username} name="username" placeholder='username' onChange={handleInput} />
            </div>
            <div>
                <label>Password</label>
                <input className='form-control' type="password" value={value.password} name='password' placeholder='password'onChange={handleInput} />
            </div>
            <button type='submit' className='form-control btn btn-primary mt-3'>Login</button>
            </form>
        </div>
      )
    }

export default Login