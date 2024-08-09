import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersByUsernamePassword } from "../services/userService";
import {Button,Modal} from 'react-bootstrap';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

    const [modalShow, setModalShow] = useState(false);
    const [message, setMessage] = useState("");

    const closeModal = () => {setModalShow(false);};
    const openModal = () => {setModalShow(true);};
  
  const loginAction = async (data) => {
    try {
      
      
      // const url="http://localhost:8000/users?email="+data.email+"&&password="+data.password;
      // axios.get(url)
      getUsersByUsernamePassword(data).then(res=>{
         if (res.status===200 && res.data.length > 0) {
          let isUserExist=false;
          res.data.map(user=>{
              if(user.email==data.email && user.password==data.password){
                setUser(user);
                setToken(user.token);
                localStorage.setItem("user", user);
                localStorage.setItem("site", user.token);
                isUserExist=true;
                navigate("/dashboard");
                return;
              }
          });
          if(!isUserExist){
            setMessage("Invalid username/password");
            openModal();
          }
        }else{
          setMessage("Invalid username/password");
          openModal();
        }
        
    })
    .catch((error) => console.log('Error fetching user:', error));
      
    } catch (err) {
      console.error(err);
    }
  };


  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <>
      <AuthContext.Provider value={{ token, user, loginAction, logOut,setUser }}>
      {children}
    </AuthContext.Provider>
    <>
    <Modal show={modalShow} onHide={closeModal}>
        <Modal.Header>
            <Modal.Title class="text-info">Invalid Input</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p class="text-danger">{message}</p>
        </Modal.Body>

        <Modal.Footer>
            <Button class="btn btn-primary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
    </Modal>
  </>
    </>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};