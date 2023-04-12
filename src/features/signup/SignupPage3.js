import React, { useState } from 'react';
import parseICSFile from '../scheduling/parseICSFile';
import saveScheduleToDatabase from '../../services/saveScheduleToDatabase';

function SignupPage3({ onNext, onBack, firestore, user }) {
  const [fileInput, setFileInput] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
//   const [interests, setInterests] = useState([]);
//   const [purpose, setPurpose] = useState([]);

//   const interestOptions = ['Interest 1', 'Interest 2', 'Interest 3'];
//   const purposeOptions = ['Purpose 1', 'Purpose 2', 'Purpose 3'];

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // onNext({ scheduleData, interests, purpose });
    onNext({ scheduleData });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const parsedSchedule = parseICSFile(event.target.result);
      setScheduleData(parsedSchedule);
      await saveScheduleToDatabase(parsedSchedule, firestore, user.uid);
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h2>Upload Timetable</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".ics"
          ref={setFileInput}
          onChange={handleFileChange}
        />
{/* 
        {interestOptions.map((interest, index) => (
        <div key={index}>
            <input
            type="checkbox"
            id={`interest-${index}`}
            value={interest}
            onChange={(e) => {
                if (e.target.checked) {
                setInterests([...interests, interest]);
                } else {
                setInterests(interests.filter((i) => i !== interest));
                }
            }}
            />
            <label htmlFor={`interest-${index}`}>{interest}</label>
        </div>
        ))}

        {purposeOptions.map((purpose, index) => (
        <div key={index}>
            <input
            type="checkbox"
            id={`purpose-${index}`}
            value={purpose}
            onChange={(e) => {
                if (e.target.checked) {
                setPurpose([...purpose, purpose]);
                } else {
                setPurpose(purpose.filter((p) => p !== purpose));
                }
            }}
            />
            <label htmlFor={`purpose-${index}`}>{purpose}</label>
        </div>
        ))} */}

        <button onClick={onBack}>Back</button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default SignupPage3;

       
