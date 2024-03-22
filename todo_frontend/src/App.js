import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Dialog, IconButton, CircularProgress, Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import './App.css';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import TaskControls from './components/TaskControls';
import { useAuth, AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserProfile from './components/UserProfile';


export default function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  

  // const sampleTasks = [
  //   { id: 1, title: "Task 1", description: "Description 1", status: "To Do" },
  //   { id: 2, title: "Task 2", description: "Description 2", status: "In Progress" },
  //   { id: 3, title: "Task 3", description: "Description 3", status: "Done" },
  // ];

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  

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

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleTheme = () => {
    console.log('theme change', isDarkTheme)
    setIsDarkTheme(!isDarkTheme);
  };

  const handleOpenAddTaskDialog = () => {
    setOpenAddTaskDialog(true);
  };

  const handleCloseAddTaskDialog = () => {
    setOpenAddTaskDialog(false);
  };

  const onTaskAdded = () => {
    setOpenAddTaskDialog(false);
    fetchTasks();
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
    <AuthProvider>
    <ThemeProvider theme={isDarkTheme ? darkTheme: lightTheme}>
      <CssBaseline />
      <Router>
      <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
      <Route path="/tasks" element={
        <PrivateRoute>
          <>
          <Header onAddTaskClick={handleOpenAddTaskDialog} onThemeClick={toggleTheme}></Header>
          <Container>
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
              <AddTaskForm  onTaskAdded={onTaskAdded}/>
            </Dialog>
          </Container>
          </>
        </PrivateRoute>
      } />
      <Route path="/" element={<Navigate to="/tasks" replace />} />
      </Routes>
      </Router>
    </ThemeProvider>
    </AuthProvider>
  );
}
