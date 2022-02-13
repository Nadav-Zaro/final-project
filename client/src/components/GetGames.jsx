import {useEffect,useState} from 'react';
import Client_ID from '../logic/Client_id';
import axios from 'axios';
import style from "../components/home.module.css"
import {FaBasketballBall,FaPlus} from "react-icons/fa"
import moment from 'moment';


export default function GetGames({games,setGames,auth,userInfo,setUserInfo}) {
useEffect(getGames, []);

const teamLogos =    {   
  bos:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bos.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  bkn:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bkn.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  ny:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/ny.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  phi:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/phi.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  tor:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/tor.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  chi:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/chi.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  cle:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/cle.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  det:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/det.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  ind:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/ind.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  mil:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mil.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  den:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/den.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  min:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/min.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  okc:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/okc.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  por:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/por.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  utah:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/utah.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  gs:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/gs.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  lac:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lac.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  lal:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lal.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  phx:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/phx.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  sac:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/sac.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  atl:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/atl.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  cha:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/cha.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  mia:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mia.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  orl:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/orl.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  wsh:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/wsh.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  dal:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/dal.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  hou:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/hou.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  mem:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mem.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  no:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/no.png&scale=crop&cquality=40&location=origin&w=80&h=80",
  sa:"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/sa.png&scale=crop&cquality=40&location=origin&w=80&h=80"
} 

function getGames() {
  axios.get(`https://api.seatgeek.com/2/events?type=nba&client_id=${Client_ID}`)
  .then(res=>{ setGames(res.data.events)})
  .catch(err=>console.log(err.response))
}


let temp = []
  if (games) {
    for (let i = 0; i < games.length; i++) {
      if (games[i].performers.length > 1) {
        let obj = {
          time:games[i].datetime_local,
          title:games[i].short_title,
          court:games[i].venue.name,
          teamA:[games[i].performers[0].name],
          teamB:[games[i].performers[1].name],
          addToList: false,
          watched: false,
          favorite: false,
          gameLink: null
        }
        switch (obj.teamA[0]) {
          case "Washington Wizards":
              obj.teamA.push(teamLogos.wsh)
            break;
            case "Boston Celtics":
              obj.teamA.push(teamLogos.bos)
            break;
            case "Brooklyn Nets":
              obj.teamA.push(teamLogos.bkn)
            break;
            case "New York Knicks":
              obj.teamA.push(teamLogos.ny)
            break;
            case "Philadelphia 76ers":
              obj.teamA.push(teamLogos.phi)
            break;
            case "Toronto Raptors":
              obj.teamA.push(teamLogos.tor)
            break;
            case "Chicago Bulls":
              obj.teamA.push(teamLogos.chi)
            break;
            case "Cleveland Cavaliers":
              obj.teamA.push(teamLogos.cle)
            break;
            case "Detroit Pistons":
              obj.teamA.push(teamLogos.det)
            break;
            case "Indiana Pacers":
              obj.teamA.push(teamLogos.ind)
            break;
            case "Milwaukee Bucks":
              obj.teamA.push(teamLogos.mil)
            break;
            case "Denver Nuggets":
              obj.teamA.push(teamLogos.den)
            break;
            case "Minnesota Timberwolves":
              obj.teamA.push(teamLogos.min)
            break;
            case "Oklahoma City Thunder":
              obj.teamA.push(teamLogos.okc)
            break;
            case "Portland Trail Blazers":
              obj.teamA.push(teamLogos.por)
            break;
            case "Utah Jazz":
              obj.teamA.push(teamLogos.utah)
            break;
            case "Golden State Warriors":
              obj.teamA.push(teamLogos.gs)
            break;
            case "Los Angeles Clippers":
              obj.teamA.push(teamLogos.lac)
            break;
            case "Los Angeles Lakers":
              obj.teamA.push(teamLogos.lal)
            break;
            case "Phoenix Suns":
              obj.teamA.push(teamLogos.phx)
            break;
            case "Sacramento Kings":
              obj.teamA.push(teamLogos.sac)
            break;
            case "Atlanta Hawks":
              obj.teamA.push(teamLogos.atl)
            break;
            case "Charlotte Hornets":
              obj.teamA.push(teamLogos.cha)
            break;
            case "Miami Heat":
              obj.teamA.push(teamLogos.mia)
            break;
            case "Orlando Magic":
              obj.teamA.push(teamLogos.orl)
            break;
            case "Dallas Mavericks":
              obj.teamA.push(teamLogos.dal)
            break;
            case "Houston Rockets":
              obj.teamA.push(teamLogos.hou)
            break;
            case "Memphis Grizzlies":
              obj.teamA.push(teamLogos.mem)
            break;
            case "New Orleans Pelicans":
              obj.teamA.push(teamLogos.no)
            break;
            case "San Antonio Spurs":
              obj.teamA.push(teamLogos.sa)
            break;
        
          default:
            break;
        }
        switch (obj.teamB[0]) {
          case "Washington Wizards":
              obj.teamB.push(teamLogos.wsh)
            break;
          case "Boston Celtics":
            obj.teamB.push(teamLogos.bos)
          break;
          case "Brooklyn Nets":
            obj.teamB.push(teamLogos.bkn)
          break;
          case "New York Knicks":
            obj.teamB.push(teamLogos.ny)
          break;
          case "Philadelphia 76ers":
            obj.teamB.push(teamLogos.phi)
          break;
          case "Toronto Raptors":
            obj.teamB.push(teamLogos.tor)
          break;
          case "Chicago Bulls":
            obj.teamB.push(teamLogos.chi)
          break;
          case "Cleveland Cavaliers":
            obj.teamB.push(teamLogos.cle)
          break;
          case "Detroit Pistons":
            obj.teamB.push(teamLogos.det)
          break;
          case "Indiana Pacers":
            obj.teamB.push(teamLogos.ind)
          break;
          case "Milwaukee Bucks":
            obj.teamB.push(teamLogos.mil)
          break;
          case "Denver Nuggets":
            obj.teamB.push(teamLogos.den)
          break;
          case "Minnesota Timberwolves":
            obj.teamB.push(teamLogos.min)
          break;
          case "Oklahoma City Thunder":
            obj.teamB.push(teamLogos.okc)
          break;
          case "Portland Trail Blazers":
            obj.teamB.push(teamLogos.por)
          break;
          case "Utah Jazz":
            obj.teamB.push(teamLogos.utah)
          break;
          case "Golden State Warriors":
            obj.teamB.push(teamLogos.gs)
          break;
          case "Los Angeles Clippers":
            obj.teamB.push(teamLogos.lac)
          break;
          case "Los Angeles Lakers":
            obj.teamB.push(teamLogos.lal)
          break;
          case "Phoenix Suns":
            obj.teamB.push(teamLogos.phx)
          break;
          case "Sacramento Kings":
            obj.teamB.push(teamLogos.sac)
          break;
          case "Atlanta Hawks":
            obj.teamB.push(teamLogos.atl)
          break;
          case "Charlotte Hornets":
            obj.teamB.push(teamLogos.cha)
          break;
          case "Miami Heat":
            obj.teamB.push(teamLogos.mia)
          break;
          case "Orlando Magic":
            obj.teamB.push(teamLogos.orl)
          break;
          case "Dallas Mavericks":
            obj.teamB.push(teamLogos.dal)
          break;
          case "Houston Rockets":
            obj.teamB.push(teamLogos.hou)
          break;
          case "Memphis Grizzlies":
            obj.teamB.push(teamLogos.mem)
          break;
          case "New Orleans Pelicans":
            obj.teamB.push(teamLogos.no)
          break;
          case "San Antonio Spurs":
            obj.teamB.push(teamLogos.sa)
          break;
          default:
            break;
        }
        temp.push(obj)
    }
  }
}


function addGameToList(game) {
  axios.patch(`addGame/${userInfo._id}`,game)
  .then(res=>console.log(res.data))
  .catch(err=>console.log(err.response))
}
let userList = {...userInfo}

const element = temp ? temp.map((it,i)=>{
  let time = it.time
  it.time = time.slice(11)
    return (
  <div className={style.games} key={i}>
    <div className={style.homeTeam}>
      <img src={it.teamA[1]} />
      <p>{it.teamA[0]}</p>
    </div>
    <div className={style.gameInfo}>
        <p>{it.title}</p>
        <p>Time: {it.time.substr(0,5)} PM</p>
        <p>Arena: {it.court}</p>
    </div>
    <div className={style.awayTeam}>
      <img src={it.teamB[1]} />
      <p>{it.teamB[0]}</p>
    </div>
    <div className={style.gameOptIcon}>
      <FaPlus style={{cursor:"pointer"}} onClick={()=>{
        it.addToList = true 
        addGameToList({games:it})
        userList.games.push(it)
        setUserInfo(userList)
      }}/>
    </div>
  </div>
)}) : ""


const day = moment().format("dddd , MMM Do YYYY")
  return <div className={style.getGames}>
    <h3>Today Game's</h3>
      <p>{day}</p>
      {element}
  </div>;
}
