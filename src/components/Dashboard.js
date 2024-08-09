import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";

const Dashboard = () => {
  const auth = useAuth();
  
  return (
    // <div className="container">
    //   <div className="logoutstyle">
    //     <button onClick={() => auth.logOut()} className="btn btn-primary">
    //       logout
    //     </button>
    //   </div>
    //   <div>
    //     <h1>Welcome! {auth.user?.username}</h1>
    //   </div>
    // </div>
    <div>
                <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
          
            <a class="navbar-brand" href="#">Users Bank</a>
            
            
            <ul class="navbar-nav">
              <li class="nav-item">
                {/* <a class="nav-link" href="#">Link 1</a> */}
                <i class="fa fa-home" data-toggle="tooltip" title="Account Summary"></i>
              </li>
              <li class="nav-item">
                {/* <a class="nav-link" href="#">Link 2</a> */}
                <i class="fas fa-landmark" data-toggle="tooltip" title="Fund Transfer & Transactions"></i>
              </li>
              <li class="nav-item">
                {/* <a class="nav-link" href="#">Link 3</a> */}
                <i class="fas fa-book" data-toggle="tooltip" title="Users"></i>
              </li>
              <li class="nav-item">
              <i class='fas fa-user-alt usr-icon' data-toggle="tooltip" title="logout" onClick={() => auth.logOut()} ></i>
              </li>
             
            </ul>
          </nav>

          <div class="container-fluid">
            <h3>Brand / Logo</h3>
            <p>The .navbar-brand class is used to highlight the brand/logo/project name of your page.</p>
          </div>
    </div>
  );
};

export default Dashboard;