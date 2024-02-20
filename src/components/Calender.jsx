import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calender.css'; 

const Calendar = ({selectedDate,setSelectedDate}) => {

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            minDate={new Date()}
            placeholderText="Select a date"
            className="custom-datepicker" 
        />
        </div>
    );
};

export default Calendar;
