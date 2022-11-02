import { useEffect, useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { Comment } from '../../types';
import NotificationContext from '../../store/notification-context';

type CommentsProps = {
  eventId: string;
};

const Comments = ({ eventId }: CommentsProps) => {
  const { showNotification } = useContext(NotificationContext);
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [showComments, setShowComments] = useState(false);
  const [hasNewcomment, setHasNewcomment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/comments/${eventId}`);
        const data = await response.json();
        if (!data) return;

        const { message, comments }: { message: string; comments: Comment[] } =
          data;

        if (message === 'Success') {
          setComments(comments);
          setHasNewcomment(false);
          setIsLoading(false);
        } else {
          throw new Error(message || 'Something went wrong!');
        }
      } catch (err) {
        showNotification({
          title: 'Error!',
          message: err.message || 'Someting went wrong!',
          status: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (showComments || hasNewcomment) {
      getComments();
    }
  }, [showComments, hasNewcomment]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = async (commentData: Comment) => {
    try {
      showNotification({
        title: 'Sending comments...',
        message: 'Your comment is being stored on a database',
        status: 'pending',
      });

      // send data to API
      const response = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const { message } = data || {};

      if (message === 'Successfully created a comment') {
        setHasNewcomment(true);

        // show success notifcation
        showNotification({
          title: 'Success!',
          message: 'Your comment was saved!',
          status: 'success',
        });
      } else {
        throw new Error(message || 'Something went wrong!');
      }
    } catch (err) {
      showNotification({
        title: 'Error!',
        message: err.message || 'Someting went wrong!',
        status: 'error',
      });
    }
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isLoading && comments?.length > 0 && (
        <CommentList comments={comments} />
      )}
      {showComments && isLoading && <p>Loading...</p>}
    </section>
  );
};

export default Comments;
