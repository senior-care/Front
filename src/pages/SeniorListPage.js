// SeniorListPage.js

import React, { useEffect, useState } from 'react';
import SeniorList from '../components/SeniorList';
import axios from 'axios';

const SeniorListPage = () => {
  const [seniors, setSeniors] = useState([]);

  useEffect(() => {
    console.log('useEffect hook is called');
    const fetchSeniors = async () => {
      try {
        console.log('Fetching seniors...'); // console.log를 사용하여 fetchSeniors 함수가 호출되는지 확인
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/senior`, { withCredentials: true });
        console.log(response);
        setSeniors(response.data.seniors);
      } catch (error) {
        console.error('Error fetching seniors:', error);
      }
    };

    fetchSeniors();
  }, []);

  return (
    <div>
      <SeniorList seniors={seniors} />
    </div>
  );
};

export default SeniorListPage;
