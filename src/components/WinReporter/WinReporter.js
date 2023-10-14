const WinReporter = ({ player, playerName, setGameWinner }) => {
  return (
    // <button
    //   type="button"
    //   className=" hover:text-mpsecondary border border-mpprimary hover:bg-mpprimary rounded-lg px-5 py-2.5 text-center text-4xl mr-2"
    // >
    //   {`${playerName} Won`}
    // </button>

    <li>
      <input
        type="radio"
        id={`player${player}WinReport`}
        name={player}
        value={`player${player}wins`}
        className="hidden peer"
        required
      ></input>
      <label
        for={`player${player}WinReport`}
        className="inline-flex items-center justify-between w-full p-5 rounded-lg cursor-pointer hover:text-gray-300 border-gray-700 text-gray-400 bg-gray-800 hover:bg-gray-700"
      >
        <div className="block">
          <div className="w-full text-3xl font-bold">{playerName}</div>
          <div className="w-full">winner?</div>
        </div>
      </label>
    </li>
  );
};

export default WinReporter;
