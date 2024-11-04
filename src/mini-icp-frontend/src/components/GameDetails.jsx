import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Trophy, Gamepad, Star, Clock, Wallet } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Image1 from '../assets/game_03.jpeg'

export default function GameDetails({ gameId, onBack  }) {

    const { id } = useParams();
    const navigate = useNavigate();
  // Mock data - in a real app, fetch this based on the gameId
  const gameDetails = {
    id: 1,
    title: "Ultimate Champions",
    description: "Collect, manage, and trade your favourite football players.",
    longDescription: `
        Ultimate Champions is a free-to-play fantasy Football and Basketball game powered by officially licensed 
        digital cards as NFTs. Players act as team managers, building their dream squads to compete weekly for 
        rewards. Each card represents a real-world athlete, and players can trade, buy, and sell their cards across 
        the blockchain.
    `,
    players: "2.5K",
    prizePools: "50K ICP",
    image: Image1,
    category: "E-Sports",
    rating: 4.8,
    developer: "DragonForge Studios",
    releaseDate: "2024-01-15",
    minStake: "5 ICP",
    tournaments: [
      {
        name: "Weekly Dragon Master",
        prize: "1000 ICP",
        participants: 128,
        startTime: "2024-11-10 18:00 UTC"
      },
      {
        name: "Daily Skirmish",
        prize: "100 ICP",
        participants: 64,
        startTime: "2024-11-05 00:00 UTC"
      }
    ]
  }

  const handleBack = () => {
    navigate('/');  // Adjust this path to match your route structure
  };

  return (
    <div className="min-h-screen bg-[#02020E] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Button 
          onClick={handleBack}
          className="mb-6 text-[#90EE90] hover:text-[#90EE90]/80 transition flex items-center gap-2"
          variant="link"
        >
          ← Back to Games
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img
              src={gameDetails.image}
              alt={gameDetails.title}
              className="w-full rounded-lg mb-6"
            />
            
            <h1 className="text-4xl font-bold text-[#CC187C] mb-4">
              {gameDetails.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-[#38D7F5]">
                <Users size={16} />
                <span>{gameDetails.players} active</span>
              </div>
              <div className="flex items-center gap-2 text-[#38D7F5]">
                <Trophy size={16} />
                <span>{gameDetails.prizePools}</span>
              </div>
              <div className="flex items-center gap-2 text-[#38D7F5]">
                <Gamepad size={16} />
                <span>{gameDetails.category}</span>
              </div>
              <div className="flex items-center gap-2 text-[#38D7F5]">
                <Star size={16} className="text-[#FFA500]" />
                <span>{gameDetails.rating}</span>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-[#90EE90] mb-6">
                {gameDetails.description}
              </p>
              <div className="whitespace-pre-line text-[#38D7F5]">
                {gameDetails.longDescription}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-[#17223A] border-[#CC187C]">
              <CardHeader>
                <CardTitle className="text-[#90EE90]">Play Now</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-[#CC187C] text-white hover:bg-[#CC187C]/80 transition-colors duration-300">
                  Launch Game
                </Button>
                <Button className="w-full bg-[#38D7F5] text-[#02020E] hover:bg-[#38D7F5]/80 transition-colors duration-300">
                  Join Tournament
                </Button>
              </CardContent>
            </Card>

            {/* Tournament Schedule */}
            <Card className="bg-[#17223A] border-[#CC187C]">
              <CardHeader>
                <CardTitle className="text-[#90EE90]">Active Tournaments</CardTitle>
                <CardDescription className="text-[#38D7F5]">
                  Compete for ICP prizes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {gameDetails.tournaments.map((tournament, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-[#2D3F6D] rounded-lg space-y-2"
                  >
                    <h4 className="text-[#90EE90] font-semibold">
                      {tournament.name}
                    </h4>
                    <div className="flex justify-between text-sm text-[#38D7F5]">
                      <div className="flex items-center gap-2">
                        <Trophy size={14} />
                        <span>{tournament.prize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} />
                        <span>{tournament.participants}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#38D7F5]">
                      <Clock size={14} />
                      <span>{tournament.startTime}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Game Info */}
            <Card className="bg-[#17223A] border-[#CC187C]">
              <CardHeader>
                <CardTitle className="text-[#90EE90]">Game Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-[#38D7F5]">
                  <span>Developer</span>
                  <span>{gameDetails.developer}</span>
                </div>
                <div className="flex justify-between text-[#38D7F5]">
                  <span>Release Date</span>
                  <span>{gameDetails.releaseDate}</span>
                </div>
                <div className="flex justify-between text-[#38D7F5]">
                  <span>Minimum Stake</span>
                  <span>{gameDetails.minStake}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

//export default GameDetails;