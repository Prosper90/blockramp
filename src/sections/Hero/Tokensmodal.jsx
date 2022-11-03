import React, {useState, useEffect} from 'react';

const Tokensmodal = props => {

    const [searched, setSearched] = useState([]);
    const [token, setToken] = useState();


    const setSelect = async (value) => {
        let response = await fetch(`https://api.coingecko.com/api/v3/coins/${value.id}`);
        const selectedvalue = await response.json();

        if(props.check == 1) {
            props.setSelectedone(selectedvalue);
            props.getBalance(selectedvalue, props.check);
            props.off(false);
            return ;
        } else {
           props.setSelectedtwo(selectedvalue);
           props.getBalance(selectedvalue, props.check);
           props.off(false);
           return ;
        } 
    }




    const searchToken = (e) => {
        console.log('in here', e.target.value.length);
        //const token = new RegExp(e.target.value, "i");

        setToken( e.target.value.length == 1 ? e.target.value.toUpperCase() : e.target.value );

        console.log(token);

        const gottenItems = props.tokens.filter(element => element.name.includes(token));
        
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
                <button type="button" className="btn-close" style={{ marginRight: '7px' }} data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
            </div>
               <input className="inputField inputmodaltwo" placeholder='Search Token' value={token} onChange={ (e) => searchToken(e) } />

             <div className="listContainer modal-body">

                { searched.length == 0 ?
                 <>
                    { props.tokens.map((data, index) => (
                                            
                        <div className='d-flex align-items-center' onClick={() => setSelect(data)} key={index}>
                            <img class="token_list_img" style={{ marginRight: '7px' }} src={data.image.thumb} />
                            <span class="token_list_text" style={{fontSize: '16px' }}>{data.name}</span>
                            - 
                            <span style={{ marginTop: '1px' }} >{data.symbol.toUpperCase()}</span>
                        </div>
                    ))

                    }
                  </>

                 :

                 <>
                    { searched.map((data, index) => (
                                            
                        <div className='d-flex align-items-center' onClick={() => setSelect(data)} key={index}>
                            <img class="token_list_img" style={{ marginRight: '7px' }} src={data.image.thumb} />
                            <span class="token_list_text" style={{ fontSize: '16px' }}>{data.name}</span>
                            - 
                            <span style={{ marginTop: '1px' }} >{data.symbol.toUpperCase()}</span>
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
