import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    // Lógica simples: vamos só usar regex ou checar tamanho por enquanto
    if (trimmedQuery.length === 62) {
      // Provavelmente é um hash de bloco ou transação (ambos tem 62 chars)
      navigate(`/block/${trimmedQuery}`);
    } else if (trimmedQuery.length === 66) {
      // Talvez endereço
      navigate(`/account/${trimmedQuery}`);
    } else {
      // Fallback (poderia ser validador ou token, podemos ajustar depois)
      alert("Formato não reconhecido!");
    }
  };

  return (
    <header className="bg-gray-900 p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-white">MultiversX Explorer</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by hash, address..."
          className="rounded-lg p-2 text-black w-80"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>
    </header>
  );
}

export default Header;