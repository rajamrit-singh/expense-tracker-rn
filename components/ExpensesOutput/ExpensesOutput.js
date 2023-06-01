import { Text, StyleSheet, View, FlatList } from 'react-native'; 
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

const ExpensesOutput = ({ expenses, expensesPeriod, fallBackText }) => {
    let content = <Text style={styles.infoText}>{fallBackText}</Text>
    
    if(expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />;
    }
    return (
        <View style={styles.expenseOutputContainer}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
            {content}
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    expenseOutputContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})