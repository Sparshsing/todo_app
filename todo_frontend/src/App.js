import './App.css';
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// import { Grid } from '@mui/material';
import Header from './components/Header';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import Filter from './components/Filter';
// import Footer from './components/Footer';

import { Container } from '@mui/material';
import TaskList from './components/TaskList';
import TaskControls from './components/TaskControls';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {

  const initialTasks = [
    { id: 1, title: "Task 1", description: "Description 1 ijsaidasjhkjh  a very long description\nline 1,  sdjskd\n line2", status: "To Do" },
    { id: 2, title: "Task 2", description: "Description 2", status: "In Progress" },
    { id: 3, title: "Task 3", description: "Description 3", status: "Done" },
  ]

  const [tasks, setTasks] = useState(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const handleSearch = (searchTerm) => {
    applyFilters(searchTerm, null);
  };

  const handleFilter = (filter) => {
    applyFilters(null, filter);
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
      <Header></Header>
      
      <Container>
      {/* Other components like Header */}
      
        <TaskControls onFilter={applyFilters} onSort={handleSort} />
        <TaskList tasks={filteredTasks} setTasks={setTasks}/>
      </Container>
    </ThemeProvider>
  );
}
