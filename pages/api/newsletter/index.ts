import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      const { email } = req.body;
      console.log('email::', email);

      // validate input
      if (!email || email.trim() === '' || !email.includes('@')) {
        res.status(422).json({ message: 'Invalid email address' });
        return;
      }

      // save email to database
      const MONGODB_CONNECTION_STRING =
        process.env.NEXT_APP_MONGODB_CONNECTION_STRING ?? '';

      // connect to database
      const client = await MongoClient.connect(MONGODB_CONNECTION_STRING);
      const db = client.db();

      // get the meetups collection and insert meetup form data
      const meetupsCollection = db.collection('newsletters');
      const result = await meetupsCollection.insertOne({ email });

      // close the database connection
      client.close();

      res.status(201).json({ message: 'Successfully registered' });

      break;
    }
    default: {
      res.status(400).json({ message: 'Invalid request method' });
    }
  }
};

export default handler;
