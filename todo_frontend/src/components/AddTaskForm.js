import React, { useState } from 'react';
import { TextField, DialogContent, DialogTitle, Button, Box, Typography } from '@mui/material';

function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [apiError, setApiError] = useState(''); // State to store API error messages

  const DEFAULT_STATUS = 'To Do';

  const createTask = async (taskData) => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization if needed
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = Object.entries(errorData).map(([field, errors]) => {
          return `${field}: ${errors.join(', ')}`;
        }).join('\n');
        console.log('api error', errorData);
        throw new Error(errorMessage || errorData.detail || "An error occurred");
      }
      return await response.json(); // Successfully created task
    } catch (error) {
      console.error("Error creating task:", error.message);
      throw error; // Rethrow to handle it in the calling component
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title === '') { // Example condition to simulate an API validation error
        throw new Error("Title can't be empty");
      }
      const status = DEFAULT_STATUS;
      const newTask = await createTask({ title, description, status });
      console.log('task created', newTask)
      // Handle success (e.g., add newTask to state, clear form)
      
      onTaskAdded();
      setTitle('');
      setDescription('');
      setApiError('');
    } catch (error) {
      // Handle error (e.g., set error state to display error message in the form)
      setApiError(error.message);
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // API call to add the task will go here
  //   onTaskAdded({ title, description }); // Placeholder for now
  //   setTitle('');
  //   setDescription('');
  // };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 2 }}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        {/* {apiError && <Box color="error.main">{apiError}</Box>} Display API error message */}
        {apiError && (
          <Typography color="error" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
            {apiError}
          </Typography>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add Task
        </Button>
      </DialogContent>
    </Box>
  );
}


export default AddTaskForm;