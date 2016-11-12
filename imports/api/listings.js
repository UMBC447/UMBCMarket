import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Listings = new Mongo.Collection('Listings');

//publish to client
if (Meteor.isServer){
    //only return listings that are not closed
    Meteor.publish('listings', function listingPublication(){
            return Listings.find();
        }
    );
}

//TODO: Add image support
Meteor.methods({
    'listings.insert'(title, description, startingOffer){
        //validate data
        check(title, String);
        check(description, String);
        check(startingOffer, Number);

        //confirm user is logged in
        if (!this.userId){
            throw new Meteor.Error('not-authorized');
        }


        //update listings table
        var listingId = Listings.insert({
            title: title,
            description: description,
            startingOffer: startingOffer,
            createdAt: new Date(),
            owner: this.userId,
            closed: false,
            posterName: Meteor.users.findOne(this.userId).userName
        });

        //update users listingsArray with listingId;
        Meteor.users.update({_id: this.userId}, {$push: {listings: listingId}});
    },
    'listings.setClosed'(listingId, setClosed){
        check(listingId, String);
        check(listingId, boolean);

        const listing = Listings.findOne(listingId);

        //this user dosen't own this listing, can't update
        if (listing.owner !== this.userId){
            throw new Meteor.Error('not-authorized');
        }

        Listings.update(listingId, {$set: {closed: setClosed}});
    }
    //TODO add update method
});