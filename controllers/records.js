//User Require Models
const {Record} = require("../models/Record");
const {User} = require("../models/User");
const axios = require('axios');

// Require Moment Library
const moment = require('moment');

const MB_USER_AGENT = 'discoid/1.0 (https://github.com/eskres/discoid)';

// CRUD

// CREATE
// HTTP GET - Load Record From
exports.record_create_get = (req, res) => {
    User.find()
    .then((users) => {
        if(req.query.title == null || req.query.title == "" || req.query.title == undefined){
            console.log(req.query + "No q params");
            res.render("records/sell", {users, data:false})
        } else {
            console.log(req.query + "Q params");
            let populateSell = req.query
            res.render("records/sell", {users, populateSell, data:true})
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

// HTTP POST - Record
exports.record_create_post = (req, res) => {
    // Saving the data into the Database
    let record = new Record(req.body);
    console.log(req.body);
    console.log(req.file);
    if (req.file !== undefined) {
        record.albumCover = '/albumCover/' + req.file.filename;
    } else if (req.body.albumCover) {
        record.albumCover = req.body.albumCover;
    }
    record.save()
    .then(() => {
        console.log(req.body.record);
        User.findById(req.body.user)
            .then(user => {
                user.record.push(record);
                user.save();
            });
        res.redirect("/records/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}


// HTTP GET - Record Index API
exports.record_index_get = (req, res) => {
    Record.find().populate('user')
    .then(records => {
        res.render("records/index", {records: records, moment})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Record By Id
exports.record_show_get = (req, res) => {
    console.log(req.query.id);
    // Find the record by ID
    Record.findById(req.query.id).populate('user')
    .then(record => {
        res.render("records/detail", {record, moment})
    })
    .catch(err => {
        console.log(err)
    })
}

// UPDATE
// HTTP GET - Load Record Edit Form
exports.record_edit_get = (req, res) => {
    Record.findById(req.query.id)
    .then((record) => {
        res.render("records/edit", {record})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - Record Update
exports.record_update_put = (req, res) => {
    console.log(req.body.id);

    Record.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/records/index");
    })
    .catch(err => {
        console.log(err)
    })
}

// DELETE
// HTTP DELETE - Record
exports.record_delete_get = (req, res) => {
    console.log(req.query.id);

    Record.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect("/records/index");
    })
    .catch(err => {
        console.log(err);
    })
}

// MUSICBRAINZ SEARCH
exports.record_search_post = async (req, res) => {
    try {
        const response = await axios.get('https://musicbrainz.org/ws/2/release/', {
            headers: { 'User-Agent': MB_USER_AGENT },
            params: { query: req.body.search, fmt: 'json', limit: 20, offset: 0 }
        });
        res.render("records/search", { data: response.data, query: req.body.search });
    } catch (err) {
        console.log(err);
    }
}

// MUSICBRAINZ RESULTS NEXT PAGE
exports.record_next_post = async (req, res) => {
    try {
        const response = await axios.get('https://musicbrainz.org/ws/2/release/', {
            headers: { 'User-Agent': MB_USER_AGENT },
            params: { query: req.body.query, fmt: 'json', limit: 20, offset: req.body.offset }
        });
        res.render("records/search", { data: response.data, query: req.body.query });
    } catch (err) {
        console.error(err);
    }
}

// MUSICBRAINZ RESULTS PREV PAGE
exports.record_prev_post = async (req, res) => {
    try {
        const response = await axios.get('https://musicbrainz.org/ws/2/release/', {
            headers: { 'User-Agent': MB_USER_AGENT },
            params: { query: req.body.query, fmt: 'json', limit: 20, offset: req.body.offset }
        });
        res.render("records/search", { data: response.data, query: req.body.query });
    } catch (err) {
        console.error(err);
    }
}
