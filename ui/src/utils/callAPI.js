// retrieves riverbed data
export async function getRiverData (riverID) {
  const response = await fetch(`/riverbed/${riverID}`);
  const data = await response.json();
  return data;
};

// retrieves list of rivers for dropdown
export async function getRivers (setAvailableRivers) {
  const response = await fetch("/available");
  const data = await response.json();
  // state setter
  setAvailableRivers(data);
  return data;
};

// retrieves riverstations data (not yet implemented)
export async function getStations () {
  const response = await fetch(`/stations/Meramec%20River`);
  const stations = await response.json();
  return stations;
};

