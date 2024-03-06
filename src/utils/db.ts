import { log } from "console";
import { getDb } from "../lib/mongdb";

const importData = async () => {};

const deleteAllData = async () => {
  try {
    const db = getDb().db();
   const cusor =  await db.collection("list").deleteMany({})
    console.log(cusor)
  } catch (error) {
  } finally {
    console.log("delete successfully");
    
  }
};
console.log(process.argv);
if (process.argv[2].startsWith("--import")) {
  importData();


} if(process.argv[2].startsWith("--delete")) {
  deleteAllData();


}


