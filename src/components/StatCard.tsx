type StatCardProps = {
    title: string;
    value: string | number;
  };
  
  function StatCard({ title, value }: StatCardProps) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-sm text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-white mt-2 break-all">{value}</p>
      </div>
    );
  }
  
  export default StatCard;