import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const uri = "mongodb+srv://student:student123@studentsclustor.xh6ao.mongodb.net/studentDB?retryWrites=true&w=majority&appName=Studentsclustor";

    if (!uri) {
      throw new Error('MONGODB_URL is not defined in environment variables');
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, 
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message || error);
  }
};

export default dbConnect;
