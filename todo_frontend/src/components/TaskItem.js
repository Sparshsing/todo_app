import React, { useState } from 'react';
import { ListItem, ListItemText, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Helper function to determine the background color based on the task status
function getStatusColor(status) {
    switch (status) {
      case 'To Do':
        return '#1976d2'; // Blue
      case 'In Progress':
        return '#ff9800'; // Orange
      case 'Done':
        return '#4caf50'; // Green
      default:
        return '#e0e0e0'; // Default case for unknown status
    }
  }

function TaskItem({ task, onDelete, onStatusChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const statuses = ["Done", "In Progress", "To Do"];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (newStatus) => {
    if (newStatus && newStatus !== task.status) {
      onStatusChange(task.id, newStatus);
    }
    setAnchorEl(null);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={task.title} secondary={task.description} />
      <Chip
        label={task.status}
        onClick={handleClick}
        style={{ backgroundColor: getStatusColor(task.status), color: 'white', minWidth: '100px', justifyContent: 'center' }}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
      >
        {statuses.map((status) => (
          <MenuItem key={status} onClick={() => handleClose(status)}>
            {status}
          </MenuItem>
        ))}
      </Menu>
    </ListItem>
  );
}



export default TaskItem;