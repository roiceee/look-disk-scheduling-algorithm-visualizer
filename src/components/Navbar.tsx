interface Props {
    className?: string;
}


export default function Navbar({ className }: Props) {
  return (
    <section className={`py-4 px-2 border-b ${className}`}>
      <h1 className="text-lg">LOOK Disk Scheduling Visualizer</h1>
    </section>
  );
}
