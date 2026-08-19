type Props = {
  className?: string;
};

export function HoseSvg({ className }: Props) {
  return (
    <svg
      viewBox="0 0 640 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse
        cx="320"
        cy="214"
        rx="168"
        ry="118"
        stroke="#1a1a1a"
        strokeOpacity="0.35"
        strokeWidth="18"
      />
      <ellipse
        cx="320"
        cy="208"
        rx="132"
        ry="88"
        stroke="#1a1a1a"
        strokeOpacity="0.5"
        strokeWidth="16"
      />
      <ellipse
        cx="320"
        cy="202"
        rx="96"
        ry="58"
        stroke="#1a1a1a"
        strokeOpacity="0.7"
        strokeWidth="14"
      />
      <ellipse
        cx="320"
        cy="198"
        rx="62"
        ry="32"
        stroke="#1a1a1a"
        strokeOpacity="0.85"
        strokeWidth="12"
      />
      <path
        d="M258 198c-38-4-72 18-86 48"
        stroke="#1a1a1a"
        strokeOpacity="0.9"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M382 198c38-4 72 18 86 48"
        stroke="#1a1a1a"
        strokeOpacity="0.9"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <rect x="154" y="246" width="36" height="18" rx="3" fill="#c9a227" />
      <rect x="162" y="240" width="20" height="8" rx="1" fill="#c9a227" />
      <rect x="450" y="246" width="36" height="18" rx="3" fill="#c5c8cc" />
      <rect x="458" y="240" width="20" height="8" rx="1" fill="#c5c8cc" />
      <path
        d="M172 236v-10M468 236v-10"
        stroke="#000"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
