import { Schema, model, Document } from 'mongoose';
import { timestamps } from 'mongoose-timestamp';

interface EventType extends Document {
  type: string;
}

const eventTypeSchema = new Schema({
  type: { type: String, unique: true },
});

eventTypeSchema.plugin(timestamps);

export default model<EventType>('EventType', eventTypeSchema);
