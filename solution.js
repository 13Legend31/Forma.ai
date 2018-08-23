const MakeStatement = require('./Statements/MakeStatement')
const PrintStatement = require('./Statements/PrintStatement')
const actions = [{'date': '1992/07/14 11:12:30', 'action': 'BUY', 'price': '12.3', 'ticker': 'AAPL', 'shares': '500'}, {'date': '1992/09/13 11:15:20', 'action': 'SELL', 'price': '15.3', 'ticker': 'AAPL', 'shares': '100'}, {'date': '1992/10/14 15:14:20', 'action': 'BUY', 'price': '20', 'ticker': 'MSFT', 'shares': '300'}, {'date': '1992/10/17 16:14:30', 'action': 'SELL', 'price': '20.2', 'ticker': 'MSFT', 'shares': '200'}, {'date': '1992/10/19 15:14:20', 'action': 'BUY', 'price': '21', 'ticker': 'MSFT', 'shares': '500'}, {'date': '1992/10/23 16:14:30', 'action': 'SELL', 'price': '18.2', 'ticker': 'MSFT', 'shares': '600'}, {'date': '1992/10/25 10:15:20', 'action': 'SELL', 'price': '20.3', 'ticker': 'AAPL', 'shares': '300'}, {'date': '1992/10/25 16:12:10', 'action': 'BUY', 'price': '18.3', 'ticker': 'MSFT', 'shares': '500'}]
const stock_actions = [{'date': '1992/08/14', 'dividend': '0.10', 'split': '', 'stock': 'AAPL'}, {'date': '1992/09/01', 'dividend': '', 'split': '3', 'stock': 'AAPL'}, {'date': '1992/10/15', 'dividend': '0.20', 'split': '', 'stock': 'MSFT'},{'date': '1992/10/16', 'dividend': '0.20', 'split': '', 'stock': 'ABC'}]

const portfolio = {} // { ticker: {averagePrice, totalShares}, ... }
const transactions = []
let date = ''
let dividend = 0

let i = 0,
    j = 0

// look at the lowest date, then set transactions for that date
while (i < actions.length && j < stock_actions.length) {
    transactions.length = 0

    const d1 = actions[i].date.split(' ')[0],
          d2 = stock_actions[j].date
    if (actions[i].date === stock_actions[j].date) {
        date = d1
        transactions.push(actions[i])
        transactions.push(stock_actions(j))
        i++, j++
    } else if (new Date(d1) < new Date(d2)) {
        date = d1
        transactions.push(actions[i])
        i++
    } else {
        date = d2      
        transactions.push(stock_actions[j])
        j++
    }

    // for the test case, we don't need these loops but in general, we do
    for (i; i < actions.length && actions[i].date.split(' ')[0] === date; i++) {
        transactions.push(actions[i])
    }
    for (j; j < stock_actions.length && stock_actions[j].date === date; j++) {
        transactions.push(stock_actions[j])
    }
    //----------------------------------------------------------------------------

    const statement = MakeStatement(date, transactions, portfolio, dividend)
    dividend = statement.dividend
    if (statement.events.length > 0) {
        PrintStatement(statement, portfolio)
    }
}


// continue the next set of actions
let k = i === actions.length ? j : i
const continuation = i === actions.length ? stock_actions : actions

while (k < continuation.length) {
    // edge case - if the first continued date is the same as the previous date
    let d = continuation[k].date.split(' ')[0]
    if (d !== date) {
        transactions.length = 0
        date = d
    }

    for (k; k < continuation.length && continuation[k].date.split(' ')[0] === date; k++) {
        transactions.push(continuation[k])
    }

    const statement = MakeStatement(date, transactions, portfolio, dividend)
    dividend = statement.dividend
    if (statement.events.length > 0) {
        PrintStatement(statement, portfolio)
    }
}


// Analysis

// Define: a = actions.length, b = stock_actions.length

// Time Complexity:
// O(a + b)

// Space Complexity:
// Best Case: O(1) - No overlapping dates
// Worst Case: O(a + b) - 1 unique date