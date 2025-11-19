import { NextResponse } from 'next/server';
import connectDB from '@/server/db/connection';
import mongoose from 'mongoose';

// Define a simple schema for testing
const testSchema = new mongoose.Schema({
  name: String,
  email: String,
  timestamp: { type: Date, default: Date.now }
});

// Create a model
const TestModel = mongoose.models.Test || mongoose.model('Test', testSchema);

export async function GET() {
  try {
    // Connect to database
    await connectDB();
    
    // Create dummy data
    const testData = {
      name: 'Test User',
      email: `test-${Date.now()}@example.com`
    };
    
    // Insert data
    const result = await TestModel.create(testData);
    
    // Retrieve data to verify
    const retrievedData = await TestModel.findById(result._id);
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      insertedData: result,
      retrievedData: retrievedData
    });
    
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    // Connect to database
    await connectDB();
    
    // Delete all test data
    const result = await TestModel.deleteMany({});
    
    return NextResponse.json({
      success: true,
      message: 'Test data cleaned up',
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    console.error('Cleanup failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Cleanup failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}