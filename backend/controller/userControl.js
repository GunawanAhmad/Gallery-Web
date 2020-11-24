const User = require("../model/user");
const Album = require("../model/album");



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
        .populate('albums', 'albumName description')
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
