import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';
import { Session } from 'meteor/session';


import './listing.html';

Template.listing.helpers({
   isOwner() {
       return this.ownerId == Meteor.userId();
   },
    isClosed() {
        return this.closed;
    }
});

Template.listing.events({

    'click .toggle-closed'(){
        //set the closed property to opposite of its current value
        Meteor.call('listings.setClosed', this._id, !this.closed);
    },
    'click .delete'(){
        Meteor.call('listings.delete', this._id);
        Router.go('home');
    },
    'click .viewProfile': function () {
        Router.go('profile/:_id', {_id:this.ownerId});
    },
    'click .sendMessage': function () {
        Router.go('new_message/:_id', {_id:this._id});
    },
    'click .edit': function () {
        Router.go('edit_listing/:_id', {_id:this._id});
    },

});