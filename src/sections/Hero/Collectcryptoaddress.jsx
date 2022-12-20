import React from 'react';
import { BiArrowBack } from 'react-icons/bi';


export default function Collectcryptoaddress(props) {


  const goback = () => {
    //props.setFormTwo(false);
    //props.setChooseMethod(false);
    props.setcollectaddress(false);
    //navigate(`/`);
  }



  const senderaddress = (e) => {
    props.setCryptoAddress(e.value.target);
  }


  return (
    <div>
        <div className="" style={{ padding: '5px' }}>
          <BiArrowBack onClick={goback} />
      </div>
    
    <div className='d-flex flex-column gy-3 justify-content-start pl-5' style={{paddingLeft: '10px'}}>
       <label className="form-group mb-4 d-flex">
            <input 
              type="text" 
              className="input-control mr-3" 
              placeholder={`${props.selectedCrypto.value} address`} 
              aria-label="Input" 
              name='customerEmail'
              value="Bank"
              style={{marginRight: '9px'}}
              onChange={(e) => senderaddress(e)}
            />
            <div className="">Bank</div>
        </label>
        

      </div>


    </div>
  )
}
