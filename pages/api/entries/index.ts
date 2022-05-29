import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';
import mongoose from 'mongoose';

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntries(req, res);
    case 'POST':
      return createEntry(req, res);
    case 'PUT':
      return updateEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: 'Endpoint not exists' });
  }
}

const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const entries = await Entry.find().sort({ createdAt: 'ascending' });

  await db.disconnect();
  res.status(200).json(entries);
};

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ message: 'Description is required' });
  }

  const entry = new Entry({
    description,
  });

  try {
    await db.connect();
    await entry.save();
    await db.disconnect();
    return res.status(201).json(entry);
  } catch (err: any) {
    db.disconnect();
    console.error(err);
    return res.status(400).json({ message: 'Something went wrong' });
  }
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const { id } = req.query
    const { status } = req.body;
   
    if (!status || !id || !mongoose.isValidObjectId(id)) {
      await db.disconnect();
      return res.status(400).json({ message: 'Status is required or ID valid is required'  });
    }

    const entry = await Entry.findByIdAndUpdate(
      req.query.id,
      { status },
      {
        new: true,
      }
    );

    await db.disconnect();

    return res.status(200).json(entry!);
  } catch (error) {
    db.disconnect();
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong' });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const entry = await Entry.findByIdAndDelete(req.query.id);

  await db.disconnect();
  res.status(200).json(entry!);
};
