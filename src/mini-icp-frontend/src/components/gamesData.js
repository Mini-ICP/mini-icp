import Image1 from '../assets/game_03.jpeg'
import Image2 from '../assets/game_13.jpeg'
import Image3 from '../assets/game_14.jpeg'

export const gamesData = [
  {
    id: 1,
    title: "Ultimate Champions",
    description: "Collect, manage, and trade your favourite football players.",
    longDescription: `Ultimate Champions is a free-to-play fantasy Football and Basketball game powered by officially licensed 
    digital cards as NFTs. Players act as team managers, building their dream squads to compete weekly for 
    rewards. Each card represents a real-world athlete, and players can trade, buy, and sell their cards across 
    the blockchain.`,
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
  },
  {
    id: 2,
    title: "Everdawn",
    description: "Free-to-Play, 3D Tactical Trading Card Game.",
    longDescription: `Everdawn is an innovative tactical trading card game that brings deep strategy to the blockchain. 
    Players collect unique cards, build powerful decks, and compete in tournaments for substantial prizes. 
    The game features stunning 3D graphics and a rich fantasy world to explore.`,
    players: "1.8K",
    prizePools: "30K ICP",
    image: Image2,
    category: "Simulation",
    rating: 4.6,
    developer: "Pixel Dreams",
    releaseDate: "2024-02-20",
    minStake: "3 ICP",
    tournaments: [
      {
        name: "Dawn Championship",
        prize: "500 ICP",
        participants: 256,
        startTime: "2024-11-12 15:00 UTC"
      },
      {
        name: "Quick Match",
        prize: "50 ICP",
        participants: 32,
        startTime: "2024-11-06 12:00 UTC"
      }
    ]
  },
  {
    id: 3,
    title: "Fit Club",
    description: "Workout, compete, and earn on your onchain fitness journey.",
    longDescription: `Fit Club revolutionizes fitness by combining real-world workouts with blockchain rewards. 
    Track your progress, compete in challenges, and earn tokens for achieving your fitness goals. 
    Connect with like-minded individuals and participate in global fitness competitions.`,
    players: "3.2K",
    prizePools: "15K ICP",
    image: Image3,
    category: "P2E",
    rating: 4.9,
    developer: "Health Tech Labs",
    releaseDate: "2024-03-01",
    minStake: "2 ICP",
    tournaments: [
      {
        name: "Global Fitness Challenge",
        prize: "300 ICP",
        participants: 500,
        startTime: "2024-11-15 00:00 UTC"
      },
      {
        name: "Weekly Workout Rush",
        prize: "75 ICP",
        participants: 100,
        startTime: "2024-11-08 09:00 UTC"
      }
    ]
  }
]