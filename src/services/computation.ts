export function lookDiskScheduling(head: number, tracks: number[]): number[] {
    if (tracks.length === 0) {
        return [head];
    }

    tracks.sort((a, b) => a - b);

    let splitIndex = tracks.findIndex(track => track > head);

    let lowerTracks = tracks.slice(0, splitIndex);
    let upperTracks = tracks.slice(splitIndex);

    let result: number[] = [head];
    if (lowerTracks.length === 0 || (upperTracks.length > 0 && head - lowerTracks[lowerTracks.length - 1] > upperTracks[0] - head)) {
        result = result.concat(upperTracks.concat(lowerTracks.reverse()));
    } else {
        result = result.concat(lowerTracks.reverse().concat(upperTracks));
    }

    return result;
}

export function calculateTotalMovementAndTime(travelledTracks: number[], timePerTrack: number): { totalTracksTravelled: number, totalTimeTaken: number } {
    let totalTracksTravelled = 0;
    let totalTimeTaken = 0;

    for (let i = 0; i < travelledTracks.length-1; i++) {
        totalTracksTravelled += Math.abs(travelledTracks[i] - travelledTracks[i + 1]);
    }

    totalTimeTaken = totalTracksTravelled * timePerTrack;

    return { totalTracksTravelled, totalTimeTaken };
}

export function calculateAverageSeekTime(travelledTracks: number[], timePerTrack: number): number {
    let { totalTracksTravelled, totalTimeTaken } = calculateTotalMovementAndTime(travelledTracks, timePerTrack);
    return totalTimeTaken / (travelledTracks.length-1);
}