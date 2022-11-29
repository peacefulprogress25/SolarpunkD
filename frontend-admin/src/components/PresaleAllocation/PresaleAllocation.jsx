import React, { useEffect, useState } from "react";
import { PresaleAllocation as PresaleAllocationJson } from "../../abi";
import CsvUploader from "../CsvUploader/CsvUploader";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ethers } from "ethers";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./pinata";
// import { Nft as Marketplace } from "../../abi";
import Marketplace from "./Marketplace.json";


const PresaleAllocation = () => {
  const [formParams, updateFormParams] = useState({ name: '', description: '' });
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState('');
  const [address, setAddress] = useState('');

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL)
        setFileURL(response.pinataURL);
      }
    }
    catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { name, description } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !fileURL)
      return;

    const nftJSON = {
      name, description, image: fileURL
    }

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response)
        return response.pinataURL;
      }
    }
    catch (e) {
      console.log("error uploading JSON metadata:", e)
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      updateMessage("Please wait.. uploading (upto 5 mins)")
      const tt = await signer.getAddress();
      //Pull the deployed contract instance
      let contract = new ethers.Contract(address, Marketplace.abi, signer)

      //massage the params to be sent to the create NFT request




      //actually create the NFT
      let transaction = await contract.safeMint(tt, metadataURL)
      await transaction.wait()

      alert("Successfully listed your NFT!");
      updateMessage("");
      updateFormParams({ name: '', description: '', price: '' });

    }
    catch (e) {
      alert("Upload error" + e)
    }
  }

  return (
    <div
      style={{
        marginTop: "100px",
        position: "absolute",
        right: "30vw",
        width: "700px",
      }}
    >
      <div >
        <div className="flex flex-col place-items-center mt-10" id="nftForm">
          <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <Typography variant="p" style={{ fontWeight: "500" }}>
              Nft Address
            </Typography>
            <TextField
              required
              fullWidth
              label="Nft contract address"
              placeholder="address"
              variant="filled"
              helperText="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <h3 className="text-center font-bold text-purple-500 mb-8">Upload your Nft</h3>

            <Typography variant="p" style={{ fontWeight: "500" }}>
              Nft Name
            </Typography>
            <TextField
              required
              fullWidth
              label="name"
              placeholder="Name"
              variant="filled"
              helperText="Name"
              value={formParams.name}
              onChange={e => updateFormParams({ ...formParams, name: e.target.value })}
            />
            <Typography variant="p" style={{ fontWeight: "500" }}>
              Description
            </Typography>
            <TextField
              required
              fullWidth
              label="Description"
              placeholder="Description"
              variant="filled"
              helperText="Description"
              value={formParams.description}
              onChange={e => updateFormParams({ ...formParams, description: e.target.value })}
            />

            <Typography variant="p" style={{ fontWeight: "500" }}>
              Upload Nft image
            </Typography>
            <br />
            <br />

            <div>
              <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Nft image</label>
              <input type={"file"} onChange={OnChangeFile}></input>
            </div>
            <br></br>
            <div className="text-green text-center">{message}</div>
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={listNFT}
            >
              Mint Nft
            </Button>
            {/* <button onClick={listNFT} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
              upload Nft
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PresaleAllocation;
