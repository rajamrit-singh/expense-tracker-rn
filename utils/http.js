import axios from 'axios';

const baseUrl = 'https://react-native-project-2c538-default-rtdb.firebaseio.com/';

export const storeExpense = async (expenseData) => {
    const response = await axios.post(`${baseUrl}expenses.json`, expenseData);
    const id = response.data.name;
    return id;
}

export const getExpenses = async () => {
    const response = await axios.get(`${baseUrl}expenses.json`);
    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
    expenses.push(expenseObj);
    console.log(expenses)
    }

    return expenses;
}

export const updateExpense = async (id, expenseData) => {
    return axios.put(`${baseUrl}expenses/${id}.json`, expenseData);
}

export const deleteExpense = async (id) => {
    return axios.put(`${baseUrl}expenses/${id}.json`);
}