import React from "react";
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledInput = styled('input')(({ theme }) => ({
  display: 'none',
}));

const ScheduleUpload = ({ user, scheduleInstance, onScheduleUpdate }) => {
  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        const fileContents = event.target.result;
        try {
          const scheduleData = await scheduleInstance.parse(fileContents);
          scheduleInstance.save(scheduleData);
          onScheduleUpdate(scheduleData);
        } catch (error) {
          console.error("Error parsing schedule file:", error);
        }
      };
  
      reader.readAsText(file);
    }
  };
  

  return (
    <Box>
      <Typography variant="h6">Upload Schedule:</Typography>
      <StyledInput accept=".ics" id="contained-button-file" multiple type="file" onChange={handleUpload} />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </Box>
  );
};

export default ScheduleUpload;
