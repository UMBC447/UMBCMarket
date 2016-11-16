import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Listings = new Mongo.Collection('Listings');

//publish to client
if (Meteor.isServer){
    //only return listings that are not closed
    Meteor.publish('listings', function listingPublication(){
            var res = Listings.find({},{sort: {date: -1}});
            console.log(res);
            return res;
        }
    );

    Meteor.publish('listing', function listingPublication(listingId){
            return Listings.find({_id: listingId});
        }
    );

    Meteor.publish('listings-by-user', function listingPublication(userId){
        return Listings.find({ownerId: userId},{sort: {date: -1}});
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

        console.log("Listing Submit Requested");

        //confirm user is logged in
        if (!this.userId){
            throw new Meteor.Error('not-authorized');
        }
        
        //update listings table
        var listingId = Listings.insert({
            title: title,
            description: description,
            startingOffer: startingOffer,
            date: new Date(),
            ownerId: this.userId,
            closed: false,
            posterName: Meteor.users.findOne(this.userId).userName
        });

        console.log("ID: " + listingId);

    },
    'listings.setClosed'(listingId, setClosed){
        check(listingId, String);
        check(setClosed, Boolean);

        const listing = Listings.findOne(listingId);

        console.log(this.userId);
        console.log(listing.ownerId);
        //this user dosen't own this listing, can't update
        if (listing.ownerId !== this.userId){
            throw new Meteor.Error('not-authorized');
        }

        Listings.update(listingId, {$set: {closed: setClosed}});
    }
    //TODO add update method
});