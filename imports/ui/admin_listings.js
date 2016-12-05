import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';

import './admin_listings.html';

Template.admin_listings.helpers({
    isAdmin(){
        var user = Meteor.user();
        return user.username == "marketadmin";
    }
});

Template.admin_listings.events({
    'click .admin_home': function () {
        Router.go('admin');
    },
    'click .delete'(){
        Meteor.call('listings.delete', this._id, function(error){
            if (!error){
                alert("Successfully deleted listing!");
            }
        });
    },
    'click .reset'(){
        Meteor.call('listings.reset', this._id, function(error){
            if (!error){
                alert("Successfully reset reports on listing!");
            }
        });
    },
});