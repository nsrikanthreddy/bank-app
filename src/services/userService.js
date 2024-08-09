import React from "react";
import axios from "axios";

export const getUsersByUsernamePassword=(data)=>{

    const url="http://localhost:8000/users?status=active&&email="+data.email+"&&password="+data.password;
      
    return axios.get(url);
}

export const getAllUsers=()=>{

    const url="http://localhost:8000/users";
    return axios.get(url);
}