const { createStatementData } = require('./create-statement-data')

function statement(invoice, plays) {

    return renderPlainText(createStatementData(invoice, plays));

    function renderPlainText(data) {
        let result = `Statement for ${data.customer}\n`;
        for (const perf of data.performances) {
            result += `  ${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)\n`;
        }
        result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
        result += `You earned ${data.totalVolume} credits \n`;
        return result;

        function usd(aNumber) {
            return new Intl.NumberFormat("en-US",
                {
                    style: "currency", currency: "USD",
                    maximumFractionDigits: 2
                }).format(aNumber);
        }
    }
}

module.exports = { statement }

