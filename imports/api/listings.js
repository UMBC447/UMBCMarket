import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Listings = new Mongo.Collection('Listings');

//publish to client
if (Meteor.isServer){
    //only return listings that are not closed
    Meteor.publish('listings', function listingPublication(){
            var res = Listings.find({},{sort: {date: -1}});
            return res;
        }
    );

    Meteor.publish('listing', function listingPublication(listingId){
            return Listings.find({_id: listingId});
        }
    );

    Meteor.publish('listingsByUser', function listingPublication(userId){
        return Listings.find({ownerId: userId},{sort: {date: -1}});
        }
    );

    Meteor.publish('listingsSearch', function listingPublication(search_key){
            return Listings.find({
                $or: [
                    {title: {$regex: search_key, $options: 'i'}},
                    {description: {$regex: search_key, $options: 'i'}}
                ]},
                {sort: {date: -1}
                });
        }
    );
    Meteor.publish('reportedListings', function listingPublication(){
        var res = Listings.find({ reports: { $gt: 0 }});
        return res;
    })
}

Meteor.methods({
    'listings.insert'(title, description, startingOffer, image){
        //validate data
        check(title, String);
        check(description, String);
        check(startingOffer, Number);

        //confirm user is logged in
        if (!this.userId){
                //confirm user is logged in
                throw new Meteor.Error("logged-out",
                    "The user must be logged in to post a listing");
                
        }
        if(title == '')
        {
            throw new Meteor.Error("empty_title",
                "Must include a title.");
        }
        if(description == '')
        {
            throw new Meteor.Error("empty_desc",
                "Must include a description.");
        }

        
        //update listings table
        var listingId = Listings.insert({
            title: title,
            description: description,
            startingOffer: startingOffer,
            image: image,
            date: new Date(),
            ownerId: this.userId,
            closed: false,
            posterName: Meteor.users.findOne(this.userId).username,
            reports: 0

        });

        return listingId;

    },
    'listings.setClosed'(listingId, setClosed){
        check(listingId, String);
        check(setClosed, Boolean);

        const listing = Listings.findOne(listingId);

        //this user dosen't own this listing, can't update
        if (listing.ownerId !== this.userId){
            //confirm user is logged in
                throw new Meteor.Error("not-authorized",
                    "You must be the owner of this listing to update it");
        }

        Listings.update(listingId, {$set: {closed: setClosed}});
    },
    'listings.delete'(listingId){
        check(listingId, String);
        const listing = Listings.findOne(listingId);

        if (listing.ownerId !== this.userId){
            //confirm user is logged in
            throw new Meteor.Error("not-authorized",
                "You must be the owner of this listing to delete it");
        }
        Listings.remove({_id: listingId});
    },
    'listings.edit'(listingId, title, description, startingOffer){
        check(listingId, String);
        check(title, String);
        check(startingOffer, Number);
        check(description, String);
        const listing = Listings.findOne(listingId);
        if (listing.ownerId !== this.userId){
            //confirm user is logged in
            throw new Meteor.Error("not-authorized",
                "You must be the owner of this listing to update it");
        }

        Listings.update(listingId, {
            $set: { title: title,
                    description: description,
                    startingOffer: startingOffer
            }
        });
        return listingId;
    },
    'listings.report'(listingId){
        check(listingId, String);
        const listing = Listings.findOne(listingId);
        var count = Number(listing.reports) + 1
        console.log(count);
        Listings.update(listingId, {
            $set: { reports: count }
        });
    },
    'listings.reset'(listingId){
        check(listingId, String);
        const listing = Listings.findOne(listingId);
        Listings.update(listingId, {
            $set: { reports: 0 }
        });
    },
});
