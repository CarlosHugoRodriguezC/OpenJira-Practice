import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { EntriesContext } from '../../context/entries';
import { DeleteOutline, SaveAltOutlined } from '@mui/icons-material';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts';
import entriesApi from '../../apis/entriesApi';
import { useSnackbar } from 'notistack';
import {
  CardHeader,
  Grid,
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  capitalize,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

type Props = {
  entry: Entry;
};

const EntryPage = ({ entry }: Props) => {
  const { updateEntry, refreshEntries } = useContext(EntriesContext);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touch, setTouch] = useState(false);

  const isInvalid = useMemo(
    () => touch && inputValue.length === 0,
    [touch, inputValue]
  );

  const onTextFiledChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status,
    };
    updateEntry(updatedEntry, true);
   
    setTouch(false);

  };

  const onDelete = async () => {
    await entriesApi.delete(`/entries/${entry._id}`);

    enqueueSnackbar('Entry deleted', {
      variant: 'success',
      autoHideDuration: 3000,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });

    refreshEntries();
    router.push('/');
  };

  return (
    <Layout title={`${inputValue.substring(0, 20)}.....`}>
      <Grid container justifyContent={'center'} sx={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title='Entry'
              subheader={`Created ${dateFunctions.getDistanceFromNow(entry.createdAt)}`}
            />

            <CardContent>
              <TextField
                autoFocus
                error={isInvalid}
                fullWidth
                label='New Entry'
                multiline
                onChange={onTextFiledChanged}
                onBlur={() => setTouch(true)}
                helperText={isInvalid && 'Ingrese un valor'}
                sx={{ marginTop: 2, marginBottom: 1 }}
                value={inputValue}
              />

              {/* Radio */}

              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup row onChange={onStatusChanged} value={status}>
                  {validStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            {/* Card Actions */}
            <CardActions>
              <Button
                color='primary'
                variant='contained'
                startIcon={<SaveAltOutlined />}
                fullWidth
                disabled={inputValue.length === 0}
                onClick={onSave}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        type={'button'}
        size={'large'}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'error.dark',
        }}
        onClick={onDelete}>
        <DeleteOutline />
      </IconButton>
    </Layout>
  );
};

// Get server side props

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { data } = await  // your fetch function here

  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
