import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import {Button,Modal} from 'react-bootstrap';

const LoginForm = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

    const [modalShow, setModalShow] = useState(false);
    const [message, setMessage] = useState("");

    const closeModal = () => {setModalShow(false);};
    const openModal = () => {setModalShow(true);};

  const [errors,setErrors] =useState([]);

  const navigate = useNavigate();

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();

    if (input.email !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    setMessage("Email and Password are required");
    openModal();
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
      <div>
        <form className="LoginForm" onSubmit={handleSubmitEvent}>
            <label className="form-label"><h3>Login Form</h3></label><br/>
            <label className="form-label">Email </label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>
                <input
                className="form-control"
                name="email"
                type="email"
                value={input.email}
                placeholder='Enter Email'
                onChange={handleInput}
                />
            </label>&nbsp;&nbsp;
            <label>{errors.email && <p className="text-danger">{errors.email}</p>}</label>
            <br/>
            <br/>
            <label className="form-label">Password </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>
                <input
                className="form-control"
                name="password"
                type="password"
                value={input.password}
                placeholder='Enter Password'
                onChange={handleInput}
                />
            </label>&nbsp;&nbsp;
            <label>{errors.password && <p className="text-danger">{errors.password}</p>}</label>
            <br/>
            <br/>
            <input type='submit' value='Login' className="btn btn-primary"/>&nbsp;&nbsp; <a className="btn btn-primary" href="Register">Register</a>
        </form>
        <>
            <Modal show={modalShow} onHide={closeModal}>
            
                <Modal.Body>
                    <p class="text-danger">{message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button class="btn btn-primary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
          </>
      </div>
  );
};

export default LoginForm;