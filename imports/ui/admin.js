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
        /*TODO: Decide on and implement clean up functionality
        *   - Remove listings and associated messages for those closed for more than 30 days?
        *   - Set Listings posted for at least 30 days to closed?
        *       - will require a closed/open date field in DB
        *
        *   The above proposal will remove old inactive listings and reward active users
        *   who continue to update and re-open listings.
        *       */
    },

});