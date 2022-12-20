import React from 'react';
import { BiArrowBack } from 'react-icons/bi';


export default function Bankselect(props) {


  const goback = () => {
    props.setFormbankselect(false);
  }



  const transfertype = (e) => {
    props.setProceednext(true);
  }


  return (
    <div>
        <div className="" style={{ padding: '5px' }}>
          <BiArrowBack onClick={goback} />
      </div>
    
    <div className='d-flex flex-column gy-3 justify-content-start pl-5' style={{paddingLeft: '10px'}}>
       <label className="form-group mb-4 d-flex">
            <input 
              type="radio" 
              className="input-control mr-3" 
              placeholder="Email" 
              aria-label="Input" 
              name='banktype'
              value="Bank"
              style={{marginRight: '9px'}}
              onChange={(e) => transfertype(e)}
            />
            <div className="">Bank</div>
        </label>
        
        <label className="form-group mb-4 d-flex">
            <input 
              type="radio" 
              className="input-control mr-3" 
              placeholder="banktypetwo" 
              aria-label="Input" 
              name='customerEmail'
              value="Bank" 
              style={{marginRight: '9px'}}
              disabled="disabled"
            />
              <div className="">Mobile money</div>
        </label>


        <label className="form-group mb-4 d-flex">
            <input 
              type="radio" 
              className="input-control mr-3" 
              placeholder="banktypethree" 
              aria-label="Input" 
              name='customerEmail'
              value="Barter"
              style={{marginRight: '9px'}}
              disabled="disabled"
            />
              <div className="">Barter</div>
        </label>

      </div>


    </div>
  )
}
