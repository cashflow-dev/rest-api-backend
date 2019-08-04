import { Schema, model, Document, Types } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const { ObjectId } = Schema.Types;

interface Transaction extends Document {
  transactionId: Types.ObjectId;
  origin: Origin;
  target: Target;
  accounts: Accounts;
  name: string;
}

interface Origin extends Document {
  currency: string;
  amount: number;
}

interface Target extends Document {
  currency: string;
  amount: number;
}

interface Accounts extends Document {
  fromId: Types.ObjectId;
  toId: Types.ObjectId;
}

const transactionSchema = new Schema({
  transactionId: ObjectId,
  name: String,
  origin: {
    currency: String,
    amount: Number,
  },
  target: {
    currency: String,
    amount: Number,
  },
  accounts: {
    fromId: ObjectId,
    toId: ObjectId,
  },
});

transactionSchema.plugin(timestamps);

export default model<Transaction>('Transaction', transactionSchema);
