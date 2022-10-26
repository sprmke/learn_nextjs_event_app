import { MongoClient, Sort } from 'mongodb';
import { NextApiResponse } from 'next';
import { Comment } from '../types';

const connectDatabase = async (res: NextApiResponse) => {
  try {
    const MONGODB_CONNECTION_STRING =
      process.env.NEXT_APP_MONGODB_CONNECTION_STRING ?? '';

    // connect and get the database client instance
    const client = await MongoClient.connect(MONGODB_CONNECTION_STRING);

    return client;
  } catch (err) {
    res.status(500).json({ message: 'Failed connecting to database' });
    return;
  }
};

const getDocuments = async <
  T extends { [key: string]: string },
  U extends Sort
>({
  res,
  client,
  collection,
  filter,
  sort,
}: {
  res: NextApiResponse;
  client: MongoClient;
  collection: string;
  filter?: T;
  sort?: U;
}) => {
  try {
    const db = client.db();
    const documents = await db
      .collection(collection)
      .find(filter)
      .sort(sort ?? { _id: -1 })
      .toArray();

    // close the database connection
    client.close();

    return documents;
  } catch (err) {
    res.status(500).json({ message: 'Failed on getting documents' });
    return;
  }
};

const insertDocument = async <T extends {}>({
  res,
  client,
  collection,
  document,
}: {
  res: NextApiResponse;
  client: MongoClient;
  collection: string;
  document: T;
}) => {
  try {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);

    // close the database connection
    client.close();

    return result;
  } catch (err) {
    res.status(500).json({ message: 'Failed on inerting document' });
    return;
  }
};

export const getCommentsByEventId = async (
  res: NextApiResponse,
  eventId: string
) => {
  const client = await connectDatabase(res);

  const comments = await getDocuments({
    res,
    client,
    collection: 'comments',
    filter: { eventId },
    sort: { _id: -1 },
  });

  return comments;
};

export const addComment = async (res: NextApiResponse, comment: Comment) => {
  const client = await connectDatabase(res);

  const result = await insertDocument<Comment>({
    res,
    client,
    collection: 'comments',
    document: comment,
  });

  return result;
};

export const signUpNewsletter = async (res: NextApiResponse, email: string) => {
  const client = await connectDatabase(res);

  const result = await insertDocument<{ email: string }>({
    res,
    client,
    collection: 'newsletters',
    document: { email },
  });

  return result;
};
