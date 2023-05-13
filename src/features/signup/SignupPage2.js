import React, { useState } from 'react';
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
    if (!username) {
      alert('Username is required.');
      return;
    }
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
    <div>
      <h2>Signup Page 2</h2>
      <StudentCard
        studentName={userData.studentName}
        username={username}
        bio={bio}
        profilePhoto={previewPhoto}
        major={major}
        courses={scheduleData?.courses}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
        <textarea
          placeholder="Enter your Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePhotoChange}
        />
        <input
          type="file"
          accept=".ics"
          ref={setFileInput}
          onChange={handleFileChange}
        />
        <button onClick={onBack}>Back</button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default SignupPage2;
