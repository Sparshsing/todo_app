import React, { useState } from 'react';
import { List, CircularProgress, Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TaskItem from './TaskItem';
import DeleteConfirmDialog from './DeleteConfirmDialog';

function TaskList({ tasks, setTasks }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [waiting, setWaiting] = useState(false);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
        method: 'PATCH', // Using PATCH for partial update
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if needed, e.g., 'Authorization': 'Bearer <token>'
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        // If server returns an error, throw it to catch block
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const updatedTask = await response.json();
      console.log('Task updated:', updatedTask);
      // Perform any state updates or additional logic with the response as needed
    } catch (error) {
      console.error("Error updating task status:", error.message);
      throw error;  // handled in caller
      // Handle error (e.g., display error message to the user)
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if needed, e.g., 'Authorization': 'Bearer <token>'
        },
      });
  
      if (!response.ok) {
        // If the server returns a non-2xx response, throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log("Task deleted successfully");
      // Optionally, perform additional actions on successful deletion,
      // such as refreshing the task list or showing a success message
    } catch (error) {
      console.error("Error deleting task:", error.message);
      // Handle errors, such as showing an error message to the user
      throw error; // Rethrow the error if you want to handle it further up the component tree
    }
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setWaiting(true);
    deleteTask(taskToDelete)
    .then(() => {
      setWaiting(false);
      setTasks(tasks.filter(task => task.id !== taskToDelete));
    })
    .catch((error) => {
      setWaiting(false);
      setAlertMessage('Could not delete task'); // Set the error message
      setAlertOpen(true); // Show the alert
    });
    setDeleteDialogOpen(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setWaiting(true);
    updateTaskStatus(taskId, newStatus)
    .then(() => {
        setWaiting(false);
        // refresh the task list or update local state to reflect the change
        const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
        
    })
    .catch((error) => {
        // Handle any errors, such as updating the UI to inform the user of the failure
        setWaiting(false);
        setAlertMessage('Could not update task status'); // Set the error message
        setAlertOpen(true); // Show the alert
    });
    
  };

  return (
    <>
      {waiting && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
          <CircularProgress />
        </Box>
      )
      }
      <List>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onDelete={handleDeleteClick} onStatusChange={handleStatusChange}/>
        ))}
      </List>
      <Snackbar open={alertOpen} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="error" sx={{ width: '100%' }}>
            {alertMessage}
        </Alert>
      </Snackbar>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default TaskList;