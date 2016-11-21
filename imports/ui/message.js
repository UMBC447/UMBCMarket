import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';

import './message.html';

Template.listing.helpers({

});

Template.listing.events({
    'submit .new-message' (event){

        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form elements
        const target = event.target;
        const receiverId = this.ownerId;
        const listingId = this._id;
        const message_text = target.message_text.value;

        // Insert a task into the collection
        Meteor.call('messages.insert', receiverId, listingId, message_text, function(error){
            if (error && error.error === "logged-out") {
                // show a nice error message
                Session.set("errorMessage", "Please log in to send a message.");
            }
        });

    }
});