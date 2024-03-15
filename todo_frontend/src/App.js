import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Dialog, IconButton, CircularProgress, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './App.css';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import TaskControls from './components/TaskControls';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {

  const sampleTasks = [
    { id: 1, title: "Task 1", description: "Description 1", status: "To Do" },
    { id: 2, title: "Task 2", description: "Description 2", status: "In Progress" },
    { id: 3, title: "Task 3", description: "Description 3", status: "Done" },
  ]

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/tasks/');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleOpenAddTaskDialog = () => {
    setOpenAddTaskDialog(true);
  };

  const handleCloseAddTaskDialog = () => {
    setOpenAddTaskDialog(false);
  };

  const handleSort = () => {
    setFilteredTasks([...filteredTasks].sort((a, b) => a.status.localeCompare(b.status)));
  };

  const applyFilters = (searchTerm, filter) => {
    let tempTasks = [...tasks];
    if (filter && filter !== 'All') {
      tempTasks = tempTasks.filter(task => task.status === filter);
    }

    if (searchTerm) {
      tempTasks = tempTasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    setFilteredTasks(tempTasks);
  };

  useEffect(() => {
    applyFilters('', 'All');
  }, [tasks]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header onAddTaskClick={handleOpenAddTaskDialog}></Header>
      
      <Container>
        {/* {error && <Box color="error.main">{error}</Box>}
        {loading && <CircularProgress />}
        <TaskControls onFilter={applyFilters} onSort={handleSort} />
        <TaskList tasks={filteredTasks} setTasks={setTasks}/> */}

        {error ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Box>
        ) : loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TaskControls onFilter={applyFilters} onSort={handleSort} />
            <TaskList tasks={filteredTasks} setTasks={setTasks} />
          </>
        )}

        <Dialog open={openAddTaskDialog} onClose={handleCloseAddTaskDialog} aria-labelledby="form-dialog-title">
          <IconButton onClick={handleCloseAddTaskDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          <AddTaskForm />
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
