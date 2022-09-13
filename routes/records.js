const express= require('express');

const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'))

router.use(express.urlencoded({ extended: true }));

const recordsCntrl = require("../controllers/records");

// IsLoggedIn middleware
const IsLoggedIn = require('../helper/isLoggedIn');

// Routes
router.get("/records/sell", IsLoggedIn, recordsCntrl.record_create_get);
router.post("/records/sell", recordsCntrl.record_create_post);
router.get("/records/index", recordsCntrl.record_index_get);
router.get("/records/detail", recordsCntrl.record_show_get);
router.get("/records/delete", IsLoggedIn, recordsCntrl.record_delete_get);
router.get("/records/edit", IsLoggedIn, recordsCntrl.record_edit_get);
router.put("/records/update", IsLoggedIn, recordsCntrl.record_update_put);
router.post("/records/search", recordsCntrl.record_search_post);
router.post("/records/next", recordsCntrl.record_next_post);
router.post("/records/prev", recordsCntrl.record_prev_post);

module.exports = router;
