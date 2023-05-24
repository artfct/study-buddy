import React from "react";
import parseICSFile from "../../scheduling/parseICSFile";
import saveScheduleToDatabase from "../../../services/saveScheduleToDatabase";

class Schedule {
  constructor(user, firestore) {
    this.user = user;
    this.firestore = firestore;
  }

  parse(fileContents) {
    return new Promise((resolve, reject) => {
      try {
        const parsedSchedule = parseICSFile(fileContents);
        resolve(parsedSchedule);
      } catch (error) {
        reject(error);
      }
    });
  };
  
  save = (schedule) => {
    saveScheduleToDatabase(schedule, this.firestore, this.user.uid);
  };
  displaySchedule = (schedule = null) => {
    if (!schedule) {
      schedule = this.scheduleData;
    }
  
    if (!schedule || !Array.isArray(schedule)) {
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
        {schedule.map((course, index) => {
          return (
            <tr key={index}>
              <td>{course.code}</td>
              <td>{course.section}</td>
              <td>{course.location}</td>
              <td>{course.start}</td>
              <td>{course.end}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  };
}

export default Schedule;





// --------------- @mui version --- has a horizontal slider which needs to be adjusted to not show------

// import React from "react";
// import parseICSFile from "../../scheduling/parseICSFile";
// import saveScheduleToDatabase from "../../../services/saveScheduleToDatabase";
// import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

// class Schedule {
//   constructor(user, firestore) {
//     this.user = user;
//     this.firestore = firestore;
//   }

//   parse(fileContents) {
//     return new Promise((resolve, reject) => {
//       try {
//         const parsedSchedule = parseICSFile(fileContents);
//         resolve(parsedSchedule);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   };
  
//   save = (schedule) => {
//     saveScheduleToDatabase(schedule, this.firestore, this.user.uid);
//   };
//   displaySchedule = (schedule = null) => {
//     if (!schedule) {
//       schedule = this.scheduleData;
//     }
  
//     if (!schedule || !Array.isArray(schedule)) {
//       return <p>No schedule data available - from Schedule.js</p>;
//     }
  
//     return (
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Course Code</TableCell>
//               <TableCell align="right">Section</TableCell>
//               <TableCell align="right">Location</TableCell>
//               <TableCell align="right">Start</TableCell>
//               <TableCell align="right">End</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {schedule.map((course, index) => (
//             <TableRow
//               key={index}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="course">
//                 {course.code}
//               </TableCell>
//               <TableCell align="right">{course.section}</TableCell>
//               <TableCell align="right">{course.location}</TableCell>
//               <TableCell align="right">{course.start}</TableCell>
//               <TableCell align="right">{course.end}</TableCell>
//             </TableRow>
//           ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   };
// }

// export default Schedule;



// in signup page1, email field is not active. Make sure to send warnings when non-email is entered.