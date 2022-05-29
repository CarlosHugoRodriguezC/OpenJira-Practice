import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

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
  const { id } = req.query;

  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: ' Invalid ID' });
  // }
  switch (req.method) {
    case 'GET':
      return getEntry(req, res);
    case 'PUT':
      return updateEntry(req, res);
    default:
      return res.status(400).json({ message: 'Endpoint not exists' });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entry = await Entry.findById(id);
    if (!entry) {
      await db.disconnect();
      return res.status(404).json({ message: 'Entry not found' });
    }
    await db.disconnect();
    return res.status(200).json(entry);
  } catch (error) {
    db.disconnect();
    console.error(error);
    return res.status(400).json({ message: `Something went wrong - ${error}` });
  }
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const { id } = req.query;

    const entry = await Entry.findById(id);

    if (!entry) {
      await db.disconnect();
      return res.status(404).json({ message: 'Entry not found' });
    }

    const { description = entry.description, status } = req.body;

    if (!status) {
      await db.disconnect();
      return res.status(400).json({ message: 'Status is required' });
    }

    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { new: true, runValidators: true }
    );

    // entry.description = description;
    // entry.status = status;

    // await entry.save();

    await db.disconnect();

    return res.status(200).json(updatedEntry!);
  } catch (error) {
    db.disconnect();
    console.error(error);
    return res.status(400).json({ message: `Something went wrong - ${error}` });
  }
};
