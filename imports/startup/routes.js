import { Router } from 'meteor/iron:router'
import { Meteor } from 'meteor/meteor';
import { Listings } from '../api/listings.js';
import '../api/profiles.js';
import '../ui/listing.js';
import '../ui/listings.js';
import '../ui/profile.js';

import '../ui/ApplicationLayout.html';

Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('home', {
    path: '/',
    waitOn: function () {
        return Meteor.subscribe('listings');
    },
    template: 'listings'
});

Router.route('listings/:_userId', {
    path: 'listings/:_userId',
    waitOn: function () {
        return Meteor.subscribe('listingsByUser', this.params._userId);
    },
    data: function() {
        return Listings.find({ownerId: this.params._userId});
    },
    template: 'listings'
});

Router.route('listing/:_id', {
    path: 'listing/:_id',
    waitOn: function () {
        return Meteor.subscribe('listing', this.params._id);
    },
    data: function() {
        return Listings.findOne({_id: this.params._id});
    },
    template: 'listing'
});


Router.route('profile/:_id', {
    path: 'profile/:_id',
    waitOn: function () {
        return Meteor.subscribe('userData', this.params._id);
    },
    data: function() {
        return Meteor.users.findOne({_id: this.params._id});
    },
    template: 'profile'
});
