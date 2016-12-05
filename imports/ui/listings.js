import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';

import './listings.html';
import './listings';
Template.listings.helpers({
   hasListings(){
       return (this.listings.count() > 0);
   },
    formatDate(date){
        return date.toDateString();
    }
});

Template.listings.events({
    'click .viewProfile': function () {
        Router.go('profile/:_id', {_id:this.ownerId});
    },
    'click .viewListing': function () {
        Router.go('listing/:_id', {_id:this._id});
    }
});
