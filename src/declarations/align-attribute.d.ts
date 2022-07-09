import { DetailedHTMLProps } from 'react';

declare module 'react' {
  interface HTMLAttributes extends DetailedHTMLProps {
    align?: string;
  }
}
