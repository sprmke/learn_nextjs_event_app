import Link from 'next/link';
import { PropsWithChildren } from 'react';
import classes from './button.module.css';

interface ButtonProps {
  link: string;
}

const Button = ({ link, children }: PropsWithChildren<ButtonProps>) => {
  return (
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  );
};

export default Button;
