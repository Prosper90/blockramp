import React, {useEffect} from 'react';
import { BiArrowBack } from 'react-icons/bi';


  export default function Accountdetails(props) {


  const goback = () => {
    props.setFormbankdetails(false);
    //props.setChooseMethod(false);
    //navigate(`/`);
  }  


  const confirmAccount = async (e) => {
    //main https://blok-ramp.herokuapp.com/confirmaccount 
    //test http://localhost:8000/confirmaccount
    //console.log(e.target.value.length);
    
   if(e.target.value.length === 10) {

        const getpaymentlink = await fetch(`https://blok-ramp.herokuapp.com/getbanks/confirmaccount`, 
        {
            method: 'POST',   
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bank: props.bankAccount, accnumber: e.target.value})
        }
        );
        const url = await getpaymentlink.json();
        console.log(url);

        if(url === 'status') {
          props.setConfirmAccount(true);
        } else{
          console.log("this guy called")
          props.setNotiy("This account number is not correct")
        }

   }
    
   }


   useEffect(() => {
    console.log(props.bankAccount);
  }, [props.bankAccount])


  return (
    <div>
        <div className="" style={{ padding: '5px', cursor: 'pointer' }}>
          <BiArrowBack onClick={goback} />
      </div>

       <div className="form-group currency-form mb-4">
       <label style={{height: '68px', width: '100%'}} >
       <select 
          onChange={(e) => props.setBankAccount(e.target.value)}
          style={{width: '100%', height: '30px', border: 'none', fontSize: '17px', color: 'rgb(133,133,133'}}
          >
         {
          props.banklist.map((data, index) => (
            <option value={data.code}  key={index} >{data.name}</option>
          ))
         }
       </select>
     </label>
    </div>
        
        <div className="form-group currency-form mb-4">
            <input 
                type="number" 
                className="input-control" 
                placeholder="account number"
                aria-label="Input" 
                name='customerAddress' 
                defaultValue={props.accountNumber}
                style={{fontSize: '17px'}}
                onChange={(e) => confirmAccount(e)}/>
        </div>
    </div>
  )
}
