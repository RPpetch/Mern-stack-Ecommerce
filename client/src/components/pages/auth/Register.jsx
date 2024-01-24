import React, { useState } from 'react'
import { register } from '../../function/auth';
import '../../../css/Register/Register.css'

const Register = () => {

    const [value, setValue] = useState({
        username: "",
        password: "",
        Cpassword: "",
      });

    const handleInput = (e) =>{
      setValue({ ...value, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(value.Cpassword !== value.password){
          alert('confirm password incorrect')
        }else{
          register(value)
          .then(res=>{
            alert(res.data)
            setValue({
              username: "",
              password: "",
              Cpassword: "",
            });
          }).catch(err=>{
            alert(err.response.data)
          })
        }
    }

  return (
    <div className='AccountContainer'>
        <form method='Post' onSubmit={handleSubmit}>
        <div className='header'> 
        <h3>Register</h3>
        </div>
        <div>
            <label>Username</label>
            <input className='form-control' type="text" value={value.username} name="username" placeholder='username' onChange={handleInput} />
        </div>
        <div>
            <label>Password</label>
            <input className='form-control' type="password" value={value.password} name='password' placeholder='password'onChange={handleInput} />
        </div>
        <div>
            <label >Confirm Password</label>
            <input  className='form-control' type="password" value={value.Cpassword} name='Cpassword' placeholder='confirm password'onChange={handleInput} />
        </div>
        <button type='submit' className='form-control btn btn-success mt-3'>Register</button>
        </form>
    </div>
  )
}

export default Register