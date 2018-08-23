function PrintStatement({ date, events, dividend }, portfolio) {// portfolio = { ticker: {average, totalShares}, ... }
    console.log(`On ${date.replace(/\//g, '-')}, you have:`)
    for (const stock in portfolio) {
        if (portfolio.hasOwnProperty(stock)) {
            console.log(`   - ${portfolio[stock].totalShares} shares of ${stock} at $${portfolio[stock].averagePrice} per share`)
        }
    }
    console.log(`   - $${dividend} of dividend income`)
    console.log(`  Transactions:`)
    events.forEach((e) => {
        console.log(`   - ${e}`)
    })
}

module.exports = PrintStatement