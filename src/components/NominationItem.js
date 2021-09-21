function NominationItem({
  data: { Title, Type, Year, imdbID, Poster },
  unNominate,
}) {
  return (
    <div
      animate={{ x: 100 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className="p-2 flex items-center"
    >
      <img className="h-10" src={Poster} alt={Title} />
      <div className="pl-3">
        <div className="text-lg font-medium">{Title}</div>
        <span>
          {Year} • {Type}
          <button
            onClick={() => unNominate(imdbID)}
            className="hover:text-red-500 mx-2 underline"
          >
            remove
          </button>
        </span>
      </div>
    </div>
  );
}

export default NominationItem;
