import React from 'react';
import './SeniorDetails.css';
import CustomCalendar from './CustomCalendar';

const SeniorDetails = ({ seniorDetail }) => {
  if (!seniorDetail) {
    return <p>Loading...</p>;
  }

  const { seniorInfo, illnessInfo, calendarInfo } = seniorDetail;

  return (
    <div>
      <h1>노인 상세 정보</h1>
      <div className="row">
        <div className="column">
          <h2>노인 기본 정보</h2>
          <p>이름: {seniorInfo.name}</p>
          <p>성별: {seniorInfo.gender}</p>
          <p>생년월일: {seniorInfo.birth}</p>
          <p>시도: {seniorInfo.sido}</p>
          <p>시군구: {seniorInfo.sigungu}</p>
          <p>상세 정보: {seniorInfo.details}</p>
          <p>주요 연락처: {seniorInfo.majorPhone}</p>
          <p>보조 연락처: {seniorInfo.minorPhone}</p>
          <p>등록 일자: {seniorInfo.registrationData}</p>
          <p>종료 일자: {seniorInfo.endDate}</p>
        </div>
        <div className="column">
          <h2>질병 정보</h2>
          {illnessInfo.map((illness) => (
            <div key={illness.illnessCode}>
              <p>질병명: {illness.illnessCode}</p>
              <p>생성 일자: {illness.createdDate}</p>
              <p>회복 일자: {illness.recoveryDate}</p>
            </div>
          ))}
          <h2>날짜별 정보</h2>
          <CustomCalendar calendarInfo={calendarInfo} />
        </div>
      </div>
    </div>
  );
};

export default SeniorDetails;
