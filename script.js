const form = document.getElementById('transaction-form');
const title = document.getElementById('title');
const amount = document.getElementById('amount');
const type = document.getElementById('type');

const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expenses = document.getElementById('expense');

const transactionList = document.getElementById('transaction-list');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateUI(filtered = transactions) {
    transactionList.innerHTML = '';

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction, index) => {
        if (transaction.type === "income") {
            totalIncome += Number(transaction.amount);
        } else {
            totalExpenses += Number(transaction.amount);
        }
    });

    balance.textContent = totalIncome - totalExpenses;
    income.textContent = totalIncome
    expenses.textContent = totalExpenses;

    filtered.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.classList.add("transaction",transaction.type);

        li.innerHTML = `
            <span>${transaction.title}</span>
            <span>${transaction.type === "income" ? "+" : "-"} .rs${transaction.amount}</span>
            <button class="delete-btn" onclick="deleteTransaction(${transactions.indexOf(transaction)}Delete
            </button>
        `;

        transactionList.appendChild(li);
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveToLocalStorage();
    updateUI();
}

form.addEventListener("submit", function (e)  {
    e.preventDefault();

   // Validation
    if (title.value.trim() === "" || amount.value <= 0 || type.value === "") {
        alert('Please fill in all fields with valid data');
    return;
    }

    //New Transaction Object
    const newTransaction = {
        title: title.value,
        amount: amount.value,
        type: type.value
    };

    // Push into array
    transactions.push(newTransaction); 

    saveToLocalStorage();
    updateUI();

    form.reset();
});

function filterTransactions(filterType) {
    if (filterType === 'all') {
        updateUI();
    } else {
        const filtered = transactions.filter(transaction => transaction.type === filterType);
        updateUI(filtered);
    }
}

updateUI();