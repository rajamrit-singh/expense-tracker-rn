import { Text, StyleSheet, View } from 'react-native'; 
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context'
import { getExpenses } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const getDateMinusDays = (date, days) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
    }
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    });

    const errorHandler = () => {
        setError(null)
    }
    useEffect(() => {
        const fetchExpenses = async () => {
            setIsFetching(true);
            try {
                const expenses = await getExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses');
            }
            setIsFetching(false);
        }
        fetchExpenses();
    }, []);

    if(error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    return (
        <ExpensesOutput fallBackText='No recent expenses for the last 7 days' expensesPeriod={'Last 7 days'} expenses={recentExpenses}/>
    )

}

export default RecentExpenses;

const styles = StyleSheet.create({

})