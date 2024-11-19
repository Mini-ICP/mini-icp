import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Trophy, Clock, Users, Coins } from 'lucide-react';

const Tournament = () => {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('ongoing');
  
    // Mock data - replace with actual API calls
    const tournaments = [
        {
            id: '1',
            game: 'Hosted by 0x5049...9dA3',
            name: 'Cat Town: Gaming Night',
            startDate: '2024-11-15',
            endDate: '2024-12-20',
            prizePool: 1000,
            participants: 64,
            maxParticipants: 128,
            status: 'ongoing',
            currentBets: 500,
        },
        {
            id: '2',
            game: 'Hosted by 0x5049...9dA3',
            name: 'Weekly Tournament #45',
            startDate: '2024-10-10',
            endDate: '2024-10-12',
            prizePool: 1000,
            participants: 32,
            maxParticipants: 32,
            status: 'ended',
            currentBets: 800,
        },
        {
            id: '3',
            game: 'Hosted by 0x5049...9dA3',
            name: 'Fit Club: 10 Day Challenge',
            startDate: '2024-11-10',
            endDate: '2024-12-30',
            prizePool: 3000,
            participants: 32,
            maxParticipants: 100,
            status: 'ongoing',
            currentBets: 30,
        },
    ];

    const handleViewDetails = (tournamentId) => {
        // Handle view details action (could emit event to parent component)
        navigate(`/tournament/${tournamentId}`);
        console.log(`View details for tournament ${tournamentId}`);
    };

    const handlePlaceBet = (tournamentId) => {
        // Handle place bet action (could emit event to parent component)
        console.log(`Place bet for tournament ${tournamentId}`);
    };

    const handleHostTournament = () => {
        // Handle host tournament action (could emit event to parent component)
        navigate('/host-tournament');  // Navigate to the host tournament page
    };

    const TournamentCard = ({ tournament }) => (
        <Card className="w-full mb-4 bg-[#02020E] border-[#CC187C] border-2 text-white shadow-[0_0_20px_rgba(204,24,124,0.5)]">
            <CardHeader>
                <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="text-xl text-[#90EE90] font-bold">{tournament.name}</CardTitle>
                    <CardDescription className="text-[#38D7F5]">{tournament.game}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-[#FFA500]" />
                    <span className="font-bold text-[#FFA500]">{tournament.prizePool} USDC</span>
                </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4 text-base">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#38D7F5]" />
                    <span className="text-[#38D7F5]">{new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#90EE90]" />
                    <span className="text-[#90EE90]">{tournament.participants}/{tournament.maxParticipants} Players</span>
                </div>
                <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-[#FFA500]" />
                    <span className="text-[#FFA500]">{tournament.currentBets} USDC in bets</span>
                </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button 
                variant="outline" 
                onClick={() => handleViewDetails(tournament.id)}
                className="border-[#CC187C] text-[#CC187C] hover:bg-[#CC187C] hover:text-white transition-colors duration-300"
                >
                View Details
                </Button>
                {tournament.status === 'ongoing' && (
                <Button 
                    onClick={() => handlePlaceBet(tournament.id)}
                    className="bg-[#FFA500] text-[#02020E] font-bold hover:bg-[#FFA500]/80 transition-colors duration-300"
                >
                    Place Bet
                </Button>
                )}
            </CardFooter>
        </Card>
    );
    
    return (
        <>
            {/*<nav className="bg-[#17223A] p-4">
                    <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold text-[#CC187C]">Mini-ICP</div>
                    <Button 
                        onClick={handleInternetIdentity}
                        className="bg-[#FFA500] text-[#02020E] font-bold hover:bg-[#FFA500]/80 transition-colors duration-300"
                    >
                        Internet Identity
                    </Button>
                </div>
            </nav>*/}
            <div className="container mx-auto p-6 bg-[#02020E] min-h-screen text-white">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-[#CC187C] tracking-wider">TOURNAMENTS</h1>
                    <Button 
                        onClick={handleHostTournament}
                        className="bg-[#FFA500] text-[#02020E] font-bold hover:bg-[#FFA500]/80 transition-colors duration-300"
                    >
                        Host Tournament
                    </Button>
                </div>
            
                <Tabs defaultValue="ongoing" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-[#2D3F6D] p-1 rounded-lg">
                        <TabsTrigger 
                        value="ongoing" 
                        className="data-[state=active]:bg-[#CC187C] data-[state=active]:text-white text-[#38D7F5] font-bold transition-colors duration-300"
                        >
                            Ongoing
                        </TabsTrigger>
                        <TabsTrigger 
                        value="upcoming" 
                        className="data-[state=active]:bg-[#CC187C] data-[state=active]:text-white text-[#38D7F5] font-bold transition-colors duration-300"
                        >
                            Upcoming
                        </TabsTrigger>
                        <TabsTrigger 
                        value="ended" 
                        className="data-[state=active]:bg-[#CC187C] data-[state=active]:text-white text-[#38D7F5] font-bold transition-colors duration-300"
                        >
                            Ended
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="ongoing">
                        {tournaments.filter(t => t.status === 'ongoing').map(tournament => (
                        <TournamentCard key={tournament.id} tournament={tournament} />
                        ))}
                    </TabsContent>
                    
                    <TabsContent value="upcoming">
                        {tournaments.filter(t => t.status === 'upcoming').map(tournament => (
                        <TournamentCard key={tournament.id} tournament={tournament} />
                        ))}
                    </TabsContent>
                    
                    <TabsContent value="ended">
                        {tournaments.filter(t => t.status === 'ended').map(tournament => (
                        <TournamentCard key={tournament.id} tournament={tournament} />
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
  }

export default Tournament