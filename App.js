import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import { FontAwesome } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  const ExpensesOverview = ({ navigation }) => {
    return (
      <BottomTabs.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          headerTintColor: 'white',
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => {
            return (
              <IconButton color={tintColor} size={24} onPress={() => navigation.navigate('ManageExpense')} icon='add' />
            );
          },
        }}
      >
        <BottomTabs.Screen
          name='RecentExpenses'
          component={RecentExpenses}
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name='hourglass-2' size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name='AllExpenses'
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel: 'All',
            tabBarIcon: ({ color, size }) => <FontAwesome name='calendar' size={24} color='black' />,
          }}
        />
      </BottomTabs.Navigator>
    );
  };

  return (
    <>
      <StatusBar style='light' />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: 'white',
          }}>
          <Stack.Screen
            name='ExpensesOverview'
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ManageExpense'
            component={ManageExpense}
            options={{
              presentation: 'modal'
            }}
            />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
