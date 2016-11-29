import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';
import { ReactiveVar } from 'meteor/reactive-var'

import './new_listing.html';

Template.new_listing.created=function(){
    this.dataUrl=new ReactiveVar();
};
Template.new_listing.helpers({
    submitDisabled:function() {
        return Template.instance().dataUrl.get();
    }
});

Template.new_listing.events({
    "change input[type='file']":function(event,template){
        var files = event.target.files;
        if(files.length === 0){
            return;
        }
        var file = files[0];
        if(file.size < 250001) {
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var dataUrl = event.target.result;
                template.dataUrl.set(dataUrl);
            };
            fileReader.readAsDataURL(file);
        }
        else
        {
            Session.set("errorMessage", "Image size must be less than 250kb");
        }
    },
    'submit .new-listing'(event) {

        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form elements
        const target = event.target;
        const title = target.title.value;
        const description = target.description.value;
        const startingOffer = Number(target.startingOffer.value);

        if (!Template.instance().dataUrl.get()){
            if (Session.get("errorMessage") !=  "Image size must be less than 250kb")
            {
                Session.set("errorMessage", "Must include an image");
            }
        }
        else if (!title){
            Session.set("errorMessage", "Listing must have a title");
        }
        else if (!description){
            Session.set("errorMessage", "Listing must have a description");
        }
        else if (!startingOffer){
            Session.set("errorMessage", "Listing must have a Starting offer");
        }
        else
        {
            // Insert a listing into the collection
            Meteor.call('listings.insert', title, description, startingOffer, Template.instance().dataUrl.get(), function(error, result){
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
