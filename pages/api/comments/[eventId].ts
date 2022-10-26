import { NextApiRequest, NextApiResponse } from 'next';
import { Comment } from '../../../types';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
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
      const comment: Comment = { email, name, text };
      console.log('comment::', comment);

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
