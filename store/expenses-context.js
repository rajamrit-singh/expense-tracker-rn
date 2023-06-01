import { createContext, useReducer } from "react";

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
        date: new Date('2022-05-20'),
    },
    {
        id: 'a5',
        description: 'misc',
        amount: 50,
        date: new Date('2023-05-29'),
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, data }) => {},
    deleteExpense: ({ id }) => {},
    updateExpense: ( id, { description, amount, data } ) => {}
});

const expensesReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{id, ...action.payload}, ...state]
        case 'UPDATE':
            console.log(action);
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.expenseData};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            console.log(updatableExpense)
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}

const ExpensesContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    const addExpense = ( expenseData ) => {
        dispatch({type: 'ADD', payload: expenseData})
    }

    const deleteExpense = ( id ) => {
        dispatch({type: 'DELETE', payload: id})
    }

    const updateExpense = ( id, expenseData ) => {
        dispatch({type: 'UPDATE', payload: {id, expenseData}})
    }

    const value = {
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;
