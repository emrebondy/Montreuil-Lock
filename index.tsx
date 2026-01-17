import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Youtube, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Menu, 
  X,
  TrendingUp,
  Activity,
  Award
} from 'lucide-react';

// --- Types & Mock Data (Simulant le Google Sheet) ---

interface Player {
  id: number;
  name: string;
  matches: number;
  goals: number;
  assists: number;
  winRate: number;
  role: string;
}

interface Match {
  id: number;
  date: string;
  opponent: string; // Ou "Interne" si c'est entre membres
  score: string;
  result: 'W' | 'L' | 'D';
  location: string;
  videoLink?: string;
}

const PLAYERS_DATA: Player[] = [
  { id: 1, name: "Amine K.", matches: 15, goals: 12, assists: 5, winRate: 75, role: "Attaquant" },
  { id: 2, name: "Thomas L.", matches: 14, goals: 4, assists: 10, winRate: 60, role: "Milieu" },
  { id: 3, name: "Lucas M.", matches: 12, goals: 8, assists: 2, winRate: 80, role: "Attaquant" },
  { id: 4, name: "Sofiane B.", matches: 15, goals: 1, assists: 3, winRate: 55, role: "Défenseur" },
  { id: 5, name: "Enzo R.", matches: 10, goals: 0, assists: 1, winRate: 90, role: "Gardien" },
  { id: 6, name: "Mehdi J.", matches: 8, goals: 5, assists: 4, winRate: 40, role: "Milieu" },
  { id: 7, name: "Karim Z.", matches: 13, goals: 2, assists: 0, winRate: 65, role: "Défenseur" },
];

const MATCHES_DATA: Match[] = [
  { id: 101, date: "16 Mars 2024", opponent: "Match Interne", score: "5 - 4", result: 'W', location: "Stade des Guilands", videoLink: "#" },
  { id: 102, date: "09 Mars 2024", opponent: "FC Voisins", score: "2 - 2", result: 'D', location: "Parc Montreau", videoLink: "#" },
  { id: 103, date: "02 Mars 2024", opponent: "Match Interne", score: "3 - 1", result: 'W', location: "Stade des Guilands", videoLink: "#" },
  { id: 104, date: "24 Fév 2024", opponent: "Match Interne", score: "2 - 6", result: 'L', location: "Stade Romain Rolland", videoLink: "#" },
];

// --- Components ---

const Navbar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const tabs = [
    { id: 'home', label: 'Accueil' },
    { id: 'stats', label: 'Statistiques' },
    { id: 'matches', label: 'Matchs & Vidéos' },
    { id: 'infos', label: 'Infos & Discord' },
  ];

  return (
    <nav className="bg-ml-green text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-ml-green font-bold text-xl">
              M
            </div>
            <span className="font-title font-bold text-xl tracking-wide">MONTREUIL LOCK</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-ml-dark text-white'
                      : 'text-gray-100 hover:bg-ml-light hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-ml-green inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-ml-dark focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-ml-green pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === tab.id
                    ? 'bg-ml-dark text-white'
                    : 'text-gray-100 hover:bg-ml-light hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ setActiveTab }) => (
  <div className="relative bg-ml-green overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="relative z-10 pb-8 bg-ml-green sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Plus qu'une équipe,</span>{' '}
              <span className="block text-ml-light xl:inline">une famille.</span>
            </h1>
            <p className="mt-3 text-base text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Bienvenue chez Montreuil Lock. Statistiques en temps réel, vidéos de matchs, et une communauté soudée. Rejoignez-nous tous les samedis matins.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <button
                  onClick={() => setActiveTab('stats')}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-ml-green bg-white hover:bg-gray-100 md:py-4 md:text-lg"
                >
                  Voir le classement
                </button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  onClick={() => setActiveTab('infos')}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ml-light hover:bg-green-400 md:py-4 md:text-lg"
                >
                  Nous rejoindre
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Abstract soccer field representation or placeholder image */}
      <img
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-80"
        src="https://images.unsplash.com/photo-1517466787929-bc90951d6dbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        alt="Football field"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ml-green to-transparent mix-blend-multiply"></div>
    </div>
  </div>
);

const StatsSection = () => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Player; direction: 'asc' | 'desc' } | null>({ key: 'goals', direction: 'desc' });

  const sortedPlayers = React.useMemo(() => {
    let sortableItems = [...PLAYERS_DATA];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const requestSort = (key: keyof Player) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Player) => {
    if (!sortConfig || sortConfig.key !== key) return <div className="w-4 h-4 ml-1 inline-block opacity-20">↕</div>;
    return sortConfig.direction === 'asc' ? 
      <div className="w-4 h-4 ml-1 inline-block">↑</div> : 
      <div className="w-4 h-4 ml-1 inline-block">↓</div>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-ml-dark">Statistiques des Joueurs</h2>
        <p className="mt-2 text-gray-600">Données mises à jour depuis le Google Sheet officiel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-400 flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Meilleur Buteur</p>
            <p className="text-2xl font-bold text-gray-800">Amine K. (12)</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-400 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Meilleur Passeur</p>
            <p className="text-2xl font-bold text-gray-800">Thomas L. (10)</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-400 flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Taux de Victoire</p>
            <p className="text-2xl font-bold text-gray-800">Enzo R. (90%)</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => requestSort('name')}>
                  Joueur {getSortIcon('name')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => requestSort('matches')}>
                  Matchs {getSortIcon('matches')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => requestSort('goals')}>
                  Buts {getSortIcon('goals')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => requestSort('assists')}>
                  Passes {getSortIcon('assists')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => requestSort('winRate')}>
                  % Victoire {getSortIcon('winRate')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-ml-green flex items-center justify-center text-white text-xs font-bold mr-3">
                        {player.name.charAt(0)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{player.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.matches}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{player.goals}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.assists}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      player.winRate >= 70 ? 'bg-green-100 text-green-800' : 
                      player.winRate >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {player.winRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MatchesSection = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-ml-dark">Matchs & Vidéos</h2>
      <p className="mt-2 text-gray-600">Retrouvez les résumés et l'historique des rencontres.</p>
    </div>

    {/* Featured Latest Video */}
    <div className="mb-12 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
      <div className="grid md:grid-cols-2">
        <div className="p-8 flex flex-col justify-center">
          <span className="text-red-500 font-bold tracking-wider uppercase text-sm mb-2">Dernier Match</span>
          <h3 className="text-3xl font-bold text-white mb-4">Montreuil Lock vs FC Voisins</h3>
          <p className="text-gray-400 mb-6">Un match d'anthologie disputé au Parc Montreau. Retrouvez les meilleurs moments, les buts et les actions décisives.</p>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="inline-flex items-center self-start bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
            <Youtube className="mr-2" /> Voir sur YouTube
          </a>
        </div>
        <div className="relative aspect-video bg-gray-800 flex items-center justify-center group cursor-pointer">
           {/* Placeholder for iframe */}
           <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition"></div>
           <Youtube size={64} className="text-white opacity-80 group-hover:scale-110 transition transform" />
           <p className="absolute bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">12:45</p>
        </div>
      </div>
    </div>

    {/* Match History List */}
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-ml-green pl-3">Derniers Résultats</h3>
      {MATCHES_DATA.map((match) => (
        <div key={match.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-center justify-between hover:shadow-md transition">
          <div className="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-auto">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
              match.result === 'W' ? 'bg-green-100 text-green-700' :
              match.result === 'D' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'
            }`}>
              {match.result}
            </div>
            <div>
              <div className="text-sm text-gray-500 flex items-center">
                <Calendar size={14} className="mr-1" /> {match.date}
              </div>
              <div className="font-bold text-lg text-gray-900">{match.opponent}</div>
              <div className="text-sm text-gray-500 flex items-center">
                <MapPin size={14} className="mr-1" /> {match.location}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-3xl font-black text-ml-dark tracking-widest bg-gray-50 px-4 py-2 rounded">
              {match.score}
            </div>
            {match.videoLink && (
              <a href={match.videoLink} className="text-red-600 hover:text-red-800">
                <Youtube size={24} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InfoSection = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-ml-dark px-6 py-8 md:p-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Informations Pratiques</h2>
        <p className="text-gray-300">Tout ce qu'il faut savoir pour jouer avec Montreuil Lock</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Système de Vote</h3>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Pour participer au match du samedi, vous devez vous inscrire via notre système de vote sur Discord.
            <br/><br/>
            <strong>Quand ?</strong> <span className="text-red-500 font-bold">Tous les lundis à 20h00 précises.</span>
            <br/>
            <strong>Où ?</strong> Sur le channel <span className="bg-gray-200 px-1 rounded text-sm">#match-vote</span>.
            <br/><br/>
            Soyez réactifs, les places pour les 22 joueurs partent très vite !
          </p>
          <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-lg font-medium flex items-center transition">
            Rejoindre le Discord
          </button>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Le Match</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Calendar className="text-gray-400 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <span className="font-bold text-gray-800">Jour :</span> Tous les Samedis
              </div>
            </li>
            <li className="flex items-start">
              <Clock className="text-gray-400 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <span className="font-bold text-gray-800">Horaire :</span> 09h00 - 10h00
              </div>
            </li>
            <li className="flex items-start">
              <MapPin className="text-gray-400 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <span className="font-bold text-gray-800">Lieu :</span>
                <p className="text-gray-600 text-sm mt-1">Le stade change chaque semaine. L'adresse exacte est communiquée quelques jours avant sur le channel <span className="bg-gray-200 px-1 rounded text-xs">#infos-terrain</span>.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Users className="text-gray-400 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <span className="font-bold text-gray-800">Format :</span> 11 vs 11 (22 joueurs)
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-8 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <span className="font-title font-bold text-xl tracking-wide">MONTREUIL LOCK</span>
        <p className="text-gray-400 text-sm mt-1">Association de football amateur.</p>
      </div>
      <div className="flex space-x-6">
        <a href="#" className="text-gray-400 hover:text-white transition">Discord</a>
        <a href="#" className="text-gray-400 hover:text-white transition">YouTube</a>
        <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
      </div>
      <div className="mt-4 md:mt-0 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Montreuil Lock.
      </div>
    </div>
  </footer>
);

// --- Main App ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <div className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero setActiveTab={setActiveTab} />
            <div className="py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold mb-6 text-ml-dark">Prochain Rendez-vous</h2>
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-between border-l-8 border-ml-green">
                   <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Samedi Prochain • 9h00</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">Match Hebdomadaire</h3>
                      <p className="flex items-center text-gray-600 mt-2">
                        <MapPin size={16} className="mr-1" /> Lieu à confirmer (Voir Discord)
                      </p>
                   </div>
                   <div className="mt-4 md:mt-0">
                      <div className="text-center bg-gray-100 px-4 py-2 rounded-lg">
                        <span className="block text-xs text-gray-500">Ouverture des votes</span>
                        <span className="block font-bold text-ml-green">Lundi 20h00</span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="mt-8">
                 <MatchesSection />
              </div>
            </div>
          </>
        )}

        {activeTab === 'stats' && <StatsSection />}
        {activeTab === 'matches' && <MatchesSection />}
        {activeTab === 'infos' && <InfoSection />}
      </div>

      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
