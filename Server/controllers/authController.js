import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from "../config/conn.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const otpStorage = {};

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function signup(req, res) {
  const { email } = req.body;

  try {
    const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
    otpStorage[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
    };

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Registration",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    };

    // Send OTP to the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return res.status(200).json({
      message: "OTP sent to your email. Please verify.",
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Unexpected server error" });
  }
}

export const verifyOtp = async (req, res) => {
  const { email, otp, name, password, isAdmin } = req.body;

  // Check if OTP exists in storage
  if (!otpStorage[email]) {
    return res.status(400).json({ message: "No OTP found or OTP expired" });
  }

  const { otp: storedOtp, expiresAt } = otpStorage[email];

  // Check if OTP has expired
  if (Date.now() > expiresAt) {
    delete otpStorage[email]; // Remove expired OTP
    return res.status(400).json({ message: "OTP expired" });
  }

  console.log(`Stored OTP: ${storedOtp}, Provided OTP: ${otp}`); // Log OTP comparison for debugging

  // Check if provided OTP matches the stored OTP
  if (otp !== storedOtp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // OTP matched; proceed with registration
  const hashedPassword = await bcrypt.hash(password, 10);

  const insertTable = () => {
    const sql = "INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)";
    const values = [name, email, hashedPassword, isAdmin || false];
    db.query(sql, values, async (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: "Email already exists" });
        }
        console.error(err);
        return res.status(500).json({ message: "Error adding data to table" });
      }

      const token = jwt.sign({ email, name, isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });
      return res.status(200).json({
        message: "Registration successful",
        token,
      });
    });
  };

  const checkTable = `SHOW TABLES LIKE 'users'`;
  db.query(checkTable, async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error finding the table" });
    }

    if (result.length === 0) {
      const createTable = `
        CREATE TABLE users(
          id INT AUTO_INCREMENT PRIMARY KEY,
          Name VARCHAR(255) NOT NULL,
          Email VARCHAR(255) NOT NULL UNIQUE,
          Password VARCHAR(255) NOT NULL,
          isAdmin BOOLEAN DEFAULT FALSE
        )
      `;
      db.query(createTable, (err) => {
        if (err) {
          console.error("Error in creating table:", err);
          return res.status(500).json({ message: "Error in creating table" });
        }
        insertTable();
      });
    } else {
      insertTable();
    }
  });

  // Clear OTP after successful verification
  delete otpStorage[email];
};

export const getuser = async(req,res) => {
  try {
    const { id, username, isAdmin } = req.user;
    res.status(200).json({
      id: id,
      username: username,
      isAdmin: isAdmin,
      // Add other user information as needed
  });
  } catch (error) {
    throw error
  }
}


export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ user, token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
