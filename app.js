document.getElementById('expForm').addEventListener('submit', addExpense);

// initial array of expenses, reading from localStorage
const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense(e){
    e.preventDefault();

    // get type, name, date, and amount
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let date = document.getElementById('date').value;
    let amount = document.getElementById('amount').value;

    if(type != 'chooseOne' 
        && name.length > 0 
        && date != 0 
        && amount > 0){
        const expense = {
            type, 
            name, 
            date,
            amount, 
            id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        }

        expenses.push(expense);
        // localStorage 
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    document.getElementById('expForm').reset();
}

console.log(expenses);