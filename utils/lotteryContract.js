import { contractAbi, contractAddress } from './constants'

const createLotteryContract = (web3) => {
  return new web3.eth.Contract(contractAbi, contractAddress)
}

export default createLotteryContract
