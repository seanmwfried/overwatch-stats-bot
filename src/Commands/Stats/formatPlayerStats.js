const formatPlayerStats = (playerJSON) => {
//If level reads 0, it's actually 100
let level = playerJSON.level;
//Blizzard set level 100 to be 0 for some dumb reason
if(level == 0){
  level = 100;
}

if(playerJSON.private){
return `
\`\`\`
Name:  ${playerJSON.username}
Level: ${level}
Private profile
Endorsements
    Level:         ${playerJSON.endorsement.level}
    Sportsmanship: ${playerJSON.endorsement.sportsmanship.rate}%
    Shot Caller:   ${playerJSON.endorsement.shotcaller.rate}%
    Good Teammate: ${playerJSON.endorsement.teammate.rate}%    
\`\`\`
`  
}else{
return `
\`\`\`
Name:  ${playerJSON.username}
Level: ${level}
Competitive
    SR:            ${playerJSON.competitive.rank}
    Win Rate:      ${playerJSON.games.competitive.win_rate}%
    Played:        ${playerJSON.games.competitive.played}
    Wins:          ${playerJSON.games.competitive.won}
    Losses:        ${playerJSON.games.competitive.lost}
    Draws:         ${playerJSON.games.competitive.draw}
    Playtime:      ${playerJSON.playtime.competitive}
Quickplay
    Wins:          ${playerJSON.games.quickplay.won}
    Playtime:      ${playerJSON.playtime.quickplay}
Endorsements
    Level:         ${playerJSON.endorsement.level}
    Sportsmanship: ${playerJSON.endorsement.sportsmanship.rate}%
    Shot Caller:   ${playerJSON.endorsement.shotcaller.rate}%
    Good Teammate: ${playerJSON.endorsement.teammate.rate}%    
\`\`\`
`  
}
}

module.exports = formatPlayerStats;