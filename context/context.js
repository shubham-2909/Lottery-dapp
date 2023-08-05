import { createContext, useState, useEffect, useContext } from 'react'
import Web3 from 'web3'
import createLotteryContract from '../utils/lotteryContract'
export const appContext = createContext()

export const AppProvider = ({ children }) => {
  const [address, setAddress] = useState('')
  const [web3, setWeb3] = useState()
  const [lotteryContract, setLotteryContract] = useState()
  const [players, setPlayers] = useState([])
  const [lotteryPot, setLotteryPot] = useState('0')
  const [lastWinnter, setLastWinner] = useState()
  const [lotteryId, setLotteryId] = useState(0)
  useEffect(() => {
    if (lotteryContract) {
      getLotteryId()
      getLotteryPot()
      getPlayers()
      getlastWinner()
    }
  }, [lotteryContract])

  const connectWallet = async () => {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)
        const accounts = await web3.eth.getAccounts()
        setAddress(accounts[0])
        setLotteryContract(createLotteryContract(web3))
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await web3.eth.getAccounts()
          setAddress(accounts[0])
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('please install metamask')
    }
  }

  const enterLottery = async () => {
    try {
      await lotteryContract.methods
        .enter()
        .send({ from: address, value: web3.utils.toWei('0.1', 'ether') })

      getLotteryPot()
      getPlayers()
      getlastWinner()
      getLotteryId()
    } catch (error) {
      console.log(error)
    }
  }

  const getLotteryPot = async () => {
    try {
      const balance = await lotteryContract.methods.getBalance().call()
      setLotteryPot(web3.utils.fromWei(balance, 'ether'))
    } catch (error) {
      console.log(error)
    }
  }
  const getPlayers = async () => {
    try {
      setPlayers(await lotteryContract.methods.getPlayers().call())
    } catch (error) {
      console.log(error)
    }
  }
  const getlastWinner = async () => {
    try {
      const winners = await lotteryContract.methods.getWinners().call()
      setLastWinner(winners[winners.length - 1])
    } catch (error) {
      console.log(error)
    }
  }

  const getLotteryId = async () => {
    try {
      setLotteryId(await lotteryContract.methods.lotteryId().call())
    } catch (error) {
      console.log(error)
    }
  }

  const pickWinner = async () => {
    try {
      await lotteryContract.methods.pickWinner().send({ from: address })
      getLotteryId()
      getLotteryPot()
      getPlayers()
      getlastWinner()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <appContext.Provider
      value={{
        connectWallet,
        address,
        enterLottery,
        lotteryPot,
        players,
        lastWinnter,
        lotteryId,
        pickWinner,
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(appContext)
}
