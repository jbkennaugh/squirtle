const WinReporter = ({ player, playerName, gameWinner, setGameWinner }) => {
  return (
    <div
      className={
        "w-full p-5 rounded-lg cursor-pointer border-2 bg-gray-800 hover:border-mpprimary hover:text-mpprimary" +
        (gameWinner === player
          ? " border-mpprimary text-mpprimary"
          : " border-gray-700 text-gray-400")
      }
      onClick={() => setGameWinner(player)}
    >
      <div className="flex justify-between items-center">
        <div className="w-full text-3xl font-bold">{playerName}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-14 h-14"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default WinReporter;
