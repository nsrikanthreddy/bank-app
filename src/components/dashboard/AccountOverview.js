import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import MainNavBar from "../MainNavBar";
import { getAccountByUserId, getTransactionsByAccountId } from "../../services/accountService";
import Transaction from "./Transaction";

const AccountOverview = () => {
    const { user } = useAuth();
    const [account, setAcount] = useState(null);

    useEffect(() => {
        const fetchAccountByUserId = () => {
            getAccountByUserId(user.id).then(res => {
                if (res.status === 200 && res.data.length > 0) {
                    setAcount(res.data[0]);
                } else {
                    console.log("No Account Found for this user");
                }


            }).catch((error) => console.log('Error fetching user:', error));
        }
        fetchAccountByUserId();
    }, []);

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

            <h6 className="accountSummary">Transaction Summary</h6>
            <table border="1" class="table table-striped">
                <thead>
                    <tr>
                        <th>Transaction Id</th>
                        <th>Transaction Type</th>
                        <th>Transaction Amount</th>
                        <th>Transaction Date</th>
                    </tr>
                </thead>
                <tbody>
                    {account != null ? account.transactions.map((txn) => (


                        <Transaction txn={txn} />

                    )) : ""}
                </tbody>
            </table>

        </div>
    )

}

export default AccountOverview;

