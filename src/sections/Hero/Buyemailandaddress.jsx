import React from 'react';

export default function Buyemailandaddress(props) {
  return (
    <div>
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
