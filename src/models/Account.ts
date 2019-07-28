import { Schema, model, Document, Types } from 'mongoose';
import { timestamps } from 'mongoose-timestamp';

const { ObjectId } = Schema.Types;

interface Account extends Document {
  ownerId: Types.ObjectId;
  name: string;
  balance: number;
}

const accountSchema = new Schema({
  ownerId: ObjectId,
  name: String,
  balance: Number,
});

accountSchema.plugin(timestamps);

export default model<Account>('Account', accountSchema);
