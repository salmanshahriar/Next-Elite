import type { SVGProps } from 'react';

export function BetterAuthIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 300"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        d="M200 0h200v300H200V200h100V100H200zM0 0h100v100h100v100H100v100H0z"
      />
    </svg>
  );
}
