import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';

import './new_listing.html';

Template.new_listing.helpers({

});

Template.new_listing.events({
    'submit .new-listing'(event) {

        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form elements
        const target = event.target;
        const title = target.title.value;
        const description = target.description.value;
        const startingOffer = Number(target.startingOffer.value);
        const image = target.files[0];

        var reader = new FileReader();

        reader.onload = function(event){
            var buffer = new Uint8Array(reader.result) // convert to binary
            return buffer;
        }

        var image_ = reader.readAsArrayBuffer(image);

        // Insert a task into the collection
        Meteor.call('listings.insert', title, description, startingOffer, image_, function(error, result){
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
