import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/profiles.js';
import '../imports/api/listings.js';
import '../imports/api/messages.js';
import '../imports/api/conversations.js';

Meteor.startup(() => {
    //override onCreateUser to include the fields we need
    //TODO add avatar
    Accounts.config({
        sendVerificationEmail: true,
        forbidClientAccountCreation: false
    });

    Accounts.onCreateUser(function (options, user) {
        user.averageRating = 0; //maybe unused
        user.ratings = 0;   //maybe unused
        if (options.profile)
            user.profile = options.profile;
        return user;
    });
    //Ensuring every user has an email address, should be in server-side code
    Accounts.validateNewUser(function (user) {
        /*  new SimpleSchema({
            _id: { type: String },
            emails: { type: Array },
            'emails.$': { type: Object },
            'emails.$.address': { type: String },
            'emails.$.verified': { type: Boolean },
            createdAt: { type: Date },
            services: { type: Object, blackbox: true }
        }).validate(user); */
        console.log(user);
        if (user.emails[0].address.endsWith("umbc.edu"))
            return true;
        throw new Meteor.Error(403, "Email must end in umbc.edu");

    });


});
