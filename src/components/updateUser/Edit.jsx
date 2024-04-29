import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../addUser/add.css";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from "../../services/helper";

function Edit() {
    const users = {
        fName: "",
        lName: "",
        email: "",
    };

    const { id } = useParams();
    const [user, setUser] = useState(users);
    const navigate = useNavigate()

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
    };

    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/getone/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },[id]);

    const submitForm = async (e) => {
        e.preventDefault();

        await axios
            .put(`${BASE_URL}/api/update/${id}`, user)
            .then((response) => {
                toast.success(response.data.msg, {position: "top-right"});
                navigate("/");
                console.log(response);
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <div>
            <div className="add-user">
                <Link to="/">Back</Link>
                <h3>Update User</h3>
                <form className="add-user-form" onSubmit={submitForm}>
                    <div className="inputGroup">
                        <label htmlFor="fName">First Name</label>
                        <input
                            type="text"
                            value={user.fName}
                            onChange={inputChangeHandler}
                            id="fName"
                            name="fName"
                            autoComplete="off"
                            placeholder="First Name"
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="lName">Last Name</label>
                        <input
                            type="text"
                            value={user.lName}
                            onChange={inputChangeHandler}
                            id="lName"
                            name="lName"
                            autoComplete="off"
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={inputChangeHandler}
                            id="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Email"
                        />
                    </div>
                    <div className="inputGroup">
                        <button type="submit">Update User</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;
