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

        console.log(startingOffer);
        if (!title){
            Session.set("errorMessage", "Listing must have a title");
        }
        else if (!description){
            Session.set("errorMessage", "Listing must have a description");
        }
        else
        {

            Meteor.call('listings.edit', this._id, title, description, startingOffer, function(error, result){
                if (error && error.error === "logged_out") {
                    // show a nice error message
                    Session.set("errorMessage", "Please log in to post a listing.");
                }
                else if (error && error.error === "empty_title") {
                    Session.set("errorMessage", "Listing must have a title");
                }
                else if (error && error.error === "empty_desc") {
                    Session.set("errorMessage", "Listing must have a description");
                }
                else
                {
                    Session.set("errorMessage", null);
                    Router.go('listing/:_id', {_id:result});
                }
            });
        }
    }
});