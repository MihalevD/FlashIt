import User from '../../models/User.js'
import bcrypt from 'bcryptjs'

export const validateUser = async ({
    username,
    password
}) => {
    const user = await User.findOne({
        username: username
    });

    console.log(user)

    if (!user) {
        throw new Error('Username does not exist!');
    }

    if (await bcrypt.compare(password, user.password)) {
        console.log('yey')
        return user;
    }

    return null;
};