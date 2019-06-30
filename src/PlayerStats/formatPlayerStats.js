const formatPlayerStats = (playerJSON) => {
  return `
\`\`\`
Name: ${playerJSON.username}
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

module.exports = formatPlayerStats;