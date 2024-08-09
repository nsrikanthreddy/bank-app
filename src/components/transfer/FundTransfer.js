import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import MainNavBar from "../MainNavBar";
import { getAccountByUserId, getAllAccounts } from "../../services/accountService";
import axios from "axios";
import {Button,Modal} from 'react-bootstrap';

const FundTransfer = () => {

    const { user } = useAuth();
    const [account, setAcount] = useState(null);
    const [accounts, setAcounts] = useState([]);

    const [modalShow, setModalShow] = useState(false);
    const [message, setMessage] = useState("");

    const closeModal = () => {setModalShow(false);};
    const openModal = () => {setModalShow(true);};


    const [txionInfo, setTxionInfo] = useState({
        accountNumber: '',
        confirmAccountNo: '',
        amount: ''
    });
    useEffect(() => {
        const fetchData = async () => {
            getAccountByUserId(user.id).then(res => {
                if (res.status === 200 && res.data.length > 0) {
                    setAcount(res.data[0]);

                } else {
                    alert("No Account Found for this user");
                }

            })
                .catch((error) => console.log('Error fetching user:', error));
        };

        const fetchAllAccounts = async () => {
            getAllAccounts().then(res => {
                if (res.status === 200 && res.data.length > 0) {
                    setAcounts(res.data);

                } else {
                    alert("No Account Found for this user");
                }

            })
                .catch((error) => console.log('Error fetching user:', error));
        }

        fetchData();
        fetchAllAccounts();
    }, []);




    const handleInput = (e) => {
        const { name, value } = e.target;
        setTxionInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleFundTransferSubmitEvent = (e) => {

        e.preventDefault();
        if (txionInfo.accountNumber == "" || txionInfo.accountNumber == "0") {
            setMessage("Please enter a valid Account Number");
            openModal();
            return;
        }

        if (txionInfo.confirmAccountNo == "" || txionInfo.confirmAccountNo == "0") {
            setMessage("Please enter a valid Confirm Account Number");
            openModal();
            return;
        }

        if (txionInfo.accountNumber !== txionInfo.confirmAccountNo) {
            setMessage("Account Number and Confirm Account Number did not matched");
            openModal();
            return;
        }

        if (txionInfo.amount == "" || txionInfo.amount == "0" || txionInfo.amount <= 0) {
            setMessage("Please enter a valid Amount");
            openModal();
            return;
        }
        if (txionInfo.accountNumber === account.id) {
            setMessage("Self transfer not possible");
            openModal();
            return;
        }

        if (parseFloat(txionInfo.amount) > parseFloat(account.balance)) {
            setMessage("Insufficient fund!");
            openModal();
            return;
        }

        let isAccountExists = false;
        let toAccount;
        accounts.map(acnt => {
            if (acnt.id === txionInfo.accountNumber) {
                isAccountExists = true;
                toAccount = acnt;
            }
        });
        if (isAccountExists === false) {
            setMessage("No Account found for the entered account number");
            openModal();
            return;
        }
        // alert("Amount transferred succssfully!");
        let fromAccount = account
        fromAccount.balance = parseFloat(fromAccount.balance) - parseFloat(txionInfo.amount);
        toAccount.balance = parseFloat(toAccount.balance) + parseFloat(txionInfo.amount);

        fromAccount.transactions.push({ "id": fromAccount.transactions.length + 1, "accountNo": fromAccount.id, "txnType": "debit", "amount": txionInfo.amount, "txnDate": new Date().toLocaleString() });
        toAccount.transactions.push({ "id": toAccount.transactions.length + 1, "accountNo": fromAccount.id, "txnType": "credit", "amount": txionInfo.amount, "txnDate": new Date().toLocaleString() })


        transferAmount(fromAccount, toAccount, txionInfo.amount);

    }

    const transferAmount = (fromAccount, toAccount, amount) => {

        console.log("fromAccount", JSON.stringify(fromAccount));
        console.log("toAccount", JSON.stringify(toAccount));

        const url = "http://localhost:8000/accounts/";

        axios.put(url + fromAccount.id, JSON.stringify(fromAccount)).then(res => {
            //alert(JSON.stringify(res))
            if (res.status === 200) {
                //alert("Amount transferred succssfully!");
                console.log("Amount debited in account", fromAccount.id);
            }

        })
            .catch((error) => console.log('Error while amount transfer:', error));

        axios.put(url + toAccount.id, JSON.stringify(toAccount)).then(res => {
            //alert(JSON.stringify(res))
            if (res.status === 200) {
                //alert("Amount transferred succssfully!");
                console.log("Amount credited in account", toAccount.id);
            }

        })
            .catch((error) => console.log('Error while amount transfer:', error));

        setMessage("Amount transferred succssfully!");
        openModal();

        setTxionInfo({
            accountNumber: '',
            confirmAccountNo: '',
            amount: ''
        })
    }
    

    return (
        <div>

            <MainNavBar />
            <h5 className="loginMessage">Login as {user.fullName}</h5>
            <br />
            <br />
            {
                account != null ?
                    <><h5 className="accountSummary"><u>Account Summary</u></h5>
                        <br />
                        <div class="container">
                            <div class="row">
                                <label class="form-label col-3"><b>Account Number :</b> {account.id}</label>
                                <label class="form-label col-3"><b>Available Balance:</b> {parseFloat(account.balance).toLocaleString("en-IN", {
                                    style: "currency", currency: "INR",
                                })}
                                </label>
                                <label class="form-label col-3"><b>Account Type :</b> {account.accountType}</label>
                                <label class="form-label col-3"><b>Branch :</b> {account.branch}</label>
                            </div></div></> : ""
            }

            <h6 className="accountSummary">Fund Transfer</h6>
            <form onSubmit={handleFundTransferSubmitEvent}>
                <div class="form-group">
                    <label for="accountNumber">Account Number:</label>
                    <input type="text" class="form-control" id="accountNumber" placeholder="Enter Account Number"
                        name="accountNumber" value={txionInfo.accountNumber} onChange={handleInput} />
                </div>
                <div class="form-group">
                    <label for="confirmAccountNo">Confirm Account Number:</label>
                    <input type="password" class="form-control" id="confirmAccountNo" placeholder="Enter Confirm Account Number"
                        name="confirmAccountNo" value={txionInfo.confirmAccountNo} onChange={handleInput} />
                </div>
                <div class="form-group">
                    <label for="amount">Amount:</label>
                    <input type="number" class="form-control" id="amount" placeholder="Enter Amount"
                        name="amount" value={txionInfo.amount} onChange={handleInput} />
                </div>

                <button type="submit" class="btn btn-success">Transfer</button>
            </form>

            <>
            <Modal show={modalShow} onHide={closeModal}>
               

                <Modal.Body>
                    {
                        message === "Amount transferred succssfully!" ? 
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
    )

}

export default FundTransfer;

