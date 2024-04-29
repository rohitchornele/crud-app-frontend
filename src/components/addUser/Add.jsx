import React, { useState } from 'react';
import "./add.css";
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';


function Add() {

    const users = {
        fName: "",
        lName: "",
        email: "",
        password: ""
    }

const [user, setUser] = useState(users);
const navigate = useNavigate()

  const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]:value});
        console.log(user)
    }

    const submitForm = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:8000/api/create", user).then((response) => {
            toast.success(response.data.msg, {position: "top-right"});
            navigate("/");
        }).catch(error => console.log(error.message))
    }

  return (
    <div className="add-user">
        <Link to="/">Back</Link>
        <h3>Add New User</h3>
        <form className='add-user-form' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="fName">First Name</label>
                <input type="text" onChange={inputHandler} id='fName' name='fName' autoComplete='off' placeholder='First Name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lName">Last Name</label>
                <input type="text" onChange={inputHandler} id='lName' name='lName' autoComplete='off' placeholder='Last Name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="emial" onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='Email' />
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='Password' />
            </div>
            <div className="inputGroup">
                <button type="submit">Add User</button>
            </div>
        </form>
    </div>
  )
}

export default Add