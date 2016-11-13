/**
 * Created by cferrier on 11/13/2016.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

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
    } 
});