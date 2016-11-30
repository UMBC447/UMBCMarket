import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Listings } from './listings.js';

export const Messages = new Mongo.Collection('Messages');

//publish to client
if (Meteor.isServer){
    //only return messageChains that involve this user
    Meteor.publish('messagesByConversation', function messagePublication(participant1, participant2, listing) {
        return Messages.find({
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
                sort: {date: -1}
            }
        );
    });
    Meteor.publish('messages', function messagePublication(){
            return Messages.find({
                $or: [
                    {receiverId: this.userId},
                    {senderId: this.userId}
                ]
            },
                {sort: {date: -1}}
            );
        }
    );

    //only return messages in regards to a specific product
    Meteor.publish('messages-by-product', function messagePublication(listingId){
            return Messages.find({
                    $or: [
                        {receiverId: this.userId},
                        {senderId: this.userId}
                    ],
                    $and: [
                        {listingId: listingId}
                    ]
                },
                    {sort: {date: 1}}
            );
        }
    );


}

Meteor.methods({
    'messages.insert'(receiverId, receiverName, listingId, message_text){
        check(receiverId, String);
        check(receiverName, String);
        check(listingId, String);
        check(message_text, String);

        var senderName = Meteor.users.findOne({_id: this.userId}).username;
        //confirm user is logged in
        if (!this.userId){
            throw new Meteor.Error("logged-out",
                "The user must be logged in to send a message");
        }

        if (this.userId == receiverId){
            throw new Meteor.Error("validation-error",
                "You can't send a message to yourself");
        }

        Messages.insert({
            receiverId,
            senderName,
            receiverName,
            senderId: this.userId,
            message_text,
            listingId,
            date: new Date()
        });
    }
});
