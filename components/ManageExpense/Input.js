import { Text, StyleSheet, View, TextInput } from 'react-native'; 

const Input = ({ label }) => {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput keyboardType=''/>
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
});