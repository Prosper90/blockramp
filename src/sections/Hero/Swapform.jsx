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
import { ChainId, Fetcher, Percent, Token, TokenAmount, Pair, TradeType, Route, CurrencyAmount, WETH } from '@uniswap/sdk'












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



        

      //Ether
      const eth = {
        address : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId : 1,
        decimals: 18,
        logoURI: currencyETH,
        name: "ethereum",
        symbol: "eth"
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

              console.log("trying swap");
              // Only work if MetaMask is connect
              // Connecting to Ethereum: Metamask
              const providerethers = await new ethers.providers.Web3Provider(window.ethereum);
            
              // The address, if any, of the most recently used account that the caller is permitted to access
              //let accounts = await ethereum.request({ method: "eth_accounts" });
              let takerAddress = signerAddress;
              console.log("takerAddress: ", takerAddress);
            
              const swapQuoteJSON = holdquote;
            
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
        const getWalletAddress = () => {
            signer.getAddress().
            then(address => {
              setSignerAddress(address)

    
              //todo: connect weth and uni contracts
            /*
              ethContract.balanceOf(address).then( res => {
                setEthAmount( Number(ethers.utils.formatEther(res) ))
              });
    
              uniContract.balanceOf(address).then( res => {
                setUniAmount( Number(ethers.utils.formatEther(res) ))
              })
            */
    
            })
        }
    
    
        if (signer !== undefined) {
         getWalletAddress();
       }
    
    
    
        //getSigner
        const getSigner = async ( provider ) => {
            console.log("Second guy");
          provider?.send("eth_requestAccounts", []);
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
          const fromContract = new ethers.Contract(selectedone.contract_address, tokenabi, provider);
          decimalfrom = await fromContract.decimals();
          console.log(decimalfrom);
       }

       if(selectedtwo.contract_address) {
        console.log("Entered two contract");
        const toContract = new ethers.Contract(selectedtwo.contract_address, tokenabi, provider);
        decimalto = await toContract.decimals();
        console.log(decimalto);
       }


        const amountinput = e.target.value;

  
        if (!amountinput) return;
        const amount = Number(parseInt(e.target.value) * 10 ** decimalfrom);
        //const amount = ethers.utils.parseEther(e.target.value);
        console.log(parseInt(e.target.value), amount);
      
        const params = {
            buyToken: selectedtwo.contract_address ? selectedtwo.contract_address : selectedtwo.symbol,
            sellToken: selectedone.contract_address ? selectedone.contract_address : selectedone.symbol,
            sellAmount: amount,
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

       setHoldquote(swapQuoteJSON);
       setOutputAmount(swapQuoteJSON.buyAmount / (10 ** decimalto));
       setLoadermsg('');
       setLoader(false);
       
      }



      const getContracts = async (addr) => {

        const createuserbuyer = await fetch(`http://localhost:8000/contracts`, 
          {
              method: 'POST',   
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({ enteredaddr: addr})
          }
        );
        await createuserbuyer.json();


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
        setCheckselect(1);
        setOpenlistmodal(true);
      }


      const openTwo = () => {
        setCheckselect(2);
        setOpenlistmodal(true);
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


    
       //useEffect
       useEffect(() => {
        console.log("Entered");
         const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            console.log("ran through");
          
          
            const ethContract = getfirstContract(selectedone.address);
            setOneContract(ethContract);
    
    
            const uniContract = getsecondContract(selectedtwo.address);
            setTwoContract(uniContract);
          

        }
    
        onLoad();
        console.log(showModal);

        getTokenslist();


        if(loader) {
           setToggle(!toggle);
        } else {
          setToggle(false);
        }
    
    
       }, [showModal, toggle, loader])




  return (
        <div className="heroform card-body p-4 p-lg-5 formswap" >
          <form className='mb-5' onSubmit={submit} >
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                  <div className='d-flex align-items-center gap-3' style={{fontSize: '20px'}}>
                       How much do you want to swap ?
                  </div>
                  <div className='d-flex w-100 justify-content-between pr-3'>
                      <div className='d-flex w-100'>
                          <h6 className='mb-1 heroform__field-title fs-md-sm fw-regular'>1 BTC is ≈</h6>
                          <div className='fs-xs fs-md-sm ml-3'><span className="text-dark fw-bold">53,260.20</span> USD</div>
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
              
              <div className="form-group currency-form mb-4" >
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
              
              <div className="form-group currency-form mb-4">
                  <input type="text" class="input-control" placeholder="0.0" aria-label="Input" value={ Math.round( (outputAmount) * 10 ) / 10 } />
                  <span className="vr mx-3 my-1"></span>
  
                  <div className='flex flex-column m*-0 px-0 no-gutter' style={{width: '30%'}} >
                    { selectedtwo == undefined ?

                        <small onClick={() => openTwo() } >Select</small>
                      
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
                    <>
                      {inBalalnce == 0 ?
                        <div className="btn btn-primary w-100 rounded-pill shadow text-warning" type='button'> Insufficient {selectedone.symbol} amount </div>
                       :
                        <button className="btn btn-primary w-100 rounded-pill shadow" type='button'>Swap</button>
                      }
                      
                    </>
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
