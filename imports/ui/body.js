import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Listings } from '../api/listings.js';

import './listing.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('listings');
});


Template.body.helpers({
    listings() {
        return Listings.find();
    }
});

Template.body.events({
    'submit .new-listing'(event) {
        console.log("Attempted Listing Submit");
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
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