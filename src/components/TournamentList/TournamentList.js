import "./style.css";
import * as queries from "../../util/queries";

const TournamentList = () => {
  let eventId;
  queries.getPhaseId("meltingpoint-146", "bracket").then((res) => {
    eventId = res;
  });

  return (
    <div class="tournament-list-container">
      <ul class="tournament-list">
        <li>{eventId}</li>
      </ul>
    </div>
  );
};

export default TournamentList;
