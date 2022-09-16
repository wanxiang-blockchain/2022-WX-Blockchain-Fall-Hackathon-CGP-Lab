let NFTStorage = require('nft.storage');
const STORAGE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIzNkM5MTlDN2I3OWM4MDEzNGQyZDRmOTAyZWQ5OWU5ODU2RTBBQmUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MzE1MjMzNzA0MiwibmFtZSI6InRlc3QifQ.fZCrXT1Lgs-rID8JHqMZkOrM0HJyLS9hh5phEbvCnpA";
const nftstorage_key = STORAGE_TOKEN;
function GetAccessToken() {
  return nftstorage_key;
}

function MakeStorageClient() {
  // console.log(GetAccessToken() )
  return new NFTStorage.NFTStorage({ token: GetAccessToken() });
}

async function StoreContent(image, name, description) {
  console.log("Uploading files to IPFS with nft.storage....");
  const client = MakeStorageClient();
  const result = await client.store({
    image,
    name,
    description,
  });
  console.log("Stored files with result:", result);
  return result;
}

module.exports = {
  StoreContent
};