import { Text, StyleSheet, View } from 'react-native'; 
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    return <ExpensesOutput expensesPeriod='Total' expenses={expensesCtx.expenses} fallBackText='No Expenses'/>
}

export default AllExpenses;

const styles = StyleSheet.create({

})