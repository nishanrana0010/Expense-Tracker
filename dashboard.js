// // Selecting necessary elements
// const balanceEl = document.getElementById("balance");
// const expenseAmountEl = document.getElementById("expense-amount");
// const incomeAmountEl = document.getElementById("income-amount");
// const historyBody = document.getElementById("history-body");

// const titleInput = document.querySelector(".new-title input");
// const amountInput = document.querySelector(".new-amount input");

// let balance = 1000.0;
// let expense = 200.0;
// let income = 600.0;
// let transactions = [];

// function updateValues() {
//   balanceEl.textContent = `$${balance.toFixed(2)}`;
//   incomeAmountEl.textContent = `$${income.toFixed(2)}`;
//   expenseAmountEl.textContent = `$${expense.toFixed(2)}`;
// }

// function addTransaction(title, amount) {
//   // Create a new table row
//   const row = document.createElement("tr");

//   // Create a cell for the title
//   const titleCell = document.createElement("td");
//   titleCell.textContent = title;
//   row.appendChild(titleCell);

//   // Create a cell for the amount
//   const amountCell = document.createElement("td");
//   amountCell.textContent = `${amount < 0 ? "-" : "+"}$${Math.abs(
//     amount
//   ).toFixed(2)}`;
//   row.appendChild(amountCell);

//   // Append the row to the history body
//   historyBody.appendChild(row);
// }
// function handleAddTransaction() {
//   const title = titleInput.value.trim();
//   const amount = parseFloat(amountInput.value.trim());

//   if (title === "" || isNaN(amount)) {
//     alert("Please enter a valid title and amount");
//     return;
//   }

//   if (amount < 0 && Math.abs(amount) > balance) {
//     alert("Not enough balance");
//     return;
//   }

//   addTransaction(title, amount);

//   if (amount > 0) {
//     income += amount;
//   } else {
//     expense += Math.abs(amount);
//   }
//   balance += amount;

//   updateValues();

//   titleInput.value = "";
//   amountInput.value = "";
// }

// updateValues();
// Selecting necessary elements
const balanceEl = document.getElementById("balance");
const expenseAmountEl = document.getElementById("expense-amount");
const incomeAmountEl = document.getElementById("income-amount");
const historyBody = document.getElementById("history-body");

const titleInput = document.querySelector(".new-title input");
const amountInput = document.querySelector(".new-amount input");

let balance = 1000.0;
let expense = 200.0;
let income = 600.0;
let transactions = [];

// Function to update values on the dashboard
function updateValues() {
  balanceEl.textContent = `$${balance.toFixed(2)}`;
  incomeAmountEl.textContent = `$${income.toFixed(2)}`;
  expenseAmountEl.textContent = `$${expense.toFixed(2)}`;
}

// Function to add a transaction to the history table
function addTransaction(title, amount) {
  // Create a new table row
  const row = document.createElement("tr");

  // Create a cell for the title
  const titleCell = document.createElement("td");
  titleCell.textContent = title;
  row.appendChild(titleCell);

  // Create a cell for the amount
  const amountCell = document.createElement("td");
  amountCell.textContent = `${amount < 0 ? "-" : "+"}$${Math.abs(
    amount
  ).toFixed(2)}`;
  row.appendChild(amountCell);

  // Append the row to the history body
  historyBody.appendChild(row);
}

// Function to handle adding a transaction
function handleAddTransaction() {
  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (title === "" || isNaN(amount)) {
    alert("Please enter a valid title and amount");
    return;
  }

  if (amount < 0 && Math.abs(amount) > balance) {
    alert("Not enough balance");
    return;
  }

  // Send the transaction data to the backend
  fetch("http://localhost:5000/api/income", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      amount,
      category: "Example Category", // You can replace this with actual category logic
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);

      addTransaction(title, amount);

      if (amount > 0) {
        income += amount;
      } else {
        expense += Math.abs(amount);
      }
      balance += amount;

      updateValues();

      titleInput.value = "";
      amountInput.value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to fetch and display transaction history
function updateHistory() {
  fetch("http://localhost:5000/api/income")
    .then((response) => response.json())
    .then((data) => {
      historyBody.innerHTML = "";
      data.forEach((transaction) => {
        addTransaction(transaction.title, transaction.amount);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Initial call to populate history
updateHistory();

updateValues();
