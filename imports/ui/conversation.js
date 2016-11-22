import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Messages } from '../api/messages.js';

import './conversation.html';


Template.conversation.helpers({
    messages() {
        return Messages.find();
    }
});

Template.conversation.events({

});