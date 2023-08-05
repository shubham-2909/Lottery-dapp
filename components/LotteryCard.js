import style from '../styles/PotCard.module.css'
import truncateEthAddress from 'truncate-eth-address'
import { useAppContext } from '../context/context'
const LotteryCard = () => {
  // TODO: Get the data needed from context
  const { enterLottery, lotteryPot, lastWinner, pickWinner, lotteryId } =
    useAppContext()
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        {/* TODO: Dynamically render the lotteryID */}
        Lottery <span className={style.textAccent}>{lotteryId}</span>
      </div>
      <div className={style.pot}>
        {/* TODO: Dynamically render the lottery pot */}
        Pot 🍯: <span className={style.goldAccent}>{lotteryPot} ETH </span>
      </div>

      <div className={style.recentWinnerTitle}>🏆Last Winners🏆</div>
      <div className={style.winner}>
        {/* TODO: Dynamically render the last winner */}
        {lastWinner ? truncateEthAddress(lastWinner) : 'No winners Yet'}
      </div>
      {/* TODO: Add onClick functionality to the buttons */}
      <div className={style.btn} onClick={enterLottery}>
        Enter
      </div>
      <div className={style.btn} onClick={pickWinner}>
        Pick Winner!
      </div>
    </div>
  )
}
export default LotteryCard
