import React, { useState, useEffect } from 'react';
import ProfileDisplay from './ProfileDisplay';
import ProfileEdit from './ProfileEdit';
import fetchStudentInfo from '../../services/fetchStudentInfo';

function Profile({ user, firestore, storage }) {
  const [studentInfo, setStudentInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchStudentInfo(user.uid, firestore, storage).then((info) => {
        setStudentInfo(info);
      });
    }
  }, [user, firestore, storage]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (updatedInfo) => {
    setStudentInfo(updatedInfo);
    setIsEditing(false);
  };

  return (
    <div>
      {studentInfo ? (
        isEditing ? (
          <ProfileEdit
            studentInfo={studentInfo}
            onSave={handleSave}
            onCancel={handleCancel}
            db={firestore}
          />
        ) : (
          <ProfileDisplay studentInfo={studentInfo} onEdit={handleEdit} />
        )
      ) : (
        <p>Loading student information...</p>
      )}
    </div>
  );
}

export default Profile;
