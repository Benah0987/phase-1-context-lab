/* Your Code Here */// Define the createEmployeeRecord function using object destructuring
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Define the createEmployeeRecords function using arrow function shorthand
  const createEmployeeRecords = rows => rows.map(createEmployeeRecord);
  
  // Define the createTimeInEvent function using object destructuring and arrow function shorthand
  const createTimeInEvent = (employeeRecord, dateTimeString) => {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({type: "TimeIn", date, hour: parseInt(hour)});
    return employeeRecord;
  }
  
  // Define the createTimeOutEvent function using object destructuring and arrow function shorthand
  const createTimeOutEvent = (employeeRecord, dateTimeString) => {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeOutEvents.push({type: "TimeOut", date, hour: parseInt(hour, 10)});
    return employeeRecord;
  }
  
  // Define the hoursWorkedOnDate function using destructuring and arrow function shorthand
  const hoursWorkedOnDate = (employeeRecord, date) => {
    const {hour: timeIn} = employeeRecord.timeInEvents.find(event => event.date === date);
    const {hour: timeOut} = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut - timeIn) / 100;
  }
  
  // Define the wagesEarnedOnDate function using destructuring and arrow function shorthand
  const wagesEarnedOnDate = (employeeRecord, date) => {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
// Define the allWagesFor function using arrow function shorthand
 
  
  // Define the calculatePayroll function using arrow function shorthand
  const calculatePayroll = employeeRecords => employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
  


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

