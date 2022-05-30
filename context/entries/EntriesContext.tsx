import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
  entries: Entry[]; // TODO: define type
  addEntry: (description: string) => void;
  updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
  refreshEntries: () => void;
}

export const EntriesContext = createContext({} as ContextProps);
