const User = require("../model/user");
const Album = require("../model/album");
const user = require("../model/user");


exports.createAlbum = (req,res,next) => {
    const albumName = req.body.albumName;
    const description = req.body.description;
    const albumType = req.body.albumType;
    const user = req.userId;

    Album.findOne({albumName : albumName})
    .then(albumRes => {
        if(albumRes) {
            const error = new Error('album already exist')
            error.statusCode = 401;
            throw error;
        } 
        const album = new Album({
            albumName : albumName,
            photos : [],
            userId : user,
            description : description,
            albumType : albumType
        })
        album.save()
        .then(albumRes => {
            console.log('album created')
            return res.status(200).json(albumRes)
        })
        .then(err => {
            console.log(err)
            
        })
    })
}

