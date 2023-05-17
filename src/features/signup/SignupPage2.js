import React, { useState } from 'react';
import { TextField, Grid, Button, Typography, Box, TextareaAutosize } from '@mui/material';
import StudentCard from './StudentCard';
import parseICSFile from '../scheduling/parseICSFile';

function SignupPage2({ userData, onNext, onBack}) {
  const [bio, setBio] = useState(userData.bio || '');
  const [username, setUsername] = useState(userData.username || '');
  const [profilePhoto, setProfilePhoto] = useState(userData.profilePhoto || '');
  const [previewPhoto, setPreviewPhoto] = useState(userData.previewPhoto || '');
  const [major, setMajor] = useState(userData.major || '');
  const [fileInput, setFileInput] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ username, bio, profilePhoto, major, scheduleData});
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const parsedSchedule = parseICSFile(event.target.result);
      setScheduleData(parsedSchedule);
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Personalize Your Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <StudentCard
            studentName={userData.studentName}
            username={username}
            bio={bio}
            profilePhoto={previewPhoto}
            major={major}
            courses={scheduleData?.courses}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto'}}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Major"
              variant="outlined"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
            <TextareaAutosize
              minRows={3}
              placeholder="Enter your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              style={{ display: 'none' }}
              id="profile-photo-upload"
            />
            <label htmlFor="profile-photo-upload">
              <Button variant="contained" color="primary" component="span">
                Upload Profile Photo
              </Button>
            </label>
            <input
              type="file"
              accept=".ics"
              ref={setFileInput}
              onChange={handleFileChange}
              id="schedule-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="schedule-upload">
              <Button variant="contained" color="primary" component="span">
                Upload Schedule
              </Button>
            </label>
            <Button variant="outlined" color="primary" onClick={onBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignupPage2;