const SvgSprite = () => {
  return (
    <svg
      style={{ display: "none" }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        id="sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
          vectorEffect="non-scaling-stroke"
        />
      </symbol>

      <symbol
        xmlns="http://www.w3.org/2000/svg"
        id="moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
          vectorEffect="non-scaling-stroke"
        />
      </symbol>
    </svg>
  );
};

export { SvgSprite };
