
import axios from "axios";

export const getAccountByUserId=(userId)=>{

    const url="http://localhost:8000/accounts?userId="+userId;
      
    return axios.get(url);
}

export const getTransactionsByAccountId=(accountId)=>{

    const url="http://localhost:8000/transactions?accountNo="+accountId;
      
    return axios.get(url);
}

export const getAllAccounts=()=>{

    const url="http://localhost:8000/accounts";
    return axios.get(url);
}

export const getAccountByAccountId=(accountId)=>{

    const url="http://localhost:8000/accounts/"+accountId;
      
    return axios.get(url);
}