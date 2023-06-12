/* Calendar.js */
import React from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

const CustomCalendar = ({ year, month, calendarInfo }) => {
  const renderTileContent = ({ date }) => {
    const matchingDate = calendarInfo?.find(
      (item) =>
        item.date ===
        `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    );
    return matchingDate ? <span className="state">{matchingDate.state}</span> : null;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>{`${year}년 ${month}월`}</h3>
      </div>
      <div className="calendar-grid">
        <Calendar
          value={new Date(year, month - 1)}
          calendarType="US"
          tileClassName={({ date }) => {
            return date.getMonth() + 1 === month ? 'current-month' : 'other-month';
          }}
          tileContent={renderTileContent}
          showNeighboringMonth={false}
          showFixedNumberOfWeeks={true}
        />
      </div>
    </div>
  );
};

export default CustomCalendar;
