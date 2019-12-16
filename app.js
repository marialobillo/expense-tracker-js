(function(){

    // initial array of expenses, reading from localStorage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    document.getElementById('exp-Form').addEventListener('submit', function(e){

        e.preventDefault();

        // get type, name, date, and amount
        let type = document.getElementById('type').value;
        let name = document.getElementById('name').value;
        let date = document.getElementById('date').value;
        let amount = document.getElementById('amount').value;

        if(type == 'chooseOne' || name.length <= 0 || date == '' ) {return;}

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

        document.getElementById('exp-Form').reset();
        showExpenses();
    });

    function showExpenses(){

        const expenseTable = document.getElementById('expenseTable');
        expenseTable.innerHTML = '';

        if(expenses.length > 0){
            for(let i = 0; i < expenses.length; i++){

                expenseTable.appendChild(createDataRow(expenses[i])); 
                
            }  // end of for loop
        }  else {
            // expenses count is 0
            expenseTable.appendChild(createEmptyRow());           
        }
    }

    function createEmptyRow(){
        const expenseRowEl = document.createElement('TR');       

        const expenseTdTypeEl = document.createElement('TD');
        expenseTdTypeEl.setAttribute('colspan', 5);
        expenseTdTypeEl.textContent = 
            'No expense items yet! Please add one up top...';
        expenseRowEl.appendChild(expenseTdTypeEl);

        return expenseRowEl;
    }

    function createDataRow(expense){
        
        const expenseRowEl = document.createElement('TR');

        const expenseTdTypeEl = document.createElement('TD');
        expenseTdTypeEl.textContent = expense.type;
        expenseRowEl.appendChild(expenseTdTypeEl);

        const expenseTdNameEl = document.createElement('TD');
        expenseTdNameEl.textContent = expense.name;
        expenseRowEl.appendChild(expenseTdNameEl);

        const expenseTdDateEl = document.createElement('TD');
        expenseTdDateEl.textContent = expense.date;
        expenseRowEl.appendChild(expenseTdDateEl);

        const expenseTdAmountEl = document.createElement('TD');
        expenseTdAmountEl.textContent = '$' + expense.amount;
        expenseRowEl.appendChild(expenseTdAmountEl);

        const expenseTdOptionsEl = document.createElement('TD');
        const deleteAnchorEl = document.createElement('A');
        deleteAnchorEl.className = "deleteButton";
        deleteAnchorEl.onclick = function(e){
            deleteExpense(expense.id);

                // localStorage
            localStorage.setItem('expenses', JSON.stringify(expenses));
            showExpenses();
        }

        deleteAnchorEl.textContent = 'Delete';
        expenseRowEl.appendChild(deleteAnchorEl);

        return expenseRowEl;
    }

    function deleteExpense(id){
        for(let i = 0; i < expenses.length; i++){
            if(expenses[i].id == id){
                expenses.splice(i, 1);
            }
        }

       
    }

    showExpenses();


})();