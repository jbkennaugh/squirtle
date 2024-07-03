import Cookies from "js-cookie";
import queries from "../data/all-queries.json";

const isTestMode = process.env.REACT_APP_TEST_MODE;
const apiKey = Cookies.get("access_token");
const url = "https://api.start.gg/gql/alpha";
const headers = {
  "content-type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer " + apiKey,
};

//--------------------------------------------------- QUERIES ----------------------------------------------------------------
export async function getCurrentUser() {
  const accessToken = Cookies.get("access_token");
  return await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      query: queries.currentUser,
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      let user = data.data.currentUser;
      if (user) {
        return {
          id: user.id,
          name: user.player.gamerTag,
        };
      }
    });
}

// gets event details from tournament and event Name
export async function getEvent(eventSlug) {
  const event = {};
  await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + apiKey,
    },
    body: JSON.stringify({
      query: queries.event,
      variables: {
        slug: eventSlug,
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      const locatedEvent = data.data.event;
      event.id = locatedEvent?.id;
      event.name = locatedEvent?.name;
      event.tournament = {
        name: locatedEvent?.tournament?.name,
        slug: locatedEvent?.tournament?.slug,
      };
    });
  return event;
}

export async function getPhaseId(tournamentName, eventName) {
  const eventSlug = `tournament/${tournamentName}/event/${eventName}`;
  let phaseId;
  await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: queries.phaseId,
      variables: {
        slug: eventSlug,
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      phaseId = data.data.event?.phases[0].id;
    });
  return phaseId;
}

export async function getAllSetsByEvent(eventId) {
  await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + apiKey,
    },
    body: JSON.stringify({
      query: queries.sets,
      variables: {
        eventId: eventId,
        page: 1,
        perPage: 5,
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      data.data.event?.forEach((round) => {
        console.log(
          `${round["slots"][0]["entrant"]["name"]} VERSUS ${round["slots"][1]["entrant"]["name"]}`
        );
      });
    });
}

export async function getStandingsByEvent(eventId) {
  await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: queries.standings,
      variables: {
        eventId: eventId,
        page: 1,
        perPage: 5,
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => console.log(JSON.stringify(data.data, null, 2)));
}

export async function getStreamQueueByEvent(slug, eventId) {
  let streamQueue;

  await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: queries.streamQueue,
      variables: {
        slug: slug,
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      streamQueue = data.data.tournament?.streamQueue?.[0].sets.filter(
        (set) => set.event.id === eventId
      );
    });

  return streamQueue;
}

// returns a list of events from tournaments where the current user is either admin or organiser
export async function getTournamentsWithAdmin() {
  if (isTestMode) {
    return [
      {
        id: "tournament1",
        name: "Tournament 1",
        eventName: "Ultimate Singles",
        slug: "",
      },
      {
        id: "tournament2",
        name: "Tournament 2",
        eventName: "Ultimate Doubles",
        slug: "",
      },
    ];
  }

  let tournaments = [];
  const USER_ID = Cookies.get("user_id");

  await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: queries.tournamentsByRole,
      variables: {
        userId: USER_ID,
        role: "admin",
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      data.data.user.tournaments.nodes.forEach((tournament) => {
        tournament.events.forEach((event) => {
          const eventData = {
            id: tournament.id,
            name: tournament.name,
            slug: tournament.slug,
            event: {
              id: event.id,
              name: event.name,
              slug: event.slug,
            },
          };
          tournaments.push(eventData);
        });
      });
    });

  await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: queries.tournamentsByRole,
      variables: {
        userId: USER_ID,
        role: "organizing",
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      data.data.user.tournaments.nodes.forEach((tournament) => {
        tournament.events.forEach((event) => {
          const eventData = {
            id: tournament.id,
            name: tournament.name,
            slug: tournament.slug,
            event: {
              id: event.id,
              name: event.name,
              slug: event.slug,
            },
          };
          if (
            !tournaments.find((tournament) => tournament.eventId === event.id)
          ) {
            tournaments.push(eventData);
          }
        });
      });
    });

  return tournaments;
}

//--------------------------------------------------- MUTATIONS ----------------------------------------------------------------

// returns a list of tournaments where the current user is either admin or organiser
export async function reportSet(setData) {
  await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: queries.reportSet,
      variables: {
        setId: setData.setId,
        winnerId: setData.winnerId,
        gameData: setData.gameData,
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    });
}

// marks a set as in progress - useful if you want to see which set is being reported by if it is underway
export async function markSetInProgress(setId) {
  await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: queries.markSetInProgress,
      variables: {
        setId: setId,
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    });
}

// resets a set and all associated data
export async function resetSet(setId) {
  await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: queries.resetSet,
      variables: {
        setId: setId,
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    });
}

// very temporary function to allow it to know which ExtraPoint weekly it is being used for
// before making it available to select a tournament.
export function getWeeklyName() {
  const startDate = new Date("2024-02-18");
  const difference = new Date() - startDate;

  const weeklyName = `extrapoint-${
    0 + Math.ceil(difference / (1000 * 60 * 60 * 24) / 7)
  }`;
  return weeklyName;
}

// export async function updateSeeding(phaseId, seedMapping) {
//   await fetch(url, {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify({
//       query: mutations.updateSeeding,
//       variables: {
//         phaseId: phaseId,
//         seedMapping: seedMapping,
//       },
//     }),
//   })
//     .then((r) => r.json())
//     .then((result) => console.log(result));
// }

// let seedMapping = [];
// let seedIds = [26278398, 26226410, 26228410, 26263372, 26239428, 26276670];
// let seed = 1;
// seedIds.forEach((seedId) => {
//   seedMapping.push({
//     seedId: seedId,
//     seedNum: seed,
//   });
//   seed++;
// });
