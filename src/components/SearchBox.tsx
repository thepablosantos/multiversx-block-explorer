import { useState } from "react";
import { Search } from "lucide-react";

function SearchBox() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode redirecionar para a rota de busca
    console.log("Searching for:", query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-xl mx-auto flex items-center bg-[#2a2d33] rounded-lg p-3 mt-6 shadow-lg"
    >
      <input
        type="text"
        placeholder="Search by block, transaction, account..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow bg-transparent text-white focus:outline-none px-3"
      />
      <button type="submit" className="text-accent hover:text-white">
        <Search size={22} />
      </button>
    </form>
  );
}

export default SearchBox;