import "./style.css";
import tournaments from "../../data/tournaments.json";

const TournamentList = () => {
  return (
    <div className="tournament-list-container">
      <ul className="tournament-list">
        {Object.keys(tournaments).map((tournamentName) => {
          console.log(tournamentName);
          return <li>{tournamentName}</li>;
        })}
      </ul>
    </div>
  );
};

export default TournamentList;
