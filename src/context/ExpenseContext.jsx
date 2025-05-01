import { createContext, useState, useContext } from 'react';

const ExpenseContext = createContext();

// Initial sample data (removed unnecessary empty array)
const initialMonthlyData = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 1800 },
  { month: 'Mar', amount: 1400 },
  { month: 'Apr', amount: 2000 },
  { month: 'May', amount: 1600 },
];

const initialCategoryData = [
  { name: 'Food', value: 400, color: '#8884d8' },
  { name: 'Transport', value: 300, color: '#82ca9d' },
  { name: 'Entertainment', value: 200, color: '#ffc658' },
  { name: 'Shopping', value: 300, color: '#ff8042' },
  { name: 'Others', value: 200, color: '#0088fe' },
];

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]); // Initialize with sample data
  const [categoryData, setCategoryData] = useState([]); // Initialize with sample data

  const addExpense = (newExpense) => {
    // Add to expenses list
    setExpenses(prev => [...prev, newExpense]);

    // Update monthly data
    setMonthlyData(prev => {
      const monthIndex = prev.findIndex(item => item.month === newExpense.month);
      if (monthIndex >= 0) {
        const newData = [...prev];
        newData[monthIndex].amount += Number(newExpense.amount);
        return newData;
      }
      return [...prev, { month: newExpense.month, amount: Number(newExpense.amount) }];
    });

    // Update category data
    setCategoryData(prev => {
      const categoryIndex = prev.findIndex(item => item.name === newExpense.category);
      if (categoryIndex >= 0) {
        const newData = [...prev];
        newData[categoryIndex].value += Number(newExpense.amount);
        return newData;
      }
      return [...prev, { 
        name: newExpense.category, 
        value: Number(newExpense.amount), 
        color: '#' + Math.floor(Math.random()*16777215).toString(16) 
      }];
    });
  };

  // Add this function to delete expense
  const deleteExpense = (id) => {
    const expenseToDelete = expenses.find(exp => exp.id === id);
    if (!expenseToDelete) return;
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    
    // Update monthly data
    setMonthlyData(prev => {
      const newData = [...prev];
      const monthIndex = newData.findIndex(item => item.month === expenseToDelete.month);
      if (monthIndex >= 0) {
        newData[monthIndex].amount -= Number(expenseToDelete.amount);
      }
      return newData;
    });

    // Update category data
    setCategoryData(prev => {
      const expenseToDelete = expenses.find(exp => exp.id === id);
      if (!expenseToDelete) return prev;

      const newData = [...prev];
      const categoryIndex = newData.findIndex(item => item.name === expenseToDelete.category);
      if (categoryIndex >= 0) {
        newData[categoryIndex].value -= Number(expenseToDelete.amount);
      }
      return newData;
    });
  };

  // Add this function to edit expenses
  const editExpense = (id, updatedExpense) => {
    setExpenses(prev => prev.map(exp => exp.id === id ? { ...exp, ...updatedExpense } : exp));

    setMonthlyData(prev => {
      const original = expenses.find(exp => exp.id === id);
      if (!original) return prev;

      const newData = [...prev];
      const originalMonthIndex = newData.findIndex(item => item.month === original.month);
      const updatedMonthIndex = newData.findIndex(item => item.month === updatedExpense.month);

      if (originalMonthIndex >= 0) newData[originalMonthIndex].amount -= Number(original.amount);
      if (updatedMonthIndex >= 0) newData[updatedMonthIndex].amount += Number(updatedExpense.amount);
      else newData.push({ month: updatedExpense.month, amount: Number(updatedExpense.amount) });

      return newData;
    });

    setCategoryData(prev => {
      const original = expenses.find(exp => exp.id === id);
      if (!original) return prev;

      const newData = [...prev];
      const originalCatIndex = newData.findIndex(item => item.name === original.category);
      const updatedCatIndex = newData.findIndex(item => item.name === updatedExpense.category);

      if (originalCatIndex >= 0) newData[originalCatIndex].value -= Number(original.amount);
      if (updatedCatIndex >= 0) newData[updatedCatIndex].value += Number(updatedExpense.amount);
      else newData.push({
        name: updatedExpense.category,
        value: Number(updatedExpense.amount),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      });

      return newData;
    });
  };

  const value = {
    expenses,
    monthlyData,
    categoryData,
    addExpense,
    editExpense,
    deleteExpense,  // Added here
    setMonthlyData,
    setCategoryData,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
