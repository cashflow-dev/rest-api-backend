import { Schema, model, Document, Types } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const { ObjectId, Mixed } = Schema.Types;

interface RecurrentEvent extends Document {
  eventTypeId: Types.ObjectId;
  name: string;
  amount: Amount;
  accounts: Accounts;
  lastOccurred: string;
  occursEvery: string;
  occurDate: string;
  nextOccurrance: string;
  currency: string;
  meta: any;
}

interface Accounts extends Document {
  fromId: Types.ObjectId;
  toId: Types.ObjectId;
}

interface Amount extends Document {
  origin: number;
  target: number;
}

const recurrentEventSchema = new Schema({
  eventTypeId: ObjectId,
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
  lastOccurred: String,
  occursEvery: String,
  occurDate: String,
  nextOccurrance: String,
  meta: Mixed,
});

recurrentEventSchema.plugin(timestamps);

export default model<RecurrentEvent>('RecurrentEvent', recurrentEventSchema);
