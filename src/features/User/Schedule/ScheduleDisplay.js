import React from 'react';
import Schedule from './Schedule';
import './ScheduleDisplay.css';

const ScheduleDisplay = ({ scheduleData, user, firestore }) => {
  const [scheduleInstance, setScheduleInstance] = React.useState(null);
  const [scheduleDisplay, setScheduleDisplay] = React.useState(null);
  const [loading, setLoading] = React.useState(true); // add this line

  React.useEffect(() => {
    if (user && firestore) {
      setScheduleInstance(new Schedule(user, firestore));
    }
  }, [user, firestore]);

  React.useEffect(() => {
    if (scheduleData && scheduleInstance) {
      setScheduleDisplay(scheduleInstance.displaySchedule(scheduleData));
      setLoading(false); // add this line
    }
  }, [scheduleData, scheduleInstance]);

  if (loading) { // add this block
    return <p>Loading...</p>;
  }

  return (
    <div className='ScheduleDisplay'>
      {scheduleDisplay && (
        <div>
          <h3>Schedule:</h3>
          {scheduleDisplay}
        </div>
      )}
    </div>
  );
};

export default ScheduleDisplay;
