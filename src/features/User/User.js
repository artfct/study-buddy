
import React, { useState, useEffect } from 'react';
import fetchStudentInfo from '../../services/fetchStudentInfo';
import editStudentInfo from '../../services/editStudentInfo';
import Schedule from './Schedule/Schedule';
import ScheduleUpload from './Schedule/ScheduleUpload';
import ScheduleDisplay from './Schedule/ScheduleDisplay';
import StudyBuddies from './StudyBuddies/StudyBuddies';
import ProfileEdit from '../profile/ProfileEdit';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import './User.css';
import logInCometChatUser from '../../cometchat/LogInCometChatUser';
import { CometChat } from "@cometchat-pro/chat";
import { useNavigate } from 'react-router-dom';
// import { CometChatUI } from "../../cometchat-pro-react-ui-kit-master/CometChatUI";


function User({ user, firestore, storage }) {
  const [studentInfo, setStudentInfo] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [scheduleInstance, setScheduleInstance] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (user && firestore) {
      fetchStudentInfo(user.uid, setStudentInfo, setScheduleData, firestore, storage);
      setScheduleInstance(new Schedule(user, firestore));
      // Check if the user is already logged in to CometChat
      const loggedInUser = CometChat.getLoggedInUser();
      if (!loggedInUser) {
        logInCometChatUser(user.uid, process.env.REACT_APP_COMETCHAT_AUTHKEY);
      }
    }
  }, [user, firestore]);

  const handleScheduleUpdate = (newScheduleData) => {
    setScheduleData(newScheduleData.courses);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedInfo) => {
    await editStudentInfo(user.uid, updatedInfo, firestore, storage);
    setStudentInfo(updatedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChatButtonClick = () => {
    // Redirect the user to the chat page
    navigate('/user');
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {studentInfo && studentInfo.studentName ? (
            <Box>
              <Typography variant="h4">
                Welcome, {studentInfo.studentName} [{studentInfo.id}]
              </Typography>
              <Typography variant="body1">{studentInfo.bio}</Typography>
              <Typography variant="body1">Major: {studentInfo.major}</Typography>
              {studentInfo && studentInfo.interests ? (
                <Typography variant="body1">Interests: {studentInfo.interests.join(', ')}</Typography>
              ) : null}
              <Link to="/chat">
              <Button variant="contained" color="primary">Go to Chat</Button>
            </Link>
            </Box>
          ) : (
            <Typography variant="body1">Loading student information...</Typography>
          )}
          {isEditing ? (
            <ProfileEdit
              user={user}
              firestore={firestore}
              storage={storage}
              studentInfo={studentInfo}
              onSave={handleSave}
              onCancel={handleCancel}
              db={firestore}
            />
          ) : (
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit Profile
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ marginBottom: 2 }}>
            <ScheduleUpload
              user={user}
              scheduleInstance={scheduleInstance}
              onScheduleUpdate={handleScheduleUpdate}
            />
          </Box>
          <ScheduleDisplay
            scheduleData={scheduleData}
            user={user}
            firestore={firestore}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StudyBuddies user={user} firestore={firestore} />
        </Grid>
      </Grid>
      {/* <Route path="/chat" element={<CometChatUI />} /> */}
    </Box>
  );
}

export default User;



