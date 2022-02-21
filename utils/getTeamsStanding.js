import axios from "axios"
import puppeteer from "puppeteer"
import fs from "fs/promises"
import moment from "moment"

async function getTeamsStanding() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.espn.com/nba/standings`)

    const teamsLogo = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".Logo__sm")).map(img => img.src)
    })

    const teams = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".hide-mobile")).map(team => team.textContent)
    })

    const teamState = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".stat-cell")).map(state => state.textContent)
    })

    for (let i = 0; i < teamState.length; i++) {
        if (teamState[i].indexOf("W") > -1 || teamState[i].indexOf("-") > -1 || teamState[i].indexOf("L") > -1 || teamState[i].indexOf(".") > -1) {
            teamState.splice(i, 1)
            i--
        }
    }
    
    let allTeams = [];
    for (let i = 0; i < teamsLogo.length; i++) {
        let index = i + 1
        let obj = {
            img: teamsLogo[i],
            name: teams[i],
            state: [teamState[i], teamState[index]]
        }
        allTeams.push(obj)
    }
    console.log(allTeams);
    await fs.writeFile("./client/public/standing.json", JSON.stringify(allTeams))
    await browser.close()
}

export  { getTeamsStanding }