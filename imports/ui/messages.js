import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Conversations } from '../api/conversations.js';

import './messages.html';
import './messages';

Template.messages.helpers({
    conversations() {
        var results = Conversations.find();
        if (results.count() == 0){
            return 0;
        }
        else
        {
            return results;
        }
    }
});

Template.messages.events({
    'click .conversation': function () {
        Router.go('conversation/:_id', {_id:this._id});
    }
});