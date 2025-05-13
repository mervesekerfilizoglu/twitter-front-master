import React from 'react'
import { useForm } from 'react-hook-form'
import "./login.css"

import { useContext } from 'react'
import AuthContext from '../contexts/authContext'
const Login = () => {
const {login,isLoggedIn}=useContext(AuthContext);
    const{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm({
        mode:"onChange",
    })

    const handleLogin=(data)=>{
        login(data)
    }

  return (
    
    <form onSubmit={handleSubmit(handleLogin)}>
        <div className="form">
            <div className="userNameField">
                <label htmlFor="username">
                    UserName
                </label>
                <input type="text" name="" id="username" 
                {...register("username",{required:"Bu Alan Zorunludur"})}
                />
            </div>
            <span>

                {errors.username && errors.username.message.toString()}
            </span>

            <div className="passwordField">
                <label htmlFor="password">
                    Password
                </label>
                <input type="password" name="" id="password" {
                    ...register("password",{required:"Sifre girmek zorunludur"})
                }/>
            </div>

            {errors.password && errors.password.message.toString()}

            <button type='submit'>Login</button>
        </div>
    </form>
  )
}

export default Login