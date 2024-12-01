const trxEL = document.getElementById("transaction-text");
const amountEl = document.getElementById("amount");
const sumbitBtn = document.getElementById("submit");
const invalidEL = document.getElementById("invalid");
const transactionEL = document.querySelector(".js-div");
const incomeEL = document.getElementById("income-amount");
const expenseEl = document.getElementById("expense-amount");
const balanceEl = document.getElementById("balance");

let trxsArray = [];

renderTrx();

function renderTrx() {
  let trxHtml = ""; // Reset HTML

  for (let i = 0; i < trxsArray.length; i++) {
    const transactionText = trxsArray[i].text;
    const transactionAmount = trxsArray[i].amount;
    const html = ` 
        <div class="transaction">
            <p>${transactionText}</p>
            <p>${transactionAmount}</p>
            <button id="delete" onclick = "trxsArray.splice(${i},1)
            renderTrx()">
            <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>`;
    trxHtml += html;
  }
  transactionEL.innerHTML = trxHtml;
}

function storeTrx() {
  let trxText = trxEL.value;
  let trxAmount = parseInt(amountEl.value);

  if (trxText === "") {
    invalidEL.textContent = "Transaction Name cannot be empty";
    return;
  }
  if (trxAmount === 0 || isNaN(trxAmount)) {
    invalidEL.textContent = "Enter a valid amount";
    return;
  }
  const newTrx = {
    text: trxText,
    amount: trxAmount,
  };

  trxsArray.push(newTrx);

  let incomeTotal = 0;
  let expenseTotal = 0;

  for (let trx of trxsArray) {
    if (trx.amount > 0) {
      incomeTotal += trx.amount;
    } else {
      expenseTotal += trx.amount;
    }
  }

  incomeEL.innerHTML = incomeTotal;
  expenseEl.innerHTML = Math.abs(expenseTotal);
  balanceEl.innerHTML = incomeTotal - Math.abs(expenseTotal);

  trxEL.value = "";
  amountEl.value = "";
  invalidEL.textContent = ""; // Clear validation message

  renderTrx();
}

sumbitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  storeTrx();
});
