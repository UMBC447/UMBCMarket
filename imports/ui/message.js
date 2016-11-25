import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';
import { Messages } from '../api/messages.js';
import { Conversations } from '../api/conversations.js';

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
        // Insert a message into the collection
        Meteor.call('messages.insert', receiverId, receiverName, listingId, message_text, function(error){
            if (error) {
		if(error.error === "logged-out")
                // show a nice error message
                	Session.set("errorMessage", "Please log in to send a message.");
            	else
			Session.set("errorMessage","Unknown error");
	    }
            else {
                target.message_text.value = " ";
            }
        });

        Meteor.call('conversations.insert', receiverId, receiverName, listingId, function(error){
            if (error) {
                if(error.error === "logged-out")
                // show a nice error message
                    Session.set("errorMessage", "Please log in to send a message.");
                else
                    Session.set("errorMessage","Unknown error");
            }
        });

        Router.go('listing/:_id', {_id: listingId});
    },
});
