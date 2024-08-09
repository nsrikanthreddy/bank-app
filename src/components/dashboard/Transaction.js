import React from "react";
 
function Transaction({txn}) {
    
  return (
    <>
      
              <tr key={txn.id}>
                <td>{txn.id}</td>
                {txn.txnType==='credit' ? <td className="crTypeTxnFont">{txn.txnType}</td> : <td className="drTypeTxnFont">{txn.txnType}</td> }
                
                <td>{txn.amount}</td>
                <td>{txn.txnDate}</td>
              </tr>
            
        
       
    </>
  );
}
export default Transaction;
 