import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';

import './admin_listings.html';

Template.admin_listings.helpers({

});

Template.admin_listings.events({
    'click .admin_home': function () {
        Router.go('admin');
    },
    'click .delete'(){
        Meteor.call('listings.delete', this._id, function(){});
    },
    'click .reset'(){
        Meteor.call('listings.reset', this._id, function(){});
    },
});