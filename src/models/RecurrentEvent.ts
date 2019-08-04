import { Schema, model, Document, Types } from 'mongoose';
import { timestamps } from 'mongoose-timestamp';

const { ObjectId } = Schema.Types.ObjectId;
const { Any } = Schema.Types.Mixed;

interface RecurrentEvent extends Document {
  eventTypeId: Types.ObjectId;
  name: string;
  lastOccurred: string;
  occursEvery: string;
  occurDate: string;
  nextOccurrance: string;
  origin: Origin;
  target: Target;
  meta: any;
}

interface Account extends Document {
  fromAccId: Types.ObjectId;
  toAccId: Types.ObjectId;
}

interface Amount extends Document {
  origin: number;
  target: number;
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
  account: {
    fromAccId: ObjectId,
    toAccId: ObjectId,
  },
  lastOccurred: String,
  occursEvery: String,
  occurDate: String,
  nextOccurrance: String,
  meta: Any,
});

recurrentEventSchema.plugin(timestamps);

export default model<RecurrentEvent>('RecurrentEvent', recurrentEventSchema);
