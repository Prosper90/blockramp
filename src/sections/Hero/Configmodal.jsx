import React from 'react';

const Configmodal = props => {

  return (

    <div className='modaly' onClick={props.onClose} >

        <div className="modal-content" onClick={ e => e.stopPropagation() } >

            <div className="modal-body">
               <h6 className="titleHeader">Transaction Settings</h6>


                <div className="row">
                  <label className="labelField">Slippage Tolerance</label>
                </div>

                <div className="row">
                    <div className="col-md-9 fieldContainer">
                        <input 
                           type="text"
                           placeholder='1.0%' 
                           value={props.slippageAmount} 
                           className="inputField inputmodal"
                           onChange={ e => e.props.setSlippageAmount(e.target.value) } 
                           />
                    </div>

                    <div className="col-md-3 inputFieldUnitsContainer pl-2"><span>%</span></div>
                </div>




                <div className="row mt-2">
                   <label className="labelField">Transaction Deadline</label>
                </div>

                <div className="row">
                    <div className="col-md-7 fieldContainer">
                            <input 
                            type="text" 
                            placeholder='10' 
                            value={props.deadlineMinutes} 
                            className="inputField inputmodal pl-2"
                            onChange={ e => e.props.setDeadlineMinutes(e.target.value) } 
                            />
                        </div>

                        <div className="col-md-5 inputFieldUnitsContainer pt-1"><span>minutes</span></div>
                </div>



            </div>
      
        </div>

    </div>
  )
}


export default Configmodal;
