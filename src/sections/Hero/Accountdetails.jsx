import React, {useEffect} from 'react';
import { BiArrowBack } from 'react-icons/bi';


export default function Accountdetails(props) {


  const goback = () => {
    props.setFormbankdetails(false);
    //props.setChooseMethod(false);
    //navigate(`/`);
  }    


   useEffect(() => {
    if(props.bankAccount !== "" && props.accountNumber !== "") {
      props.setProceednext(true);
    }
  }, [props.bankAccount, props.accountNumber])


  return (
    <div>
        <div className="" style={{ padding: '5px', cursor: 'pointer' }}>
          <BiArrowBack onClick={goback} />
      </div>
       <div className="form-group currency-form mb-4">
            <input 
            type="Email" 
            class="input-control" 
            placeholder="Bank account" 
            aria-label="Input" 
            name='customerEmail'
            defaultValue={props.bankAccount} 
            onChange={(e) => props.setBankAccount(e.target.value) } />
        </div>
        
        <div className="form-group currency-form mb-4">
            <input 
                type="text" 
                class="input-control" 
                placeholder="account number"
                aria-label="Input" 
                name='customerAddress' 
                defaultValue={props.accountNumber}
                onChange={(e) => props.setAccountNumber(e)}/>
        </div>
    </div>
  )
}
