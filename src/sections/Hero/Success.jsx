import React, {useState, useEffect} from 'react';
import success from './assets/success.png';

export default function Success() {
  return (
    <div className='w-100 d-flex flex-column gy-5' style={{height: '552.625px'}}>
      <div className="" style={{ padding: '17px' }}>
          <button type="button" className="btn-close" style={{ marginRight: '7px' }} data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div className="w-100 d-flex justicy-content-center align-items-center" style={{ height: '100%', justifyContent: 'center'}}>
        <img src={success} alt="check" style={{width: '38%', height: 'auto'}} />
      </div>

    </div>
  )
}
