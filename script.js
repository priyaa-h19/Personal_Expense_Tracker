let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!title || !amount) {
    alert("Please enter valid title and amount");
    return;
  }

  expenses.push({ title, amount, category });
  saveExpenses();
  displayExpenses();
  updateChart();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  displayExpenses();
  updateChart();
}

function displayExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";
  expenses.forEach((expense, index) => {
    list.innerHTML += `
      <div class="expense-item">
        <span>${expense.title} - ₹${expense.amount} (${expense.category})</span>
        <button class="delete-btn" onclick="deleteExpense(${index})">X</button>
      </div>`;
  });
}

function updateChart() {
  const categories = {};
  expenses.forEach(e => {
    categories[e.category] = (categories[e.category] || 0) + e.amount;
  });

  const ctx = document.getElementById("expenseChart");
  if (chart) chart.destroy(); // Reset chart before redraw

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

// Load on page start
displayExpenses();
updateChart();
