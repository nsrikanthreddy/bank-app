import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthProvider";
import MainNavBar from "../MainNavBar";
import { getAllUsers } from "../../services/userService";
import { getAllAccounts } from "../../services/accountService";
import {Button,Modal} from 'react-bootstrap'; 


function AccountManagement() {

    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const [allRowsDisplay, setAllRowsDisplay] = useState(true);
    const [account, setAccount] = useState(null);

    const [errors, setErrors] = useState([]);

    const [modalShow, setModalShow] = useState(false);
    const [message, setMessage] = useState("");

    const closeModal = () => {setModalShow(false); setAllRowsDisplay(true)};
    const openModal = () => {setModalShow(true);};


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
    }, []);

    useEffect(() => {
        const fetchAllAccounts = async () => {
            getAllAccounts().then(res => {
                if (res.status === 200 && res.data.length > 0) {
                    setAccounts(res.data);

                } else {
                    alert("No accounts found");
                }

            }).catch((error) => console.log('Error fetching account:', error));
        }
        fetchAllAccounts();
    }, [closeModal]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAccount((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleAccountDetailsClick = (account) => {
        setAllRowsDisplay(false);
        setAccount(account);
    }

    const handleSubmitClick = (event) => {
        event.preventDefault();
        const validationErrors = {};

        if (!account.branch)
            validationErrors.branch = 'Enter Branch';

        if (!account.balance)
            validationErrors.balance = 'Balance is Required';
        else if (parseFloat(account.balance) < 5000)
            validationErrors.balance = 'Balance should not lessthan 5000 Minimum Balance';


        if (!account.accountType)
            validationErrors.accountType = 'Address is Required';

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length == 0) {
            
            console.log('In Account Update form', account);
             axios.put('http://localhost:8000/accounts/'+account.id, account)
                    .then(res => {

                        if (res.status === 200) {
                            setMessage('Account Details Updated Succesfull!');
                            openModal();
                        } else {
                            setMessage("Something Went Wrong!, Try Again after some time");
                            openModal();
                        }

                    })
                    .catch((error) => console.log('Error updating account user:', error))
                

        }
    }



    const cancelSave=()=>{
        setErrors([]);
        setModalShow(false);
        setMessage("");
        setAccount(account);
        setAllRowsDisplay(false);
    }

    return (
        <div><MainNavBar />
            <h5 className="loginMessage">Login as {user.fullName}</h5>
            <br /><br />
            {allRowsDisplay ?
                (<><h5 className="accountSummary"><u>Account List</u></h5><br />
                    <table border="1" className="table table-striped">
                        <thead>
                            <tr>
                                <th>Account Number</th>
                                <th>Balance</th>
                                <th>Branch</th>
                                <th>Account Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account) => (
                                <tr key={account.id}>
                                    <td>
                                        <a href="#" onClick={() => handleAccountDetailsClick(account)}>{account.id}</a>
                                    </td>
                                    <td>{account.balance}</td>
                                    <td>{account.branch}</td>
                                    <td>{account.accountType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table></>)
                :
                (
                    <>

                        <h6 className="accountSummary">Account Details</h6>
                        <br />

                        
                        <form onSubmit={handleSubmitClick}>
                         
                            <div class="form-group">
                                <label for="id">Account Id</label> &nbsp; &nbsp;&nbsp;&nbsp;
                                <label>{account.id}</label>
                            </div>
                            <div class="form-group">
                                <label for="balance">Balance:</label>
                                <input type="text" class="form-control" id="balance"
                                    name="balance" value={account.balance} onChange={handleInput} />
                                    &nbsp;&nbsp;
                                    <label>{errors.balance && <p className="text-danger">{errors.balance}</p>}</label>
                            </div>
                          
                          
                            <div class="form-group">
                                <label for="branch">Branch:</label>
                                <input type="text" class="form-control" id="branch"
                                    name="branch" value={account.branch} onChange={handleInput} />
                                    &nbsp;&nbsp;
                                    <label>{errors.branch && <p className="text-danger">{errors.branch}</p>}</label>
                            </div>
                            <div class="form-group">
                                <label for="accountType">Account Type:</label>
                                <input type="text" class="form-control" id="accountType"
                                    name="accountType" value={account.accountType} onChange={handleInput} />
                                    &nbsp;&nbsp;
                                    <label>{errors.accountType && <p className="text-danger">{errors.accountType}</p>}</label>
                            </div>
                            
                            
                            <button type="submit" class="btn btn-success">Save</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button class="btn btn-warning" onClick={() => { cancelSave() }}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button class="btn btn-primary" onClick={() => { setAllRowsDisplay(true) }}>Back to List</button>
                        </form>
                        <>
                                    <Modal show={modalShow} onHide={closeModal}>

                                        <Modal.Body>
                                            {
                                                message === 'Account Details Updated Succesfull!' ?
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
                    </>
                    
                )
            }
        </div >
    );



}

export default AccountManagement;

