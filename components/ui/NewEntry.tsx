import React, { ChangeEvent, useContext, useState } from 'react';
import { Add, Close, Save } from '@mui/icons-material';
import { Button, Box, TextField } from '@mui/material';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {
  const { addEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addEntry(inputValue);
    setInputValue('');
    setTouched(false);
    setIsAddingEntry(false);
  };

  return (
    <Box
      sx={{
        marginBottom: 2,
        paddingX: 2,
      }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            autoFocus
            multiline
            label='Nueva entrada'
            helperText={
              inputValue.length === 0 && touched && 'Ingresa una entrada'
            }
            error={inputValue.length === 0 && touched}
            value={inputValue}
            onChange={onTextFieldChange}
            onBlur={() => setTouched(true)}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Button
              endIcon={<Close />}
              color='secondary'
              variant='text'
              onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button
              endIcon={<Save />}
              color='primary'
              variant='contained'
              onClick={onSave}>
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<Add />}
          variant='contained'
          color='primary'
          fullWidth
          onClick={() => setIsAddingEntry(true)}>
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
