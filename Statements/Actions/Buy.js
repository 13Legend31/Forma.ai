function Buy(portfolio, { price, ticker, shares }) {
    price = parseFloat(price)
    shares = parseInt(shares, 10)
    if (!portfolio[ticker]) {
        portfolio[ticker] = {
            averagePrice: 0,
            totalShares: 0
        }
    }
    const p = portfolio[ticker]
    // new price = weighted average of old price
    const total = p.totalShares + shares
    p.averagePrice = p.averagePrice * p.totalShares/total + price * shares/total
    p.totalShares += shares

    return `You bought ${shares} shares of ${ticker} at a price of $${price.toFixed(2)} per share`
}

module.exports = Buy