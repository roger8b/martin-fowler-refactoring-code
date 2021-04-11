function statement(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformances);
    return renderPlainText(statementData, invoice, plays);

    function enrichPerformances(aPerformance) {
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        return result;

        function amountFor(aPerformance) {
            let result = 0;

            switch (aPerformance.play.type) {
                case "tragedy":
                    result = 40000;
                    if (aPerformance.audience > 30) {
                        result += 1000 * (aPerformance.audience - 30);
                    }
                    break;
                case "comedy":
                    result = 30000;
                    if (aPerformance.audience > 20) {
                        result += 10000 + 500 * (aPerformance.audience - 20);
                    }
                    result += 300 * aPerformance.audience;
                    break;
                default:
                    throw new Error(`unknown type: ${playFor(aPerformance).type}`);
            }

            return result;
        }

        function playFor(perf) {
            return plays[perf.playID];
        }
    }

    function renderPlainText(data, invoice, plays) {
        let result = `Statement for ${data.customer}\n`;
        for (const perf of data.performances) {
            result += `  ${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)\n`;
        }
        result += `Amount owed is ${usd(totalAmount() / 100)}\n`;
        result += `You earned ${totalVolumeCredits()} credits \n`;
        return result;

        function totalAmount() {
            let result = 0;
            for (const perf of data.performances) {
                result += perf.amount;
            }
            return result;
        }

        function totalVolumeCredits() {
            let result = 0;
            for (const perf of data.performances) {
                result += volumeCreditsFor(perf)
            }
            return result;
        }

        function usd(aNumber) {
            return new Intl.NumberFormat("en-US",
                {
                    style: "currency", currency: "USD",
                    maximumFractionDigits: 2
                }).format(aNumber);
        }

        function volumeCreditsFor(aPerformance) {
            let result = 0;
            result += Math.max(aPerformance.audience - 30, 0);
            if ("comedy" == aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
            return result
        }
    }
}

module.exports = { statement }

