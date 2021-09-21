function MovieItem({
  nominate,
  isNominated,
  data: { Poster, Title, Year, Type, imdbID },
}) {
  return (
    <div
      className="rounded bg-black border dark:border-gray-800 overflow-hidden h-56 relative"
      style={{
        opactiy: "1",
        background: `url(${Poster})`,
        transition: `background 1.5s linear`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="p-3 text-white absolute bottom-0 w-full"
        style={{ background: `rgba(0, 0, 0, 0.52)` }}
      >
        <div className="text-xl font-bold">{Title}</div>
        <span>
          {Year} • {Type}
        </span>
        <div className="flex justify-end">
          <button
            disabled={isNominated}
            style={{
              backgroundColor: "#008060",
            }}
            className="p-1 px-2 text-sm rounded disabled:bg-gray-100 disabled:gray-100"
            onClick={() => {
              nominate({ Poster, Title, Year, Type, imdbID });
            }}
          >
            Nominate
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieItem;
