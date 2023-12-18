const { loginUser, registerUser } =
    require('../controllers/userController');
const router = require('express').Router();

router.post('/register', registerUser);
router.post('/login', loginUser)

module.exports = router;