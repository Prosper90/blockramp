import React, {useState, useEffect} from 'react';

const Banksmodal = props => {

    const [searchedbank, setSearchedBank] = useState([]);
    const [tokenBank, setTokenBank] = useState();


    const setSelectBank = async (value) => {
      //call backend server
      console.log(value);
            props.setBankAccount(value.branch_name);
            return ;

    }




    const searchToken = (e) => {
        console.log('in here', e.target.value.length);
        //const token = new RegExp(e.target.value, "i");

        setTokenBank(e.target.value.toUpperCase());

        console.log(tokenBank);

        const gottenItems = props.banklist.filter(element => element.name.includes(token));
        
        console.log(gottenItems);

        setSearchedBank(gottenItems);
    }



      


    useEffect(() => {

    }, [searchedbank])



  return (

    <div className='modaltwo' >

        <div className="modal-content" onClick={ e => e.stopPropagation() } >

            <div className="modal-body">
            <div class="modal-header">
                <h6 className="modal-title m-2 mt-2">Select Bank</h6>
                <button type="button" className="btn-close" style={{ marginRight: '7px' }} data-bs-dismiss="modal" aria-label="Close" onClick={ () => props.setModalBank(false)}></button>
            </div>
               <input className="inputField inputmodaltwo" placeholder='Search Token' value={props.banklist[0].branch_name} onChange={ (e) => searchToken(e) } />

             <div className="listContainer modal-body">

                { searchedbank.length == 0 ?
                 <>
                    { props.banklist.map((data, index) => (
                                            
                        <div className='d-flex align-items-center' onClick={() => setSelectBank(data)} key={index}>
                            <span class="token_list_text" style={{fontSize: '16px' }}>{data.branch_name}</span>
                        </div>
                    ))

                    }
                  </>

                 :

                 <>
                    { searchedbank.map((data, index) => (
                                            
                        <div className='d-flex align-items-center' onClick={() => setSelectBank(data)} key={index}>
                            <span class="token_list_text" style={{ fontSize: '16px' }}>{data.branch_name}</span>
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


export default Banksmodal;
