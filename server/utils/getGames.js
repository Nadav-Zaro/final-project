const axios = require("axios")
const puppeteer = require("puppeteer")
const fs = require("fs/promises");
const moment = require("moment")

async function getGames() {
  let day = moment().subtract(2, "days").format("YYYY-MM-DD")

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`https://www.nba.com/games/?date=${day}`)

  const teamLogos = {
    bos: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bos.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    bkn: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bkn.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    ny: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/ny.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    phi: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/phi.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    tor: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/tor.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    chi: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/chi.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    cle: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/cle.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    det: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/det.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    ind: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/ind.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    mil: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mil.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    den: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/den.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    min: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/min.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    okc: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/okc.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    por: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/por.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    utah: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/utah.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    gs: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/gs.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    lac: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lac.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    lal: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lal.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    phx: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/phx.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    sac: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/sac.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    atl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/atl.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    cha: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/cha.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    mia: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mia.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    orl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/orl.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    wsh: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/wsh.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    dal: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/dal.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    hou: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/hou.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    mem: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mem.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    no: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/no.png&scale=crop&cquality=40&location=origin&w=80&h=80",
    sa: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/sa.png&scale=crop&cquality=40&location=origin&w=80&h=80"
  }
  const teams = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".MatchupCardTeamName_base__2qtbJ")).map(teams => teams.textContent)
  })
  const teamsRecord = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".MatchupCardTeamRecord_record__bfkvX")).map(teams => teams.textContent)
  })

  const gameScore = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".h9")).map(teams => teams.textContent)
  })

  const playerImg = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".PlayerImage_image__1smob")).map(img => img.src)
  })

  const playerName = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".overflow-ellipsis")).map(teams => teams.textContent)
  })
  const playerState = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".text-right")).map(teams => teams.textContent)
  })


  playerState.shift()
  for (let i = 0; i < playerState.length; i++) {
    if (playerState[i].indexOf("PTS") > -1 || playerState[i].indexOf("REB") > -1 || playerState[i].indexOf("AST") > -1 || Number(playerState[i] > 85)) {
      playerState.splice(i, 1)
      i--
    }
  }

  let playersName = playerName.splice(16)
  for (let i = 0; i < playersName.length; i++) {
    if (playersName[i].indexOf("Game") > -1) {
      playersName.splice(i, 1)
    }
  }

  let n = 0
  let n1 = 1
  let n2 = 2
  let n3 = 3
  let n4 = 4
  let n5 = 5

  let events = []
  for (let i = 0; i < teams.length; i++) {
    let index = i + 1
    let obj = {
      score: [gameScore[i], gameScore[index]],
      home: [teams[i], teamsRecord[i]],
      away: [teams[index], teamsRecord[index]],
      playerOne:[playerImg[i],playersName[i],playerState[n],playerState[n1],playerState[n2]],
      playerTwo:[playerImg[index],playersName[index],playerState[n3],playerState[n4],playerState[n5]]
    }
    events.push(obj)
    switch (obj.home[0]) {
      case "Wizards":
        obj.home.push(teamLogos.wsh)
        break;
      case "Celtics":
        obj.home.push(teamLogos.bos)
        break;
      case "Nets":
        obj.home.push(teamLogos.bkn)
        break;
      case "Knicks":
        obj.home.push(teamLogos.ny)
        break;
      case "76ers":
        obj.home.push(teamLogos.phi)
        break;
      case "Raptors":
        obj.home.push(teamLogos.tor)
        break;
      case "Bulls":
        obj.home.push(teamLogos.chi)
        break;
      case "Cavaliers":
        obj.home.push(teamLogos.cle)
        break;
      case "Pistons":
        obj.home.push(teamLogos.det)
        break;
      case "Pacers":
        obj.home.push(teamLogos.ind)
        break;
      case "Bucks":
        obj.home.push(teamLogos.mil)
        break;
      case "Nuggets":
        obj.home.push(teamLogos.den)
        break;
      case "Timberwolves":
        obj.home.push(teamLogos.min)
        break;
      case "City Thunder":
        obj.home.push(teamLogos.okc)
        break;
      case "Trail Blazers":
        obj.home.push(teamLogos.por)
        break;
      case "Jazz":
        obj.home.push(teamLogos.utah)
        break;
      case "Warriors":
        obj.home.push(teamLogos.gs)
        break;
      case "Clippers":
        obj.home.push(teamLogos.lac)
        break;
      case "Lakers":
        obj.home.push(teamLogos.lal)
        break;
      case "Suns":
        obj.home.push(teamLogos.phx)
        break;
      case "Kings":
        obj.home.push(teamLogos.sac)
        break;
      case "Hawks":
        obj.home.push(teamLogos.atl)
        break;
      case "Hornets":
        obj.home.push(teamLogos.cha)
        break;
      case "Heat":
        obj.home.push(teamLogos.mia)
        break;
      case "Magic":
        obj.home.push(teamLogos.orl)
        break;
      case "Mavericks":
        obj.home.push(teamLogos.dal)
        break;
      case "Rockets":
        obj.home.push(teamLogos.hou)
        break;
      case "Grizzlies":
        obj.home.push(teamLogos.mem)
        break;
      case "Pelicans":
        obj.home.push(teamLogos.no)
        break;
      case "Spurs":
        obj.home.push(teamLogos.sa)
        break;

      default:
        break;
    }
    switch (obj.away[0]) {
      case "Wizards":
        obj.away.push(teamLogos.wsh)
        break;
      case "Celtics":
        obj.away.push(teamLogos.bos)
        break;
      case "Nets":
        obj.away.push(teamLogos.bkn)
        break;
      case "Knicks":
        obj.away.push(teamLogos.ny)
        break;
      case "76ers":
        obj.away.push(teamLogos.phi)
        break;
      case "Raptors":
        obj.away.push(teamLogos.tor)
        break;
      case "Bulls":
        obj.away.push(teamLogos.chi)
        break;
      case "Cavaliers":
        obj.away.push(teamLogos.cle)
        break;
      case "Pistons":
        obj.away.push(teamLogos.det)
        break;
      case "Pacers":
        obj.away.push(teamLogos.ind)
        break;
      case "Bucks":
        obj.away.push(teamLogos.mil)
        break;
      case "Nuggets":
        obj.away.push(teamLogos.den)
        break;
      case "Timberwolves":
        obj.away.push(teamLogos.min)
        break;
      case "City Thunder":
        obj.away.push(teamLogos.okc)
        break;
      case "Trail Blazers":
        obj.away.push(teamLogos.por)
        break;
      case "Jazz":
        obj.away.push(teamLogos.utah)
        break;
      case "Warriors":
        obj.away.push(teamLogos.gs)
        break;
      case "Clippers":
        obj.away.push(teamLogos.lac)
        break;
      case "Lakers":
        obj.away.push(teamLogos.lal)
        break;
      case "Suns":
        obj.away.push(teamLogos.phx)
        break;
      case "Kings":
        obj.away.push(teamLogos.sac)
        break;
      case "Hawks":
        obj.away.push(teamLogos.atl)
        break;
      case "Hornets":
        obj.away.push(teamLogos.cha)
        break;
      case "Heat":
        obj.away.push(teamLogos.mia)
        break;
      case "Magic":
        obj.away.push(teamLogos.orl)
        break;
      case "Mavericks":
        obj.away.push(teamLogos.dal)
        break;
      case "Rockets":
        obj.away.push(teamLogos.hou)
        break;
      case "Grizzlies":
        obj.away.push(teamLogos.mem)
        break;
      case "Pelicans":
        obj.away.push(teamLogos.no)
        break;
      case "Spurs":
        obj.away.push(teamLogos.sa)
        break;
      default:
        break;
    }
    i++
    n=n+6
    n1=n1+6
    n2=n2+6
    n3=n3+6
    n4=n4+6
    n5=n5+6
  }
  await fs.writeFile("./client/public/games.json", JSON.stringify(events))
  await browser.close()
}

module.exports = { getGames }