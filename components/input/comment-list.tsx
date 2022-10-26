import { title } from 'process';
import { Comment } from '../../types';
import classes from './comment-list.module.css';

type CommentListProps = {
  comments: Comment[];
};

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <ul className={classes.comments}>
      {comments.map(({ email, name, text }, index) => (
        <li key={index}>
          <p>{text}</p>
          <div>
            By{' '}
            <address>
              {name} | {email}
            </address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
