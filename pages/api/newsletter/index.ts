import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { signUpNewsletter } from '../../../lib/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      const { email } = req.body;

      // validate input
      if (!email || email.trim() === '' || !email.includes('@')) {
        res.status(422).json({ message: 'Invalid email address' });
        return;
      }

      const result = await signUpNewsletter(email);

      res.status(201).json({ message: 'Successfully registered' });

      break;
    }
    default: {
      res.status(400).json({ message: 'Invalid request method' });
    }
  }
};

export default handler;
