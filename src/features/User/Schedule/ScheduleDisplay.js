import React from 'react';
import Schedule from '../../scheduling/Schedule';

const ScheduleDisplay = ({ scheduleData }) => {
  const [scheduleInstance, setScheduleInstance] = React.useState(null);
  const [scheduleDisplay, setScheduleDisplay] = React.useState(null);

  React.useEffect(() => {
    setScheduleInstance(new Schedule());
  }, []);

  React.useEffect(() => {
    if (scheduleData && scheduleInstance) {
      setScheduleDisplay(scheduleInstance.displaySchedule(scheduleData));
    }
  }, [scheduleData, scheduleInstance]);

  return (
    <div>
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
