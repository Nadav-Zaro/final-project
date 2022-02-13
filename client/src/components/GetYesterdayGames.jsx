import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import style from "../components/yesterdayGames.module.css";

export default function GetYesterdayGames() {
  const [games, setGames] = useState(null);

  useEffect(getGames, []);

  let day = moment().subtract(1, "days").format("dddd , MMM Do YYYY");

  function getGames() {
    axios
      .get("/games.json")
      .then((res) => setGames(res.data))
      .catch((err) => console.log(err.response));
  }

  const gamesElement = games ? games.map((it, i) => (
    <div className={style.game} key={i}>
      <div className={style.home}>
        <img src={it.home[2]} />
        <p>{it.home[0]}</p>
        <p>{it.home[1]}</p>
      </div>
      <div className={style.score}>
        <p>{it.score[0]}</p>
        <p>Final</p>
        <p>{it.score[1]}</p>
      </div>
      <div className={style.away}>
        <img src={it.away[2]} />
        <p>{it.away[0]}</p>
        <p>{it.away[1]}</p>
      </div>
      <table>
        <tbody>
          <tr><th>PLAYERS</th><th>PTS</th><th>REB</th><th>AST</th></tr>
            <tr className={style.stateTr}>
              <td><div className={style.playerOne}><img src={it.playerOne[0]}/> {it.playerOne[1]}</div></td>
              <td>{it.playerOne[2]}</td><td>{it.playerOne[3]}</td><td>{it.playerOne[4]}
            </td>
          </tr>
            <tr>
              <td><div className={style.playerTwo}><img src={it.playerTwo[0]}/> {it.playerTwo[1]}</div></td>
              <td>{it.playerTwo[2]}</td><td>{it.playerTwo[3]}</td><td>{it.playerTwo[4]}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )) : ""

  return (
    <div className={style.games}>
      <h3>Yesteday Game's</h3>
      <h4>{day}</h4>
      {gamesElement}
    </div>
  );
}
