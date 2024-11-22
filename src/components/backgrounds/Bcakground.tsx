
// Option 1: Geometric Grid Pattern
export const GeometricGridBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg 
      className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 stroke-gray-100/20" 
      aria-hidden="true"
    >
      <defs>
        <pattern 
          id="geometric-pattern" 
          width={100} 
          height={100} 
          patternUnits="userSpaceOnUse"
        >
          <path 
            d="M0 0 L50 50 M50 50 L100 0 M100 100 L50 50 M50 50 L0 100" 
            fill="none" 
            strokeWidth="1" 
            className="stroke-gray-200/50"
          />
        </pattern>
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#geometric-pattern)"
      />
    </svg>
  </div>
);

// Option 2: Dotted Background
export const DottedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg 
      className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2" 
      aria-hidden="true"
    >
      <defs>
        <pattern 
          id="dot-pattern" 
          width={10} 
          height={10} 
          patternUnits="userSpaceOnUse"
        >
          <circle 
            cx={5} 
            cy={5} 
            r={1.5} 
            className="fill-gray-200/50"
          />
        </pattern>
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#dot-pattern)"
      />
    </svg>
  </div>
);

// Option 3: Diagonal Lines Pattern
export const DiagonalLinesBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg 
      className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2" 
      aria-hidden="true"
    >
      <defs>
        <pattern 
          id="diagonal-lines" 
          width={20} 
          height={20} 
          patternUnits="userSpaceOnUse"
        >
          <path 
            d="M0 20 L20 0 Z" 
            className="stroke-gray-100/30" 
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#diagonal-lines)"
      />
    </svg>
  </div>
);

// Option 4: Subtle Hexagonal Grid
export const HexagonalGridBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg 
      className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2" 
      aria-hidden="true"
    >
      <defs>
        <pattern 
          id="hexagon-pattern" 
          width={60} 
          height={52} 
          patternUnits="userSpaceOnUse"
        >
          <path 
            d="M30 0 L60 30 L30 60 L0 30 Z" 
            fill="none" 
            className="stroke-gray-100/20" 
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#hexagon-pattern)"
      />
    </svg>
  </div>
);



// Option 1: Subtle Wave Pattern
export const WaveBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg 
      className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2" 
      aria-hidden="true"
    >
      <defs>
        <pattern 
          id="wave-pattern" 
          width={200} 
          height={100} 
          patternUnits="userSpaceOnUse"
        >
          <path 
            d="M0 50 
               Q50 10, 100 50 
               T200 50" 
            fill="none" 
            className="stroke-gray-100/30" 
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#wave-pattern)"
      />
    </svg>
  </div>
);

// Option 2: Circuit Board Inspired Background
export const CircuitBoardBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg 
      className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2" 
      aria-hidden="true"
    >
      <defs>
        <pattern 
          id="circuit-pattern" 
          width={80} 
          height={80} 
          patternUnits="userSpaceOnUse"
        >
          <path 
            d="M0 40 H40 V0 M40 80 H80 V40" 
            fill="none" 
            className="stroke-gray-100/40" 
            strokeWidth="1"
          />
          <circle 
            cx={40} 
            cy={40} 
            r={2} 
            className="fill-gray-200/50"
          />
        </pattern>
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#circuit-pattern)"
      />
    </svg>
  </div>
);

// Option 3: Organic Cellular Background
export const CellularBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg 
      className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2" 
      aria-hidden="true"
    >
      <defs>
        <pattern 
          id="cellular-pattern" 
          width={100} 
          height={100} 
          patternUnits="userSpaceOnUse"
        >
          <circle 
            cx={50} 
            cy={50} 
            r={25} 
            className="fill-gray-100/10 stroke-gray-200/20" 
            strokeWidth="1"
          />
          <circle 
            cx={20} 
            cy={20} 
            r={10} 
            className="fill-gray-100/10 stroke-gray-200/20" 
            strokeWidth="1"
          />
          <circle 
            cx={80} 
            cy={80} 
            r={15} 
            className="fill-gray-100/10 stroke-gray-200/20" 
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#cellular-pattern)"
      />
    </svg>
  </div>
);

// Option 4: Abstract Geometric Overlap
export const GeometricOverlapBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg 
      className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2" 
      aria-hidden="true"
    >
      <defs>
        <pattern 
          id="geometric-overlap" 
          width={200} 
          height={200} 
          patternUnits="userSpaceOnUse"
        >
          <rect 
            x={50} 
            y={50} 
            width={100} 
            height={100} 
            className="fill-gray-100/10 stroke-gray-200/20" 
            strokeWidth="1"
            transform="rotate(45 100 100)"
          />
          <circle 
            cx={100} 
            cy={100} 
            r={40} 
            className="fill-gray-100/10 stroke-gray-200/20" 
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#geometric-overlap)"
      />
    </svg>
  </div>
);
