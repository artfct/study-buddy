import React from 'react';
import Schedule from './Schedule';
import './ScheduleDisplay.css';

const ScheduleDisplay = ({ scheduleData, user, firestore }) => {
  const [scheduleInstance, setScheduleInstance] = React.useState(null);
  const [scheduleDisplay, setScheduleDisplay] = React.useState(null);

  React.useEffect(() => {
    if (user && firestore) {
      setScheduleInstance(new Schedule(user, firestore));
    }
  }, [user, firestore]);

  React.useEffect(() => {
    if (scheduleData && scheduleInstance) {
      setScheduleDisplay(scheduleInstance.displaySchedule(scheduleData));
    }
  }, [scheduleData, scheduleInstance]);

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
