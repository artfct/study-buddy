import ICAL from "ical.js";

function parseICSFile(icsFile) {
  const jcalData = ICAL.parse(icsFile);
  const vcalendar = new ICAL.Component(jcalData);
  const vevents = vcalendar.getAllSubcomponents("vevent");
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const courses = vevents.map((vevent) => {
    const start = vevent.getFirstPropertyValue("dtstart").toJSDate();
    const end = vevent.getFirstPropertyValue("dtend").toJSDate();
    
    return {
      code: vevent.getFirstPropertyValue("summary").split(" ")[0],
      section: vevent.getFirstPropertyValue("summary").split(" ")[1],
      location: vevent.getFirstPropertyValue("location"),
      start: days[start.getDay()] + " " + start.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
      end: days[end.getDay()] + " " + end.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    };
  });

  const studentInfo = {
    id: vcalendar.getFirstPropertyValue("x-apple-calendar-id"),
    name: vcalendar.getFirstPropertyValue("x-wr-calname"),
    email: vcalendar.getFirstPropertyValue("x-wr-caldesc"),
  };

  const parsedSchedule = {
    courses: courses,
  };

  return parsedSchedule;
}

export default parseICSFile;
