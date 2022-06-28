import User from '../../models/User'

export const validateUser = (usersData) => async ({
    email,
    password
}) => {
    const user = await User.exists({
        email: email
    });

    if (!user) {
        throw new Error('Email does not exist!');
    }

    if (await bcrypt.compare(password, user.password)) {
        return user;
    }

    return null;
};