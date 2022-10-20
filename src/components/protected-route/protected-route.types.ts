import { ReactNode } from 'react';

export interface IProtectedRoutProps {
  children: ReactNode;
  anonymous?: boolean;
}

export type TLocationState = {
  state: {
    from?: {
      pathname: string;
    };
  };
};
