import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Messages } from '../api/messages.js';
import { Conversations } from '../api/conversations.js';

import './admin.html';


Template.admin.helpers({

});

Template.admin.events({
    'click .reports': function () {
        Router.go('admin_reports');
    },
    'click .clean': function () {
        Meteor.call('listings.clean', function(){});
    },

});