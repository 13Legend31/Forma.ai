function Dividend(statement, totalShares, { dividend, stock } ) {
    dividend = parseFloat(dividend)
    const totalDividend = dividend * totalShares
    statement.dividend += totalDividend

    return `${stock} paid out $${dividend.toFixed(2)} dividend per share, and you have ${totalShares} shares`
}

module.exports = Dividend