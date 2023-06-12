import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import SeniorDetails from '../components/SeniorDetails';
import './SeniorDetailsPage.css';

const SeniorDetailsPage = () => {
  const { id } = useParams();
  const [seniorInfo, setSeniorInfo] = useState(null);

  useEffect(() => {
    const fetchSeniorDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/senior/${id}?_embed=illnesses&_embed=calendars`, { withCredentials: true});
        setSeniorInfo(response.data);
      } catch (error) {
        console.error('Error fetching senior details:', error);
      }
    };

    fetchSeniorDetails();
  }, [id]);

  if (!seniorInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Link to="/senior" className="back-button">
        목록
      </Link>
      <SeniorDetails seniorDetail={seniorInfo} />
    </div>
  );
};

export default SeniorDetailsPage;
