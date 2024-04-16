import { Label } from "@radix-ui/react-menubar";
import Navbar from "./components/Navbar";
import { Input } from "./components/ui/input";
import { useCallback, useState } from "react";
import { Button } from "./components/ui/button";
import { Minus, Plus } from "lucide-react";

function App() {
  const [headTrack, setHeadTrack] = useState<number>(0);

  const [tracks, setTracks] = useState<number[]>([0]);

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

  return (
    <main>
      <Navbar className="mb-8" />

      <section className="px-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold">Head Track</Label>
          <Input
            id="headtrack"
            type="number"
            required
            placeholder="Enter Head Track Value"
            value={headTrack}
            onChange={(e) => {
              setHeadTrack(parseInt(e.target.value));
            }}
          />
        </div>

        <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold">Tracks</Label>
          {tracks.map((track, index) => (
            <div key={`track-${index}`} className="mt-2">
              <Label>Track {index + 1}</Label>

              <div className="flex items-center justify-center gap-2">
                <Input
                  type="number"
                  min={1}
                  value={track}
                  onChange={(e) =>
                    handleTrackChange(index, parseInt(e.target.value))
                  }
                />
                <Button
                  variant={"outline"}
                  onClick={() => {
                    handleRemoveTrack(index);
                  }}
                >
                  <Minus />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <Button variant={"outline"} onClick={handleAddTrack}>
            <Plus className="mr-2" /> Add New Track
          </Button>
        </div>
      </section>
    </main>
  );
}

export default App;
