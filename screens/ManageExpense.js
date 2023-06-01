import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

const ManageExpense = ({ route, navigation }) => {
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
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack();
    }

    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = (expenseData) => {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData);
        } else {
            expensesCtx.addExpense(expenseData)
        }
        navigation.goBack();
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
})