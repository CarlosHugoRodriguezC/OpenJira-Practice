import { EntriesState } from './EntriesProvider';
import { Entry } from '../../interfaces/entry';

type EntriesActionType = {
  type:
    | '[ENTRIES] - Add Entry'
    | '[ENTRIES] - Remove Entry'
    | '[ENTRIES] - Update Entry';
  payload: Entry;
} | {
  type: '[ENTRIES] - Refresh Entries';
  payload: Entry[];
};


export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
) => {
  switch (action.type) {
    case '[ENTRIES] - Add Entry':
      return { ...state, entries: [...state.entries, action.payload] };
    case '[ENTRIES] - Update Entry':
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry._id === action.payload._id
            ? {
                ...entry,
                status: action.payload.status,
                description: action.payload.description,
              }
            : entry
        ),
      };
    case '[ENTRIES] - Refresh Entries':
      return { ...state, entries: [...action.payload] };
    default:
      return state;
  }
};
