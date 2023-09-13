import React, { useEffect, useState } from 'react';
import { getClubNameAndProfile } from '../../services/api/club';

const formatDate = (dateString) => {
  const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const PostCard = ({ attendees, category, clubID, eventDetails, engagementData, eventFAQs, eventID, isMainEvent }) => {
  const isValidMedia = eventDetails.photoURL.trim() !== '';
  const [name, setClubName] = useState('');
  const [clubProfilePhoto, setClubProfilePhoto] = useState('');

  const fetchClubPostProfile = async (clubID) => {
    try {
      const { name, profilePhotoURL } = await getClubNameAndProfile(clubID);
      if (name) {
        setClubName(name);
      } else {
        console.log('Club name is missing');
      }

      if (profilePhotoURL) {
        setClubProfilePhoto(profilePhotoURL);
      } else {
        console.log('Club profile URL is missing');
      }
    } catch (error) {
      console.log('Error fetching club name and club profile', error);
    }
  };

  useEffect(() => {
    fetchClubPostProfile(clubID);
  }, [clubID]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={clubProfilePhoto} alt="Club Profile" style={styles.clubProfilePhoto} />
        <div style={styles.headerText}>
          <p style={styles.clubName}>{name} <span style={styles.daysLeft}>X days left</span></p>
          <p style={styles.title}>{eventDetails.title}</p>
        </div>
        <div style={styles.moreOptions}>
          <span>...</span>
        </div>
      </div>

      {isValidMedia && (
        <img
          src={eventDetails.photoURL}
          alt="Event Media"
          style={styles.media}
        />
      )}
    
        <div style={styles.description}>
            <p style={styles.descriptionText}>{eventDetails.description}</p>
        </div>

      <div style={styles.chipRow}>
        <div style={styles.chip}>
          <span>{formatDate(eventDetails.startTime)}</span>
        </div>
        <div style={styles.chip}>
          <span>{eventDetails.location}</span>
        </div>
        <div style={styles.chip}>
          <span>{eventDetails.cost}</span>
        </div>
      </div>

      <div style={styles.engagement}>
        <span>👍 {engagementData.likes}</span>
        <button onClick={() => {}}>
          <span>🔗</span>
        </button>
        <button onClick={() => {}}>
          <span>ℹ️</span>
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    // border: '1px solid #ccc',
    backgroundColor: 'white',
    marginBottom: '5px',
    // boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center vertically within the container
    width: '500px', // Set a fixed width
    maxHeight: '800px', // Set a maximum height
    overflow: 'hidden', // Hide overflow content if it exceeds the maximum height
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '60px',
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    margin: 0,
  },
  clubProfilePhoto: {
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    marginLeft: '10px'
  },
  headerText: {
    flex: '1',
    justifyContent: 'center',
    paddingLeft: '10px',
  },
  clubName: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  daysLeft: {
    fontSize: '12px',
    color: '#666',
    margin: 0,
  },
  title: {
    fontSize: '16px',
    color: '#000',
    margin: 0,
  },
  moreOptions: {
    padding: '5px',
  },
  media: {
    width: '100%',
    aspectRatio: 0.85,
    marginTop: '10px',
    maxHeight: '500px'
  },
  description: {
    width: '100%',
    marginLeft: '10px',
    maringRight: '10px',
  },
  descriptionText: {
    fontSize: '14px',
    color: '#555',
    marginTop: '10px',
    textAlign: 'left', // Align text to the left
  },
  chipRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px',
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #EFEDED',
    borderRadius: '15px',
    padding: '3px 10px',
  },
  chipText: {
    marginLeft: '5px',
    color: '#4E4E4E',
  },
  engagement: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px',
  },
};

export default PostCard;
