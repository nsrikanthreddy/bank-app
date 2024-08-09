import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllUsers } from "../../services/userService";
import { getAllAccounts } from "../../services/accountService";
import {Button,Modal} from 'react-bootstrap';

function RegistrationForm() {

    const [userDetail, setUserDetail] = useState({
        id: 0,
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        token: "poiuytrewq",
        role: "customer",
        status: "active"
    });

    const [accountDetail, setAccountDetail] = useState({
        id: 0,
        userId: 0,
        balance: 5000.00,
        branch: "Hyderabad",
        accountType: "Saving",
        transactions: [
            {
                id: 1, accountNo: 1, txnType: "credit",
                amount: 5000.00, txnDate: new Date().toLocaleString()
            }
        ]
    });
    useEffect(() => {
        const fetchMaxUserIdAndAccntId = async () => {

            getAllUsers().then(res => {
                if (res.status === 200 && res.data.length >= 0) {
                    setUserDetail({
                        ...userDetail,
                        id: res.data.length + 1,
                    })
                }
            }).catch((error) => console.log('Error fetching users count:', error));

            getAllAccounts().then(res => {
                if (res.status === 200 && res.data.length >= 0) {
                    setAccountDetail({
                        ...accountDetail,
                        id: res.data.length + 1,
                        userId: userDetail.id
                    })
                }

            }).catch((error) => console.log('Error fetching account:', error));
        }
        fetchMaxUserIdAndAccntId();
    }, []);

    const [modalShow, setModalShow] = useState(false);
    const [message, setMessage] = useState("");

    const closeModal = () => { setModalShow(false); };
    const openModal = () => { setModalShow(true); };

    const [errors, setErrors] = useState([]);
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserDetail((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = {};

        if (!userDetail.fullName)
            validationErrors.fullName = 'Full Name is Required';

        if (!userDetail.email) {
            validationErrors.email = 'Email is Required';
        } else if (!emailPattern.test(userDetail.email)) {
            validationErrors.email = 'Enter a valid email';
        }

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

            console.log('In Registration form', userDetail);
            console.log('User Id', userDetail.id);
            console.log('In Registration form', accountDetail);



            if (userDetail.id === 0 || accountDetail.id === 0) {
                console.log("userid or account id is 0 for new user/account")
                setMessage("Something went wrong, Please try after sometime.");
                openModal();
                return;
            }

            // alert(JSON.stringify(userDetail));
            // alert(JSON.stringify(accountDetail));
           
                axios.post('http://localhost:8000/users', userDetail)
                    .then(res => {

                        if (res.status === 201) {
                            createAccount();
                            setMessage('Registartion Succesfull!');
                            openModal();
                            navigate("/login");
                        } else {
                            setMessage("Something Went Wrong!, Try Again after some time");
                            openModal();
                        }

                    })
                    .catch((error) => console.log('Error registering user:', error))
                

        }

    }

    const createAccount = () => {
        axios.post('http://localhost:8000/accounts', accountDetail)
            .then(res => {
                if (res.status === 201) {
                    console.log(accountDetail.id, 'Account creatation succesfull!')
                }
            })
            .catch((error) => console.log('Error while creating account:', error));

    }


    return (
        <>
            <div class="container registration-form">
                <label className="form-label"><h3>Registration Form</h3></label>
                <br />
                <form onSubmit={handleSubmit} >
                    <div class="row">
                        <div class="form-group col-6">
                            <label for="fullName">Full Name</label>
                            <input type="text" class="form-control" name="fullName"
                                value={userDetail.fullName} placeholder='Enter Full Name'
                                onChange={handleInput} />
                            &nbsp;&nbsp;
                            <label>{errors.fullName && <p className="text-danger">{errors.fullName}</p>}</label>
                        </div>
                        <div class="form-group col-6">
                            <label for="email">Email:</label>
                            <input type="text" class="form-control" placeholder='Enter Email' name="email"
                                value={userDetail.email} onChange={handleInput} />
                            &nbsp;&nbsp;
                            <label>{errors.email && <p className="text-danger">{errors.email}</p>}</label>

                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-6">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" name="password"
                                value={userDetail.password} placeholder='Enter Password'
                                onChange={handleInput} />
                            &nbsp;&nbsp;
                            <label>{errors.password && <p className="text-danger">{errors.password}</p>}</label>

                        </div>
                        <div class="form-group col-6">
                            <label for="phoneNumber">PhoneNumber:</label>
                            <input type="number" class="form-control" name="phoneNumber"
                                value={userDetail.phoneNumber} placeholder='Enter PhoneNumber'
                                onChange={handleInput} />
                            &nbsp;&nbsp;
                            <label>{errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}</label>

                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-6">
                            <label for="address">Address:</label>
                            <input type="text" class="form-control" name="address"
                                value={userDetail.address} placeholder='Enter Address'
                                onChange={handleInput} />
                            &nbsp;&nbsp;
                            <label>{errors.address && <p className="text-danger">{errors.address}</p>}</label>

                        </div>

                    </div>
                    <input type='submit' value='Register' className="btn btn-primary" />
                </form>
                <>
            <Modal show={modalShow} onHide={closeModal}>
                

                <Modal.Body>
                    {
                        message === 'Registartion Succesfull!' ? 
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

export default RegistrationForm;