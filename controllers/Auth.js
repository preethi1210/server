const OTP = require('../models/OTP');
const User = require('../models/User');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Send OTP
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if the user already exists
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Generate OTP
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated", otp);

        // Ensure OTP uniqueness
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
            result = await OTP.findOne({ otp: otp });
        }

        // Create OTP payload
        const otpPayload = { email, otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // OTP expires in 10 minutes
        await OTP.create(otpPayload);

        // Respond with success message (no OTP in response for security)
        res.status(200).json({
            success: true,
            message: "OTP sent successfully. Please check your email."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Sign Up
exports.signUp = async (req, res) => {
    console.log("not getting into signup")
    try {
        // Destructure request body
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password do not match',
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already registered',
            });
        }

        // Fetch the most recent OTP for the email
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (!recentOtp || recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No OTP found or expired.',
            });
        }

        // Check if OTP is expired (assuming `expiresAt` is stored in OTP model)
        const currentTime = Date.now();
        if (recentOtp[0].expiresAt < currentTime) {
            return res.status(400).json({
                success: false,
                message: 'OTP has expired. Please request a new OTP.',
            });
        }

        // Validate OTP
        if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP.',
            });
        }

        // Create profile details (consider adding validation or default values)
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg/seed=${firstName}${lastName}`, // You can keep this or change logic if needed
        });

        // Respond with the success message and the newly created user
        return res.status(200).json({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Failed registration. Please try again.',
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields',
            });
        }

        // Find the user by email
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not registered. Sign up first.',
            });
        }

        // Compare the password with the stored hash
        if (await bcrypt.compare(password, user.password)) {
            // Create JWT payload
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role,
            };

            // Generate token
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

            // Set the token in the user's profile
            user.token = token;
            user.password = undefined; // Remove password from response

            // Set cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'Logged in successfully',
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login failed. Please try again.',
        });
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, email, newPassword, confirmNewPassword } = req.body;

        // Validate required fields
        if (!oldPassword || !email || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if the new password and confirm password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password do not match',
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Compare old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Old password is incorrect',
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
