import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';

import './listings.html';
import './listings';

Template.listings.events({
    'click .viewListing': function () {
        Router.go('listing/:_id', {_id:this._id});
    },
    'submit .new-listing'(event) {

        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form elements
        const target = event.target;
        const title = target.title.value;
        const description = target.description.value;
        const startingOffer = Number(target.startingOffer.value);

        // Insert a task into the collection
        Meteor.call('listings.insert', title, description, startingOffer, function(error){
            if (error && error.error === "logged-out") {
                // show a nice error message
                Session.set("errorMessage", "Please log in to post a listing.");
            }
            else
            {
                // Clear form
                target.title.value = '';
                target.description.value = '';
                target.startingOffer.value = '';
            }
        });
        
    }
});
