const { createStatementData } = require('./create-statement-data')

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for (const perf of data.performances) {
        result += `  ${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits \n`;
    return result;
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
    let result = `<h1>Statement for ${data.customer}</h1>\n`;
    result += "<table>\n";
    result += "<tr> <th>play</th> <tr>seats</tr> <tr>cost</tr> </tr>\n";
    for (let perf of data.performances) {
        result += `<tr> <td>${perf.play.name}</td> <td>${perf.audience}</td>`;
        result += `<td>${perf.amount}</td> </tr>\n`;
    }
    result += "</table>\n";
    result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>You earned <em>${data.totalVolume}</em></p>\n`;
    return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            maximumFractionDigits: 2
        }).format(aNumber);
}

module.exports = { statement, htmlStatement }

