import React, { createContext, useState, ReactNode } from 'react';
import { generateTransactionId } from '../utilities/transactionUtils';  // Import the utility function

interface Expense {
    amount: number;
    category: string;
    date: string;
    paymentMethod: string;
    status: string;
}

interface Transaction extends Expense { id: string; }

interface TransactionContextProps {
    transactions: Transaction[];
    expenses: Expense[];
    addTransaction: (transaction: Transaction) => void;
    addExpense: (expense: Expense) => void;
}

const TransactionContext = createContext<TransactionContextProps | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const addTransaction = (transaction: Transaction) => {
        setTransactions((prev) => [...prev, transaction]);
    };

    const addExpense = (expense: Expense) => {
        setExpenses(prev => [...prev, expense]);
        const newTransaction: Transaction = {
            id: generateTransactionId(),  
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            paymentMethod: expense.paymentMethod,
            status: expense.status
        };
        addTransaction(newTransaction);
    };

    return (
        <TransactionContext.Provider value={{ transactions, expenses, addTransaction, addExpense }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactionContext = () => {
    const context = React.useContext(TransactionContext);
    if (!context) {
        throw new Error('useTransactionContext must be used within a TransactionProvider');
    }
    return context;
};