import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './ApplicationLayout.html';

Template.errorDisplay.helpers({
    errorMessage() {
        console.log(Session.get("errorMessage"));
        return Session.get("errorMessage")
    }
});

Template.errorDisplay.events({
    "click .close" (){
        Session.set("errorMessage", null);
    }
});