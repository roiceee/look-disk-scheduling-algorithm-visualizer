import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import { Minus, Plus } from "lucide-react";
import { lookDiskScheduling, calculateTotalMovementAndTime, calculateAverageSeekTime } from "./services/computation";

function App() {
  const [headTrack, setHeadTrack] = useState<number>(0);

  const [tracks, setTracks] = useState<number[]>([0]);

  const [travelTime, setTravelTime] = useState<number>(1);

  const handleAddTrack = () => {
    setTracks([...tracks, 0]);
  };

  const handleRemoveTrack = useCallback(
    (index: number) => {
      if (tracks.length === 1) {
        return;
      }

      const newTracks = [...tracks];
      newTracks.splice(index, 1);
      setTracks(newTracks);
    },
    [tracks]
  );

  const handleTrackChange = useCallback(
    (index: number, value: number) => {
      const newTracks = [...tracks];
      newTracks[index] = value;
      setTracks(newTracks);
    },
    [tracks]
  );

  //Test Case For Computation
  // const headPosition: number = 50;
  // const trackRequests: number[] = [40, 10, 22, 20, 60, 2, 70, 45];
  // const arrangedTracks: number[] = lookDiskScheduling(headPosition, trackRequests);
  // const timePerTrack: number = 5; // assuming it takes 5 milliseconds to travel from one track to another

  // console.log(arrangedTracks);
  // console.log(calculateTotalMovementAndTime(arrangedTracks, timePerTrack));
  // console.log(calculateAverageSeekTime(arrangedTracks, timePerTrack));

  return (
    <main>
      <Navbar className="mb-8 sm:px-20 lg:px-48" />

      <section className="px-2 sm:px-24 lg:px-56">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Head Track Value</span>
          </div>
          <input
            id="headtrack"
            type="number"
            className="input input-bordered w-full max-w-xs input-sm"
            required
            placeholder="Enter Head Track Value"
            value={headTrack}
            min={0}
            onChange={(e) => {
              setHeadTrack(parseInt(e.target.value));
            }}
          />
        </label>

        <div className="mt-4 w-full max-w-sm">
          <h2 className="font-bold">Tracks</h2>
          <div className="max-h-96 overflow-y-auto pr-2 bg-slate-50">
            {tracks.map((track, index) => (
              <div key={`track-${index}`} className="mt-2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Track {index + 1}</span>
                  </div>
                </label>
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={track}
                    className="input input-bordered w-full max-w-xs input-sm"
                    onChange={(e) =>
                      handleTrackChange(index, parseInt(e.target.value))
                    }
                  />
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={tracks.length === 1}
                    onClick={() => {
                      handleRemoveTrack(index);
                    }}
                  >
                    <Minus />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <button onClick={handleAddTrack} className="btn btn-sm">
            <Plus className="mr-2" /> Add New Track
          </button>
        </div>

        <div>
          <label className="form-control w-full max-w-xs mt-4">
            <div className="label">
              <span className="label-text">Track Travel Time (MS)</span>
            </div>
            <input
              id="traveltime"
              type="number"
              className="input input-bordered w-full max-w-xs input-sm"
              required
              placeholder="Enter Head Track Value"
              value={travelTime}
              min={1}
              onChange={(e) => {
                setTravelTime(parseInt(e.target.value));
              }}
            />
          </label>
        </div>
      </section>
    </main>
  );
}

export default App;
