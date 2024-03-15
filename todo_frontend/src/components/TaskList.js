import React, { useState } from 'react';
import { List } from '@mui/material';
import TaskItem from './TaskItem';
import DeleteConfirmDialog from './DeleteConfirmDialog';

function TaskList({ tasks, setTasks }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setTasks(tasks.filter(task => task.id !== taskToDelete));
    setDeleteDialogOpen(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <List>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onDelete={handleDeleteClick} onStatusChange={handleStatusChange}/>
        ))}
      </List>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default TaskList;