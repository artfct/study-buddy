import React from "react";
import parseICSFile from "./parseICSFile";
import saveScheduleToDatabase from "../../services/saveScheduleToDatabase";

class Schedule {
  constructor(user, rtdb) {
    this.user = user;
    this.rtdb = rtdb;
  }

  upload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      this.parse(fileContent);
    };

    reader.readAsText(file);
  };

  parse(fileContents) {
    return new Promise((resolve, reject) => {
      try {
        const parsedSchedule = parseICSFile(fileContents);
        resolve(parsedSchedule);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  save = (schedule) => {
    saveScheduleToDatabase(schedule, this.rtdb, this.user.uid);
  };

  displaySchedule = (schedule = null) => {
    if (!schedule) {
      schedule = this.scheduleData;
    }

    if (!schedule || !schedule.courses) {
      return <p>No schedule data available - from Schedule.js</p>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Section</th>
            <th>Location</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {schedule.courses.map((course, index) => (
            <tr key={index}>
              <td>{course.code}</td>
              <td>{course.section}</td>
              <td>{course.location}</td>
              <td>{new Date(course.start).toLocaleString()}</td>
              <td>{new Date(course.end).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
}

export default Schedule;
