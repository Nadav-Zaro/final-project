import mongoDB from "mongodb"
import dotenv from "dotenv";
dotenv.config();
const MongoClient = mongoDB.MongoClient,
 mongoURL = process.env.MONGOURL,
 dbName = "Ballers_Court",
 userColl = "users";


const getUser = (req, res) => {
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).find({}).toArray()
                .then(docs => {
                    res.send(docs)
                    db.close()
                })
        })
        .catch((err) => {
            throw err
        })
}

const addUser = (req, res) => {
    let user = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).insertOne(user)
                .then((doc) => {
                    if (doc) {
                        return (res.send(doc).status(201),
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

const getUserByEmail = (req, res) => {
    MongoClient.connect(mongoURL)
        .then((db) => {
            const id = { id: req.params.id }
            const dbo = db.db(dbName)
            dbo.collection(userColl).find(id).toArray()
                .then(docs => res.send(docs))
        })
        .catch((err) => {
            throw err
        })
}

const updateUser = (req, res) => {
    const email = { email: req.params.email }
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

const addGame = (req, res) => {
    const id = { _id: mongoDB.ObjectId(req.params.id) }
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

const updateGame = (req, res) => {
    const id = { _id: mongoDB.ObjectId(req.params.id) }
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $set: { games: upDoc } })
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

const deleteGame = (req, res) => {
    console.log(req.body);
    const id = { _id: mongoDB.ObjectId(req.params.id) }
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $pull: { games: upDoc } })
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

const addBaller = (req, res) => {
    const id = { _id: mongoDB.ObjectId(req.params.id) }
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $push: { ballers: upDoc } })
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

const removeBaller = (req, res) => {
    const id = { _id: mongoDB.ObjectId(req.params.id) }
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $pull: { ballers: upDoc } })
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

const addUserPost = (req, res) => {
    const id = { _id: mongoDB.ObjectId(req.params.id) }
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $push: { posts: upDoc } })
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

const deleteUserPost = (req, res) => {
    const id = { _id: mongoDB.ObjectId(req.params.id) }
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).deleteOne(id, { $pull: { posts: upDoc } })
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

const sendMessage = (req, res) => {
    const id = { id: req.params.id }
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $push: { messages: upDoc } })
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

const updateMessage = (req, res) => {
    const id = { id: req.params.id }
    const upDoc = req.body
    MongoClient.connect(mongoURL)
        .then((db) => {
            const dbo = db.db(dbName)
            dbo.collection(userColl).findOneAndUpdate(id, { $set: { messages: upDoc } })
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

export { getUser, addUser, getUserByEmail, updateUser, addGame, updateGame, deleteGame, addBaller, removeBaller, addUserPost, deleteUserPost, sendMessage, updateMessage }