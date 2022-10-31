import React from 'react';

const Tokensmodal = props => {


    const setSelect = (value) => {
        if(props.check == 1) {
            props.setSelectedone(value);
            props.getBalance(value, props.check);
            props.off(false);
            return ;
        } else {
           props.setSelectedtwo(value);
           props.getBalance(value, props.check);
           props.off(false);
           return ;
        } 
    }

  return (

    <div className='modaltwo' >

        <div className="modal-content" onClick={ e => e.stopPropagation() } >

            <div className="modal-body">
               <h6 className="modal-title">Select Token</h6>

             <div className="listContainer modal-body">

                    { props.tokens.map((data, index) => (
                        
                        <div className='d-flex' onClick={() => setSelect(data)} key={index}>
                            <img class="token_list_img" src={data.logoURI} />
                            <span class="token_list_text" style={{fontSize: '13px' }}>{data.symbol}</span>
                        </div>
                    ))
               
                 }

             </div>




            </div>
      
        </div>

    </div>
  )
}


export default Tokensmodal;
