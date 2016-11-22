import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';
import { Messages } from '../api/messages.js';

import './ApplicationLayout.html';

Template.header.helpers({

});

Template.header.events({

    'click .viewMessages': function () {
        Router.go('messages/');
    },
    'click .viewProfile': function () {
        Router.go('profile/:_id', {_id: Meteor.userId});
    },

});