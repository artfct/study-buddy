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






// import React from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment-timezone'; // use moment-timezone
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// const localizer = momentLocalizer(moment);

// const ScheduleDisplay = ({ scheduleData, user, firestore }) => {
//   const [events, setEvents] = React.useState([]);

//   React.useEffect(() => {
//     if (scheduleData) {
//       const newEvents = scheduleData.map((course, index) => {
//         const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//         const startDay = dayOfWeek.indexOf(course.start.split(' ')[0].toUpperCase());
//         const endDay = dayOfWeek.indexOf(course.end.split(' ')[0].toUpperCase());

//         if (startDay !== endDay) {
//           console.error('Course start and end day do not match!');
//           return null;
//         }

//         const startTime = moment(course.start.split(' ')[1], 'hh:mm A');
//         const endTime = moment(course.end.split(' ')[1], 'hh:mm A');

//         const title = `${course.code} - ${course.section}\n${course.location}`;

//         // Assume the course starts and ends on the same day.
//         // Generate an event for each week day.
//         const weeklyEvents = [];
//         for (let weekDay = startDay; weekDay <= endDay; weekDay++) {
//           const start = moment().day(weekDay).hour(startTime.hour()).minute(startTime.minute()).toDate();
//           const end = moment().day(weekDay).hour(endTime.hour()).minute(endTime.minute()).toDate();

//           weeklyEvents.push({
//             id: index,
//             title,
//             start,
//             end,
//           });
//         }

//         return weeklyEvents;
//       }).flat();  // flatten the array of arrays

//       setEvents(newEvents.filter(Boolean));  // filter out null values
//     }
//   }, [scheduleData]);

//   return (
//     <div className='ScheduleDisplay' style={{ height: '500px' }}>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor='start'
//         endAccessor='end'
//         style={{ height: 500 }}
//         views={['week']}
//         defaultView='week'
//         min={moment().hour(7).minute(0).toDate()}
//         max={moment().hour(21).minute(0).toDate()}
//         defaultDate={moment().toDate()}
//       />
//     </div>
//   );
// };

// export default ScheduleDisplay;





