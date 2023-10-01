import "./style.css";
import * as queries from "../../util/queries";

const TournamentList = () => {
  let eventId;
  queries.getPhaseId("meltingpoint-146", "bracket").then((res) => {
    eventId = res;
  });

  return (
    <div className="tournament-list-container">
      <ul className="tournament-list">
        <li>{eventId}</li>
      </ul>
    </div>
  );
};

export default TournamentList;
