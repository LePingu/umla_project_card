const User = require('../model/userModel.js');

async function login(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        try {
            const findUser = await User.findOne({email: req.body.email}).exec();
            console.log(findUser);
            if (!findUser){
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            }
            else{
                if (findUser.authenticate(req.body.password)) {
                    res.status(200).json({
                        "token": findUser.getToken(),
                        "text": "Authentification réussi"
                    })
                }
                else{
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
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

exports.login = login;