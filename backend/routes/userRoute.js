const express=require("express")
const registerUser = require("../controllers/registerUser")
const loginUser = require("../controllers/loginUser")
const game = require("../controllers/Game")
const getData = require("../controllers/getData")
const submitScore = require("../controllers/submitScore")


const router=express.Router()

router.post("/registerUser",registerUser)
router.post("/loginUser",loginUser)
router.post("/game",game)
router.get("/getData",getData)
router.post("/submitscore",submitScore)

getData

module.exports=router