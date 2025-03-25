import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-accent">
              Degen Sentinels
            </Link>
            <a
              href="https://github.com/thepablosantos/multiversx-block-explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              Documentation
            </a>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://www.linkedin.com/in/pablo-santos-46794a269/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/thepablosantos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}