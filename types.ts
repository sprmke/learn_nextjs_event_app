import { ObjectId } from 'mongodb';

export type Event = {
  id: string;
  title: string;
  description?: string;
  location: string;
  date: string;
  image: string;
  imageAlt?: string;
  isFeatured?: boolean;
};

export type Comment = {
  _id?: ObjectId;
  email: string;
  name: string;
  text: string;
  eventId?: string;
};

export type Notification = {
  title: string;
  message: string;
  status: string;
};
