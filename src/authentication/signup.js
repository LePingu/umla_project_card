const User = require('../model/userModel.js');
const passwordHash = require("password-hash");

async function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        }
        try {
            const findUser = await User.findOne({email: user.email}).exec();
            console.log(findUser);
            if (findUser == null){
                try{
                    var _u = new User(user);
                    let saveUser = await _u.save();
                    res.status(200).json({
                    "text": "Succès",
                    "token": user.getToken()
                    })
                }
                catch (err)
                 {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                }
            }
            else{
                res.status(204).json({
                    "text": "L'adresse email existe déjà"
                })
            }
        } 
        catch (err) {
            switch (err) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
            }
        }
    }
}

exports.signup = signup;