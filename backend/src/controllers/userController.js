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
    const user= await userRepository.findOne({
      where: {
        email: req.body.email
      }
    });

    if(user){
     return res.status(500).json({ message: "email already exists" });
    }

    const newUser= await userRepository.save(req.body);
    return res.status(201).json({id:newUser.id,status:'success'});
  } catch (error) {
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
    const email = req.body.email;
    const password = req.body.password;
    const user = await userRepository.findOne({
      where: {
        email,password
      }
    });

    if(!user){
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    return res.status(200).json({ message: user ,status: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userRepository.findOneBy({
      id: req.params.id,
    });

    await userRepository.merge(user, req.body);
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

