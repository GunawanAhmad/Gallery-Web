const User = require("../model/user");
const Album = require("../model/album");
const album = require("../model/album");



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


exports.getUserAlbums = (req,res,next) => {
    
    if(req.userId) {
        // console.log(req.userId)
        User.findById(req.userId)
        .populate('albums', 'description albumName')
        .exec((err, user) => {
            if (err) {
                let error = new Error('load album failed');
                error.statusCode = 402;
                throw error;
            }
            return res.status(200).json({msg : 'succes', user : user})
        })
    } else {
        const username = req.params.username;
        User.findOne({ username : username })
        .populate({
            path : 'albums',
            match : { albumType : 'public' },
            select : ('albumName description')
        })
        .exec((err, user) => {
            if (err) {
                let error = new Error('load album failed');
                error.statusCode = 402;
                throw error;
            }
            return res.status(200).json({msg : 'succes', user : user})
        })
    }
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


exports.getAlluser = (req,res,next) => {
    const user = req.params.q
    const userId = req.userId;
    User.find({$and : [
        {_id : {$ne : userId}},
        {$or : [
            {"name": {$regex: ".*" + user + ".*"}},
            {"username": {$regex: ".*" + user + ".*"}}
        ]}
    ]})
    .select('username name')
    .limit(5)
    .then(response => {
        return res.status(200).json({msg : 'succes', users : response})
        
    })
    .catch(err => {
        console.log(err)
    })
}


