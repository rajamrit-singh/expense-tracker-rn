import { Pressable } from 'react-native';
import { Text, StyleSheet, View } from 'react-native'; 
import { GlobalStyles } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';

const ExpenseItem = ({ amount, date, description, id }) => {
    const navigation = useNavigation();
    const expensePressHandler = (id) => {
        navigation.navigate('ManageExpense', {
            expenseId: id
        });
    }
    return (
        <Pressable onPress={()=> expensePressHandler(id)} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.informationContainer}>
                <View style={styles.descriptionDateContainer}>
                    <Text style={styles.descriptionData}>{description}</Text>
                    <Text style={styles.dateData}>{date}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.textData}>{amount}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
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