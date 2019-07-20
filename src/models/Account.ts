import { Schema, model, Document, Types } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

interface Account extends Document {
  ownerId: Types.ObjectId;
  name: string;
  balance: number;
}

const accountSchema = new Schema({
  ownerId: ObjectId,
  name: String,
  balance: Number
});

export default model<Account>('Account', accountSchema);