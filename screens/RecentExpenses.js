import { Text, StyleSheet, View } from 'react-native'; 
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context'

const RecentExpenses = () => {
    const getDateMinusDays = (date, days) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
    }
    const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    });

    return (
        <ExpensesOutput fallBackText='No recent expenses for the last 7 days' expensesPeriod={'Last 7 days'} expenses={recentExpenses}/>
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({

})