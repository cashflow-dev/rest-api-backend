import { Schema, model, Document, Types } from 'mongoose';

const { ObjectId } = Schema.Types.ObjectId;

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
  originAmount: Number,
  targetAmount: Number,
  currency: {
    origin: String,
    target: String,
  },
  account: {
    fromAccId: ObjectId,
    toAccId: ObjectId,
  },
});

export default model<Transaction>('Transaction', transactionSchema);
