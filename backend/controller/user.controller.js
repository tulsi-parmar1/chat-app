import User from "../models/user.model.js";
import bcrypt from "bcrypt";

import generateToken from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  const { name, email, password, confirmPassword, username } = req.body;

  if (!name || !email || !password || !confirmPassword || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  if (password.length > 20) {
    return res
      .status(400)
      .json({ message: "Password must be at most 20 characters long" });
  }
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) throw err;
      try {
        const newUser = new User({
          name,
          email,
          password: hash,
          username,
        });
        await newUser.save();

        //token generation
        const token = generateToken(newUser);
        const options = {
          httpOnly: true, //cookie cannot be accessed by client side scripts
          secure: true, //cookie will only be sent over HTTPS
          expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
          ),
        };
        res.cookie("token", token, options); //cookie is set with name token

        res.status(201).json({ message: "User created successfully" });
      } catch (error) {
        console.log(error);
      }
    });
  });
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = generateToken(user);
    const options = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      secure: true,
    };
    res.cookie("token", token, options);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        following: user.following,
        followers: user.followers,
        sentRequests: user.sentRequests,
        followRequests: user.followRequests,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error: error });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};
export const sendFollowRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const userToFollow = await User.findById(id);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: "You are already following" });
    }
    if (!user.sentRequests) user.sentRequests = [];
    if (!userToFollow.followRequests) userToFollow.followRequests = [];

    userToFollow.followRequests.push(user._id);
    user.sentRequests.push(userToFollow._id); // Sender stores requested ID

    await user.save();
    await userToFollow.save();
    socket;

    res.status(200).json({ message: "User requested succesfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error: error });
  }
};
export const acceptRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);
    const userToAccept = await User.findById(id);

    if (!userToAccept) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.followRequests.includes(userToAccept._id.toString())) {
      return res.status(400).json({ message: "No follow request found" });
    }

    user.followRequests = user.followRequests.filter(
      (userId) => userId.toString() !== id
    );

    userToAccept.sentRequests = userToAccept.sentRequests.filter(
      (userId) => userId.toString() !== user._id.toString()
    );

    user.followers.push(userToAccept._id);
    userToAccept.following.push(user._id);

    await user.save();
    await userToAccept.save();

    res.status(200).json({ message: "Follow request accepted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getFollowers = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const followers = await User.find({ _id: { $in: user.followers } });
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
export const getFollowing = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    // console.log(user);
    // res.status(200).json(user.following);
    const following = await User.find({ _id: { $in: user.following } });
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
export const getFollowRequests = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "user not exist" });
    }
    const followRequests = await User.find({
      _id: { $in: user.followRequests },
    });
    res.status(200).json(followRequests);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "server error", error });
  }
};
export const getSentRequests = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    const sentRequests = await User.find({ _id: { $in: user.sentRequests } });
    res.status(200).json(sentRequests);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "server error", error });
  }
};
export const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const userToUnfollow = await User.findById(id);
    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    } else if (!user.following.includes(userToUnfollow._id)) {
      return res.status(400).json({ message: "You are not following" });
    }
    user.following = user.following.filter(
      (userId) => userId.toString() !== id
    );
    await user.save();
    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error: error });
  }
};
export const rejectRequests = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    const userToReject = await User.findById(req.params.id);
    if (!userToReject) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.followRequests.includes(userToReject._id)) {
      return res.status(400).json({ message: "No follow request found" });
    }
    user.followRequests = user.followRequests.filter(
      (userId) => userId.toString() !== req.params.id
    );
    userToReject.sentRequests = userToReject.sentRequests.filter(
      (userId) => userId.toString() !== id
    );
    await user.save();
    await userToReject.save();
    res.status(200).json({ message: "Follow request rejected successfully" });
  } catch (error) {}
};
export const getUsers = async (req, res) => {
  try {
    const loggedinuserid = req.user._id;
    const users = await User.find({ _id: { $ne: loggedinuserid } }).select(
      "username email"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
  }
};
export const backRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const userToBack = await User.findById(id);
    if (!userToBack) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.sentRequests.includes(userToBack._id)) {
      return res.status(400).json({ message: "No follow request found" });
    }
    user.sentRequests = user.sentRequests.filter(
      (userId) => userId.toString() !== id
    );
    userToBack.followRequests = userToBack.followRequests.filter(
      (userId) => userId.toString() !== req.user._id
    );
    await user.save();
    await userToBack.save();
    res.status(200).json({ message: "Follow request backed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("username email");
    if (!user) {
      return res.status(400).json({ message: "user not exist" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
