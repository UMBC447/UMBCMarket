import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('Messages');