import { Schema, model, Document, Types } from 'mongoose';
import { timestamps } from 'mongoose-timestamp';

const { ObjectId } = Schema.Types.ObjectId;

interface Transaction extends Document {
  transactionId: Types.ObjectId;
  origin: Origin;
  target: Target;
  account: Account;
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

interface Account extends Document {
  fromAccId: Types.ObjectId;
  toAccId: Types.ObjectId;
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
  account: {
    fromAccId: ObjectId,
    toAccId: ObjectId,
  },
});

transactionSchema.plugin(timestamps);

export default model<Transaction>('Transaction', transactionSchema);
