import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI");
}

declare global {
  // eslint-disable-next-line no-var
  var _anime4uMongoPromise: Promise<MongoClient> | undefined;
}

const clientPromise =
  global._anime4uMongoPromise ??
  new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  global._anime4uMongoPromise = clientPromise;
}

export default clientPromise;