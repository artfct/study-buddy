import React, { useState } from 'react';
import { deleteUser } from '../../services/deleteUser';

const Admin = ({ firestore, storage }) => {
  const [userId, setUserId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const handleDeleteUser = async () => {
    setIsDeleting(true);
    setDeleteSuccess(null);
    setDeleteError(null);

    const success = await deleteUser(firestore, storage, userId);

    if (success) {
      setDeleteSuccess(`User ${userId} has been deleted.`);
    } else {
      setDeleteError(`Error deleting user ${userId}.`);
    }

    setIsDeleting(false);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user ID"
      />
      <button onClick={handleDeleteUser} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete User'}
      </button>
      {deleteSuccess && <p>{deleteSuccess}</p>}
      {deleteError && <p>{deleteError}</p>}
    </div>
  );
};

export default Admin;
