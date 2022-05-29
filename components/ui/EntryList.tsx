import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './EntryCard';
import { EntriesContext } from '../../context/entries/';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, stopDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropEntry = (e: DragEvent<HTMLElement>) => {
    const id = e.dataTransfer.getData('text/plain');
    const entry = entries.find((entry) => entry._id === id)!;

    updateEntry({ ...entry, status });
    stopDragging();
  };

  return (
    //   TODO: Add drop
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}>
      <Paper
        sx={{
          height: 'calc(100vh - 100px)',
          overflow: 'auto',
          backgroundColor: 'transparent',
          padding: 1,
        }}>
        {/* TODO: Cambiara cuando haga drag */}
        <List
          sx={{
            opacity: isDragging ? 0.2 : 1,
            transition: 'all 0.3s ease-in-out',
          }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
