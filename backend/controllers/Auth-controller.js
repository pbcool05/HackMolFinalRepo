const usermodel = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Check if user exists
        const user = await usermodel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists',
                success: false
            });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new usermodel({
            name,
            email,
            password: hashedPassword,
            role: role || 'user' // Default to 'user' if role not specified
        });

        await userModel.save();

        // Generate JWT token
        const jwtToken = jwt.sign(
            { 
                email: userModel.email, 
                _id: userModel._id,
                role: userModel.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "Signup successful",
            success: true,
            jwtToken,
            name: userModel.name,
            isAdmin: userModel.role === 'admin'
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ "message": errorMsg, "success": false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ "message": errorMsg, "success": false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
};

module.exports = {
    signup,
    login
};