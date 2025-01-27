import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  student_number: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  isEmailVerified: { type: Boolean, default: false, required: true },
  playlists: [
    {
      playlist: [
        {
          lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
            required: true,
          },
          color: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

// Method to set salt and hash the password for a user
UserSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString('hex');

  // Hashing user's salt and password with 1000 iterations,
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

const User = mongoose.model('User', UserSchema);

export default User;
