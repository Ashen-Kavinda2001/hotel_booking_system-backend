import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export function getUser(req, res) {
    User.find().then(
        (usersList) => {
            res.json({
                list: usersList
            });
        }
    )
}
export function postUser(req, res) {

    const user = req.body;

    const password = req.body.Password;
    const hashedPassword = bcrypt.hashSync(password,10);
    user.Password = hashedPassword;

    const newUser = new User(user);

    newUser.save().then(() => {
        res.json({
            message: 'User added successfully'
        });
    }).catch(
        (() => {
            res.json({
                message: 'Error adding user'
            });
        })  
    )
    
} 

export function loginUser(req, res) {
    const credentials = req.body;
    User.findOne({ email: credentials.email }).then(
        (user) => {
            if (user == null) {
                res.json({
                    message: 'Invalid email or password'
                });
            } else {
                // Compare entered password with hashed password
                const isMatch = bcrypt.compareSync(credentials.Password, user.Password);
                if (!isMatch) {
                    res.json({
                        message: 'Invalid email or password'
                    });
                } else {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            id: user._id,
                            FirstName: user.FirstName,
                            LastName: user.LastName
                        },
                        'yourSecretKey',
                        { expiresIn: '48h' }
                    );
                    res.json({
                        message: 'Login successful',
                        user: user,
                        token: token
                    });
                }
            }
        }
    ).catch(() => {
        res.json({
            message: 'Error logging in'
        });
    });
}