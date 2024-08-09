import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginForm from './components/auth/LoginForm';
import RegistrationForm from './components/auth/RegistrationForm';
import Dashboard from './components/Dashboard';
import AuthProvider from './contexts/AuthProvider';
import PrivateRoute from './components/routes/PrivateRoute';
import AccountOverview from './components/dashboard/AccountOverview';
import FundTransfer from './components/transfer/FundTransfer';
import AdminDashBoard from './components/admin/AdminDashBoard';
import AccountManagement from './components/admin/AccountManagement';
import UserDashBoard from './components/admin/UserDashBoard';


function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<AccountOverview />} />
              <Route path="/fundtransfer" element={<FundTransfer />} />
              <Route path="/usermanagement" element={<AdminDashBoard />} />
              <Route path="/accountmanagement" element={<AccountManagement />} />
              <Route path="/userdashboard" element={<UserDashBoard />} />
            </Route>
            
          </Routes>
        </AuthProvider>
      </Router> 

    </div>
  );
}

export default App;
