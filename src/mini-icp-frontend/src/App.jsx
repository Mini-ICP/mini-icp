import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Tournament from './components/Tournament';
import HostTournament from './components/HostTournament';
import HomePage from './components/Home';
import TournamentDetails from './components/TournamentDetails ';
import { Button } from './components/ui/button';
//import { useInternetIdentity } from "ic-use-internet-identity";
//import { mini_icp_backend } from 'declarations/mini-icp-backend';
//import { tournament_system_backend } from 'declarations/tournament_system_backend';
import { IILogin, IILogout } from './auth';
import { useIdentity } from './context/AppContext';
import GameDetails from './components/GameDetails';
import Logo from './assets/logo.png';

const NavBar = () => {

  const { identity, setIdentity } = useIdentity();
  const navigate = useNavigate();

  const handleLogout = () => {
    IILogout().then(() => {
      setIdentity("");
    });
  };

  const handleConnect = () => {
    IILogin().then((id) => setIdentity(id));
  };

  const handleHome = () => {
    // Handle host tournament action (could emit event to parent component)
    navigate('/');  // Navigate to the host tournament page
  };

  const handleTournamnet = () => {
    // Handle host tournament action (could emit event to parent component)
    navigate('/tournament');  // Navigate to the tournament page
  };

  return(
    <nav className="bg-[#17223A] p-4 mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <img src={Logo} alt='Logo' className='w-10 h-10' />
              <div className="text-2xl font-bold text-[#CC187C]">Mini-ICP</div>
              <Button 
                variant="ghost"
                className="text-[#90EE90] hover:text-[#90EE90]/80 transition-colors duration-300"
                onClick={handleHome}
              >
                Home
              </Button>
              <Button 
                variant="ghost"
                className="text-[#90EE90] hover:text-[#90EE90]/80 transition-colors duration-300"
                onClick={handleTournamnet}
              >
                Tournament
              </Button>
              {/*<Button 
                className="bg-[#FFA500] text-[#02020E] font-bold hover:bg-[#FFA500]/80 transition-colors duration-300"
                onClick={login}
                disabled={disabled}
              >
                {text}
              </Button>*/}
            </div>

            {identity ? (
              <Button 
                className="bg-[#FFA500] text-[#02020E] font-bold hover:bg-[#FFA500]/80 transition-colors duration-300"
                onClick={handleLogout}
                //disabled={disabled}
              >
                <span className="hidden sm:block">{identity.slice(0, 6) + "..." + identity.slice(-4)}</span>
              </Button>
            ) : (
              <Button 
                className="bg-[#FFA500] text-[#02020E] font-bold hover:bg-[#FFA500]/80 transition-colors duration-300"
                onClick={handleConnect}
                //disabled={disabled}
              >
                <span className="text-xl hidden sm:block">Internet Identity</span>
              </Button>
            )}
          </div>
    </nav>
  )
}


function App() {
  const [tournamentData, setTournamentData] = useState(null);
  const [betStatus, setBetStatus] = useState('');
  const [createStatus, setCreateStatus] = useState('');
  

  const [selectedGameId, setSelectedGameId] = useState(null);

  //const navigate = useNavigate();

  //const disabled = loginStatus === "logging-in" || loginStatus === "success";
  //const text = loginStatus === "logging-in" ? "Logging in..." : "Login";

  async function handleCreateTournament(event) {
    event.preventDefault();
    const form = event.target;
    try {
      const name = form.elements.name.value;
      const deadline = new Date(form.elements.deadline.value).getTime() * 1000000; // Convert to nanoseconds
      const tournamentId = Number(form.elements.tournamentId.value);
      const maxPlayer = Number(form.elements.maxPlayers.value);

      const result = await tournament_system_backend.createTournament(
        name,
        BigInt(deadline),
        BigInt(tournamentId),
        BigInt(maxPlayer)
      );

      setCreateStatus('Tournament created successfully!');
      form.reset();
    } catch (error) {
      setCreateStatus('Error creating tournament: ' + error.message);
    }
  }

  async function handleViewTournament(event) {
    event.preventDefault();
    try {
      const tournamentId = Number(event.target.elements.viewId.value);
      const result = await tournament_system_backend.getTournament(BigInt(tournamentId));
      if ('ok' in result) {
        setTournamentData(result.ok);
      } else {
        setTournamentData(null);
        alert('Tournament not found');
      }
    } catch (error) {
      console.error(error);
      alert('Error viewing tournament');
    }
  }

  async function handlePlaceBet(event) {
    event.preventDefault();
    try {
      const form = event.target;
      const tournamentId = Number(form.elements.betTournamentId.value);
      const participant = form.elements.participant.value;
      const amount = Number(form.elements.amount.value);

      const result = await tournament_system_backend.placeBet(
        BigInt(tournamentId),
        participant,
        BigInt(amount)
      );

      if ('ok' in result) {
        setBetStatus('Bet placed successfully!');
        form.reset();
      } else {
        setBetStatus('Error placing bet: ' + Object.keys(result.err)[0]);
      }
    } catch (error) {
      setBetStatus('Error placing bet: ' + error.message);
    }
  }

  {/*const handleHome = () => {
    // Handle host tournament action (could emit event to parent component)
    navigate('/');  // Navigate to the host tournament page
  };

  const handleTournamnet = () => {
    // Handle host tournament action (could emit event to parent component)
    navigate('/tournament');  // Navigate to the tournament page
  };*/}

  const handleSelectGame = (gameId) => {
    setSelectedGameId(gameId);
  };

  return (
    <Router>
      <main className="bg-[#02020E]">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/host-tournament" element={<HostTournament />} />
          <Route path="/tournament/:id" element={<TournamentDetails />} />
          <Route path="/games/:id" element={<GameDetails />} />
        </Routes>

        {/*<HostTournament />*/}

        {/*<img src="/logo2.svg" alt="DFINITY logo" className="mx-auto mb-8" />
        
        {/*Create Tournament Form
        <section className="mb-8 p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">Create Tournament</h2>
          <form 
            //onSubmit={handleCreateTournament}
          >
            <div className="mb-4">
              <label htmlFor="name">Tournament Name: </label>
              <input id="name" type="text" required className="border p-1 ml-2" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="deadline">Deadline: </label>
              <input id="deadline" type="datetime-local" required className="border p-1 ml-2" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="tournamentId">Tournament ID: </label>
              <input id="tournamentId" type="number" required className="border p-1 ml-2" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="maxPlayers">Max Players: </label>
              <input id="maxPlayers" type="number" required className="border p-1 ml-2" />
            </div>
            
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Create Tournament
            </button>
          </form>
          {createStatus && <p className="mt-2 text-green-600">{createStatus}</p>}
        </section>

        {/* View Tournament Form
        <section className="mb-8 p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">View Tournament</h2>
          <form 
            //onSubmit={handleViewTournament}
          >
            <div className="mb-4">
              <label htmlFor="viewId">Tournament ID: </label>
              <input id="viewId" type="number" required className="border p-1 ml-2" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              View Tournament
            </button>
          </form>
          
          {tournamentData && (
            <div className="mt-4">
              <h3 className="font-bold">Tournament Details:</h3>
              <p>Deadline: {new Date(Number(tournamentData.deadline) / 1000000).toLocaleString()}</p>
              <p>Total Pool: {tournamentData.totalPool.toString()}</p>
              <p>Settled: {tournamentData.settled ? 'Yes' : 'No'}</p>
              <p>Winner: {tournamentData.winner ? tournamentData.winner.toString() : 'Not determined'}</p>
              <p>Participants: {tournamentData.participants.length}</p>
            </div>
          )}
        </section>

        {/* Place Bet Form
        <section className="mb-8 p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">Place Bet</h2>
          <form 
            //onSubmit={handlePlaceBet}
          >
            <div className="mb-4">
              <label htmlFor="betTournamentId">Tournament ID: </label>
              <input id="betTournamentId" type="number" required className="border p-1 ml-2" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="participant">Participant: </label>
              <input id="participant" type="text" required className="border p-1 ml-2" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="amount">Amount: </label>
              <input id="amount" type="number" required className="border p-1 ml-2" />
            </div>
            
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Place Bet
            </button>
          </form>
          {betStatus && <p className="mt-2 text-green-600">{betStatus}</p>}
        </section>
          */}
      </main>
    </Router>
  );
}

export default App;

{/*function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    mini_icp_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" 
        //onSubmit={handleSubmit}
      >
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;*/}
