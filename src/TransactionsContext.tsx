import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';


//Tipando o formato das transações
interface Transaction {
    id: string; 
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; //pega a interface transaction menos o id e o createdAt

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);


    //Carregando dados da api 
    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions)) //estou salvando as transações 
    }, []);


    async function createTransaction(transactionInput: TransactionInput) {
        //enviando dados para api
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })
        const { transaction } = response.data

        setTransactions([
            ...transactions,
            transaction
        ]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

