import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';
import { Messages } from '../api/messages.js';

import './ApplicationLayout.html';

Template.message.helpers({

});

Template.listing.events({

    'click .viewMessages': function () {
        Router.go('messages/');
    },

});