import style from '../styles/Header.module.css'

const ConnectWalletBtn = ({ connectWallet }) => {
  // TODO: Get the connect wallet function from the context.
  // TODO: Add onClick functionality to the button.
  return (
    <button className={style.loginBtn} onClick={connectWallet}>
      Connect Wallet
    </button>
  )
}
export default ConnectWalletBtn
