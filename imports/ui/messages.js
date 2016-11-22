import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Messages } from '../api/messages.js';
import { Listings }  from '../api/listings.js'

import './messages.html';
import './messages';

Template.messages.helpers({
    messages() {
        return Messages.find();
    }
});

Template.messages.events({

});