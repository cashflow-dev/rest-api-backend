import { Schema, model, Document } from 'mongoose';
import { ObjectID } from 'mongodb';

const { ObjectId } = Schema.Types;

interface Settings extends Document {
  user: ObjectID;
  currency: string;
}

const settingsSchema = new Schema({
  user: ObjectId,
  currency: String,
});

export default model<Settings>('Settings', settingsSchema);
