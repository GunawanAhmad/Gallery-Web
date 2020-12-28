const User = require("../model/user");
const Album = require("../model/album");
const fileHelper = require('../util/file');


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


exports.createAlbum = (req,res,next) => {
    const albumName = req.body.albumName;
    const description = req.body.description;
    const albumType = req.body.albumType;
    const userId = req.userId;
    let savedAlbum;

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
            userId : userId,
            description : description,
            albumType : albumType
        })
        album.save()
        .then(albumRes => {
            console.log('album created')
            savedAlbum = albumRes
            return User.findById(userId)
        })
        .then(user => {
            user.albums.push(savedAlbum._id)
            return user.save()
        })
        .then(respons => {
            console.log(respons)
            return res.status(200).json(respons)
        })
        .catch(err => {
            console.log(err)
            
        })
    })
}


exports.getAlbumPhotos = (req,res,next) => {
    const albumId = req.params.albumId
    Album.findById(albumId)
    .select('photos')
    .then(photos => {
        // console.log(photos)
        return res.status(200).json({msg : 'succes', photos : photos})
    })
    .catch(err => {
        console.log(err)
    })
}


exports.addPhoto = (req,res,next) => {
    const albumId = req.params.albumId;
    const photoFile = req.file.path.replace("\\", "/");
    const description = req.body.description;
    
    Album.findById(albumId)
    .then(album => {
        if(!album) {
            const err = new Error('album not found')
            err.statusCode = 404;
            throw err;
        }
        const photo = {
            path : photoFile,
            description : description
        }
        album.photos.push(photo)
        return album.save()
    })
    .then(result => {
        console.log(result)
        return res.status(200).json({msg : 'succes', data : result})
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}