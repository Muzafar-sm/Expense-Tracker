import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Paper,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';

const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Bills',
  'Healthcare',
  'Education',
  'Others',
];

const ExpenseForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    amount: initialData?.amount || '',
    category: initialData?.category || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    notes: initialData?.notes || '',
  });

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) {
      setAlert({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error',
      });
      return;
    }

    onSubmit?.(formData);
    // Reset form if not editing
    if (!initialData) {
      setFormData({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
    }

    setAlert({
      open: true,
      message: initialData ? 'Expense Updated' : 'Expense Added',
      severity: 'success',
    });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mb: 3,
          background: 'linear-gradient(45deg, #9c27b0 30%, #3f51b5 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {initialData ? 'Update Expense' : 'Add Expense'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            required
            fullWidth
            type="number"
            name="amount"
            label="Amount"
            value={formData.amount}
            onChange={handleChange}
            variant="outlined"
          />

          <TextField
            required
            fullWidth
            select
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
            variant="outlined"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            required
            fullWidth
            type="date"
            name="date"
            label="Date"
            value={formData.date}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            name="notes"
            label="Notes"
            value={formData.notes}
            onChange={handleChange}
            variant="outlined"
            placeholder="Add notes (optional)"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              background: 'linear-gradient(45deg, #9c27b0 30%, #3f51b5 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #7b1fa2 30%, #303f9f 90%)',
              },
            }}
          >
            {initialData ? 'Update Expense' : 'Add Expense'}
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ExpenseForm;