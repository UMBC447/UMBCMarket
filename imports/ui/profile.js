import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './profile.html';

Template.profile.helpers({
    getThis() {
        console.log(this);
        return 1;
    },
    getEmail() {
        return this.emails[0].address;
    },
    getAverageRating() {
        if (!this.num_ratings){
            return "Not Yet Rated"
        }
        else {
            return averageRating;
        }
    }
});

Template.profile.events({
    'click .viewListings': function () {
        Router.go('listings/:_userId', {_userId: this._id});
    }
});
