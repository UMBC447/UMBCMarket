import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';
import { Messages } from '../api/messages.js';

import './message.html';

Template.message.helpers({

});

Template.message.events({

    'submit .new-message' (event){

        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form elements
        const target = event.target;
        const message_text = target.message_text.value;

        const receiverId = this.ownerId;
        const listingId = this._id;
        const receiverName = this.posterName;
        console.log(receiverId + " " + listingId + " " + message_text);
        console.log(receiverName);
        // Insert a message into the collection
        Meteor.call('messages.insert', receiverId, receiverName, listingId, message_text, function(error){
            if (error && error.error === "logged-out") {
                // show a nice error message
                Session.set("errorMessage", "Please log in to send a message.");
            }
            else {
                const message_text = target.message_text.value = " ";
            }
        });
        Router.go('listing/:_id', {_id: listingId});
    },
});