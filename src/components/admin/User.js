import React from "react";
 
function User({usr}) {

    const handleUserDetailsClick = (usr) => {
        
    }
    
    return (
        
                  

                        <tr key={usr.id}>
                            <td><a href="#" >{usr.id}</a></td>
                            <td>{usr.fullName}</td>
                            <td>{usr.email}</td>
                            <td>{usr.role}</td>
                            <td>{usr.status}</td>
                        </tr>

                  
             
    )
}
export default User;
 