const { AlphaRouter } = require('@uniswap/smart-order-router');
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core');
const { ethers, BigNumber } = require('ethers');
const JSBI = require('jsbi');
const ERC20ABI = require('./abi.json');


const V3_SWAP_ROUTER_ADDRESS = process.env.REACT_APP_V3_SWAP_ROUTER_ADDRESS;
WALLET_ADDRESS = "0x60BF7D209A3bCe766c4D2441514B32FD4703747b";
WALLET_SECRET = "";
const INFURA_URL_TESTNET = process.env.REACT_APP_INFURA_URL_TESTNET;





const web3Provider = new ethers.providers.JsonRpcProvider(INFURA_URL_TESTNET);
//const router = new AlphaRouter({chainId: chainId, proovider: web3Provider});


console.log(web3Provider);

const chainId = 5;

const router = new AlphaRouter({ chainId: chainId, provider: web3Provider });




const name0 = "Wrapped Ether";
const symbol0 = "WETH";
const decimals0 = 18;
const address0 = "0xc778417e063141139fce010982780140aa0cd5ab";


const name1 = "Uniswap Token";
const symbol1 = "UNI";
const decimals1 = 18;
const address1 = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";



export const getfirstContract = (enteredaddr) => new ethers.Contract(enteredaddr, ERC20ABI, web3Provider)
export const getsecondContract = (enteredaddr) => new ethers.Contract(enteredaddr, ERC20ABI, web3Provider)



//const WETH = new Token(chainId, address0, decimals0, symbol0, name0);
//const UNI = new Token(chainId, address1, decimals1, symbol1, name1);





export const checkRecieved = async (t1, t2, amountinput, walletsigner) => {

  const Token1 = new Token(chainId, t1.address, t1.decimals, t1.symbol, t1.name);
  const Token2 = new Token(chainId, t2.address, t2.decimals, t2.symbol, t2.name);


  const wei = ethers.parseUnits(amountinput, 18);
  const inputAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei));


  const route = await router.route(
    inputAmount,
    Token2,
    TradeType.EXACT_INPUT,
    {
      recipient: walletsigner,
      slippageTolerance: new Percent(25, 100),
      deadline: Math.floor(Date.now()/1000 + 1800)
    }
  )
  console.log(`Qoute exact in ${route.quote.toFixed(10)}`);

  return route.quote.toFixed(10);


}





export const main = async (t1, t2, amountinput, walletsigner ) => {



  const Token1 = new Token(chainId, t1.address, t1.decimals, t1.symbol, t1.name);
  const Token2 = new Token(chainId, t2.address, t2.decimals, t2.symbol, t2.name);


  const wei = ethers.parseUnits(amountinput, 18);
  const inputAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei));


  const route = await router.route(
    inputAmount,
    Token2,
    TradeType.EXACT_INPUT,
    {
      recipient: walletsigner,
      slippageTolerance: new Percent(25, 100),
      deadline: Math.floor(Date.now()/1000 + 1800)
    }
  )

  console.log(`Qoute exact in ${route.quote.toFixed(10)}`);

  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: walletsigner,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(10000)
  }


  const Wallet = new ethers.wallet(signer);
  const connectedWallet = wallet.connet(web3Provider);


  const approvalAmount = ethers.utills.parseUnits('1', 18).toString();
  const contract0 = new ethers.Contract(t1.address, ERC20ABI, web3Provider);
  await contract0.connect(connectedwallet).approve(
    V3_SWAP_ROUTER_ADDRESS,
    approvalAmount
  ) 

  const tradeTransaction = await connectedwallet.sendTransaction(transaction);
  
  console.log(tradeTransaction);

}



//main();






/*
export const getWethContract = () => new ethers.Contract(address0, ERC20ABI, web3Provider)
export const getUniContract = () => new ethers.Contract(address1, ERC20ABI, web3Provider)


export const getPrice = async (inputAmount, slippageAmount, deadline, walletAddress) => {
    const percentSlippage = new Percent(slippageAmount, 100)
    const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0)
    const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))
  
    const route = await router.route(
      currencyAmount,
      UNI,
      TradeType.EXACT_INPUT,
      {
        recipient: walletAddress,
        slippageTolerance: percentSlippage,
        deadline: deadline,
      }
    )
  
    const transaction = {
      data: route.methodParameters.calldata,
      to: V3_SWAP_ROUTER_ADDRESS,
      value: BigNumber.from(route.methodParameters.value),
      from: walletAddress,
      gasPrice: BigNumber.from(route.gasPriceWei),
      gasLimit: ethers.utils.hexlify(1000000)
    }
  
    const quoteAmountOut = route.quote.toFixed(6)
    const ratio = (inputAmount / quoteAmountOut).toFixed(3)
  
    return [
      transaction,
      quoteAmountOut,
      ratio
    ]
  }
  
  export const runSwap = async (transaction, signer) => {
    const approvalAmount = ethers.utils.parseUnits('10', 18).toString()
    const contract0 = getWethContract()
    await contract0.connect(signer).approve(
      V3_SWAP_ROUTER_ADDRESS,
      approvalAmount
    )
  
    signer.sendTransaction(transaction)


  }
*/
