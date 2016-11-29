import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../api/listings.js';
import { ReactiveVar } from 'meteor/reactive-var'

import './new_listing.html';

Template.new_listing.created=function(){
    this.dataUrl=new ReactiveVar();
};
Template.new_listing.helpers({
    submitDisabled:function(){
        return Template.instance().dataUrl.get();
    }
});

Template.new_listing.events({
    "change input[type='file']":function(event,template){
        var files=event.target.files;
        if(files.length===0){
            return;
        }
        var file=files[0];
        //
        console.log(file);
        var fileReader=new FileReader();
        fileReader.onload=function(event) {
            var dataUrl = event.target.result;
            template.dataUrl.set(dataUrl);
        }
        fileReader.readAsDataURL(file);
    },
    'submit .new-listing'(event) {

        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form elements
        const target = event.target;
        const title = target.title.value;
        const description = target.description.value;
        const startingOffer = Number(target.startingOffer.value);
        const image = target.images[0];

        var reader = new FileReader();

        reader.onload = function(event){
            var dataURL = event.target.result;
            Template.instance().dataUrl.set(dataURL);
            console.log(dataURL);
        };

        // Insert a task into the collection
        Meteor.call('listings.insert', title, description, startingOffer, Template.instance().dataUrl.get(), function(error, result){
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
