interface Props {
  className?: string;
}

export default function Navbar({ className }: Props) {
  return (
    <div className={`navbar bg-base-100 border-b ${className}`}>
      <img src="logo.png" alt="Logo" className="navbar-logo" />
      <a className="btn btn-ghost ">LOOK Disk Scheduling Visualizer</a>
    </div>
  );
}
