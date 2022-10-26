import { MongoClient, Sort } from 'mongodb';
import { Comment } from '../types';

const connectDatabase = async () => {
  const MONGODB_CONNECTION_STRING =
    process.env.NEXT_APP_MONGODB_CONNECTION_STRING ?? '';

  // connect and get the database client instance
  const client = await MongoClient.connect(MONGODB_CONNECTION_STRING);

  return client;
};

const getDocuments = async <
  T extends { [key: string]: string },
  U extends Sort
>({
  client,
  collection,
  filter,
  sort,
}: {
  client: MongoClient;
  collection: string;
  filter?: T;
  sort?: U;
}) => {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort ?? { _id: -1 })
    .toArray();

  // close the database connection
  client.close();

  return documents;
};

const insertDocument = async <T extends {}>(
  client: MongoClient,
  collection: string,
  document: T
) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  // close the database connection
  client.close();

  return result;
};

export const getCommentsByEventId = async (eventId: string) => {
  const client = await connectDatabase();

  const comments = await getDocuments({
    client,
    collection: 'comments',
    filter: { eventId },
    sort: { _id: -1 },
  });

  return comments;
};

export const addComment = async (comment: Comment) => {
  const client = await connectDatabase();

  const result = await insertDocument<Comment>(client, 'comments', comment);

  return result;
};

export const signUpNewsletter = async (email: string) => {
  const client = await connectDatabase();

  const result = await insertDocument<{ email: string }>(
    client,
    'newsletters',
    { email }
  );

  return result;
};
