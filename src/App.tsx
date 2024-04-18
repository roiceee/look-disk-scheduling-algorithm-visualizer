import { Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { lookDiskScheduling } from "./services/computation";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

function App() {
  const [headTrack, setHeadTrack] = useState<number>(50);

  const [tracks, setTracks] = useState<number[]>([60, 70, 34]);

  const [travelTime, setTravelTime] = useState<number>(1);

  const [graphData, setGraphData] = useState<{
    tracks: number[];
    travelTime: number[];
  }>({
    tracks: [],
    travelTime: [],
  });

  const inputRefs = useRef<HTMLInputElement[] | null>([]);

  const runGraph = useCallback(() => {
    if (isNaN(headTrack)) {
      alert("Please input all fields");
      return;
    }

    for (const track of tracks) {
      if (isNaN(track)) {
        alert("Please input all fields");
        return;
      }
    }

    if (isNaN(travelTime)) {
      alert("Please input all fields");
      return;
    }

    if (travelTime === 0) {
      alert("Travel time must not be 0");
      return;
    }

    const result = lookDiskScheduling(headTrack, [...tracks], travelTime);

    setGraphData(result);
  }, [headTrack, tracks, travelTime, setGraphData]);

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

  const tableData = useMemo(() => {
    const data = [];
    let tracksTraveled = 0;
    let avgTracksTraveled = 0;
    for (let i = 1; i < graphData.tracks.length; i++) {
      data.push(
        <tr key={`track-${i}`}>
          <td>
            {graphData.tracks[i - 1]} to {graphData.tracks[i]}
          </td>
          <td>{Math.abs(graphData.tracks[i - 1] - graphData.tracks[i])}</td>
        </tr>
      );
      tracksTraveled += Math.abs(graphData.tracks[i - 1] - graphData.tracks[i]);
    }
    avgTracksTraveled = tracksTraveled / (graphData.tracks.length - 1);
    return { data, tracksTraveled, avgTracksTraveled };
  }, [graphData.tracks]);

  //Register Elements
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    if (!inputRefs.current) {
      return;
    }

    if (inputRefs.current.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lastInputRef: any = inputRefs.current[tracks.length - 1];
      if (lastInputRef) {
        lastInputRef.focus();
      }
    }
  }, [tracks]);

  return (
    <main className="pb-10">
      <Navbar className="mb-8 sm:px-20 lg:px-48" />

      <div className="flex flex-col lg:flex-row justify-center gap-8 px-2 sm:px-32 flex-grow-0">
        <section>
          <Line
            className="h-96 "
            options={{
              indexAxis: "y", // This makes the chart horizontal

              scales: {
                x: {
                  type: "linear",
                  ticks: {
                    autoSkip: false,
                  },
                  beginAtZero: true,
                  position: "top",
                  title: {
                    display: true,
                    text: "Track Number",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Travel Time",
                  },
                },
              },
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            data={{
              labels: graphData.travelTime,
              datasets: [
                {
                  data: graphData.tracks,
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </section>

        <section>
          <section className="max-h-[200px] md:max-h-[500px] overflow-y-auto overflow-x-auto bg-slate-50">
            {/* create a table for two columns, loop using the length of tracks-1*/}
            <table className="table w-full text-center mb-2 ">
              <thead>
                <tr>
                  <th>Head Path</th>
                  <th>Tracks Traveled</th>
                </tr>
              </thead>
              <tbody>{tableData.data}</tbody>
            </table>
          </section>

          <section className="text-xs mt-6">
            <div>
              <span>
                Total No. of Tracks: <b>{tableData.tracksTraveled}</b> ms
              </span>
            </div>
            <div>
              <span>
                Avg No of Tracks Traveled:{" "}
                <b>{tableData.avgTracksTraveled.toFixed(2)} ms</b>
              </span>
            </div>
          </section>
        </section>

        <section className="sm:items-center min-w-48">
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
            <div className="h-64 overflow-y-auto bg-slate-50">
              {tracks.map((track, index) => (
                <div key={`track-${index}`} style={{ marginBottom: "6px" }}>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Track {index + 1}</span>
                    </div>
                  </label>
                  <div className="flex items-center justify-center gap-2 px-2 mb-4">
                    <input
                      type="number"
                      min={1}
                      value={track}
                      className="input input-bordered w-full max-w-xs input-sm"
                      ref={(el) => {
                        if (el) {
                          if (inputRefs.current)
                            inputRefs.current[index] = el as HTMLInputElement;
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddTrack();
                        }
                      }}
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

          <div className="mt-4 text-center sm:text-left">
            <button
              onClick={runGraph}
              className="btn btn-accent btn-sm btn-wide"
            >
              Run Graph
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
