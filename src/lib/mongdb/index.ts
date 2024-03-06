import { MongoClient } from "mongodb";
const uri = process.env.URL;
const client = new MongoClient(
  "mongodb+srv://Panhavorn:Panhavorn@cluster0.32xvpf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
export const connectDb = async () => {
  client
    .connect()
    .then((result) => {

      return client;
    })
    .catch((err) => console.error(err));
};
export const getDb = () => {
  return client;
};
