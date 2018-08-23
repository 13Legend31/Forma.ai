function Sell(portfolio, { price, ticker, shares }) {
    price = parseFloat(price)
    shares = parseInt(shares, 10)
    const p = portfolio[ticker]
    p.totalShares -= shares
    if (p.totalShares === 0) {
        delete portfolio[ticker]
    }
    
    const profit = shares * price - shares * p.averagePrice
    return `You sold ${shares} shares of ${ticker} at a price of $${price.toFixed(2)} per share for a ${profit >= 0 ? 'profit' : 'loss'} of $${profit.toFixed(2)}`
}

module.exports = Sell