import { Text, StyleSheet, View } from "react-native"; 
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const RecentExpenses = () => {
    return (
        // <View>
        <ExpensesOutput expensesPeriod={'Last 7 days'} />
        // </View>
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({

})