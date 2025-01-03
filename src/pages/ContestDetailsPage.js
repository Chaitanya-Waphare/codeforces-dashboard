import React from 'react';
import { useParams } from 'react-router-dom';

const ContestDetailsPage = ({ contests = [] }) => {
  const { id } = useParams();
  const contest = contests?.find((c) => c.id === parseInt(id, 10));

  if (!contest) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Contest not found</h1>
        <p>Check the contest ID or try again later.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <h1>{contest.name}</h1>
      <p><strong>ID:</strong> {contest.id}</p>
      <p><strong>Type:</strong> {contest.type}</p>
      <p><strong>Phase:</strong> {contest.phase}</p>
      
      <p>
        <strong>Start Time:</strong>{' '}
        {new Date(contest.startTimeSeconds * 1000).toLocaleString()}
      </p>
      <p>{contest.description}</p>
    </div>
  );
};

export default ContestDetailsPage;
