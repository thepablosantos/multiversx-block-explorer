import React from 'react';
import RecentBlocks from '../components/RecentBlocks';
import Navigation from '../components/Navigation';
import SearchBox from '../components/SearchBox';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-main-bg min-h-screen text-white">
      <Navigation />
      <h1 className="text-3xl text-center mt-8">Dashboard</h1>
      <SearchBox />
      <div className="mt-10 px-8">
        <h2 className="text-xl mb-4">Recent Blocks</h2>
        <RecentBlocks />
      </div>
    </div>
  );
};

export default Dashboard;