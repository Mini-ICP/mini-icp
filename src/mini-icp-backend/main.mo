import Principal "mo:base/Principal";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";
import Error "mo:base/Error";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor TournamentSystem {
    // Types
    type Bet = {
        amount: Nat;
        bettor: Principal;
    };

    type ParticipantData = {
        bets: Buffer.Buffer<Bet>;
        var totalBetAmount: Nat;
    };

    type Tournament = {
        tournamentOwner: Principal;
        participants: Buffer.Buffer<Principal>;
        deadline: Time.Time;
        var settled: Bool;
        var winner: ?Principal;
        var totalPool: Nat;
        maxPlayer: Nat;
    };

    // State
    private let owner: Principal = Principal.fromText("aaaaa-aa"); // Replace with actual principal
    private var tournaments = HashMap.HashMap<Nat, Tournament>(10, Nat.equal, Int.hash);
    private var participantData = HashMap.HashMap<(Nat, Principal), ParticipantData>(10, func(x, y) = x.0 == y.0 and Principal.equal(x.1, y.1), func(k) = Int.hash(k.0));

    // Error types
    type Error = {
        #DeadlineInPast;
        #ParticipantsRequired;
        #InvalidParticipant;
        #BettingClosed;
        #TournamentAlreadySettled;
        #ZeroBetAmount;
        #TransferFailed;
        #NoBetsOnWinner;
        #NotAuthorized;
        #TournamentFull;
        #TournamentNotFound;
    };

    // Helper functions
    private func getParticipantData(tournamentId: Nat, participant: Principal) : ?ParticipantData {
        participantData.get((tournamentId, participant))
    };

    // Main functions
    public shared(msg) func createTournament(name: Text, deadline: Time.Time, tournamentId: Nat, maxPlayer: Nat) : async Result.Result<(), Error> {
        if (deadline <= Time.now()) {
            return #err(#DeadlineInPast);
        };

        let newTournament : Tournament = {
            tournamentOwner = msg.caller;
            participants = Buffer.Buffer<Principal>(maxPlayer);
            deadline = deadline;
            var settled = false;
            var winner = null;
            var totalPool = 0;
            maxPlayer = maxPlayer;
        };

        tournaments.put(tournamentId, newTournament);
        #ok()
    };

    public shared(msg) func addParticipant(tournamentId: Nat, participant: Principal) : async Result.Result<(), Error> {
        switch (tournaments.get(tournamentId)) {
            case null { #err(#TournamentNotFound) };
            case (?tournament) {
                if (tournament.participants.size() == tournament.maxPlayer) {
                    return #err(#TournamentFull);
                };

                if (Principal.isAnonymous(participant)) {
                    return #err(#InvalidParticipant);
                };

                let newParticipantData = {
                    bets = Buffer.Buffer<Bet>(10);
                    var totalBetAmount = 0;
                };

                participantData.put((tournamentId, participant), newParticipantData);
                tournament.participants.add(participant);
                #ok()
            };
        }
    };

    public shared(msg) func placeBet(tournamentId: Nat, participant: Principal, amount: Nat) : async Result.Result<(), Error> {
        switch (tournaments.get(tournamentId)) {
            case null { #err(#TournamentNotFound) };
            case (?tournament) {
                if (Time.now() >= tournament.deadline) {
                    return #err(#BettingClosed);
                };

                if (tournament.settled) {
                    return #err(#TournamentAlreadySettled);
                };

                if (amount == 0) {
                    return #err(#ZeroBetAmount);
                };

                switch (getParticipantData(tournamentId, participant)) {
                    case null { #err(#InvalidParticipant) };
                    case (?data) {
                        let newBet = {
                            amount;
                            bettor = msg.caller;
                        };

                        data.bets.add(newBet);
                        data.totalBetAmount += amount;
                        tournament.totalPool += amount;
                        #ok()
                    };
                }
            };
        }
    };

    public shared(msg) func settleTournament(tournamentId: Nat, winningParticipant: Principal) : async Result.Result<(), Error> {
        switch (tournaments.get(tournamentId)) {
            case null { #err(#TournamentNotFound) };
            case (?tournament) {
                if (Time.now() < tournament.deadline) {
                    return #err(#BettingClosed);
                };

                if (tournament.settled) {
                    return #err(#TournamentAlreadySettled);
                };

                if (msg.caller != tournament.tournamentOwner and msg.caller != owner) {
                    return #err(#NotAuthorized);
                };

                switch (getParticipantData(tournamentId, winningParticipant)) {
                    case null { #err(#InvalidParticipant) };
                    case (?winnerData) {
                        if (winnerData.totalBetAmount == 0) {
                            return #err(#NoBetsOnWinner);
                        };

                        tournament.settled := true;
                        tournament.winner := ?winningParticipant;

                        // In ICP, you would integrate with a ledger canister here to handle payments
                        // This is a simplified version that just marks the tournament as settled
                        #ok()
                    };
                }
            };
        }
    };

    // Query functions
    public query func getTournament(tournamentId: Nat) : async Result.Result<{
        participants: [Principal];
        deadline: Time.Time;
        settled: Bool;
        winner: ?Principal;
        totalPool: Nat;
    }, Error> {
        switch (tournaments.get(tournamentId)) {
            case null { #err(#TournamentNotFound) };
            case (?tournament) {
                #ok({
                    participants = Buffer.toArray(tournament.participants);
                    deadline = tournament.deadline;
                    settled = tournament.settled;
                    winner = tournament.winner;
                    totalPool = tournament.totalPool;
                })
            };
        }
    };

    public query func getParticipantTotalBet(tournamentId: Nat, participant: Principal) : async Nat {
        switch (getParticipantData(tournamentId, participant)) {
            case null { 0 };
            case (?data) { data.totalBetAmount };
        }
    };

    public query func getParticipantBets(tournamentId: Nat, participant: Principal) : async ([Nat], [Principal]) {
        switch (getParticipantData(tournamentId, participant)) {
            case null { ([], []) };
            case (?data) {
                let amounts = Buffer.Buffer<Nat>(data.bets.size());
                let bettors = Buffer.Buffer<Principal>(data.bets.size());
                
                for (bet in data.bets.vals()) {
                    amounts.add(bet.amount);
                    bettors.add(bet.bettor);
                };
                
                (Buffer.toArray(amounts), Buffer.toArray(bettors))
            };
        }
    };

    public query func getTimeStamp() : async Int {
        Time.now()
    };
}