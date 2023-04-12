import React from 'react';

const ScheduleDisplay = ({ scheduleData, scheduleInstance }) => {
  const [scheduleDisplay, setScheduleDisplay] = React.useState(null);

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
