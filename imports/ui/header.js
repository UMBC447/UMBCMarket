import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';
import { Messages } from '../api/messages.js';

import './ApplicationLayout.html';

Template.header.helpers({

});

Template.header.events({

    'click .home': function () {
        Router.go('home');
    },
    'click .viewMessages': function () {
        Router.go('messages');
    },
    'click .viewProfile': function () {
        Router.go('profile/:_id', {_id: Meteor.userId});
    },
    'click #login-buttons-logout': function (event) {
        Router.go('home');
    },
    'submit .search_' (event){

        event.preventDefault();

        const target = event.target;
        const search_key = "/" + target.search_term.value + "/";

        Router.go('search_results/:_search_key', {_search_key: search_key})
    }
});

