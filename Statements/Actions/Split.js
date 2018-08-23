function Split(portfolio, { stock, split }) {
    split = parseInt(split, 10)
    portfolio[stock].totalShares *= split
    portfolio[stock].averagePrice /= split

    return `${stock} split ${split} to 1, and you have ${portfolio[stock].totalShares} shares`
}

module.exports = Split