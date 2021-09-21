export default function Spinner() {
  return (
    <svg
      class="spinner stroke-current text-black dark:text-white"
      viewBox="0 0 50 50"
    >
      <circle
        class="path"
        cx="25"
        cy="25"
        r="15"
        fill="none"
        stroke-width="4"
      ></circle>
    </svg>
  );
}
