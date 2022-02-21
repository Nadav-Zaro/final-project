import mongoDB from "mongodb"
import dotenv from "dotenv";
dotenv.config();
    const MongoClient = mongoDB.MongoClient,
    mongoURL = process.env.MONGOURL,
    dbName = "Ballers_Court",
    postsColl = "posts";


const showPosts = (req,res)=> {
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

const getPostByEmail = (req, res)=> {
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

const addPost = (req,res)=> {
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

const updatePost = (req, res)=> {
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

const updateBall = (req, res)=> {
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

const deletePost=(req, res)=> {
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

const addComment = (req, res)=> {
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

const updateComment = (req, res)=> {
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

const deleteComment = (req, res)=> {
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

export {
    showPosts,getPostByEmail,addPost,updatePost,updateBall,deletePost,addComment,updateComment,deleteComment
}