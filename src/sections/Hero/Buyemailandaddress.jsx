import React from 'react';
import { BiArrowBack } from 'react-icons/bi';


export default function Buyemailandaddress(props) {


  const goback = () => {
    props.setFormTwo(false)
    navigate(`/`);
  }


  return (
    <div>
        <div className="" style={{ padding: '5px' }}>
          <BiArrowBack onClick={goback} />
      </div>
       <div className="form-group currency-form mb-4">
            <input 
            type="Email" 
            class="input-control" 
            placeholder="Email" 
            aria-label="Input" 
            name='customerEmail'
            defaultValue={props.email} 
            onChange={(e) => props.setEmail(e.target.value) } />
        </div>
        
        <div className="form-group currency-form mb-4">
            <input 
                type="text" 
                class="input-control" 
                placeholder={`${props.selectedCrypto.label} address`} 
                aria-label="Input" 
                name='customerAddress' 
                defaultValue={props.address}
                onChange={(e) => props.checkaddress(e)}/>
        </div>
    </div>
  )
}
