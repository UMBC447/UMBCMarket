import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';

import './listings.html';
import './listings';

Template.listings.helpers({
    listings() {
        return Listings.find();
    }
});

Template.listings.events({
    'click .viewListing': function () {
        Router.go('listing/:_id', {_id:this._id});
    },
    'submit .new-listing'(event) {
        console.log("Attempted Listing Submit");

        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form elements
        const target = event.target;
        const title = target.title.value;
        const description = target.description.value;
        const startingOffer = Number(target.startingOffer.value);
        console.log("Title: " + title + " description: " + description + " starting offer: " + startingOffer);

        // Insert a task into the collection
        Meteor.call('listings.insert', title, description, startingOffer);

        // Clear form
        target.title.value = '';
        target.description.value = '';
        target.startingOffer.value = '';

    }
});
