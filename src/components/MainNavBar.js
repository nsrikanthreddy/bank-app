import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const MainNavBar = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const routeToDashBoard = () => {
        navigate("/dashboard");
    }
    
    const routeToUserManagement = () => {
        navigate("/usermanagement");
    }

    const routeToAccountManagement = () => {
        navigate("/accountmanagement");
    }

    const routeToFundTransfer = () => {
        navigate("/fundtransfer");
    }

    const routeToUserDashBoard = () => {
        navigate("/userdashboard");
    }


    return (

        <>
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">

                <a class="navbar-brand" href="#">Users Bank</a>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <i class="fa fa-landmark" data-toggle="tooltip" title="Account Summary" onClick={routeToDashBoard}></i>
                    </li>
                    <li class="nav-item">
                        <i class="fas fa-money-check-alt" data-toggle="tooltip" title="Fund Transfer & Transactions" onClick={routeToFundTransfer}></i>
                    </li>
                    {auth.user.role === "admin" ?
                        <>
                            <li class="nav-item">
                                <i class="fas fa-users" data-toggle="tooltip" title="Manage Users" onClick={routeToUserManagement}></i>
                            </li>
                            <li class="nav-item">
                                <i class="fas fa-cogs" data-toggle="tooltip" title="Manage Accounts" onClick={routeToAccountManagement}></i>
                            </li>
                        </>
                        : <li class="nav-item">
                            <i class="fas fa-cog" data-toggle="tooltip" title="User DashBoard" onClick={routeToUserDashBoard}></i>
                          </li>
                    }
                    <li class="nav-item">
                        <i class='fas fa-user-alt usr-icon' data-toggle="tooltip" title="logout" onClick={() => auth.logOut()} ></i>
                    </li>

                </ul>
            </nav>
        </>
    );
};

export default MainNavBar;