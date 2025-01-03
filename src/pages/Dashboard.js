import React, { useState, useEffect } from 'react';
import {
  Page,
  Layout,
  Spinner,
  TextContainer,
  Card,
  Select,
  LegacyStack,
  Button,
} from '@shopify/polaris';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import useContestData from '../hooks/useContestData';
import ContestFilter from '../components/ContestFilter';
import ContestList from '../components/ContestList';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const { contests, loading, error } = useContestData();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [type, setType] = useState('');
  const [phase, setPhase] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contestsPerPage, setContestsPerPage] = useState(10);
  const navigate = useNavigate();

  // Debouncing search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(handler);
  }, [search]);

  const handleContestsPerPageChange = (value) => {
    setContestsPerPage(parseInt(value, 10));
    setCurrentPage(1);
  };

  const toggleFavorite = (contestId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(contestId)
        ? prevFavorites.filter((id) => id !== contestId)
        : [...prevFavorites, contestId]
    );
  };

  const filteredContests = contests.filter((contest) => {
    const isFavorite = favorites.includes(contest.id);
    return (
      contest.name.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (type === '' || contest.type === type) &&
      (phase === '' ||
        (phase === 'FAVORITES' && isFavorite) ||
        contest.phase === phase)
    );
  });

  const totalPages = Math.ceil(filteredContests.length / contestsPerPage);
  const startIndex = (currentPage - 1) * contestsPerPage;
  const currentContests = filteredContests.slice(
    startIndex,
    startIndex + contestsPerPage
  );

  const pagination = [];
  const visiblePages = 5;

  if (totalPages > 1) {
    pagination.push(
      <Button
        key={1}
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        1
      </Button>
    );

    let startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor(visiblePages / 2));

    if (startPage > 2) {
      pagination.push(<span key="dots-start">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          primary={currentPage === i}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages - 1) {
      pagination.push(<span key="dots-end">...</span>);
    }

    pagination.push(
      <Button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        {totalPages}
      </Button>
    );
  }

  const handleContestClick = (contestId) => {
    navigate(`/contest/${contestId}`);
  };

  return (
    <Page title="Codeforces Dashboard" >
      <Layout>
        {loading ? (
          <Spinner accessibilityLabel="Loading contests" size="large" />
        ) : error ? (
          <TextContainer>{error}</TextContainer>
        ) : (
          <>
            {/* Filter Strip */}
            <div className="centered filter-strip">
              <div className="filter-item">
                <ContestFilter
                  search={search}
                  onSearchChange={setSearch}
                  type={type}
                  onTypeChange={setType}
                />
              </div>
              <div className="filter-item">
                <Select
                  label="Filter by Phase"
                  options={[
                    { label: 'All', value: '' },
                    { label: 'FAVORITES', value: 'FAVORITES' },
                    { label: 'FINISHED', value: 'FINISHED' },
                    { label: 'BEFORE', value: 'BEFORE' },
                    { label: 'CODING', value: 'CODING' },
                  ]}
                  value={phase}
                  onChange={(value) => setPhase(value)}
                />
              </div>
              <div className="filter-item">
                <Select
                  label="Contests per Page"
                  options={[
                    { label: '5', value: '5' },
                    { label: '10', value: '10' },
                    { label: '20', value: '20' },
                  ]}
                  value={contestsPerPage.toString()}
                  onChange={handleContestsPerPageChange}
                />
              </div>
            </div>

            {/* Contest List */}
            <div className="centered contest-list">
              <ContestList
                contests={currentContests}
                onContestClick={handleContestClick}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            </div>

            {/* Pagination */}
            <Layout.Section>
              <LegacyStack distribution="center">{pagination}</LegacyStack>
            </Layout.Section>

            {/* Chart Section */}
            <Layout.Section>
              <Card title="Contest Duration Visualization" sectioned>
                <div className="centered">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={currentContests.map((contest) => ({
                        name: contest.name,
                        durationSeconds: contest.durationSeconds / 3600, // Convert to hours
                      }))}
                      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        height={100}
                      />
                      <YAxis
                        label={{
                          value: 'Duration (Hours)',
                          angle: -90,
                          position: 'insideLeft',
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="durationSeconds"
                        fill="#5c6ac4"
                        name="Duration (Hours)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Layout.Section>
          </>
        )}
      </Layout>
    </Page>
  );
};

export default Dashboard;
