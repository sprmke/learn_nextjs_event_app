import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
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

      res.status(201).json({ message: 'Successfully registered' });

      break;
    }
    default: {
      res.status(400).json({ message: 'Invalid request method' });
    }
  }
};

export default handler;
