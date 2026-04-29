import type { ReactNode } from 'react';

interface CaseProps {
  condition: boolean;
  children: ReactNode;
}

const Case = ({ condition, children }: CaseProps) => {
  if (!condition) return null;
  return <>{children}</>;
};

export default Case;
