type StatCardProps = {
    title: string;
    value: string | number;
  };
  
  function StatCard({ title, value }: StatCardProps) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 shadow-md">
        <h3 className="text-sm text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-white mt-2">{value}</p>
      </div>
    );
  }
  
  export default StatCard;