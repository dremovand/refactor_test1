let invoice_list = {
  customer: "MDT",
  performance: [
    {
      playID: "Гамлет",
      audience: 55,
      type: "tragedy"
    },
    {
      playID: "Ромео и Джульетта",
      audience: 35,
      type: "tragedy"
    },
    {
      playID: "Отелло",
      audience: 55,
      type: "comedy"
    }
  ]
};

function statement(invoice) {
  const format = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: "2"
  }).format;
  let total = 0;
  let credits = 0;
  let comedyCount = 0;
  let output = `Счет для ${invoice.customer}:\n`;
  let performanceInfo = {
    comedy: {
      amount: 30000,
      audience: 20,
      overpay: 10000,
      overpay_pp: 500,
      static: 300
    },
    tragedy: {
      amount: 40000,
      audience: 20,
      overpay: 0,
      overpay_pp: 1000,
      static: 1
    }
  };

  invoice.performance.forEach(thisPerformance => {
    let thisAmount = 0;
    thisPerformance.type == "comedy" ? comedyCount++ : "";
    if (comedyCount % 10 == 0) {
      credits += Math.floor(thisPerformance.audience / 5);
    }

    thisAmount += performanceInfo[thisPerformance.type].amount;

    if (
      thisPerformance.audience > performanceInfo[thisPerformance.type].audience
    ) {
      thisAmount += performanceInfo[thisPerformance.type].overpay;
      thisAmount +=
        performanceInfo[thisPerformance.type].overpay_pp *
        thisPerformance.audience;
    }

    thisAmount +=
      performanceInfo[thisPerformance.type].static * thisPerformance.audience;
    credits += Math.max(thisPerformance.audience - 30, 0);
    output += `${thisPerformance.playID}:${format(thisAmount / 100)} (${
      thisPerformance.audience
    } мест)\n`;
    total += thisAmount;
  });
  output += `Итого с Вас ${format(
    total / 100
  )}\nВы заработали ${credits} бонусов.`;
  return output;
}

console.log(statement(invoice_list));
