const WinReporter = ({
  player,
  playerName,
  playerCharacter,
  gameWinner,
  setGameWinner,
}) => {
  return (
    <div
      className={
        "w-full p-5 rounded-lg cursor-pointer border-2 bg-gray-800 hover:border-mpprimary hover:text-mpprimary" +
        (gameWinner === player
          ? " border-mpprimary text-mpprimary"
          : " border-mpprimarydark text-mpprimarydark")
      }
      onClick={() => setGameWinner(player)}
    >
      <div className="flex justify-between items-center">
        <div className="w-full font-bold">
          <p className="text-3xl ">{playerName}</p>
          <p className="text-xl">{playerCharacter}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className={
            "w-14 h-14" +
            (gameWinner === player
              ? " stroke-mpprimary"
              : " stroke-mpprimarydark")
          }
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
