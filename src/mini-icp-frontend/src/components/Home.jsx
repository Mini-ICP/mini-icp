import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Gamepad, TrendingUp, Users, Trophy } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { IILogin, IILogout } from '../auth';
import { useIdentity } from '../context/AppContext';
import { gamesData } from './gamesData';

const HomePage = () => {

    const navigate = useNavigate();

    const { identity, setIdentity } = useIdentity();

    const handleLogout = () => {
        IILogout().then(() => {
          setIdentity("");
        });
      };
    
    const handleConnect = () => {
        IILogin().then((id) => setIdentity(id));
    };

    const onSelectGame = (gameId) => {
        // Handle view details action (could emit event to parent component)
        navigate(`/games/${gameId}`);
        console.log(`View details for tournament ${gameId}`);
    };

  return (
    <div className="min-h-screen bg-[#02020E] text-white">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#CC187C] to-[#38D7F5] py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-6">
            Steam, but onchain.
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Discover, Play, Compete and Bet on your favorite games built on ICP
          </p>
          <div className="flex gap-4">
            <Button className="bg-white text-[#CC187C] px-6 py-3 rounded-lg font-semibold hover:bg-[#90EE90] hover:text-[#02020E] transition-colors duration-300">
              Explore Games
            </Button>
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

            {/*<Button variant="outline" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300">
              Connect Wallet
            </Button>*/}
          </div>
        </div>
      </div>

      {/* Discover Games Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#CC187C] mb-2">Discover Games</h2>
            <p className="text-[#38D7F5]">
              Discover your favourite onchain games on ICP
            </p>
          </div>
          <Button variant="link" className="text-[#90EE90] hover:text-[#90EE90]/80 transition-colors duration-300">
            View All Games →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gamesData.map((game) => (
            <Card 
              key={game.id}
              className="bg-[#17223A] border-[#CC187C] hover:border-[#FFA500] transition-colors duration-300 cursor-pointer"
              onClick={() => onSelectGame(game.id)}
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-[#90EE90]">{game.title}</CardTitle>
                <CardDescription className="text-[#38D7F5]">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-[#38D7F5]">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{game.players} active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={16} />
                    <span>{game.prizePools}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-[#38D7F5]">
                <div className="flex items-center gap-2">
                  <Gamepad size={16} />
                  <span>{game.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={16} className="text-[#90EE90]" />
                  <span>{game.rating}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage

// Main App component to handle navigation
{/*export default function Component() {
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null)

  const handleSelectGame = (gameId) => {
    setSelectedGameId(gameId)
  }

  return (
    <div>
      {selectedGameId === null ? (
        <HomePage onSelectGame={handleSelectGame} />
      ) : (
        <div className="p-4 bg-[#02020E] text-white min-h-screen">
          <Button 
            onClick={() => setSelectedGameId(null)}
            className="mb-4 bg-[#CC187C] text-white hover:bg-[#CC187C]/80 transition-colors duration-300"
          >
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-[#90EE90] mb-4">Game Details (ID: {selectedGameId})</h1>
          <p className="text-[#38D7F5]">Game details would be displayed here.</p>
        </div>
      )}
    </div>
  )
}*/}