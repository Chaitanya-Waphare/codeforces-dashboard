import React from 'react';
import { TextField, Select } from '@shopify/polaris';

const ContestFilter = ({ search, onSearchChange, type, onTypeChange }) => {
  const options = [
    { label: 'All', value: '' },
    { label: 'CF', value: 'CF' },
    { label: 'ICPC', value: 'ICPC' },
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <TextField
        label="Search"
        value={search}
        onChange={(value) => onSearchChange(value)}
        placeholder="Search contests by name"
      />
      <Select
        label="Type"
        options={options}
        value={type}
        onChange={(value) => onTypeChange(value)}
      />
    </div>
  );
};

export default ContestFilter;
