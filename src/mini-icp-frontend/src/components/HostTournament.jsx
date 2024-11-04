import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar } from 'lucide-react';

const HostTournament = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const formData = new FormData(e.target);
    const tournamentData = {
      game: formData.get('game'),
      name: formData.get('tournament-name'),
      startDate: formData.get('start-date'),
      endDate: formData.get('end-date'),
      maxParticipants: formData.get('max-participants'),
      entryFee: formData.get('entry-fee'),
      description: formData.get('description')
    };
    console.log('Tournament Data:', tournamentData);
  };

  return (
    <>
      <div className="container mx-auto p-6">

        <Card className="w-full mb-4 bg-[#02020E] border-[#CC187C] border-2 text-white shadow-[0_0_20px_rgba(204,24,124,0.5)]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#CC187C]">Host a Tournament</CardTitle>
            <CardDescription className="text-[#38D7F5]">
              Create a new tournament for your game and let players compete and bet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="game" className="text-[#90EE90]">Game Name</Label>
                <Input id="game" name="game" placeholder="Enter your game name" className="bg-[#2D3F6D] text-white border-[#CC187C] focus:border-[#FFA500] placeholder-[#38D7F5]/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tournament-name" className="text-[#90EE90]">Tournament Name</Label>
                <Input id="tournament-name" name="tournament-name" placeholder="Enter tournament name" className="bg-[#2D3F6D] text-white border-[#CC187C] focus:border-[#FFA500] placeholder-[#38D7F5]/50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date" className="text-[#90EE90]">Start Date</Label>
                  <div className="relative">
                    <Input 
                      id="start-date" 
                      name="start-date"
                      type="date"
                      className="bg-[#2D3F6D] text-white border-[#CC187C] focus:border-[#FFA500]"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-[#38D7F5]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date" className="text-[#90EE90]">End Date</Label>
                  <div className="relative">
                    <Input 
                      id="end-date" 
                      name="end-date"
                      type="date"
                      className="bg-[#2D3F6D] text-white border-[#CC187C] focus:border-[#FFA500]"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-[#38D7F5]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-participants" className="text-[#90EE90]">Maximum Participants</Label>
                  <Input 
                    id="max-participants" 
                    name="max-participants"
                    type="number" 
                    placeholder="Enter max participants"
                    className="bg-[#2D3F6D] text-white border-[#CC187C] focus:border-[#FFA500] placeholder-[#38D7F5]/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entry-fee" className="text-[#90EE90]">Entry Fee (COINS)</Label>
                  <Input 
                    id="entry-fee" 
                    name="entry-fee"
                    type="number" 
                    placeholder="Enter entry fee"
                    className="bg-[#2D3F6D] text-white border-[#CC187C] focus:border-[#FFA500] placeholder-[#38D7F5]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#90EE90]">Tournament Description</Label>
                <textarea 
                  id="description"
                  name="description"
                  className="w-full min-h-[100px] p-2 rounded-md bg-[#2D3F6D] text-white border-[#CC187C] focus:border-[#FFA500] placeholder-[#38D7F5]/50"
                  placeholder="Enter tournament details, rules, and prize distribution"
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" className="border-[#CC187C] text-[#CC187C] hover:bg-[#CC187C] hover:text-white">Cancel</Button>
                <Button type="submit" className="bg-[#FFA500] text-[#02020E] font-bold hover:bg-[#FFA500]/80">Create Tournament</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HostTournament;