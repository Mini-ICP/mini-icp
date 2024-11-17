import React from 'react'
import { Button } from "./ui/button"
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Trophy, Clock, Users, Coins, ArrowLeft, Video, Swords, Medal } from 'lucide-react'

export default function TournamentDetails({ tournamentId, onBack }) {

    const { id } = useParams();
    const navigate = useNavigate();
  // Mock data - replace with actual API calls
  const tournaments = [
    {
        id: '1',
        game: 'Cat Town: Gaming Night',
        name: 'Hosted by 0x5049...9dA3',
        startDate: '2024-11-15',
        endDate: '2024-12-20',
        prizePool: 1000,
        participants: 64,
        maxParticipants: 128,
        status: 'ongoing',
        currentBets: 500,
        streamUrl: '#',
        description: {
            overview: "Cat Town is a cozy DeFi game on Base where players build their feline empire by purchasing cats and combining floofs to increase their ETH yield and earn $KIBBLE rewards. Engage in minigames to earn additional rewards and accessories for your cats, while exploring a town full of interactive features.",
            format: "Double elimination bracket. Best of 3 matches until semi-finals, Best of 5 for semi-finals and finals.",
            rules: [
                "Standard competitive ruleset",
                "All characters and maps enabled",
                "5 minute time limit per round",
                "No pause abuse"
            ],
            prizes: [
                { place: 1, amount: 500, description: "First Place + Championship Trophy" },
                { place: 2, amount: 300, description: "Second Place + Silver Medal" },
                { place: 3, amount: 200, description: "Third Place + Bronze Medal" }
            ]
        },
        players: [
            { id: 1, name: '0xIC0D...AB10', bet: 100, odds: 2.5, rank: 1 },
            { id: 2, name: '0xD07D...BFa0', bet: 75, odds: 3.0, rank: 2 },
            { id: 3, name: '0xABC1...XYZ2', bet: 50, odds: 4.0, rank: 3 },
            { id: 4, name: '0x123F...789E', bet: 25, odds: 5.0, rank: 4 },
        ]
    },
    {
        id: '2',
        game: 'Weekly Tournament #45',
        name: 'Hosted by 0x5049...9dA3',
        startDate: '2024-10-10',
        endDate: '2024-10-12',
        prizePool: 1000,
        participants: 32,
        maxParticipants: 32,
        status: 'ended',
        currentBets: 800,
        streamUrl: '#',
        description: {
            overview: "Weekly tournament featuring competitive gameplay and exciting prizes.",
            format: "Single elimination bracket. Best of 3 matches throughout.",
            rules: [
                "Standard competitive ruleset",
                "All characters and maps enabled",
                "3 minute time limit per round"
            ],
            prizes: [
                { place: 1, amount: 500, description: "First Place" },
                { place: 2, amount: 300, description: "Second Place" },
                { place: 3, amount: 200, description: "Third Place" }
            ]
        },
        players: [
            { id: 1, name: '0xWIN1...RST1', bet: 200, odds: 2.0, rank: 1 },
            { id: 2, name: '0xPLY2...UVW2', bet: 150, odds: 2.5, rank: 2 },
            { id: 3, name: '0xGMR3...XYZ3', bet: 100, odds: 3.0, rank: 3 },
            { id: 4, name: '0xBET4...ABC4', bet: 50, odds: 4.0, rank: 4 },
        ]
    },
    {
        id: '3',
        game: 'Fit Club: 10 Day Challenge',
        name: 'Hosted by 0x5049...9dA3',
        startDate: '2024-11-10',
        endDate: '2024-12-30',
        prizePool: 3000,
        participants: 32,
        maxParticipants: 100,
        status: 'ongoing',
        currentBets: 30,
        streamUrl: '#',
        description: {
            overview: "A 10-day fitness challenge where participants compete to achieve their fitness goals.",
            format: "Point-based system with daily challenges and leaderboard updates.",
            rules: [
                "Daily workout completion required",
                "Photo proof for each challenge",
                "Fair play and honest reporting"
            ],
            prizes: [
                { place: 1, amount: 1500, description: "First Place + Premium Membership" },
                { place: 2, amount: 1000, description: "Second Place + Fitness Package" },
                { place: 3, amount: 500, description: "Third Place + Supplement Pack" }
            ]
        },
        players: [
            { id: 1, name: '0xFIT1...GYM1', bet: 150, odds: 2.2, rank: 1 },
            { id: 2, name: '0xRUN2...JOG2', bet: 100, odds: 2.8, rank: 2 },
            { id: 3, name: '0xLFT3...PRO3', bet: 75, odds: 3.5, rank: 3 },
            { id: 4, name: '0xCRD4...FIT4', bet: 25, odds: 5.5, rank: 4 },
        ]
    }
  ];

  const tournament = tournaments.find(t => t.id === id);

  if (!tournament) {
    return (
        <div className="container mx-auto p-6 bg-[#02020E] min-h-screen text-white">
            <h1>Tournament not found</h1>
        </div>
    );
  }

  const handleBack = () => {
    navigate('/tournament');  // Adjust this path to match your route structure
  };

  const handleWatchStream = () => {
    window.open(tournament.streamUrl, '_blank')
  }

  return (
    <div className="container mx-auto p-6 bg-[#02020E] min-h-screen text-white">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-[#90EE90] hover:text-[#90EE90]/80"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tournaments
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Tournament Info Card */}
        <Card className="w-full bg-[#17223A] border-[#CC187C] border-2 text-white shadow-[0_0_20px_rgba(204,24,124,0.5)]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-3xl text-[#90EE90] font-bold">{tournament.name}</CardTitle>
                <p className="text-xl text-[#38D7F5] mt-2">{tournament.game}</p>
              </div>
              <Button
                onClick={handleWatchStream}
                className="bg-[#FFA500] text-[#02020E] hover:bg-[#FFA500]/80 transition-colors duration-300"
              >
                <Video className="h-4 w-4 mr-2" />
                Watch Stream
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#FFA500]" />
                <span className="font-bold text-[#FFA500]">{tournament.prizePool} USDC</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#38D7F5]" />
                <span className="text-[#38D7F5]">
                  {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#90EE90]" />
                <span className="text-[#90EE90]">{tournament.participants}/{tournament.maxParticipants} Players</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-[#FFA500]" />
                <span className="text-[#FFA500]">{tournament.currentBets} USDC in bets</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tournament Description Card */}
        <Card className="w-full bg-[#17223A] border-[#CC187C] border-2 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-[#90EE90]">Tournament Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overview Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#38D7F5] mb-2">Overview</h3>
              <p className="text-[#90EE90]">{tournament.description.overview}</p>
            </div>

            {/* Format Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#38D7F5] mb-2 flex items-center gap-2">
                <Swords className="h-5 w-5" />
                Tournament Format
              </h3>
              <p className="text-[#90EE90]">{tournament.description.format}</p>
            </div>

            {/* Rules Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#38D7F5] mb-2">Rules</h3>
              <ul className="list-disc list-inside text-[#90EE90]">
                {tournament.description.rules.map((rule, index) => (
                  <li key={index} className="mb-1">{rule}</li>
                ))}
              </ul>
            </div>

            {/* Prize Distribution */}
            <div>
              <h3 className="text-lg font-semibold text-[#38D7F5] mb-2 flex items-center gap-2">
                <Medal className="h-5 w-5" />
                Prize Distribution
              </h3>
              <div className="grid gap-2">
                {tournament.description.prizes.map((prize) => (
                  <div 
                    key={prize.place}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#2D3F6D]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#FFA500] font-bold">#{prize.place}</span>
                      <span className="text-[#90EE90]">{prize.description}</span>
                    </div>
                    <span className="text-[#FFA500] font-bold">{prize.amount} USDC</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Players Table Card */}
        <Card className="w-full bg-[#17223A] border-[#CC187C] border-2 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-[#90EE90]">Current Players & Bets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-[#CC187C] overflow-hidden">
              <div className="w-full">
                {/* Table Header */}
                <div className="bg-[#2D3F6D] grid grid-cols-4 p-4 text-[#38D7F5] font-medium">
                  <div>Rank</div>
                  <div>Player</div>
                  <div className="text-right">Current Bet</div>
                  <div className="text-right">Odds</div>
                </div>

                {/* Table Body */}
                {tournament.players.map((player) => (
                  <div 
                    key={player.id} 
                    className="grid grid-cols-4 p-4 border-t border-[#CC187C]/20 hover:bg-[#2D3F6D] transition-colors"
                  >
                    <div className="font-medium text-[#90EE90]">#{player.rank}</div>
                    <div className="text-white">{player.name}</div>
                    <div className="text-right text-[#FFA500]">{player.bet} USDC</div>
                    <div className="text-right text-[#38D7F5]">{player.odds}x</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}