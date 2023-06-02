import { Text, StyleSheet, View, Alert } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../UI/Button';
import { convertDateToString } from '../../utils/utils';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({ cancelHandler, onSubmit, isEditing, defaultValue }) => {

    const [inputs, setInputs] = useState({
        amount: { value: defaultValue ? defaultValue.amount.toString(): '', isValid: true},
        description: { value: defaultValue ? defaultValue.description: '', isValid: true },
        date: { value: defaultValue ? convertDateToString(defaultValue.date): '', isValid: true }
    });

    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputs((curInputs) => {
            return {
              ...curInputs,
              [inputIdentifier]: { value: enteredValue, isValid: true },
            };
          });      
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        const amountIsValid = !isNaN(expenseData?.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData?.date?.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData?.description?.trim()?.length > 0;

        console.log(descriptionIsValid)
        setInputs((curInputs) => {
            return {
                amount: { value: curInputs.amount.value, isValid: amountIsValid},
                description: { value: curInputs.description.value, isValid: descriptionIsValid},
                date: { value: curInputs.date.value, isValid: dateIsValid}
            }
        })
        if(amountIsValid && dateIsValid && descriptionIsValid) {
            onSubmit(expenseData);
        } else {
            Alert.alert('Invalid input', 'Please check your input values');
            return;
        }
    }

    const formIsValid = inputs.amount.isValid && inputs.description.isValid && inputs.date.isValid;
    return (
        <View style={styles.root}>
            <View style={styles.inputContainer}>
                <Input
                    label='Amount'
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'number-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }} />
                <Input
                    label='Date'
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }}
                />
            </View>
            <View>
            <Input
                label='Description'
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    numberOfLines: 10,
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputs.description.value
                }} />
            </View>

                {(!formIsValid) && <Text style={styles.errorText}>Form is invalid</Text>}
                <View style={styles.buttonsContainer}>
                <Button mode='flat' onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{isEditing ? 'Update': 'Add'}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'stretch',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 2
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
});