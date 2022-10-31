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
import * as qs from 'qs'
import { ChainId, Fetcher, Percent, Token, TokenAmount, Pair, TradeType, Route, CurrencyAmount, WETH } from '@uniswap/sdk'






const crypto_options = [
    { 
        value: 'Dai', 
        label: 'Dai', 
        icon:  currencyETH,
        name:  'Dai',
        symbol: 'Dai',
        decimals: 18,
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F" 
    },
    { 
        value: 'USDC', 
        label: 'USDC', 
        icon:  currencyETH,
        name:  'USDC',
        symbol: 'USD//C',
        decimals: 6,
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" 
    },
    { value: 'eth', label: 'ETH', icon:  currencyETH },
    { value: 'bnb', label: 'BNB', icon:  currencyBNB },
    { value: 'usdt', label: 'USDT', icon:  currencyUSDT },
];




const IconOption = props => (
    <components.Option {...props}>
        <span className="me-2"><img src={props.data.icon} alt={props.data.label}/></span>
        <span>{props.data.label}</span>
    </components.Option>
);

const ValueContainer = ({children, ...props}) => {
    if (!props.hasValue) {
      return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
    }
  
    const value = props.getValue()[0];
    console.log("CAHNGE", value);

    return (
      <components.ValueContainer {...props}>
        <div className="d-flex gap-2">
            <span><img src={value.icon} alt={value.label}/></span>
            <span>{value.label}</span>
        </div>
      </components.ValueContainer>
    );
  };

const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={arrow} />
      </components.DropdownIndicator>
    );
};







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
        const [outputAmount, setOutputAmount] = useState(undefined);

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



        






        //swap function
 

        const submit = async (e) => {

              if(!signerAddress) return;
              if(!signer) return;
              if(!selectedone) return;
              if(!selectedtwo) return;

              console.log("trying swap");
              // Only work if MetaMask is connect
              // Connecting to Ethereum: Metamask
              const web3 = await new ethers.providers.Web3Provider(window.ethereum);
            
              // The address, if any, of the most recently used account that the caller is permitted to access
              let accounts = await ethereum.request({ method: "eth_accounts" });
              let takerAddress = accounts[0];
              console.log("takerAddress: ", takerAddress);
            
              const swapQuoteJSON = await getQuote(takerAddress);
            
              // Set Token Allowance
              // Set up approval amount
              const fromTokenAddress = selectedone.address;
              const maxApproval = new BigNumber(2).pow(256).minus(1);
              console.log("approval amount: ", maxApproval);
              const ERC20TokenContract = new ethers.Contract(fromTokenAddress, tokenabi, web3);
              console.log("setup ERC20TokenContract: ", ERC20TokenContract);
            
              // Grant the allowance target an allowance to spend our tokens.
              const tx = await ERC20TokenContract.approve(
                  swapQuoteJSON.allowanceTarget,
                  maxApproval,
              )
              .send({ from: signerAddress })
              .then(tx => {
                  console.log("tx: ", tx)
              });

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


        console.log("in handle");

        const amountinput = e.target.value;

        console.log(amountinput);
        console.log(selectedone);
        console.log(selectedone);
        console.log("Getting Quote");
  
        if (!amountinput) return;
        let amount = Number(amountinput * 10 ** selectedone.decimals);
        //console.log(amount);
      
        const params = {
            buyToken: selectedtwo.address,
            sellAmount: amount,
            sellToken: selectedone.address,
            takerAddress: signerAddress
        }
      
        // Fetch the swap price.
        const response = await fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);
        setLoader(true);
        setLoadermsg('fetching quote data');
        console.log(respose);
        
        swapQuoteJSON = await response.json();
        console.log("Quote: ", swapQuoteJSON);
        
        //document.getElementById("to_amount").value = swapPriceJSON.buyAmount / (10 ** currentTrade.to.decimals);
        //document.getElementById("gas_estimate").innerHTML = swapPriceJSON.estimatedGas;

       setOutputAmount(swapQuoteJSON.buyAmount / (10 ** currentTrade.to.decimals));
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
        let response = await fetch('https://tokens.coingecko.com/uniswap/all.json');
        let tokenListJSON = await response.json();
        console.log("listing available tokens: ");
        console.log(tokenListJSON.tokens);
        const tokenstoUse = tokenListJSON.tokens.slice(0, 1000);
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
        console.log(selected, check);
        const ethContract = new ethers.Contract(selected.address, tokenabi, provider);

        ethContract.balanceOf(signerAddress).then( res => {
          if(check === 1) {
            setinBalance( Number(ethers.utils.formatEther(res) ))
          } else {
            setoutBalance( Number(ethers.utils.formatEther(res) ))
          }

        });

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
    
    
       }, [showModal, toggle])




  return (
        <div className="heroform card-body p-4 p-lg-5 formswap" >
          <form className='mb-5'   >
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
                      <img class="token_list_img" src={tokenlist[0]?.logoURI} />
                      <small class="token_list_text" style={{fontSize: '13px' }}>{tokenlist[0]?.symbol}</small>
                    </div>
                  :

                    <div className="d-flex justify-content-evenly" onClick={() => openOne()} > 
                      <img class="token_list_img" src={selectedone?.logoURI} />
                      <small class="token_list_text" style={{fontSize: '13px' }}>{ selectedone?.symbol }</small>
                    </div>
                  
                  }



                  <div className='balanceshow' >Balance : {inBalalnce} </div>
                  </div>
              </div>
              
              <div className="form-group currency-form mb-4">
                  <input type="text" class="input-control" placeholder="0.0" aria-label="Input" value={outputAmount} />
                  <span className="vr mx-3 my-1"></span>
  
                  <div className='flex flex-column m*-0 px-0 no-gutter' style={{width: '30%'}} >
                    { selectedtwo == undefined ?

                        <small onClick={() => openTwo() } >Select</small>
                      
                        :

                        <>
                        <div className="d-flex justify-content-evenly" onClick={() => openTwo() } > 
                              <img class="token_list_img" src={selectedtwo?.logoURI} />
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
