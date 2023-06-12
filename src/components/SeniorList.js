// SeniorList.js

import React from 'react';
import { Link } from 'react-router-dom';
import './SeniorList.css';

const SeniorList = ({ seniors }) => {
  console.log(seniors);
  const getEmoticon = (state) => {
    switch (state) {
      case '기쁨':
        return '😄';
      case '화남':
        return '😡';
      case '슬픔':
        return '😢';
      case '중립':
        return '😐';
      default:
        return ''; // 기본값
    }
  };

  const getStatusColor = (state) => {
    switch (state) {
      case '화남':
        return 'red';
      case '슬픔':
        return 'blue';
      case '중립':
        return 'green';
      case '기쁨':
        return 'green';
      default:
        return 'black';
    }
  };

  const getEmotionLabel = (state) => {
    switch (state) {
      case '상태 없음':
        return '노인의 감정이 등록되지 않았습니다.';
      default:
        return '노인의 가장 최근 감정 통계입니다.';
    }
  };

  return (
    <div className="senior-list-container dark-bg">
      <h1 className="system-title">독거 노인 관리 시스템</h1>
      <div className="senior-grid">
        {seniors.map((senior) => (
          <div key={senior.no} className="senior-item">
            <div className="senior-item-details">
              <Link to={`/senior/${senior.no}`} className="senior-item-name purple-text">
                {senior.name}
              </Link>
              <p className="senior-item-info">
                성별: {senior.gender}, 생년월일: {senior.birth}
              </p>
              <p className="senior-item-info">노인 번호: {senior.majorPhone}</p>
              <p className="senior-item-info">보호자 번호: {senior.minorPhone}</p>
              <p className={`senior-item-status ${getStatusColor(senior.state)}`}>
                <span className="emotion-text">감정: {senior.state}</span>{' '}
                <span className="emoticon">{getEmoticon(senior.state)}</span>
              </p>
              <p className={`senior-item-message ${getStatusColor(senior.state)}`}>
                <span className="emotion-label">{getEmotionLabel(senior.state)}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeniorList;
