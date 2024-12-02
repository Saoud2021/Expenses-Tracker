const trxEL = document.getElementById("transaction-text");
const amountEl = document.getElementById("amount");
const sumbitBtn = document.getElementById("submit");
const invalidEL = document.getElementById("invalid");
const transactionEL = document.querySelector(".js-div");
const incomeEL = document.getElementById("income-amount");
const expenseEl = document.getElementById("expense-amount");
const balanceEl = document.getElementById("balance");

// Initialize variables
let trxsArray = [];
let incomeTotal = 0;
let expenseTotal = 0;
let balance = 0;

// Load data from localStorage on page load
function loadStoredData() {
  const savedData = JSON.parse(localStorage.getItem("TRX_DATA"));
  if (savedData) {
    trxsArray = savedData.transactions || [];
    incomeTotal = savedData.incomeTotal || 0;
    expenseTotal = savedData.expenseTotal || 0;
    balance = savedData.balance || 0;

    // Update UI with stored values
    incomeEL.textContent = `$${incomeTotal}`;
    expenseEl.textContent = `$${Math.abs(expenseTotal)}`;
    balanceEl.textContent = `$${balance}`;
  }
  renderTrx();
}

function renderTrx() {
  let trxHtml = "";

  for (let i = 0; i < trxsArray.length; i++) {
    const transactionText = trxsArray[i].text;
    const transactionAmount = trxsArray[i].amount;
    const html = ` 
        <div class="transaction">
            <p>${transactionText}</p>
            <p>$${transactionAmount}</p>
            <button id="delete" onclick="deleteTransaction(${i})">
            <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>`;
    trxHtml += html;
  }
  transactionEL.innerHTML = trxHtml;
}
function deleteTransaction(index) {
  // Remove the transaction from the array
  trxsArray.splice(index, 1);

  // Recalculate totals
  recalculateTotals();

  // Update localStorage
  updateLocalStorage();

  // Re-render transactions
  renderTrx();
}

function recalculateTotals() {
  incomeTotal = 0;
  expenseTotal = 0;

  for (let trx of trxsArray) {
    if (trx.amount > 0) {
      incomeTotal += trx.amount;
    } else {
      expenseTotal += trx.amount;
    }
  }

  // Update balance
  balance = incomeTotal - Math.abs(expenseTotal);

  // Update UI
  incomeEL.textContent = `$${incomeTotal}`;
  expenseEl.textContent = `$${Math.abs(expenseTotal)}`;
  balanceEl.textContent = `$${balance}`;
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

  // Recalculate totals
  recalculateTotals();

  // Update localStorage
  updateLocalStorage();

  // Clear input fields
  trxEL.value = "";
  amountEl.value = "";
  invalidEL.textContent = "";

  // Re-render transactions
  renderTrx();
}

function updateLocalStorage() {
  const dataToStore = {
    transactions: trxsArray,
    incomeTotal: incomeTotal,
    expenseTotal: expenseTotal,
    balance: balance,
  };

  localStorage.setItem("TRX_DATA", JSON.stringify(dataToStore));
}

// Load stored data when page loads
loadStoredData();

sumbitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  storeTrx();
});
