import React, { useState } from 'react';
import { Box, TextField, IconButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';

function TaskControls({ onFilter, onSort }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    // onSearch(value);
    onFilter(value, statusFilter);
  };

  const handleStatusFilterChange = (event) => {
    const { value } = event.target;
    setStatusFilter(value);
    onFilter(searchTerm, value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'end', gap: 2, marginTop: 2, marginBottom: 0, marginLeft: 2 }}>
      {/* Search */}
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search tasks..."
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => onFilter(searchTerm, statusFilter)}>
              <SearchIcon />
            </IconButton>
          ),
        }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      
      {/* Filter */}
      <FormControl size="small">
        <InputLabel id="filter-select-label">Filter</InputLabel>
        <Select
          labelId="filter-select-label"
          id="filter-select"
          value={statusFilter}
          label="Filter"
          onChange={handleStatusFilterChange}
          startAdornment={<FilterListIcon />}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>

      {/* Sort */}
      <IconButton onClick={onSort}>
        <SwapVertIcon />
      </IconButton>
    </Box>
  );
}

export default TaskControls;
