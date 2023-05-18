const connectWalletBtn = document.querySelector("#connectWalletBtn")
const ethBalance = document.querySelector("#ethBalance")
const tokenBalance = document.querySelector("#tokenBalance")
const buyForm = document.querySelector("#buyForm")
const sellForm = document.querySelector("#sellForm")
const amountToBuy = document.querySelector("#amountToBuy")
const amountToSell = document.querySelector("#amountToSell")
//import STABLE_COIN from "../build/contracts/StableCoin.json" assert {type:"json"}
const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "priceConsumerAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BoughtStableCoin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "SoldStableCoin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "priceConsumer",
    outputs: [
      {
        internalType: "contract PriceConsumerV3",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
    payable: true,
  },
  {
    inputs: [],
    name: "buyStableCoin",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [],
    name: "getLatestPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "sellStableCoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
 
const ADDRESS = "0x1eDb285D212B2D7d74e39FE8113EE960653B99cB";
async function main() {

    let accountConnected

    try {
        await checkForMetamask()
    } catch (error) {
        let errorMessage = document.createElement("h1")
        errorMessage.textContent = error
        errorMessage.style.color = "#ffffff"
        document.getElementsByClassName("container")[0].appendChild(errorMessage)

    }

    accountConnected = await getAccounts()
    if (window.ethereum) {
        window.ethereum.on("accountsChanged", async () => {
            accountConnected = await getAccounts()
            connectWalletBtn.textContent = formatAddress(accountConnected)
            let balance = await getEthBalance(accountConnected)
            ethBalance.textContent = formatBalance(balance, "FTM")
            let erc20Balance = await getSTDCBalance(accountConnected)
            tokenBalance.textContent = formatBalance(erc20Balance, "STBC")
        })


    }

    console.log(accountConnected)
    const contractAddressParagraph = document.createElement("p")
    contractAddressParagraph.textContent = ADDRESS
    contractAddressParagraph.style.color = "#ffffff"
    contractAddressParagraph.style.marginTop = "50px"

    document.querySelector(".container").append(contractAddressParagraph)
    let balance = await getEthBalance(accountConnected)
    if (balance) {
        ethBalance.textContent = formatBalance(balance, "FTM")

    }
    let erc20Balance = await getSTBCBalance(accountConnected)
    tokenBalance.textContent = formatBalance(erc20Balance, "STBC")


}

main()
    .catch((error) => {
        console.log(error)
    })
//event listeners 
window.addEventListener("DOMContentLoaded", async () => {
    connectWalletBtn.textContent = formatAddress(await getAccounts())
})

connectWalletBtn.addEventListener("click", async () => {
    connectWalletBtn.textContent = formatAddress(await requestAccounts())
})
buyForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    if (amountToBuy.value <= 0) {
        alert("Send more ETH")
        return
    }
    let container = document.querySelector(".container")
    let simpleSpinnerDiv = document.createElement("div")
    let simpleSpinnerSpan = document.createElement("span")
    simpleSpinnerDiv.appendChild(simpleSpinnerSpan)
    simpleSpinnerDiv.className = "simple-spinner"
    container.appendChild(simpleSpinnerDiv)
    let accountConnected = await getAccounts()
    
    try {
        const latestPrice = await getLatestPrice()
        const amountInFTM = amountToBuy.value/latestPrice
        const tx = await buyStableCoin(amountInFTM.toString(), accountConnected)
        if (tx) {
            console.log(tx)
            container.removeChild(simpleSpinnerDiv)
        }
    } catch (error) {
        console.log(error)
        container.removeChild(simpleSpinnerDiv)
    }



})
sellForm.addEventListener("submit",async (event)=>{
    event.preventDefault()
    if (amountToSell.value <= 0) {
        alert("Input a valid Number")
        return
    }
    let container = document.querySelector(".container")
    let simpleSpinnerDiv = document.createElement("div")
    let simpleSpinnerSpan = document.createElement("span")
    simpleSpinnerDiv.appendChild(simpleSpinnerSpan)
    simpleSpinnerDiv.className = "simple-spinner"
    container.appendChild(simpleSpinnerDiv)
    let accountConnected = await getAccounts()
    try {
        const tx = await sellStableCoin(amountToSell.value, accountConnected)
        if (tx) {
            console.log(tx)
            container.removeChild(simpleSpinnerDiv)
        }
    } catch (error) {
        console.log(error)
        container.removeChild(simpleSpinnerDiv)
    }


})
async function checkForMetamask() {
    if (!window.ethereum) throw new Error("Metamask Not Installed!")

    return true

}

async function requestAccounts() {

    try {
        let web3 = await getWeb3()
        let accounts = await web3.eth.requestAccounts()
        return accounts[0]
    } catch (error) {
        console.log(error)
    }

}

async function getEthBalance(account) {

    try {
        let web3 = await getWeb3()

        let balance = await web3.eth.getBalance(account)
        return balance
    } catch (error) {

        console.log(error)
    }
}

async function getAccounts() {

    try {
        let web3 = await getWeb3()

        let accounts = await web3.eth.getAccounts()
        return accounts[0]
    } catch (error) {

        console.log(error)
    }

}
function getWeb3() {
    return new Web3(window.ethereum)
}
const formatAddress = (walletAddress) => {
    if (walletAddress) {

        return walletAddress.slice(0, 5) + "..." + walletAddress.slice(35, -1);
    }
    else {
        return "Connect Wallet"
    }
}
function getStableCoinContract() {
    let web3 = getWeb3()
    return new web3.eth.Contract(ABI, ADDRESS)
}
async function getSTBCBalance(address) {
    let stableCoinInstance =  getStableCoinContract()
    let tokenBalance = await stableCoinInstance.methods.balanceOf(address).call()
    return tokenBalance
}

function formatBalance(balance, SYMBOL) {
    let symbol = SYMBOL
    if (!symbol) {
        symbol = "ETH"
    }
    return (balance / 10 ** 18).toFixed(4) + " " + symbol
}

async function buyStableCoin(amount, accountConnected) {

    try {
        let web3 = getWeb3()
        let stableCoinInstance =  getStableCoinContract()
        let tx = await stableCoinInstance.methods.buyStableCoin().send({ from: accountConnected, value: web3.utils.toWei(amount) })
        return tx
    } catch (error) {
        throw new Error(error)
    }
}
async function sellStableCoin(amountToSell, accountConnected) {
    try {
        let web3 = getWeb3()
        let stableCoinInstance =  getStableCoinContract()
        let tx = await stableCoinInstance.methods.sellStableCoin(web3.utils.toWei(amountToSell)).send({ from: accountConnected})
        return tx
    } catch (error) {
        throw new Error(error)
    }
}
async function getLatestPrice(){
    try {
        
        let stableCoinInstance = getStableCoinContract()
        let latestPrice = await stableCoinInstance.methods.getLatestPrice().call()

       
        return Number(latestPrice)/10**8
    } catch (error) {
        throw new Error(error)
    }

}
/* getLatestPrice().then((latestPrice) => {
    console.log(latestPrice)

    let amountFTM
    let amountSTBC

    let entryValue = 58.07

    amountSTBC = entryValue

    console.log(entryValue/latestPrice)
    
    
    
}).catch((err) => {
    
}); */