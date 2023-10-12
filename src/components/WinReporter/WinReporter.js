import greenW from "./images/green-w.png";
import redW from "./images/red-w.png";

const WinReporter = ({ player, playerName, setGameWinner }) => {
  const handleWinSelect = () => {
    setGameWinner(player);
  };

  return (
    <div className="w-1/3 h-40 px-7 flex gap-10 justify-between items-end border-b-2">
      <p className="text-4xl py-7 text-white">{playerName}</p>
      <img
        className="w-[100px] rounded-xl"
        src={redW}
        onMouseOver={(e) => {
          e.currentTarget.src = greenW;
        }}
        onMouseOut={(e) => {
          e.currentTarget.src = redW;
        }}
        onClick={handleWinSelect}
        alt="W icon for win."
      ></img>
    </div>
  );
};

export default WinReporter;
