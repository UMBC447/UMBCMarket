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
    'messages.insert'(receiverId, listingId, body){
        check(receiverId, String);
        check(body, String);
        check(listingId, String);

        //confirm user is logged in
        if (!this.userId){
            throw new Meteor.Error("logged-out",
                "The user must be logged in to send a message");
        }

        var id = Messages.insert({
            receiverId,
            senderName: Meteor.users.findOne(this.userId).username,
            recieverName: Meteor.users.findOne(receiverId).username,
            listingName: Listings.findOne(listingId).title,
            senderId: this.userId,
            body,
            listingId,
            date: new Date()
        });
    }
});