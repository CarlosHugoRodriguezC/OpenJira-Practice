import React, { DragEvent, DragEventHandler, useContext } from 'react';
import { FC } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, stopDragging } = useContext(UIContext);

  const onDragStart: DragEventHandler<HTMLDivElement> = (e: DragEvent) => {
    e.dataTransfer.setData('text/plain', entry._id);
    startDragging();
    // TODO: set state when dragging starts
  };

  const onDragEnd: DragEventHandler<HTMLDivElement> = (e: DragEvent) => {
    // TODO: set state when dragging ends
    stopDragging();
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.status}: {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
          <Typography variant='body2'>Hace 30 min</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};