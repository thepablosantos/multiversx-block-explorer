import { useQuery } from '@tanstack/react-query';
import React from 'react';

const RecentBlocks: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['recent-blocks'],
    queryFn: async () => {
      const response = await fetch('/api/blocks/recent');
      if (!response.ok) {
        throw new Error('Failed to fetch blocks');
      }
      return response.json();
    }
  });

  if (isLoading) return <p className="text-text-secondary">Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load blocks</p>;

  return (
    <div className="overflow-x-auto whitespace-nowrap flex space-x-4 p-4 bg-main-bg rounded-xl">
      {data && data.map((block: any) => (
        <div key={block.id} className={`bg-card-bg bg-opacity-90 p-4 rounded-lg min-w-[200px] transition hover:shadow-accent hover:border-accent border border-transparent`}>
          <p className="text-text-secondary">Height: {block.height}</p>
          <p>Status: <span className={
            block.status === 'success' ? 'text-green-400' : block.status === 'pending' ? 'text-yellow-400' : 'text-red-500'
          }>{block.status}</span></p>
          <p>{block.timestamp}s ago</p>
        </div>
      ))}
    </div>
  );
};

export default RecentBlocks;