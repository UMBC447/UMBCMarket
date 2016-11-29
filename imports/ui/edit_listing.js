import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';
import { ReactiveVar } from 'meteor/reactive-var'

import './edit_listing.html';


Template.edit_listing.helpers({

});

Template.edit_listing.events({
    'submit .edit-listing'(event) {

        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form elements
        const target = event.target;
        const title = target.title.value;
        const description = target.description.value;
        const startingOffer = Number(target.startingOffer.value);



        Meteor.call('listings.edit', this._id, title, description, startingOffer, function(error, result){
            if (error && error.error === "logged-out") {
                // show a nice error message
                Session.set("errorMessage", "Please log in to post a listing.");
            }
            if (error && error.error === "empty_title") {
                // show a nice error message
            }
            else
            {
                // Clear form
                target.title.value = '';
                target.description.value = '';
                target.startingOffer.value = '';

                Router.go('listing/:_id', {_id:result});
            }
        });
    }
});