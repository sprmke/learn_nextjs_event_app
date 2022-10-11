import { ComponentType, PropsWithChildren } from 'react';
import classes from './logistics-item.module.css';

interface LogisticsItemProps {
  icon: ComponentType;
}

function LogisticsItem({
  icon: Icon,
  children,
}: PropsWithChildren<LogisticsItemProps>) {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
