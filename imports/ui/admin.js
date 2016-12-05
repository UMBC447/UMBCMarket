import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Messages } from '../api/messages.js';
import { Conversations } from '../api/conversations.js';

import './admin.html';

Template.admin.helpers({
    isAdmin(){
        var user = Meteor.user();
        return user.username == "marketadmin";
    }
});

Template.admin.events({
    'click .reports': function () {
        Router.go('admin_reports');
    },
    'click .clean': function () {
        Meteor.call('listings.clean', function(error){
            if (!error){
                alert("Successfully cleaned 30-day old listings!");
            }
        });
    },

});