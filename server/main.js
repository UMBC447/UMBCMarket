import { Meteor } from 'meteor/meteor';
import '../imports/api/listings.js';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
    //override onCreateUser to include the fields we need
    //TODO add avatar
    Accounts.onCreateUser(function(options, user) {
        user.averageRating = 0; //maybe unused
        user.ratings = 0;   //maybe unused
        if (options.profile)
            user.profile = options.profile;
        return user;
    });
});
