import React, {useState, useEffect} from 'react';

const Tokensmodal = props => {

    const [searched, setSearched] = useState([]);


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




    const searchToken = (e) => {
        console.log('in here', e.target.value);
        const token = e.target.value;
        const gottenItems = props.tokens.filter(element => element.symbol.includes(token));
        
        console.log(gottenItems);

        setSearched(gottenItems);
    }


    useEffect(() => {

    }, [searched])



  return (

    <div className='modaltwo' >

        <div className="modal-content" onClick={ e => e.stopPropagation() } >

            <div className="modal-body">
            <div class="modal-header">
                <h6 className="modal-title m-2 mt-2">Select Token</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
            </div>
               <input className="inputField inputmodaltwo" placeholder='Search Token' onChange={ (e) => searchToken(e) } />

             <div className="listContainer modal-body">

                { searched.length == 0 ?
                 <>
                    { props.tokens.map((data, index) => (
                                            
                        <div className='d-flex' onClick={() => setSelect(data)} key={index}>
                            <img class="token_list_img" src={data.logoURI} />
                            <span class="token_list_text" style={{fontSize: '13px' }}>{data.symbol}</span>
                        </div>
                    ))

                    }
                  </>

                 :

                 <>
                    { searched.map((data, index) => (
                                            
                        <div className='d-flex' onClick={() => setSelect(data)} key={index}>
                            <img class="token_list_img" src={data.logoURI} />
                            <span class="token_list_text" style={{fontSize: '13px' }}>{data.symbol}</span>
                        </div>
                      ))

                    }
                 </>

                  
                }

                

             </div>




            </div>
      
        </div>

    </div>
  )
}


export default Tokensmodal;
