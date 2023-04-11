import ICAL from "ical.js";

function parseICSFile(icsFile) {
  const jcalData = ICAL.parse(icsFile);
  const vcalendar = new ICAL.Component(jcalData);
  const vevents = vcalendar.getAllSubcomponents("vevent");
  const courses = vevents.map((vevent) => ({
    code: vevent.getFirstPropertyValue("summary").split(" ")[0],
    section: vevent.getFirstPropertyValue("summary").split(" ")[1],
    location: vevent.getFirstPropertyValue("location"),
    start: vevent.getFirstPropertyValue("dtstart").toJSDate(),
    end: vevent.getFirstPropertyValue("dtend").toJSDate(),
  }));
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
