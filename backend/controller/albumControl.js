const User = require("../model/user");
const Album = require("../model/album");
const fileHelper = require('../util/file')


exports.albumDelete = (req,res,next) => {
    const albumId = req.params.id;
    Album.findOneAndDelete({_id : albumId})
    .then(album => {
        if(!album) {
            const err = new Error('album not found')
            err.statusCode = 404;
            throw err;
        }
        for(let i = 0; i< album.photos.length; i++) {
            fileHelper.deleteFile(album.photos[i].path)
        }
        
        console.log(album)
        return res.json(album)

    })
    .catch(err => {
        console.log(err)
    })
}