import { Text, StyleSheet, View } from 'react-native'; 
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context'
import { getExpenses } from '../utils/http';

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

    useEffect(() => {
        const fetchExpenses = async () => {
            const expenses = await getExpenses();
            expensesCtx.setExpenses(expenses);
        }
        fetchExpenses();
    }, [])
    return (
        <ExpensesOutput fallBackText='No recent expenses for the last 7 days' expensesPeriod={'Last 7 days'} expenses={recentExpenses}/>
    )

}

export default RecentExpenses;

const styles = StyleSheet.create({

})