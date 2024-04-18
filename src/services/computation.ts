export function lookDiskScheduling(
  head: number,
  tracks: number[],
  travelTime: number
): { tracks: number[]; travelTime: number[] } {
  if (tracks.length === 0) {
    return { tracks, travelTime: [0] };
  }

  tracks = tracks.sort((a, b) => a - b);

  const splitIndex = tracks.findIndex((track) => track > head);

  const lowerTracks = tracks.slice(0, splitIndex);
  const upperTracks = tracks.slice(splitIndex);


  let result: number[] = [head];

  if (upperTracks.length === 0) {
    result = result.concat(lowerTracks.reverse());

    return {
      tracks: result,
      travelTime: getTravelTimes(travelTime, result.length),
    };
  }

  if (lowerTracks.length === 0) {
    result = result.concat(upperTracks);

    return {
      tracks: result,
      travelTime: getTravelTimes(travelTime, result.length),
    };
  }

  result = result.concat(upperTracks).concat(lowerTracks.reverse());

  return {
    tracks: result,
    travelTime: getTravelTimes(travelTime, result.length),
  };
}

function getTravelTimes(
  travelTime: number,
  trackEntriesLength: number
): number[] {
  let currentTravelTime = 0;
  const travelTimes = [];
  travelTimes.push(currentTravelTime);
  for (let i = 0; i < trackEntriesLength - 1; i++) {
    currentTravelTime += travelTime;
    travelTimes.push(currentTravelTime);
  }

  return travelTimes;
}
