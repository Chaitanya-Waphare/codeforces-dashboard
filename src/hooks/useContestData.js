import { useState, useEffect } from 'react';
import { fetchContests } from '../api/codeforces';

const useContestData = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContests = async () => {
      try {
        setLoading(true);
        const data = await fetchContests();
        setContests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadContests();
  }, []);

  return { contests, loading, error };
};

export default useContestData;
