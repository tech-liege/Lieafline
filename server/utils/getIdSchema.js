const mongoose = require('mongoose');

module.exports = function getIdSchema (ref) {

  const objId = new mongoose.Schema({
    objId:{ type: mongoose.Schema.Types.ObjectId, ref: `${ref}`}
  })

  return objId;
}