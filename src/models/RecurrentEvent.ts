import { Schema, model, Document, Types } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const { ObjectId, Mixed } = Schema.Types;

interface RecurrentEvent extends Document {
  eventTypeId: Types.ObjectId;
  name: string;
  lastOccurred: string;
  occursEvery: string;
  occurDate: string;
  nextOccurrance: string;
  accounts: Accounts;
  origin: Origin;
  target: Target;
  meta: any;
}

interface Accounts extends Document {
  fromId: Types.ObjectId;
  toId: Types.ObjectId;
}

interface Origin extends Document {
  currency: string;
  amount: number;
}

interface Target extends Document {
  currency: string;
  amount: number;
}

const recurrentEventSchema = new Schema({
  eventTypeId: ObjectId,
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
  lastOccurred: String,
  occursEvery: String,
  occurDate: String,
  nextOccurrance: String,
  meta: Mixed,
});

recurrentEventSchema.plugin(timestamps);

export default model<RecurrentEvent>('RecurrentEvent', recurrentEventSchema);
