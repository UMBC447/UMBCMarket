import { Router } from 'meteor/iron:router'
import { Meteor } from 'meteor/meteor';
import { Listings } from '../api/listings.js';

import '../ui/listing.js';
import '../ui/listings.js';
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
