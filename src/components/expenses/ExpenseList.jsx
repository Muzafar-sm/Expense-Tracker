import { useState } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, IconButton, TextField, MenuItem, Box, Typography, Stack,
  Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const categories = ['All', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Others'];
const expenseCategories = categories.filter(cat => cat !== 'All');

const ExpenseList = () => {
  // Update this line to include deleteExpense from context
  const { expenses, editExpense, deleteExpense } = useExpense();
  
  // Remove these lines as they're not needed anymore
  // const setExpenses = (id) => (prev => prev.filter(expense => expense.id !== id));
  // const deleteExpense = (id) => { ... };

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editFormData, setEditFormData] = useState({
    category: '',
    amount: '',
    notes: ''
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
    setDeleteDialogOpen(true);
  };
  

  const handleDeleteConfirm = () => {
    if (expenseToDelete) {
      deleteExpense(expenseToDelete.id); // This will now use the context's deleteExpense
      setDeleteDialogOpen(false);
      setExpenseToDelete(null);
    }
  };
  

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setEditFormData({
      category: expense.category,
      amount: expense.amount,
      notes: expense.notes
    });
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editingExpense && editFormData.category && editFormData.amount) {
      editExpense(editingExpense.id, {
        ...editingExpense,
        ...editFormData
      });
      setEditDialogOpen(false);
      setEditingExpense(null);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
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
          Expenses List
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Search expenses"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
          <TextField
            select
            label="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ minWidth: 200 }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {filteredExpenses.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
            No expenses found
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow
                    key={expense.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: 'action.hover' },
                    }}
                  >
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell align="right">
                      ${parseFloat(expense.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>{expense.notes}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleEditClick(expense)}
                            sx={{ color: 'primary.main' }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(expense)} // ✅ Correct usage
                            sx={{ color: 'error.main' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle sx={{
          background: 'linear-gradient(45deg, #9c27b0 30%, #3f51b5 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Edit Expense
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              select
              label="Category"
              value={editFormData.category}
              onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
              fullWidth
            >
              {expenseCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Amount"
              type="number"
              value={editFormData.amount}
              onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
              fullWidth
            />
            <TextField
              label="Notes"
              value={editFormData.notes}
              onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #9c27b0 30%, #3f51b5 90%)',
              color: 'white',
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{
          background: 'linear-gradient(45deg, #9c27b0 30%, #3f51b5 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography>
            Are you sure you want to delete this expense?
            {expenseToDelete && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Category: {expenseToDelete.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Amount: ${parseFloat(expenseToDelete.amount).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(expenseToDelete.date).toLocaleDateString()}
                </Typography>
              </Box>
            )}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{
              background: 'linear-gradient(45deg, #f44336 30%, #ff9800 90%)',
              color: 'white',
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExpenseList;
