import { Schema, model, Document, Types } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const { ObjectId } = Schema.Types;

interface Transaction extends Document {
  transactionId: Types.ObjectId;
  amount: Amount;
  currency: Currency;
  account: Account;
  name: string;
}

interface Amount extends Document {
  origin: number;
  target: number;
}

interface Currency extends Document {
  origin: string;
  target: string;
}

interface Account extends Document {
  fromAccId: Types.ObjectId;
  toAccId: Types.ObjectId;
}

const transactionSchema = new Schema({
  transactionId: ObjectId,
  name: String,
  amount: {
    origin: Number,
    target: Number,
  },
  currency: {
    origin: String,
    target: String,
  },
  account: {
    fromAccId: ObjectId,
    toAccId: ObjectId,
  },
});

transactionSchema.plugin(timestamps);

export default model<Transaction>('Transaction', transactionSchema);
