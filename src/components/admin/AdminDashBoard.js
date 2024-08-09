import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import MainNavBar from "../MainNavBar";
import { getAllUsers } from "../../services/userService";
import {Button,Modal} from 'react-bootstrap'; 
import User from "./User";

function AdminDashBoard() {

    const { user,setUser } = useAuth();
    const [allRowsDisplay, setAllRowsDisplay] = useState(true);
    const [users, setUsers] = useState([]);
    const [userDetail, setUserDetail] = useState(user);
    const [errors, setErrors] = useState([]);

    const [modalShow, setModalShow] = useState(false);
    const [message, setMessage] = useState("");

    const closeModal = () => {setModalShow(false);};
    const openModal = () => {setModalShow(true);};
    

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserDetail((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    

    const navigate = useNavigate();
    
    const handleBackToListClick=()=>{
        setAllRowsDisplay(true);
    }


    useEffect(() => {
        const fetchAllUsers = async () => {
            getAllUsers().then(res => {
                if (res.status === 200 && res.data.length > 0) {
                    setUsers(res.data);

                } else {
                    alert("No users found");
                }

            }).catch((error) => console.log('Error fetching user:', error));
        }
        fetchAllUsers();
    }, [handleBackToListClick]);


    const handleUserDetailsClick = (usr) => {
        setAllRowsDisplay(false);
        setUserDetail(usr);
    }

    const handleSubmitClick = (event) => {
        event.preventDefault();
        const validationErrors = {};

        if (!userDetail.fullName)
            validationErrors.fullName = 'Full Name is Required';

        if (!userDetail.phoneNumber)
            validationErrors.phoneNumber = 'PhoneNumber is Required';
        else if (userDetail.phoneNumber.length !== 10)
            validationErrors.phoneNumber = 'Enter 10 digit phone number';


        if (!userDetail.address)
            validationErrors.address = 'Address is Required';

        if (!userDetail.password) {
            validationErrors.password = 'Password is Required';
        } else if (userDetail.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length == 0) {

            console.log('In User Update form', userDetail);
             axios.put('http://localhost:8000/users/'+userDetail.id, userDetail)
                    .then(res => {

                        if (res.status === 200) {
                            setMessage('User Details Updated Succesfull!');
                            openModal();
                        } else {
                            setMessage("Something Went Wrong!, Try Again after some time");
                            openModal();
                        }

                    })
                    .catch((error) => console.log('Error registering user:', error))
                

        }
    }

    const cancelSave=()=>{
        setModalShow(false);
        setMessage("");
        setUserDetail(user);
    }





    return (
        <div><MainNavBar />
            <h5 className="loginMessage">Login as {user.fullName}</h5>
            <br /><br />
            {allRowsDisplay ?
                (<><h5 className="accountSummary"><u>Users List</u></h5><br />
                    <table border="1" className="table table-striped">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((usr) => (
                                <tr key={usr.id}>
                                    <td>
                                        <a href="#" onClick={() => handleUserDetailsClick(usr)}>{usr.fullName}</a>
                                    </td>
                                    <td>{usr.email}</td>
                                    <td>{usr.phoneNumber}</td>
                                    <td>{usr.role}</td>
                                    <td>{usr.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table></>)
                :
                (
                    
                        <>

                            <h6 className="accountSummary">User Details</h6>
                            <br />

                            <div class="container">
                                <form onSubmit={handleSubmitClick}>
                                    <div class="row">
                                        <div class="form-group col-6">
                                            <label for="fullName">Full Name</label>
                                            <input type="text" class="form-control" id="accountNumber"
                                                name="fullName" value={userDetail.fullName} onChange={handleInput} />
                                            &nbsp;&nbsp;
                                            <label>{errors.fullName && <p className="text-danger">{errors.fullName}</p>}</label>
                                        </div>
                                        <div class="form-group col-6">
                                            <label for="email">Email:</label>
                                            <input type="text" class="form-control" id="email"
                                                name="email" value={userDetail.email} readOnly />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-6">
                                            <label for="password">Password:</label>
                                            <input type="text" class="form-control" id="password"
                                                name="password" value={userDetail.password} onChange={handleInput} />
                                            &nbsp;&nbsp;
                                            <label>{errors.password && <p className="text-danger">{errors.password}</p>}</label>
                                        </div>
                                        <div class="form-group col-6">
                                            <label for="phoneNumber">PhoneNumber:</label>
                                            <input type="number" class="form-control" id="phoneNumber"
                                                name="phoneNumber" value={userDetail.phoneNumber} onChange={handleInput} />
                                            &nbsp;&nbsp;
                                            <label>{errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-6">
                                            <label for="address">Address:</label>
                                            <input type="text" class="form-control" id="address"
                                                name="address" value={userDetail.address} onChange={handleInput} />
                                            &nbsp;&nbsp;
                                            <label>{errors.address && <p className="text-danger">{errors.address}</p>}</label>
                                        </div>
                                        <div class="form-group col-6">
                                            <label for="token">Token:</label>
                                            <input type="text" class="form-control" id="token"
                                                name="token" value={userDetail.token} readOnly />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-6">
                                            <label for="status">Role:</label>

                                            <select class="form-control" name="role" value={userDetail.role} onChange={handleInput}>
                                                <option value="admin">admin</option>
                                                <option value="customer">customer</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-6">
                                            <label for="status">Status:</label>

                                            <select class="form-control" name="status" value={userDetail.status} onChange={handleInput}>
                                                <option value="active">active</option>
                                                <option value="inactive">inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-success">Save</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button class="btn btn-warning" onClick={() => { cancelSave() }}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button class="btn btn-primary" onClick={() => { handleBackToListClick() }}>Back to List</button>
                                </form>
                                <>
                                    <Modal show={modalShow} onHide={closeModal}>

                                        <Modal.Body>
                                            {
                                                message === 'User Details Updated Succesfull!' ?
                                                    <p class="text-info">{message}</p>
                                                    :
                                                    <p class="text-danger">{message}</p>
                                            }
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button class="btn btn-primary" onClick={closeModal}>Close</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            </div>
                        </>
                )
            }
        </div >
    );



}

export default AdminDashBoard;

