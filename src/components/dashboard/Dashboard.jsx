import { useState } from 'react';
import { Grid, Paper, Typography, Box, TextField, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {
  LineChart, Line, PieChart, Pie, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useExpense } from '../../context/ExpenseContext';  

// Initial sample data
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

const DashboardCard = ({ title, children }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      height: '100%',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
      {title}
    </Typography>
    {children}
  </Paper>
);



// Remove these constants as they're now in the context
// const initialMonthlyData = [...]
// const initialCategoryData = [...]

const Dashboard = () => {
  const { monthlyData, categoryData, addExpense } = useExpense();
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());

  const handleAddExpense = () => {
    if (!expenseName || !amount) return;

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[date.getMonth()];

    const newExpense = {
      category: expenseName,
      amount: Number(amount),
      date: date.toISOString(),
      month: monthName,
      notes: `Expense for ${expenseName}`,
      id: Date.now() // unique identifier
    };

    addExpense(newExpense);

    // Reset form
    setExpenseName('');
    setAmount('');
    setDate(new Date());
  };

  return (
    <Box sx={{ flexGrow: 1, py: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 4,
          background: 'linear-gradient(45deg, #9c27b0 30%, #3f51b5 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Dashboard Overview
      </Typography>

      {/* New Expense Input Section */}
      <Grid item xs={12} sx={{ mb: 4 }}>
        <DashboardCard title="Add New Expense">
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              label="Expense Name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{ flexGrow: 1 }}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              onClick={handleAddExpense}
              sx={{
                background: 'linear-gradient(45deg, #9c27b0 30%, #3f51b5 90%)',
                color: 'white',
                flexGrow: 0,
              }}
            >
              Add Expense
            </Button>
          </Box>
        </DashboardCard>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <DashboardCard title="Monthly Expenses">
            <Box sx={{ height: 300, width: '100%' }}>
              <ResponsiveContainer>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardCard title="Expense Categories">
            <Box sx={{ height: 300, width: '100%' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </DashboardCard>
        </Grid>

        <Grid item xs={12}>
          <DashboardCard title="Category Comparison">
            <Box sx={{ height: 300, width: '100%' }}>
              <ResponsiveContainer>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;