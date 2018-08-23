const Buy = require('./Actions/Buy')
const Sell = require('./Actions/Sell')
const Split = require('./Actions/Split')
const Dividend = require('./Actions/Dividend')

function MakeStatement(date, transactions, portfolio, dividend) {
    const statement = {
        date,
        events:[],
        dividend,
    }
    transactions.forEach((action) => {
        const stock = action.ticker || action.stock
        if (!portfolio[stock] && action.action !== 'BUY') {
            return
        }

        // Buy, Sell, Split, Dividend
        if (action.action === 'BUY') {
            statement.events.push(Buy(portfolio, action))
        } else if (action.action === 'SELL') {
            statement.events.push(Sell(portfolio, action))
        } else if (action.dividend) {
            statement.events.push(Dividend(statement, portfolio[stock].totalShares,action))
        } else if (action.split) {
            statement.events.push(Split(portfolio, action))
        }
    })
    return statement
}

module.exports = MakeStatement