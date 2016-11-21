import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Listings } from './listings.js';

export const Messages = new Mongo.Collection('Messages');

//publish to client
if (Meteor.isServer){
    //only return messageChains that involve this user
    Meteor.publish('messages', function messagePublication(){
            return Messages.find({
                $or: [
                    {recipientId: this.userId},
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
                        {recipientId: this.userId},
                        {senderId: this.userId}
                    ],
                    $and: [
                        {listingId: listingId}
                    ]
                },
                    {sort: {date: -1}}
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
        console.log(senderName);
        console.log(receiverName);

        if (Meteor.isServer) {
            //if the client gave us bad data for the recievers name
            if (Meteor.users.findOne({_id: receiverId}).username != receiverName)
            {
                throw new Meteor.Error("validation-error",
                    "You're sending a message to a user that dosen't exist");
            }
        }

        //confirm user is logged in
        if (!this.userId){
            throw new Meteor.Error("logged-out",
                "The user must be logged in to send a message");
        }

        if (this.userId == receiverId){
            throw new Meteor.Error("validation-error",
                "You can't send a message to yourself");
        }

        var id = Messages.insert({
            receiverId,
            senderName,
            receiverName,
            listingName: Listings.findOne(listingId).title,
            senderId: this.userId,
            message_text,
            listingId,
            date: new Date()
        });
        console.log(id);

        console.log(Messages.findOne({_id: id}));
    }
});