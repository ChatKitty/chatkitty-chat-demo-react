interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 32 }) => (
  <div className="h-full w-full flex justify-center items-center">
    <div
      className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-gray-900`}
    ></div>
  </div>
);

export default Spinner;
