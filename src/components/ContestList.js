import React from 'react';
import { Card, Button } from '@shopify/polaris';
import { Link } from 'react-router-dom';

const ContestList = ({ contests, onToggleFavorite, favorites = [] }) => {
  return (
    <div>
      {contests.map((contest) => (
        <Card key={contest.id} sectioned>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link
              to={`/contest/${contest.id}`}
              style={{
                textDecoration: 'none',
                color: '#007ace',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {contest.name}
            </Link>
            <Button
              plain
              onClick={() => onToggleFavorite(contest.id)}
              aria-label={`Mark ${favorites.includes(contest.id) ? 'unfavorite' : 'favorite'}`}
            >
              {favorites.includes(contest.id) ? '★' : '☆'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ContestList;
