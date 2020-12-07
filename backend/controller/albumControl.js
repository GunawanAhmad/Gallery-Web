const User = require("../model/user");
const Album = require("../model/album");
const fileHelper = require('../util/file');
const { response } = require("express");


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
        return User.findById(album.userId)

    })
    .then(user => {
        console.log('asdas')
        for(let i = 0; i< user.albums.length; i++) {
            if (user.albums[i] == albumId) {
                user.albums.splice(i, 1)
                return user.save()
            }
        }
        
    })
    .then(response => {
        return res.json({response : response, mgg : "succes"})
    })
    .catch(err => {
        console.log(err)
    })
}