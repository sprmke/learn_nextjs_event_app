import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { Comment } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const { eventId } = req.query;

      // get comments from database
      const comments = [
        {
          name: 'Mike',
          email: 'mike@test.com',
          text: 'My comment is amazing!',
        },
      ];

      res.status(200).json({ message: 'Success', comments });
      break;
    }
    case 'POST': {
      const { eventId } = req.query as { eventId: string };
      const { email, name, text } = req.body;

      // validate input
      if (
        !email ||
        email.trim() === '' ||
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !text ||
        text.trim() === ''
      ) {
        res.status(422).json({ message: 'Invalid comment' });
        return;
      }

      // save comment to database
      const comment: Comment = { email, name, text, eventId };
      const MONGODB_CONNECTION_STRING =
        process.env.NEXT_APP_MONGODB_CONNECTION_STRING ?? '';

      // connect to database
      const client = await MongoClient.connect(MONGODB_CONNECTION_STRING);
      const db = client.db();

      // get the meetups collection and insert meetup form data
      const commentsColelction = db.collection('comments');
      const result = await commentsColelction.insertOne({ comment });

      // close the database connection
      client.close();

      res
        .status(201)
        .json({ message: 'Successfully created a comment', comment: comment });
      break;
    }
    default: {
      res.status(400).json({ message: 'Invalid request method' });
    }
  }
};

export default handler;
