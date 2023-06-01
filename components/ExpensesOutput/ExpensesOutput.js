import { Text, StyleSheet, View, FlatList } from "react-native"; 
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
    {
        id: 'a1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19'),
    },
    {
        id: 'a2',
        description: 'A pair of trousers',
        amount: 21.99,
        date: new Date('2021-01-22'),
    },
    {
        id: 'a3',
        description: 'Milk',
        amount: 3.99,
        date: new Date('2022-02-19'),
    },
    {
        id: 'a4',
        description: 'Internet',
        amount: 50,
        date: new Date('2022-05-18'),
    },
    {
        id: 'a5',
        description: 'Internet',
        amount: 50,
        date: new Date('2022-06-18'),
    },
]

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
    console.log(expensesPeriod)
    return (
        <View style={styles.expenseOutputContainer}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    expenseOutputContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})