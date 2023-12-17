function checkCashRegister(price, cash, cid) {
  const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  let changeDue = cash - price;
  let changeArray = [];

  let totalCID = 0;
  for (let i = 0; i < cid.length; i++) {
    totalCID += cid[i][1];
  }
  totalCID = totalCID.toFixed(2);

  if (parseFloat(totalCID) < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (parseFloat(totalCID) === changeDue) {
    return { status: "CLOSED", change: cid };
  } else {
    for (let i = cid.length - 1; i >= 0; i--) {
      const currency = cid[i][0];
      const unitValue = currencyUnit[currency];
      const availableCash = cid[i][1];
      let count = Math.floor(availableCash / unitValue);
      let returnedCount = 0;

      while (changeDue >= unitValue && count > 0) {
        changeDue -= unitValue;
        changeDue = changeDue.toFixed(2);
        returnedCount++;
        count--;
      }

      if (returnedCount > 0) {
        changeArray.push([currency, returnedCount * unitValue]);
      }
    }

    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else {
      return { status: "OPEN", change: changeArray };
    }
  }
}
