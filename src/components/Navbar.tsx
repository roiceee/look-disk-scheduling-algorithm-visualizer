interface Props {
  className?: string;
}

export default function Navbar({ className }: Props) {
  return (
    <div className={`navbar bg-base-100 border-b ${className}`}>
      <a className="btn btn-ghost text-xl">LOOK Disk Scheduling Visualizer</a>
    </div>
  );
}
