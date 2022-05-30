import { useReducer, FC, PropsWithChildren, useEffect } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../apis';

import { useSnackbar } from 'notistack';

export interface EntriesState {
  entries: Entry[];
}

const initialState: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  const addEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', {
        description,
      });
      dispatch({ type: '[ENTRIES] - Add Entry', payload: data });
      enqueueSnackbar('Entry added', {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    } catch (error) {
      // console.error(error);
      enqueueSnackbar('Error adding entry', {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar: boolean = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });

      dispatch({ type: '[ENTRIES] - Update Entry', payload: data });
      if (showSnackbar)
        enqueueSnackbar('Entry updated', {
          variant: 'success',
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
    } catch (error) {
      // console.error(error);
      enqueueSnackbar('Error updating entry', {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[ENTRIES] - Refresh Entries', payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{ ...state, addEntry, updateEntry, refreshEntries }}>
      {children}
    </EntriesContext.Provider>
  );
};
