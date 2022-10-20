import { ReactNode } from 'react';

export interface IModalOverlayProps {
  close: () => void;
  children: ReactNode;
}
