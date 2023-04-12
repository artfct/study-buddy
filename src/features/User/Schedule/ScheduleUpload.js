import React from "react";
import './ScheduleUpload.css';

const ScheduleUpload = ({ user, scheduleInstance, onScheduleUpdate }) => {
  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        const fileContents = event.target.result;
        try {
          const scheduleData = await scheduleInstance.parse(fileContents);
          scheduleInstance.save(scheduleData);
          onScheduleUpdate(scheduleData);
        } catch (error) {
          console.error("Error parsing schedule file:", error);
        }
      };
  
      reader.readAsText(file);
    }
  };
  

  return (
    <div className="ScheduleUpload">
      <h3>Upload Schedule:</h3>
      <input type="file" accept=".ics" onChange={handleUpload} />
    </div>
  );
};

export default ScheduleUpload;
