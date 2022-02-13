const mongoDB = require("mongodb"),
    MongoClient = mongoDB.MongoClient,
    mongoURL = process.env.MONGOURL ,
    dbName = "Ballers_Court";
    userColl = "users",

    
module.exports.getUser = (res)=> {
//   res.send(mongoURL);

MongoClient.connect(mongoURL)
    .then((db) => {
        const dbo = db.db(dbName)
        dbo.collection(userColl).find({}).toArray()
            .then(docs => {
                // res.send("success");
                res.send(docs)
                db.close()
            })
    })
    .catch((err) => {
        res.send("err");
        throw err
    })
}

module.exports.addUser = (req,res)=> {
    let user = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).insertOne(user)
                .then((doc) => {
                    if (doc) {
                        return(res.send(doc).status(201),
                        db.close())
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            console.log(err);
            throw err
        })
}    


module.exports.getUserByEmail = (req, res)=> {
    MongoClient.connect(mongoURL)
        .then((db) => {
            const id = {id:req.params.id}
            const dbo = db.db(dbName)
            dbo.collection(userColl).find(id).toArray()
                .then(docs => res.send(docs))
        })
        .catch((err) => {
            throw err
        })
}

module.exports.updateUser = (req, res)=> {
    const email = {email:req.params.email}
    if (email == undefined) {
        return res.sendStatus(400)
    }
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(email, { $set: upDoc })
                .then((doc) => {
                    if (doc) {
                       return res.send(doc)
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.addGame = (req, res)=> {
    const id = { _id: mongoDB.ObjectId(req.params.id)}
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $push: upDoc })
                .then((doc) => {
                    if (doc) {
                       return res.send(doc)
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.updateGame = (req, res)=> {
    const id = { _id: mongoDB.ObjectId(req.params.id)}
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $set: {games: upDoc} })
                .then((doc) => {
                    if (doc) {
                      return  res.send(doc)
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.deleteGame = (req, res)=> {
    console.log(req.body);
    const id = { _id: mongoDB.ObjectId(req.params.id)}
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $pull: {games: upDoc} })
                .then((doc) => {
                    if (doc) {
                      return  res.send(doc)
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.addBaller = (req, res)=> {
    const id = { _id: mongoDB.ObjectId(req.params.id)}
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $push: {ballers: upDoc} })
                .then((doc) => {
                    if (doc) {
                       return res.send(doc)
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.removeBaller = (req, res)=> {
    const id = { _id: mongoDB.ObjectId(req.params.id)}
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $pull: {ballers: upDoc} })
                .then((doc) => {
                    if (doc) {
                       return res.send(doc)
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.addUserPost = (req, res)=> {
    const id = { _id: mongoDB.ObjectId(req.params.id)}
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $push: {posts: upDoc} })
                .then((doc) => {
                    if (doc) {
                       return res.send(doc)
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.deleteUserPost = (req, res)=> {
    const id = { _id: mongoDB.ObjectId(req.params.id)}
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).deleteOne(id, { $pull: {posts: upDoc} })
                .then((doc) => {
                    if (doc) {
                       return res.send(doc)
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.sendMessage = (req, res)=> {
    const id = { id: req.params.id}
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $push: {messages: upDoc} })
                .then((doc) => {
                    if (doc) {
                       return res.send(doc)
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.updateMessage = (req, res)=> {
    const id = { id: req.params.id}
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $set: {messages: upDoc} })
                .then((doc) => {
                    if (doc) {
                       return res.send(doc)
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}