import { NextApiRequest, NextApiResponse } from 'next';
import { Comment } from '../../../types';
import { getCommentsByEventId, addComment } from '../../../lib/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const { eventId } = req.query as { eventId: string };

      const comments = await getCommentsByEventId(res, eventId);

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

      const result = await addComment(res, comment);

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
