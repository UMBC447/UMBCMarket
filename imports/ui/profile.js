import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './profile.html';

Template.profile.helpers({
    getEmail() {
        return this.emails[0].address;
    },
    getRatings(){
        return this.ratings ? this.ratings : 0;
    },
    getAverageRating() {
        if (!this.ratings){
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
