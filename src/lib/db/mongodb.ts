import { MongoClient, ServerApiVersion } from 'mongodb';

// For static export, we need to provide a mock client
class MockMongoClient {
  async connect() {
    return this;
  }
  
  db() {
    return {
      collection: () => ({
        find: () => ({
          toArray: () => Promise.resolve([]),
          sort: () => ({
            skip: () => ({
              limit: () => ({
                populate: () => ({
                  lean: () => Promise.resolve([])
                })
              })
            })
          })
        }),
        findOne: () => Promise.resolve(null),
        countDocuments: () => Promise.resolve(0),
        insertOne: () => Promise.resolve({ insertedId: 'mock-id' }),
        updateOne: () => Promise.resolve({ modifiedCount: 1 }),
        deleteOne: () => Promise.resolve({ deletedCount: 1 })
      })
    };
  }
}

// Check if we're in static export mode
const isStaticExport = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_BASE_URL;

// Use mock client for static export or when MongoDB URI is not provided
if (!process.env.MONGODB_URI && !isStaticExport) {
  console.warn('MongoDB URI not found, using mock client');
}

const uri = process.env.MONGODB_URI || '';
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise: Promise<MongoClient | MockMongoClient>;

if (isStaticExport || !process.env.MONGODB_URI) {
  // Use mock client for static export
  client = new MockMongoClient();
  clientPromise = Promise.resolve(client);
} else if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
