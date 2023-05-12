import React, { useState } from 'react';
import editStudentInfo from '../../services/editStudentInfo';

function ProfileEdit({ user, studentInfo, firestore, storage, onCancel, onSave }) {
  const [updatedInfo, setUpdatedInfo] = useState({ ...studentInfo });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUpdatedInfo((prev) => ({ ...prev, profilePhoto: file }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editStudentInfo(user.uid, updatedInfo, firestore, storage);
    onSave(updatedInfo);
  };

  return (
    <div className="ProfileEdit">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="studentName" value={updatedInfo.studentName} onChange={handleChange} />
        </label>
        <label>
          ID:
          <input type="text" name="id" value={updatedInfo.id} onChange={handleChange} />
        </label>
        <label>
          username:
          <input type="text" name="username" value={updatedInfo.username} onChange={handleChange} />
        </label>
        <label>
          Bio:
          <textarea name="bio" value={updatedInfo.bio} onChange={handleChange} />
        </label>
        <label>
          Major:
          <input type="text" name="major" value={updatedInfo.major} onChange={handleChange} />
        </label>
        <label>
          Profile Photo:
          <input type="file" name="profilePhoto" onChange={handlePhotoChange} />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
