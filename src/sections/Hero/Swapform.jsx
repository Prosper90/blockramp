import React, { useState, useEffect }  from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import appStore from './assets/app-store.svg';
import playStore from './assets/play-store.svg';
import Xicon from '../FeesPricing/assets/xicon.png';
import AccpetPayments from './assets/accept.svg';
import { motion } from 'framer-motion';
import { Tab, Tabs } from 'react-bootstrap';
import Select, { components } from 'react-select';
import currencyUSD from './assets/currency-usd.svg';
import currencyBTC from './assets/currency-btc.svg';
import arrow from './assets/arrow-down.svg';
import shape1 from './assets/hero-shape-1.svg';
import shape2 from './assets/hero-shape-2.svg';
import shape3 from './assets/arrow-shape.svg';
import shape4 from './assets/hero-user.svg';
import currencyETH from './assets/ethereum.svg';
import currencyBNB from './assets/binance.svg';
import currencyUSDT from './assets/tether.svg';
import { ethers, BigNumber } from 'ethers';
import { BsGearFill } from 'react-icons/bs';
import Configmodal from './Configmodal';
import Tokensmodal from './Tokensmodal';
import tokenabi from './abi.json';
import qs from 'qs';













export default function Swapform() {



        //variables
        const [provider, setProvider] = useState(undefined);
        const [signer, setSigner] = useState(undefined);
        const [signerAddress, setSignerAddress] = useState(undefined);
        //swap settings variables
        const [slippageAmount, setSlippageAmount] = useState(20);
        const [deadlineMinutes, setDeadlineMinutes] = useState(10);
        const [showModal, setShowModal] = useState(false);

        //token list
        const [openlistmodal, setOpenlistmodal] = useState(false)
        //slected
        const [selectedone, setSelectedone] = useState();
        const [selectedtwo, setSelectedtwo] = useState(undefined);

        //prefill input
        const [inputAmount, setInputAmount] = useState(undefined);
        const [outputAmount, setOutputAmount] = useState('0.0');

        //check selected
        const [checkselect, setCheckselect] = useState(undefined);

        //const [transaction, setTransaction] = useState(undefined);
        //const [oneContract, setOneContract] = useState(undefined);
        //const [twoContract, setTwoContract] = useState(undefined);

        //token lists
        const [tokenlist, setTokenlist] = useState([]);

        //balances
        const [inBalalnce, setinBalance] = useState(0);
        const [outBalance, setoutBalance] = useState(0);

        //loaders
        const [loader, setLoader] = useState(false);
        const [loadermsg, setLoadermsg] = useState();
        const [toggle, setToggle] = useState(false);

        //hold quote
        const [holdquote, setHoldquote] =useState();
        //chain
        const [chain, setChain] = useState(undefined);


        

      //Ether
      const eth = {
        address : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId : 1,
        decimals: 18,
        logoURI: currencyETH,
        name: "ethereum",
        symbol: "eth"
      }


        
        //function to get quote
        const getSellQuote = async (amounttosell) => {
          
          let decimalfrom = 18;
          let decimalto = 18;
  
         if(selectedone.contract_address) {
            console.log("Entered one contract");
            const signer = await provider.getSigner();
            const fromContract = new ethers.Contract(selectedone.contract_address, tokenabi, signer);
            decimalfrom = await fromContract.decimals();
            console.log(decimalfrom);
         }
  
         if(selectedtwo.contract_address) {
          console.log("Entered two contract");
          console.log(selectedtwo.contract_address)
          console.log(provider)
          const signer = await provider.getSigner();
          const toContract = await new ethers.Contract(selectedtwo.contract_address, tokenabi, signer);
          console.log(toContract)
          console.log("error here two")
          const name = await toContract.name();
          console.log(name);
          decimalto = await toContract.decimals();
          console.log(decimalto);
         }
  
         
  
          const amount = Number(parseInt(amounttosell) * 10 ** decimalfrom);
          //const amount = ethers.utils.parseEther(e.target.value);
        
          const params = {
              buyToken: selectedtwo.contract_address ? selectedtwo.contract_address : selectedtwo.symbol,
              sellToken: selectedone.contract_address ? selectedone.contract_address : selectedone.symbol,
              sellAmount: amount,
              takerAddress: signerAddress
          }
  
          const getquote = qs.stringify(params);
          console.log(getquote);
        
          // Fetch the swap price.
          const response = await fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);
  
          
          const swapQuoteJSON = await response.json();
          return swapQuoteJSON
        }

 
        //swap function
        const submit = async (e) => {

              if(!signerAddress) {
                setLoader(true);
                setLoadermsg('Connect Wallet');
      
                setTimeout(() => {
      
                  setLoadermsg('');
                  setLoader(false);
                  
                }, 2000);
      
                return ;
              };
              if(!signer) {

                setLoader(true);
                setLoadermsg('Connect Wallet');
      
                setTimeout(() => {
      
                  setLoadermsg('');
                  setLoader(false);
                  
                }, 2000);
      
                return ;
                
              };

              if(!selectedone) {
                setLoadermsg('Token to sell not selected');

                setTimeout(() => {
      
                  setLoadermsg('');
                  setLoader(false);
                  
                }, 2000);
              };
              if(!selectedtwo) {
                setLoadermsg('Token to buy not selected');

                setTimeout(() => {
      
                  setLoadermsg('');
                  setLoader(false);
                  
                }, 2000);
              };
              const amountquote = e.target.inputname.value;

              console.log("trying swap");
              // Only work if MetaMask is connect
              // Connecting to Ethereum: Metamask
              const providerethers = await new ethers.providers.Web3Provider(window.ethereum);
            
              // The address, if any, of the most recently used account that the caller is permitted to access
              //let accounts = await ethereum.request({ method: "eth_accounts" });
              let takerAddress = signerAddress;
              console.log("takerAddress: ", takerAddress);
            
              const swapQuoteJSON = await getSellQuote(amountquote);
            
              // Set Token Allowance
              // Set up approval amount
              const fromTokenAddress = selectedone.contract_address ? selectedone.contract_address : '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
              const maxApproval = new BigNumber(2).pow(256).minus(1);
              console.log("approval amount: ", maxApproval);
              const ERC20TokenContract = new ethers.Contract(fromTokenAddress, tokenabi, providerethers);
              console.log("setup ERC20TokenContract: ", ERC20TokenContract);
            
              // Grant the allowance target an allowance to spend our tokens.
              const tx = await ERC20TokenContract.approve( swapQuoteJSON.allowanceTarget, maxApproval);


              // Perform the swap
              const receipt = await signer.sendTransaction(swapQuoteJSON);
              console.log("receipt: ", receipt);

        }








    
    
        //connect wallet check is connected
        const isConnected = () => signer !== undefined;
    
        //getWallet address
        const getWalletAddress = async () => {
            signer.getAddress().
            then(address => {
              setSignerAddress(address);
            });
        }
    
    
        if (signer !== undefined) {
         getWalletAddress();
       }
    
    
    
        //getSigner
        const getSigner = async ( provider ) => {
            console.log("Second guy");
          await provider?.send("eth_requestAccounts", []);
          const signer =  provider.getSigner();
          setSigner(signer);
          return;
        }
    
       
    
    
        //display address
        const displayaddr = () => {
            return `${signerAddress?.substring(0,10)}`;
        }
    
    
    
      

  

    //select token address
    const handleChange = event => {
        console.log(event.target.value);
        setSelectedone(event.target.value);
      };


      const handleChangetwo = event => {
        console.log(event.target.value);
        setSelectedtwo(event.target.value);
      };



      //handle change
      const handleChangerecieved = async (e) => {

        if(!selectedone) {

          setLoader(true);
          setLoadermsg('Token to sell not selected');

          setTimeout(() => {

            setLoadermsg('');
            setLoader(false);
            
          }, 2000);

          return ;
          
        };

        if(!selectedtwo) {
          setLoader(true);
          setLoadermsg('Token to buy not selected');

          setTimeout(() => {

            setLoadermsg('');
            setLoader(false);
            
          }, 2000);

          return ;
        };

        let decimalfrom = 18;
        let decimalto = 18;

       if(selectedone.contract_address) {
          console.log("Entered one contract");
          const signer = await provider.getSigner();
          const fromContract = new ethers.Contract(selectedone.contract_address, tokenabi, signer);
          decimalfrom = await fromContract.decimals();
          console.log(decimalfrom);
       }

       if(selectedtwo.contract_address) {
        console.log("Entered two contract");
        console.log(selectedtwo.contract_address)
        console.log(provider)
        const signer = await provider.getSigner();
        const toContract = await new ethers.Contract(selectedtwo.contract_address, tokenabi, signer);
        console.log(toContract)
        console.log("error here two")
        const name = await toContract.name();
        console.log(name);
        decimalto = await toContract.decimals();
        console.log(decimalto);
       }

        console.log("here error")
        const amountinput = e.target.value;

  
        if (!amountinput) return;
        const amount = Number(parseInt(e.target.value) * 10 ** decimalfrom);
        //const amount = ethers.utils.parseEther(e.target.value);
        console.log(parseInt(e.target.value), amount);
      
        const params = {
            buyToken: selectedtwo.contract_address ? selectedtwo.contract_address : selectedtwo.symbol,
            sellToken: selectedone.contract_address ? selectedone.contract_address : selectedone.symbol,
            sellAmount: amount
        }

        const getquote = qs.stringify(params);
        console.log(getquote);
      
        // Fetch the swap price.
        const response = await fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);


        setLoader(true);
        setLoadermsg('fetching quote data');
        //console.log( await response.json());
        
        const swapQuoteJSON = await response.json();
        console.log(swapQuoteJSON);

        if(swapQuoteJSON.code == 100) {
          setLoader(false);
          setLoader(true);
          setLoadermsg('Quote for this pair is unavailable');
          return;
        }

       //setHoldquote(swapQuoteJSON);
       setOutputAmount(swapQuoteJSON.buyAmount / (10 ** decimalto));
       setLoadermsg('');
       setLoader(false);
       
      }




      const getTokenslist = async () => {
        console.log("initializing");
        let response = await fetch('https://api.coingecko.com/api/v3/coins');
        let tokenListJSON = await response.json();
        //console.log("listing available tokens: ");
        //console.log(tokenListJSON);
        //const tokenstoUse = tokenListJSON.tokens.slice(0, 1000);
        const tokenstoUse = tokenListJSON.slice(1);
        setSelectedone(tokenstoUse[0]);
        setTokenlist(tokenstoUse);
      }


      //pickSelected
      const openOne = () => {
        if(chain == 1) {
          setCheckselect(1);
          setOpenlistmodal(true);
        }
      }


      const openTwo = () => {
        if(chain == 1) {
          setCheckselect(2);
          setOpenlistmodal(true);
        }
      }




      const getBalance = async (selected, check) => {
        //console.log(selected, check);

        if(!selected.contract_address) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          let val =  String(await provider.getBalance(address));
            if(check === 1) {
              setinBalance(val)
            } else {
              setoutBalance(val)
            }

        } else {

          const ethContract = new ethers.Contract(selected.contract_address, tokenabi, provider);
          ethContract.balanceOf(signerAddress).then( res => {
            if(check === 1) {
              setinBalance( Number(ethers.utils.formatEther(res) ))
            } else {
              setoutBalance( Number(ethers.utils.formatEther(res) ))
            }
  
          });

        }


      }


      const onLoad = async () => {
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const signer = await provider.getSigner();
        setChain(await signer.getChainId());
    }

    
       //useEffect
       useEffect(() => {
        console.log("Entered");
    
        onLoad();
        console.log(showModal);

        getTokenslist();

/*
        if(loader) {
           setToggle(!toggle);
        } else {
          setToggle(false);
        }
*/
    
       }, [showModal, toggle, loader, chain])


    //on Chain changed
     if(window.ethereum) {
        window.ethereum.on('chainChanged', async function (chainId) {
          //account = accounts[0];
          console.log("called chain changed");
          onLoad();
          getSigner(provider);
          setChain(await signer.getChainId());
          console.log("Called again");
      });
   }

     //on account changed
      if(window.ethereum){

        window.ethereum.on('accountsChanged', function (accounts) {
          // Time to reload your interface with accounts[0]!
          getWalletAddress();
        });

      }




  return (
        <div className="heroform card-body p-4 p-lg-5 formswap" >
          <form className='mb-5' onSubmit={submit} >
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                
                  <div className='d-flex w-100 justify-content-between pr-3'>
                    <div className=""  style={{fontSize: '17px'}}>
                       How much do you want to swap ?
                       </div>
  
                      <div className='text-end' onClick={() => setShowModal(true) }>
                        <BsGearFill />
                      </div>
                      {showModal && ( 
                        <Configmodal
                         onClose={() => setShowModal(false) }
                         setDeadlineMinutes={setDeadlineMinutes}
                         deadlineMinutes={deadlineMinutes}
                         setSlippageAmount={setSlippageAmount}
                         slippageAmount={slippageAmount}
                        />
                       )
                      }
  
                  </div>
                  <div className={toggle && 'text-success'} style={{fontSize: '13px'}}>
                    {loader && loadermsg}
                  </div>
  
              </div>
              
              <div className="form-group currency-form mb-4 d-flex flex-column" >
                <small style={{fontSize: '10px'}}>You Spend</small>

                <div className='d-flex'>
                  <input type="text" class="input-control" name="inputname" placeholder="0.0" aria-label="Input" onChange={(e) => handleChangerecieved(e)}  />
                  <span className="vr mx-3 my-1"></span>
                  <div className='flex flex-column m*-0 px-0 no-gutter' style={{width: '30%'}} >

                  {selectedone == undefined ?

                    <div className="d-flex justify-content-evenly" onClick={() => openOne()} > 
                      <img class="token_list_img" src={tokenlist[0]?.image.thumb} />
                      <small class="token_list_text" style={{fontSize: '13px' }}>{tokenlist[0]?.symbol}</small>
                    </div>
                  :

                    <div className="d-flex justify-content-evenly" onClick={() => openOne()} > 
                      <img class="token_list_img" src={selectedone?.image.thumb} />
                      <small class="token_list_text" style={{fontSize: '13px' }}>{ selectedone?.symbol }</small>
                    </div>
                  
                  }



                  <div className='balanceshow' >Balance : {inBalalnce} </div>
                  </div>
                  </div>
              </div>
              
              <div className="form-group currency-form mb-4 d-flex flex-column">
                 <small style={{fontSize: '10px'}}>You Recieve</small>
                 
                 <div className="d-flex">
                  <input type="text" class="input-control" placeholder="0.0" aria-label="Input" value={ Math.round( (outputAmount) * 10 ) / 10 } />
                  <span className="vr mx-3 my-1"></span>
  
                  <div className='flex flex-column m*-0 px-0 no-gutter' style={{width: '30%'}} >
                    { selectedtwo == undefined ?

                        <small onClick={() => openTwo() } style={{fontSize: '13px'}} >Select</small>
                      
                        :

                        <>
                        <div className="d-flex justify-content-evenly" onClick={() => openTwo() } > 
                              <img class="token_list_img" src={selectedtwo?.image.thumb} />
                              <small class="token_list_text" style={{fontSize: '13px' }}>{selectedtwo.symbol}</small>
                        </div>

                        <div className='balanceshow' >Balance : {outBalance} </div>
                        </>
                     }


               </div>

               </div>
  
              </div>

                 {openlistmodal && 
                     <Tokensmodal
                      tokens={tokenlist}
                      check={checkselect}
                      setSelectedone={setSelectedone}
                      setSelectedtwo={setSelectedtwo}
                      off={setOpenlistmodal}
                      getBalance={getBalance}
                      onClose={() => setOpenlistmodal(false)}
                    />
                  }
              
              { isConnected() ? (

                <>
  
                  <div className="form-group">
                    {chain !== 1 ?

                        <>
                          <div className="btn btn-primary w-100 rounded-pill shadow text-warning buttongrey" type='button' style={{fontSize: '13px'}}> Wrong Chain! Connect to ETH </div>
                        </>

                        :

                        <>
                        {inBalalnce == 0 ?
                          <div className="btn btn-primary w-100 rounded-pill shadow text-warning" type='button'> Insufficient {selectedone.symbol} amount </div>
                        :
                          <button className="btn btn-primary w-100 rounded-pill shadow" type='button'>Swap</button>
                        }
                        </>
                    
                    }
                  </div>

                  <small style={{fontSize: '12px'}}>{signerAddress && <> {displayaddr()}... </>}</small>

                </>
  
              ): 
                 ( 
                  <div className="form-group">
                      <div className="btn btn-primary w-100 rounded-pill shadow"
                      type="button"
                      onClick={ (e) => {
                           e.preventDefault()
                           getSigner(provider)
                           }
                          }
                      >
                          Connect Wallet
                      </div>
                  </div>
  
                 )
  
               
               }
  
  
          </form>
  
  
          <div className='text-center'>
              <h6 className="text-dark fs-sm fw-light">We accept</h6>
  
              <img src={AccpetPayments} alt="" className='img-fluid'/>
  
  
          </div>
      </div>
      
  )
}
