const CreatePost = async (req, res) => {

    try {
        const data =  req.body.post.data

        const postData = { ...data, owner: 'some id'   }


        res.status(201).json({
            postData
        })
    } catch (e) {

        res.status(500).json({
            error: e.message
        })
    }

}

module.exports = CreatePost
