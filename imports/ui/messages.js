import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Conversations } from '../api/conversations.js';

import './messages.html';
import './messages';

Template.messages.helpers({
    conversations() {
        return Conversations.find();
    }
});

Template.messages.events({
    'click .conversation': function () {
        Router.go('conversation/:_id', {_id:this._id});
    },

});