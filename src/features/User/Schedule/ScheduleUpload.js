import React from 'react';
import Schedule from '../../scheduling/Schedule';

const ScheduleUpload = ({ user, db, onScheduleUpdate }) => {
  const [scheduleInstance, setScheduleInstance] = React.useState(null);

  React.useEffect(() => {
    if (user) {
      setScheduleInstance(new Schedule(user, db));
    }
  }, [user, db]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && scheduleInstance) {
      const fileContents = await file.text();
      const parsedSchedule = await scheduleInstance.parse(fileContents);

      if (parsedSchedule && parsedSchedule.courses) {
        await scheduleInstance.save(parsedSchedule);
        // Update the scheduleData state in the parent component (User.js)
        onScheduleUpdate(parsedSchedule);
      } else {
        console.error("Error: Invalid schedule object in ScheduleUpload.js");
      }
    }
  };

  return (
    <div>
      <label htmlFor="upload-schedule">Upload Schedule:</label>
      <input
        type="file"
        id="upload-schedule"
        name="upload-schedule"
        accept=".ics"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ScheduleUpload;
