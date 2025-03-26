import { intervalCollection } from "time-events-manager";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getStreamQueueByEvent, getEvent } from "../../util/queries";
import navigateTo from "../../util/navigate";

const StreamQueue = ({
  loggedIn,
  setSelectedSet,
  setTournament,
  tournament,
}) => {
  const navigate = useNavigate();
  const [sets, updateSets] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      init();
    }
  });

  const init = () => {
    if (!tournament) {
      const eventSlug = Cookies.get("selected_event_slug");
      if (eventSlug) {
        getEvent(eventSlug).then((event) => {
          setTournament({
            name: event.tournament.name,
            slug: event.tournament.slug,
            event: { id: event.id, name: event.name },
          });
        });
      } else {
        console.log("Wuh oh");
        const navMessage = `Event slug in cookies is ${eventSlug} so navigating back to list`;
        navigateTo(navigate, "/tournamentList", navMessage);
      }
    } else {
      if (!sets) {
        getStreamQueueByEvent(tournament.slug, tournament.event.id).then(
          (res) => {
            updateSets(res);
            setLoading(false);
          }
        );
      }
      if (intervalCollection.getAll().length === 0) {
        // updates sets every 5 seconds - check ensures it isn't added many times
        setInterval(() => {
          getStreamQueueByEvent(tournament.slug, tournament.event.id).then(
            (res) => {
              updateSets(res);
            }
          );
        }, 5 * 1000);
      }
    }
  };

  const handleBackButton = () => {
    Cookies.remove("selected_tournament_slug");
    Cookies.remove("selected_event_id");
    navigateTo(navigate, "/tournamentList");
  };

  const handleSetSelection = (set) => {
    if (set.slots[0].entrant && set.slots[1].entrant) {
      setSelectedSet(set);
      navigateTo(navigate, "/setReporter");
    }
  };

  return (
    <div className="container w-2/3 mx-auto">
      <div
        className="flex absolute items-center cursor-pointer top-7 left-5"
        onClick={handleBackButton}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 25 25"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </div>
      {tournament && (
        <h1 className="text-5xl text-mpprimary py-5 text-center">{`${tournament.name} (${tournament.event.name})`}</h1>
      )}
      <ul className="stream-queue">
        {isLoading ? (
          <h1 className="text-4xl py-5 text-center text-white">
            Loading sets...
          </h1>
        ) : sets == null ? (
          <h1 className="text-4xl py-5 text-center text-white">
            No sets queued for stream.
          </h1>
        ) : (
          sets.map((set) => {
            const player1Name = set.slots[0].entrant?.participants[0].gamerTag;
            const player2Name = set.slots[1].entrant?.participants[0].gamerTag;
            return (
              <li
                className={
                  "stream-set py-5 my-3 rounded-lg flex flex-col text-center space-y-5 border-4 border-transparent text-mpsecondary" +
                  (set.slots[0].entrant && set.slots[1].entrant
                    ? " bg-mpprimary hover:border-mpprimarydark hover:cursor-pointer"
                    : " bg-gray-500")
                }
                onClick={() => handleSetSelection(set)}
                key={`${player1Name}Vs${player2Name}Rnd${set.fullRoundText}`}
              >
                <div className="round text-3xl">{`${set.fullRoundText}`}</div>
                <div className="flex justify-around pb-5">
                  {set.slots[0].entrant ? (
                    <div className="entrant">
                      <p className="text-2xl">{`${player1Name}`}</p>
                      <p className="text-xl text-gray-600">{`seed: ${set.slots[0].entrant.seeds[0].seedNum}`}</p>
                    </div>
                  ) : (
                    <div className="entrant">
                      <p className="text-2xl text-red-500">To be decided.</p>
                    </div>
                  )}
                  {set.slots[1].entrant ? (
                    <div className="entrant">
                      <p className="text-2xl">{`${player2Name}`}</p>
                      <p className="text-xl text-gray-600">{`seed: ${set.slots[1].entrant.seeds[0].seedNum}`}</p>
                    </div>
                  ) : (
                    <div className="entrant">
                      <p className="text-2xl text-red-500">To be decided.</p>
                    </div>
                  )}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default StreamQueue;
