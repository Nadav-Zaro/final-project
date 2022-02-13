const mongoDB = require("mongodb"),
    MongoClient = mongoDB.MongoClient,
    mongoURL = process.env.MONGOURL,
    dbName = "Ballers_Court";
    postsColl = "posts";


module.exports.showPosts = (req,res)=> {
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(postsColl).find({}).toArray()
                .then(docs => {
                    if (docs) {
                        res.send(docs)
                        db.close()
                    }
                })
        })
        .catch((err) => {
            throw err
        })
}

module.exports.getPostByEmail = (req, res)=> {
    MongoClient.connect(mongoURL)
        .then((db) => {
            const email = {email:req.params.email}
            const dbo = db.db(dbName)
            dbo.collection(postsColl).find(email).toArray()
                .then(docs => res.send(docs))
        })
        .catch((err) => {
            throw err
        })
}

module.exports.addPost = (req,res)=> {
    let user = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(postsColl).insertOne(user)
                .then((doc) => {
                    if (doc) {
                        return (res.send(doc).status(201),db.close())
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            console.log(err);
            throw err
        })
}    

module.exports.updatePost = (req, res)=> {
    const id = { id: req.params.id}
    if (id == undefined) {
        return res.sendStatus(400)
    }
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(postsColl).findOneAndUpdate(id, { $set:upDoc })
                .then((doc) => {
                    if (doc) {
                        return (res.send(doc).status(201),db.close())
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.updateBall = (req, res)=> {
    const id = { id: req.params.id}
    const upDoc = Number(req.body)
    if (id == undefined) {
        return res.sendStatus(400)
    }
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(postsColl).findOneAndUpdate(id, { $push: {ball:req.body} })
                .then((doc) => {
                    if (doc) {
                        return (res.send(doc).status(201),db.close())
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.deletePost=(req, res)=> {
    const id = { id: req.params.id}
    if (id == undefined) {
        return res.sendStatus(400)
    }
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(postsColl).deleteOne(id)
                .then((doc) => {
                        res.send(doc)
                })
        })
        .catch((err) => {
            throw err
        })
}

module.exports.addComment = (req, res)=> {
    const id = { id: req.params.id}
    if (id == undefined) {
        return res.sendStatus(400)
    }
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(postsColl).findOneAndUpdate(id, { $push: {comments:req.body} })
                .then((doc) => {
                    if (doc) {
                        return (res.send(doc).status(201),db.close())
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.updateComment = (req, res)=> {
    const id = { id: req.params.id}
    if (id == undefined) {
        return res.sendStatus(400)
    }
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(postsColl).findOneAndUpdate(id, { $set: {comments:req.body} })
                .then((doc) => {
                    if (doc) {
                        return (res.send(doc).status(201),db.close())
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}

module.exports.deleteComment = (req, res)=> {
    const id = { id: req.params.id}
    if (id == undefined) {
        return res.sendStatus(400)
    }
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(postsColl).findOneAndUpdate(id, { $pull: {comments:req.body} })
                .then((doc) => {
                    if (doc) {
                        return (res.send(doc).status(201),db.close())
                    }
                    res.sendStatus(404)
                })
        })
        .catch((err) => {
            throw err.response
        })
}