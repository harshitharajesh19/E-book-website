import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connectDatabase from "../database.js";
import { User } from "../entities/User.js";

const dataSource = await connectDatabase();
var userRepository = dataSource.getRepository(User);

const getAllUsers = async (req, res) => {
  try {
    const users = await userRepository.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username,  password , gender} = req.body;
    const email = req.body.email.trim().toLowerCase();

    // Check if email already exists
    const existingUser = await userRepository.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImage = null;
    if (gender?.toLowerCase() === "male") {
      profileImage = "images/male1.png";
    } else if (gender?.toLowerCase() === "female") {
      profileImage = "images/female1.png";
    }

    // Save user with hashed password
    const newUser = await userRepository.save({
      username,
      email,
      password: hashedPassword,
      gender: gender || null,
      profileImage,
    });

    return res.status(201).json({ id: newUser.id, status: 'success' });

  } 
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userRepository.findOne({
      where: {
        id: id
      }
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const { password } = req.body;
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      alert("No user found with this email");
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, "security-key", { expiresIn: "1h" }); //replace the security-key with your security-key

    return res.status(200).json({
      status: "success",
      user,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userRepository.findOneBy({
      id: req.params.id,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, email, gender , profileImage } = req.body;
    if (username) user.username = username;
    if (email) user.email = email;
    if (profileImage) {
      user.profileImage = profileImage; // allow custom override
    }

    // Merge other fields
    await userRepository.merge(user, req.body);

    // Handle default profile image based on gender if not already custom
    if (gender) {
      user.gender = gender;

      const isDefaultImage = !user.profileImage || user.profileImage.includes("male1.png") || user.profileImage.includes("female1.png");

      if (isDefaultImage && !profileImage) {
        if (gender.toLowerCase() === "male") {
          user.profileImage = "images/male1.png";
        } else if (gender.toLowerCase() === "female") {
          user.profileImage = "images/female1.png";
        }
      }
    }

    const result = await userRepository.save(user);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await userRepository.delete(id);
    return res.status(204).json({message: "deleted successfully."});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, loginUser, createUser, getUser, updateUser, deleteUser};
