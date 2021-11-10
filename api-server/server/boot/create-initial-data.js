'use strict';

module.exports = async function(app) {
    const User = app.models.User;
    const users = await User.find();
    if (users.length === 0) {
        await User.create({
            "email": "user@goal-achiever.com",
            "password": "Aa123456",
            "emailVerified": true
        });
        console.log('created default user');
    }
};