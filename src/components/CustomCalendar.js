import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CustomCalendar = ({ calendarInfo }) => {
  const { id } = useParams();
  const firstDate = calendarInfo[0]?.date;
  const [currentDate, setCurrentDate] = useState(firstDate ? new Date(firstDate) : new Date());
  const [info, setInfo] = useState([]);

  const month = firstDate ? parseInt(firstDate.split('-')[0]) : new Date().getMonth() + 1;
  const year = firstDate ? parseInt(firstDate.split('-')[2]) : new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [imageInfo, setImageInfo] = useState([]);
  const [imageNum, setImageNum] = useState(0);

  useEffect(() => {
    setInfo(calendarInfo);
  }, [calendarInfo]);

  const handleNextMonth = () => {
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    setCurrentDate(nextDate);
    fetchCalendarData(nextDate.getFullYear(), nextDate.getMonth() + 1);
  };

  const handlePreviousMonth = () => {
    const previousDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    setCurrentDate(previousDate);
    fetchCalendarData(previousDate.getFullYear(), previousDate.getMonth() + 1);
  };

  const fetchCalendarData = async (year, month) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/senior/${id}/calendar?year=${year}&mon=${month}`);
      console.log(response);
      setInfo(response.data);
    } catch (error) {
      console.log('Error fetching calendar data:', error);
    }
  };

  const handleTileClick = (date) => {
    console.log(date);
    setSelectedDate(date);
    setPopupVisible(true);
    fetchImageInfo(date.getFullYear(), date.getMonth() + 1, date.getDate());
  };

  const fetchImageInfo = async (year, month, day) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/senior/${id}/calendar/${year}/${month}/${day}`, { withCredentials: true });
      console.log(response);
      setImageInfo(response.data.imageInfo);
      setImageNum(response.data.imageNum);
    } catch (error) {
      console.log('Error fetching image info:', error);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    if (popupVisible) {
      const popupWindow = window.open('', '_blank', 'width=800,height=600,top=50%,left=50%,scrollbars=yes');
      if (popupWindow) {
        updatePopupWindowContent(popupWindow, imageInfo);
      }
    }
  }, [popupVisible, imageInfo]);

  const updatePopupWindowContent = (popupWindow, imageInfo) => {
    const popupDocument = popupWindow.document;
    popupDocument.title = 'Popup';
    popupDocument.body.innerHTML = '';

    const imageInfoContainer = popupDocument.createElement('div');
    imageInfoContainer.className = 'image-info-container';

    imageInfo.forEach((infoItem) => {
      const imageInfoElement = popupDocument.createElement('div');
      imageInfoElement.className = 'image-info';

      const imageElement = popupDocument.createElement('img');
      imageElement.src = infoItem.imagePath;
      imageElement.alt = 'Emotion';

      const infoElement = popupDocument.createElement('div');
      const detectTimeElement = popupDocument.createElement('p');
      detectTimeElement.innerText = `감지 시간: ${infoItem.detectTime}`;
      const emotionNameElement = popupDocument.createElement('p');
      emotionNameElement.innerText = `Emotion Name: ${infoItem.emotionName}`;

      infoElement.appendChild(detectTimeElement);
      infoElement.appendChild(emotionNameElement);

      // Add style and emoji based on emotion name
      const emotionName = infoItem.emotionName.toLowerCase();
      imageInfoElement.classList.add(emotionName);
      let emoji = '';
      if (emotionName === '기쁨') {
        imageInfoElement.style.color = 'green';
        emoji = '😄';
      } else if (emotionName === '슬픔') {
        imageInfoElement.style.color = 'blue';
        emoji = '😢';
      } else if (emotionName === '화남') {
        imageInfoElement.style.color = 'red';
        emoji = '😡';
      }

      emotionNameElement.innerHTML = `${infoItem.emotionName} <span role="img" aria-label="Emoji">${emoji}</span>`;

      imageInfoElement.appendChild(imageElement);
      imageInfoElement.appendChild(infoElement);

      imageInfoContainer.appendChild(imageInfoElement);
    });

    popupDocument.body.appendChild(imageInfoContainer);
  };

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const day = parseInt(date.getDate());
      const monthInCalendar = parseInt(date.getMonth() + 1);
      const matchingDates = info.filter((item) => {
        const itemMonth = parseInt(item.date.split('-')[0]);
        const itemDay = parseInt(item.date.split('-')[1]);
        const itemYear = parseInt(item.date.split('-')[2]);
        return day === itemDay && month === itemMonth && year === itemYear;
      });

      return (
        <div>
          <span className="calendar-date"></span>
          {monthInCalendar === month && (
            <div>
              {matchingDates.map((item) => (
                <div
                  key={item.date}
                  className={`calendar-state ${item.state.toLowerCase()}`}
                  style={{
                    color: item.state === '기쁨' ? 'green' : item.state === '슬픔' ? 'blue' : item.state === '화남' ? 'red' : ''
                  }}
                >
                  {item.state === '기쁨' ? (
                    <>
                      기쁨
                      <span role="img" aria-label="Happy">😄</span>
                    </>
                  ) : item.state === '슬픔' ? (
                    <>
                      슬픔
                      <span role="img" aria-label="Sad">😢</span>
                    </>
                  ) : item.state === '화남' ? (
                    <>
                      화남
                      <span role="img" aria-label="Angry">😡</span>
                    </>
                  ) : (
                    item.state
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const tileClassName = ({ date }) => {
    if (date.getDate() === 1 && date.getMonth() + 1 === month) {
      return 'current-month first-day';
    } else if (date.getMonth() + 1 === month) {
      return 'current-month';
    } else {
      return 'other-month';
    }
  };

  return (
    <div className="custom-calendar">
      <Calendar
        calendarType="US"
        value={currentDate}
        tileClassName={tileClassName}
        tileContent={renderTileContent}
        prevLabel="이전 달"
        nextLabel="다음 달"
        onClickMonth={handleNextMonth}
        onClickYear={handleNextMonth}
        onClickDecade={handleNextMonth}
        onDrillUp={handlePreviousMonth}
        onClickDay={handleTileClick} // 클릭 이벤트 추가
      />
      {popupVisible && <div className="popup-overlay"></div>}
    </div>
  );
};

export default CustomCalendar;
