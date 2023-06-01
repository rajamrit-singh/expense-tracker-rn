import { Text, StyleSheet, View, FlatList } from 'react-native'; 
import { GlobalStyles } from '../../constants/styles';
import ExpenseItem from './ExpenseItem';

const ExpensesList = ({ expenses }) => {

    const renderExpenseItem = (itemData) => {
        const dt = itemData.item.date;
        const date = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
        return (
            <ExpenseItem
                amount={itemData.item.amount}
                description={itemData.item.description}
                date={date}
                id={itemData.item.id}
            />
        );
    }

    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
        />
    )
}

export default ExpensesList;

const styles = StyleSheet.create({
    informationContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 8,
        justifyContent: 'space-between',
        backgroundColor: GlobalStyles.colors.primary500,
        padding: 12,
        borderRadius: 6,
        // alignItems: 'center'
    },
    amountContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary50,
        width: '25%',
        borderRadius: 6,
        fontWeight: 'bold',
    },
    textData: {
        fontWeight: 'bold'
    },
    descriptionData: {
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary50,
        marginVertical: 2
    },
    dateData: {
        color: GlobalStyles.colors.primary50,
    }
})