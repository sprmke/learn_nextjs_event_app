import { FormEvent, useState, useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

const NewsletterRegistration = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null!);
  const { showNotification } = useContext(NotificationContext);

  const registrationHandler = async (event: FormEvent) => {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;

    // optional: validate input
    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@')
    ) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }

    try {
      // show pending notifcation
      showNotification({
        title: 'Signing up...',
        message: 'Registering for newsletter',
        status: 'pending',
      });

      // send valid data to API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const { message } = data || {};

      if (message === 'Successfully registered') {
        // show success notifcation
        showNotification({
          title: 'Success!',
          message: 'Successuly registered for newsletter',
          status: 'success',
        });
      } else {
        throw new Error(message || 'Something went wrong!');
      }
    } catch (err) {
      console.error('err::', err);
      // show error notifcation
      showNotification({
        title: 'Error!',
        message: err.message || 'Someting went wrong!',
        status: 'error',
      });
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
        {isInvalid && <p>Please enter a valid email address and comment!</p>}
      </form>
    </section>
  );
};

export default NewsletterRegistration;
