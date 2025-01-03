import axios from 'axios';

export const fetchContests = async () => {
  const response = await axios.get('https://codeforces.com/api/contest.list');
  if (response.data.status === 'OK') {
    return response.data.result;
  }
  throw new Error('Failed to fetch contests');
};
