export function BuildAnimation() {
  return (
    <div className="build-animation">
      <svg
        className="-frame-0 -top -cover build-animation"
        strokeWidth="4"
        height="4"
        aria-hidden="true"
      >
        <line
          className="-running-particles "
          x1="0%"
          x2="100%"
          y1="0%"
          y2="0%"
        ></line>
      </svg>
      <svg
        className="-frame-0 -top -start build-animation"
        strokeWidth="4"
        height="4"
        aria-hidden="true"
      >
        <line
          className="-running-start none"
          x1="0%"
          x2="100%"
          y1="0%"
          y2="0%"
        ></line>
      </svg>
      <svg
        className="-frame-1 -top -running build-animation"
        strokeWidth="4"
        height="4"
        aria-hidden="true"
      >
        <line
          className="-running-particles -animation-dashes-3"
          x1="0%"
          x2="100%"
          y1="0%"
          y2="0%"
        ></line>
      </svg>
      <svg
        className="-frame-2 -top -running build-animation"
        strokeWidth="4"
        height="4"
        aria-hidden="true"
      >
        <line
          className="-running-particles -animation-dashes-3"
          x1="0%"
          x2="100%"
          y1="0%"
          y2="0%"
        ></line>
      </svg>
      <svg
        className="-frame-0 -bottom -cover build-animation"
        strokeWidth="4"
        height="4"
        aria-hidden="true"
      >
        <line
          className="-running-particles "
          x1="0%"
          x2="100%"
          y1="100%"
          y2="100%"
        ></line>
      </svg>
      <svg
        className="-frame-0 -bottom -start build-animation"
        strokeWidth="4"
        height="4"
        aria-hidden="true"
      >
        <line
          className="-running-start none"
          x1="0%"
          x2="100%"
          y1="100%"
          y2="100%"
        ></line>
      </svg>
      <svg
        className="-frame-1 -bottom -running build-animation"
        strokeWidth="4"
        height="4"
        aria-hidden="true"
      >
        <line
          className="-running-particles -animation-dashes-2"
          x1="0%"
          x2="100%"
          y1="100%"
          y2="100%"
        ></line>
      </svg>
      <svg
        className="-frame-2 -bottom -running build-animation"
        strokeWidth="4"
        height="4"
        aria-hidden="true"
      >
        <line
          className="-running-particles -animation-dashes-2"
          x1="0%"
          x2="100%"
          y1="100%"
          y2="100%"
        ></line>
      </svg>
    </div>
  );
}
