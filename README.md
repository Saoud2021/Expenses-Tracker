# Transaction Tracker

A simple transaction tracker application that allows users to record, display, and manage their income and expense transactions. The application dynamically updates the total income, total expense, and the balance as transactions are added or removed. [you can view it here](https://expenseztracker.netlify.app/) 
![Screenshot](./design/Screenshot 2024-12-21 140133.png)

## Features

- Add income and expense transactions with a description and amount.
- View a list of all transactions, with options to delete individual entries.
- Automatically calculates and displays the total income, total expense, and balance.
- Input validation for empty transaction names and invalid amounts.

## Technologies Used

- **HTML**: Markup structure of the application.
- **CSS**: Basic styling for the layout.
- **JavaScript**: Used to handle the logic for adding, deleting transactions, and updating the totals dynamically.

## How It Works

1. **Add Transaction:**
   - Enter the transaction name and amount in the respective fields.
   - Click the "Submit" button to add the transaction.
   - The amount can be positive (income) or negative (expense).
2. **Transaction List:**

   - All transactions are displayed in a list below the form.
   - Each transaction includes the description and the amount.
   - A trash icon next to each transaction allows users to delete individual transactions.

3. **Totals Calculation:**
   - Total **income** is displayed at the top, calculated from all positive amounts.
   - Total **expense** is displayed, showing the absolute value of all negative amounts.
   - The **balance** is calculated as the difference between income and expense.

## How to Use

1. Clone the repository or download the project files.
2. Open `index.html` in your browser to run the application.
3. To start tracking your transactions, simply input the transaction name and amount, then click the "Submit" button.
4. Transactions will appear below, and totals will update automatically.
5. You can delete any transaction by clicking the trash icon next to it.
