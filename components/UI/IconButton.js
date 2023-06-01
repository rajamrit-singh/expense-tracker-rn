import { Ionicons } from '@expo/vector-icons'; 
import { View, StyleSheet, Pressable } from 'react-native';

const IconButton = ({ onPress, icon, color, size }) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHotizontal: 8,
        marginVertical: 2,
    },
    pressed: {
        opacity: 0.7
    }
})