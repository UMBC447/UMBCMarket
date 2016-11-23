import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer) {
    Meteor.publish("userData", function (userId) {
        return Meteor.users.find({_id: userId}, {fields: {emails:1, ratings: 1, averageRating: 1, username:1, profile: 1}});
    });
}