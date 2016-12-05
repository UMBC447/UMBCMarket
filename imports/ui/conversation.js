import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Messages } from '../api/messages.js';
import { Conversations } from '../api/conversations.js';

import './conversation.html';


Template.conversation.helpers({
    messages() {
        var participant1 = this.conversation.senderId;
        var participant2 = this.conversation.receiverId;
        var listingId = this.conversation.listingId;
        var messages = Messages.find({
                $and: [
                    {$or: [
                        {receiverId: participant1},
                        {senderId: participant1}
                    ]},
                    {$or: [
                        {receiverId: participant2},
                        {senderId: participant2}
                    ]},
                    {listingId: listingId}
                ]
            },
            {
                sort: {date: 1}
            }
        );
        if (messages.count()){
            return messages;

        }
        else {
            return 0;
        }
    },
    formatDate(date){
        return date.toDateString();
    }
});

Template.conversation.events({
    'submit .new-message' (event){

        var receiverId, receiverName = "";
        if (this.conversation.receiverId == Meteor.userId()){
            //we are the owner, send message to the one who started the conversation.
            receiverId = this.conversation.senderId;
            receiverName = this.conversation.senderName;
        }
        else
        {
            receiverId = this.conversation.receiverId;
            receiverName = this.conversation.receiverName;
        }
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form elements
        const target = event.target;
        const message_text = target.message_text.value;
        const listingId = this.conversation.listingId;

        console.log(receiverId + " " + listingId + " " + message_text);
        // Insert a message into the collection
        Meteor.call('messages.insert', receiverId, receiverName, listingId, message_text, function (error) {
            if (error) {
                if (error.error === "logged-out")
                // show a nice error message
                    Session.set("errorMessage", "Please log in to send a message.");
                else
                    Session.set("errorMessage", "Unknown error");
            }
            else {
                target.message_text.value = " ";
            }
        })
    },
    'click .viewProfile': function () {
        Router.go('profile/:_id', {_id:this.senderId});
    },

});