const {tblUsers} = require('../../model/db/db_tabulation_system');

const POST_login = async function (req, res) {
    const {username, password} = req.body;
    try{
        const user = await tblUsers.findOne({where: {Username: username, UserPassword: password}});

    if(user){
        return res.status(200).json({message: 'Login successful!'});
    } else {
        return res.status(401).json({message: 'Invalid username or password!'});
    }
    } catch(error){
        console.error('An error occurred!', error);
        return res.status(500).json({message: 'Internal server error.'});
    }
};

module.exports = {POST_login};
