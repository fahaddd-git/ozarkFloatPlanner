// retrieves riverbed data
export async function getRiverData (riverName) {
  const response = await fetch(`/riverbed/${riverName}`);
  const data = await response.json();
  return data;
};

// retrieves list of rivers for dropdown
export async function getRivers () {
  const response = await fetch("/available");
  const data = await response.json();
  return data
};

// retrieves riverstations data (not yet implemented)
export async function getStations (riverName) {
  const response = await fetch(`/stations/${riverName}`);
  const stations = await response.json();
  return stations;
};

