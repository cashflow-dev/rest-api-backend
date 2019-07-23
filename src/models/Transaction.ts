import { Schema, model, Document, Types } from 'mongoose';

const { ObjectId } = Schema.Types.ObjectId;

interface Transaction extends Document {
  transactionId: Types.ObjectId;
  originAmount: number;
  targetAmount: number;
  settings: Settings;
  account: Account;
  name: string;
}

interface Settings extends Document {
  originCurrency: string;
  currency: string;
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
  settings: {
    originCurrency: String,
    targetCurrency: String,
  },
  account: {
    fromAccId: ObjectId,
    toAccId: ObjectId,
  },
});

export default model<Transaction>('Transaction', transactionSchema);
