import Link from 'next/link';
import { MouseEvent, PropsWithChildren } from 'react';
import classes from './button.module.css';

interface ButtonProps {
  link?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  link,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={() => onClick}>
      {children}
    </button>
  );
};

export default Button;
