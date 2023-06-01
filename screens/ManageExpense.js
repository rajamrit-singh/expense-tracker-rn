import { useContext, useLayoutEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
    const editedExpenseId = route?.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const expensesCtx = useContext(ExpensesContext);

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

    const confirmHandler = () => {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, {
                description: 'Test update',
                amount: 35,
                date: new Date()
            });
        } else {
            expensesCtx.addExpense({
                description: 'Test',
                amount: 19.99,
                date: new Date()
            })
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button mode='flat' onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update': 'Add'}</Button>
            </View>
            <View style={styles.deleteContainer}>
                {isEditing && <IconButton icon='trash' color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>}
            </View>
        </View>
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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})