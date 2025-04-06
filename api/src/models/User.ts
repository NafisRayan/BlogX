import mongoose, { Document, Model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: Date;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  avatarUrl: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for user's full name (if needed in the future)
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Ensure virtuals are included when converting document to JSON
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc: any, ret: any) {
    delete ret._id;
    ret.id = doc._id;
    return ret;
  }
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
