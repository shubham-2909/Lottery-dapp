import style from '../styles/Table.module.css'
import TableRow from './TableRow'
import { useAppContext } from '../context/context'
const Table = () => {
  // TODO: Bring in the players data from the context.
  const { players } = useAppContext()
  return (
    <div className={style.wrapper}>
      <div className={style.tableHeader}>
        <div className={style.addressTitle}>💳 User Address</div>
        <div className={style.amountTitle}>💲 Amount</div>
      </div>
      {/* TODO: Map through the players array and render a table row for each player. */}
      {/* NOTE: Make sure to pass the player as a prop and replace static address. */}
      {!players.length && (
        <div className={style.noPlayers}>No players Participated</div>
      )}
      {players.length > 0 && (
        <div className={style.rows}>
          {players.map((player, index) => {
            return <TableRow key={index} player={player} />
          })}
        </div>
      )}
    </div>
  )
}
export default Table
