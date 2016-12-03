import { Router } from 'meteor/iron:router'
import { Meteor } from 'meteor/meteor';
import { Listings } from '../api/listings.js';
import { Messages } from '../api/messages.js';
import { Conversations } from '../api/conversations.js';

import '../api/profiles.js';
import '../ui/listing.js';
import '../ui/listings.js';
import '../ui/new_listing.js';
import '../ui/edit_listing.js';
import '../ui/profile.js';
import '../ui/message.js';
import '../ui/messages.js';
import '../ui/header.js';
import '../ui/errorDisplay.js';
import '../ui/conversation.js';
import '../ui/admin.js';
import '../ui/admin_listings.js';
import '../ui/ApplicationLayout.html';
import '../ui/AdminLayout.html';

Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.configure({
   layoutTemplate: 'AdminLayout'
});

Router.route('home', {
    path: '/',
    waitOn: function () {
        return Meteor.subscribe('listings');
    },
    data: function() {
        return {
            listings: Listings.find(),
            atMainMenu: true,
            atSearch: false,
            atProfile: false          
        }
    },
    layoutTemplate: 'ApplicationLayout',
    template: 'listings'
});

Router.route('search_results/:_search_key', {
    path: 'search_results/:_search_key',

    waitOn: function () {
        return Meteor.subscribe('listings', this.params._search_key);
    },

    data: function() {
        return {
            listings: Listings.find({
                    $or: [
                        {title: {$regex: this.params._search_key, $options: 'i'}},
                        {description: {$regex: this.params._search_key, $options: 'i'}}
                    ]},
                {sort: {date: -1}
                }),
            atMainMenu: false,
            atSearch: true,
            atProfile: false,
        }
    },
    layoutTemplate: 'ApplicationLayout',
    template: 'listings'
});


Router.route('listings/:_userId', {
    path: 'listings/:_userId',
    waitOn: function () {
        return Meteor.subscribe('listingsByUser', this.params._userId);
    },
    data: function() {
        return {
            listings: Listings.find({ownerId: this.params._userId}),
            atMainMenu: false,
            atSearch: false,
            atProfile: true      
        }
    },
    layoutTemplate: 'ApplicationLayout',
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
    layoutTemplate: 'ApplicationLayout',
    template: 'listing'
});

Router.route('new_listing/:_id', {
    path: 'new_listing/:_id',

    layoutTemplate: 'ApplicationLayout',
    template: 'new_listing'
});
Router.route('edit_listing/:_id', {
    path: 'edit_listing/:_id',
    waitOn: function () {
        return Meteor.subscribe('listing', this.params._id);
    },
    data: function() {
        return Listings.findOne({_id: this.params._id});
    },
    layoutTemplate: 'ApplicationLayout',
    template: 'edit_listing'
});

Router.route('profile/:_id', {
    path: 'profile/:_id',
    waitOn: function () {
        return Meteor.subscribe('userData', this.params._id);
    },
    data: function() {
        return Meteor.users.findOne({_id: this.params._id});
    },
    layoutTemplate: 'ApplicationLayout',
    template: 'profile'
});

Router.route('new_message/:_id', {
    path: 'new_message/:_id',
    waitOn: function () {
        return Meteor.subscribe('listing', this.params._id);
    },
    data: function() {
        return Listings.findOne({_id: this.params._id});
    },
    layoutTemplate: 'ApplicationLayout',
    template: 'message'
});

Router.route('messages', {
    path: 'messages',
    waitOn: function () {
        return Meteor.subscribe('conversations');
    },

    layoutTemplate: 'ApplicationLayout',
    template: 'messages'
});

Router.route('conversation/:_id', {
    path: 'conversation/:_id',
    waitOn: function () {
        return [
            Meteor.subscribe('messages'),
            Meteor.subscribe('conversations', this.params._id)
            ]
    },
    data: function(){
        return {
            conversation: Conversations.findOne({_id: this.params._id}),
            messages: Messages.find()
        }
    },
    layoutTemplate: 'ApplicationLayout',
    template: 'conversation'
});

Router.route('admin', {
    path: 'admin',

    layoutTemplate: 'AdminLayout',
    template: 'admin'

});
Router.route('admin_reports', {
    path: 'admin_reports',

    waitOn: function () {
        return Meteor.subscribe('reportedListings');
    },
    data: function(){
        return {
            listings: Listings.find({ reports: { $gt: 0 }})
        }
    },

    layoutTemplate: 'AdminLayout',
    template: 'admin_listings'

});