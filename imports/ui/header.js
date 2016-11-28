import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';
import { Messages } from '../api/messages.js';

import './ApplicationLayout.html';

Template.header.helpers({
    getRouteName() {
        var routeName = Router.current().route.getName();
        switch (routeName){
            case 'messages':
                return 'Messages';
            case 'search_results/:_search_key':
                return 'Search Results';
            case 'profile/:_id':
                return 'Profile';
            case 'conversation/:_id':
                return 'Conversation';
            case 'home':
                return 'Home';
            case 'listing/:_id':
                return 'Listing';
            case 'new_message/:_id':
                return 'Send Message';
            case 'listings/:_userId':
                return 'Listings By User';
        }
        console.log(routeName);
        return routeName;
    }
});

Template.header.events({

    'click .home': function () {
        Router.go('home');
    },
    'click .viewMessages': function (event) {
        event.preventDefault();
        Router.go('messages');
    },
    'click .viewProfile': function (event) {
        event.preventDefault();
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

