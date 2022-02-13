import { useState, useEffect } from "react";
import style from "../components/standing.module.css";
import { Redirect } from "react-router-dom/";
import axios from "axios";

export default function Standing({ auth, isRedirectEdit, isRedirectView }) {
  const [eastTeams, setEastTeams] = useState(null);
  const [westTeams, setWestTeams] = useState(null);

  useEffect(getStanding, []);

  function getStanding() {
    axios
      .get("/standing.json")
      .then((res) => {
        setEastTeams(res.data.splice(0,15));
        setWestTeams(res.data);
      })
      .catch((err) => console.log(err.response));
  }

  if (!auth) {
    return <Redirect to="/" />;
  }
  if (isRedirectEdit) {
    return <Redirect to="/EditProfile" />;
  }
  if (isRedirectView) {
    return <Redirect to="/ViewProfile" />;
  }

  const westElement = westTeams ? westTeams.map((team,i)=>(
      <div key={i} className={style.west}>
          <p>{i+1}</p>
          <img src={team.img}/>
          <p>{team.name}</p>
          <p>{team.state[0]}</p>
          <p>{team.state[1]}</p>
      </div>
  )) : ""

  const eastElement = eastTeams ? eastTeams.map((team,i)=>(
    <div key={i} className={style.east}>
        <p>{team.state[1]}</p>
        <p>{team.state[0]}</p>
        <p>{team.name}</p>
        <img src={team.img}/>
        <p>{i+1}</p>
    </div>
  )) : "" 

  return (
    <div className={style.standing}>
      <div className={style.header}><h1>Standing</h1></div>
      
      <div className={style.teams}>
        <img className={style.background} src="https://wallpapercave.com/wp/wp6135640.jpg" loading="lazy"/>
        <div className={style.westCon}>
          <div className={style.westHeader}><p>TEAMS</p><p>W</p><p>L</p></div>
          <span className={style.westHeaderTitle}>WEST TEAM'S</span>{westElement}</div>
        <div className={style.eastCon}
        ><div className={style.eastHeader}><p>L</p><p>W</p><p>TEAMS</p></div>
        <span className={style.eastHeaderTitle}>EAST TEAM'S</span>{eastElement}</div>
      </div>
    </div>
  );
}
