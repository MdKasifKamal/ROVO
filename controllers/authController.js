const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => res.render('auth/login');
exports.getSignup = (req, res) => res.render('auth/signup');

exports.postSignup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const user = await User.create({ name, email, password: hashedPassword, role });
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        return res.redirect('/');
    }
    res.status(401).send('Invalid credentials');
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/auth/login'));
};
