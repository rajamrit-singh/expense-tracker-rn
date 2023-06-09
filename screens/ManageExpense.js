import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpense = ({ route, navigation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const editedExpenseId = route?.params?.expenseId;
    const expensesCtx = useContext(ExpensesContext);
    const expense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId);
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        setIsSubmitting(true);
        try {
            expensesCtx.deleteExpense(editedExpenseId)
            navigation.goBack();
        } catch(error) {
            setError('Could not delete expense');
            setIsSubmitting(false);
            return;
        }
    }

    const cancelHandler = () => {
        navigation.goBack();
    }
    
    const errorHandler = () => {
        setError(null)
    }

    const confirmHandler = async (expenseData) => {
        setIsSubmitting(true);
        if (isEditing) {
            try {
                await updateExpense(editedExpenseId, expenseData);
                expensesCtx.updateExpense(editedExpenseId, expenseData);
            } catch(error) {
                setError('Could not submit expense');
                setIsSubmitting(false);
                return;
            }
        } else {
            try {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id: id});
            } catch(error) {
                setError('Could not submit expense');
                setIsSubmitting(false);
                return;
            }
        }
        navigation.goBack();
    }

    if(error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* added flexgrow to solve button overlapping input box when keyboard popup */}
        <View style={styles.container}>
            <ExpenseForm cancelHandler={cancelHandler} onSubmit={confirmHandler} isEditing={isEditing} defaultValue={expense}/>
            <View style={styles.deleteContainer}>
                {isEditing && <IconButton icon='trash' color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>}
            </View>
        </View>
        </ScrollView>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        botderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'        
    },
});
