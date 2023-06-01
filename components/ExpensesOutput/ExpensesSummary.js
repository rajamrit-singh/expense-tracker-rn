import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const ExpensesSummary = ({ expenses, periodName }) => {
    console.log(expenses);
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);
    
    return (
        <View style={styles.summaryContainer}>
            <Text style={styles.periodText}>{periodName}</Text>
            <Text style={styles.amountText}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    summaryContainer: {
        flexDirection: 'row',
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 8,
        // margin: 0   ,
        borderRadius: 6,
        justifyContent: 'space-between',
    },
    amountText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    periodText: {
        fontSize: 16
    }
})