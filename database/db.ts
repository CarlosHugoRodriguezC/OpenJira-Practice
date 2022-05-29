import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 *  */

const mongoConnection = {
  isConected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConected) {
    console.log('%c MongoDB is already connected', 'color: green');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConected = mongoose.connections[0].readyState;
    if (mongoConnection.isConected === 1) {
      console.log('%c MongoDB is already connected', 'color: green');
      return;
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(`${process.env.MONGO_URI}`);
  mongoConnection.isConected = 1;
  console.log('%c MongoDB is connected', 'color: green');
};

export const disconnect = async () => {
  // if (process.env.NODE_ENV === 'development') return;

  if (mongoConnection.isConected === 0) return;

  mongoose.disconnect();
  mongoConnection.isConected = 0;
  console.log('%c MongoDB is disconnected', 'color: red');
};
