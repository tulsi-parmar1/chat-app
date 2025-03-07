import { Router } from "express";
import isLoggedIn from "../Middleware/isLoggedin.js";
import {
  signUp,
  login,
  logout,
  acceptRequest,
  sendFollowRequest,
  getUser,
  getFollowers,
  getFollowing,
  getFollowRequests,
  getSentRequests,
  getUsers,
  rejectRequests,
  unfollowUser,
  backRequest,
  getUserById,
} from "../controller/user.controller.js";
const router = Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/sendFollowRequest/:id", isLoggedIn, sendFollowRequest);
router.get("/acceptRequest/:id", isLoggedIn, acceptRequest);
router.get("/rejectRequests/:id", isLoggedIn, rejectRequests);
router.get("/unfollowUser/:id", isLoggedIn, unfollowUser);
router.get("/backRequest/:id", isLoggedIn, backRequest);
router.get("/getUser", isLoggedIn, getUser);
router.get("/getUsers", isLoggedIn, getUsers);
router.get("/getFollowers", isLoggedIn, getFollowers);
router.get("/getFollowing", isLoggedIn, getFollowing);
router.get("/getFollowRequests", isLoggedIn, getFollowRequests);
router.get("/getSentRequests", isLoggedIn, getSentRequests);
router.get("/getUserById/:id", isLoggedIn, getUserById);

export default router;
