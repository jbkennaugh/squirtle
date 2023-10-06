import queries from "../data/all-queries.json";

const apiKey = process.env.REACT_APP_STARTGG_API_KEY;
const url = "https://api.start.gg/gql/alpha";
const headers = {
  "content-type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer " + apiKey,
};

// gets event details from ID and Name
export async function getEvent(tournamentName, eventName) {
  const eventSlug = `tournament/${tournamentName}/event/${eventName}`;
  const event = {
    id: null,
    name: null,
  };
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
      event.id = data.data.event?.id;
      event.name = data.data.event?.name;
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

// export async function getAllEventsBySeason(seasonName) {
//   tournamentNames[`${seasonName}`].forEach((tournamentName) => {
//     getEventId(tournamentName, "ultimate-singles").then((eventId) =>
//       getAllSetsByEvent(eventId)
//     );
//   });
// }

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

export async function getStreamQueueByTournament(name) {
  const slug = `tournament/${name}`;
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
    .then(
      (data) => (streamQueue = data.data.tournament?.streamQueue?.[0].sets)
    );

  return streamQueue;
}

// very temporary function to allow it to know which MeltingPoint weekly it is being used for
// before making it available to select a tournament.
export function getWeeklyName() {
  const startDate = new Date("2023-09-28");
  const difference = new Date() - startDate;

  const weeklyName = `meltingpoint-${
    147 + Math.ceil(difference / (1000 * 60 * 60 * 24) / 7)
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
