const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const settingsSchema = new Schema({
  user: ObjectId,
  currency: String,
});

const Settings = model('Settings', settingsSchema);

module.exports = Settings;
