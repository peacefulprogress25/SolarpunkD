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
// import { Nft as Soulbound } from "../../abi";
import Soulbound from "../../abi/SoulBound.json";

const PresaleAllocation = () => {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
  });
  const [updateformParams, updateUpdateFormParams] = useState({
    name: "",
    description: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const [updatefileURL, setupdateFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const [updatemessage, updateupdateMessage] = useState("");
  const [address, setAddress] = useState("");
  const [tokenid, setTokenid] = useState("");
  const [uri, setUri] = useState("");

  //This function uploads the NFT image to IPFS
  // async function OnChangeFile(e) {
  //   var file = e.target.files[0];
  //   updateMessage(
  //     "Wait Mint button with be enabled after the image is uploaded to IPFS"
  //   );
  //   //check for file extension
  //   try {
  //     //upload the file to IPFS
  //     const response = await uploadFileToIPFS(file);
  //     if (response.success === true) {
  //       console.log("Uploaded image to Pinata: ", response.pinataURL);
  //       setFileURL(response.pinataURL);
  //       updateMessage("image uploaded to IPFS you can mint Now");
  //     }
  //   } catch (e) {
  //     console.log("Error during file upload", e);
  //   }
  // }
  // async function OnupdateChangeFile(e) {
  //   var file = e.target.files[0];
  //   updateupdateMessage(
  //     "Wait update button with be enabled after the image is uploaded to IPFS"
  //   );
  //   //check for file extension
  //   try {
  //     //upload the file to IPFS
  //     const response = await uploadFileToIPFS(file);
  //     if (response.success === true) {
  //       console.log("Uploaded image to Pinata: ", response.pinataURL);
  //       setupdateFileURL(response.pinataURL);
  //       updateupdateMessage("image uploaded to IPFS");
  //     }
  //   } catch (e) {
  //     console.log("Error during file upload", e);
  //   }
  // }
  // async function updateMetadataToIPFS() {
  //   const { name, description } = updateformParams;
  //   //Make sure that none of the fields are empty
  //   if (!name || !description || !updatefileURL) return;

  //   const nftJSON = {
  //     name,
  //     description,
  //     image: updatefileURL,
  //   };

  //   try {
  //     //upload the metadata JSON to IPFS
  //     const response = await uploadJSONToIPFS(nftJSON);
  //     if (response.success === true) {
  //       console.log("Uploaded JSON to Pinata: ", response);
  //       return response.pinataURL;
  //     }
  //   } catch (e) {
  //     console.log("error uploading JSON metadata:", e);
  //   }
  // }

  // async function updateuri(e) {
  //   e.preventDefault();
  //   if (typeof window.ethereum !== undefined) {
  //     //Upload data to IPFS
  //     try {
  //       const metadataURL = await updateMetadataToIPFS();
  //       //After adding your Hardhat network to your metamask, this code will get providers and signers
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       // updateMessage("Please wait.. uploading (upto 5 mins)")
  //       const tt = await signer.getAddress();
  //       //Pull the deployed contract instance
  //       let contract = new ethers.Contract(address, Soulbound.abi, signer);

  //       //massage the params to be sent to the create NFT request

  //       //actually create the NFT
  //       let transaction = await contract.updateMetaData(tokenid, metadataURL);
  //       await transaction.wait();

  //       alert("Successfully update  NFT Metadata !");
  //       updateUpdateFormParams({ name: "", description: "", price: "" });
  //     } catch (e) {
  //       console.log(e);
  //       alert("transaction fail this is the trxhash   " + e.transactionHash);

  //       // alert("Upload error" + e);
  //     }
  //   }
  // }

  //This function uploads the metadata to IPFS
  // async function uploadMetadataToIPFS() {
  //   const { name, description } = formParams;
  //   //Make sure that none of the fields are empty
  //   if (!name || !description || !fileURL) return;

  //   const nftJSON = {
  //     name,
  //     description,
  //     image: fileURL,
  //   };

  //   try {
  //     //upload the metadata JSON to IPFS
  //     const response = await uploadJSONToIPFS(nftJSON);
  //     if (response.success === true) {
  //       console.log("Uploaded JSON to Pinata: ", response);
  //       return response.pinataURL;
  //     }
  //   } catch (e) {
  //     console.log("error uploading JSON metadata:", e);
  //   }
  // }

  async function safeMint(e) {
    e.preventDefault();
    if (typeof window.ethereum !== undefined) {
      //Upload data to IPFS
      try {
        // const metadataURL = await uploadMetadataToIPFS();
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // updateMessage("Please wait.. uploading (upto 5 mins)")
        const tt = await signer.getAddress();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(
          Soulbound.address,
          Soulbound.abi,
          signer
        );

        //massage the params to be sent to the create NFT request

        //actually create the NFT
        let transaction = await contract.safeMint();
        await transaction.wait();

        alert("Successfully Minted!");
        updateFormParams({ name: "", description: "", price: "" });
      } catch (e) {
        console.log(e);
        alert("transaction fail this is the trxhash   " + e.transactionHash);

        // alert("Upload error" + e);
      }
    }
  }

  async function addToWhitelist(e) {
    e.preventDefault();
    if (typeof window.ethereum !== undefined) {
      //Upload data to IPFS
      try {
        //  const metadataURL = await uploadMetadataToIPFS();
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // updateMessage("Please wait.. uploading (upto 5 mins)")
        const tt = await signer.getAddress();

        //Pull the deployed contract instance
        console.log(Soulbound.abi);
        let contract = new ethers.Contract(
          Soulbound.address,
          Soulbound.abi,
          signer
        );
        console.log(contract);
        //massage the params to be sent to the create NFT request

        //actually create the NFT
        let transaction = await contract.addToWhiteList(address);
        await transaction.wait();

        alert("Successfully whitelisted!");
        //  updateFormParams({ name: "", description: "", price: "" });
      } catch (e) {
        console.log(e, "test");
        console.log("test2");
        alert("transaction fail this is the trxhash   " + e.transactionHash);

        // alert("Upload error" + e);
      }
    }
  }

  async function updateUri(e) {
    e.preventDefault();
    if (typeof window.ethereum !== undefined) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(
          Soulbound.address,
          Soulbound.abi,
          signer
        );

        let transaction = await contract.updateUri(uri);
        await transaction.wait();
      } catch (e) {
        console.log(e);
        alert("transaction fail this is the trxhash   " + e.transactionHash);
      }
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
      <div>
        <div className='flex flex-col place-items-center mt-10' id='nftForm'>
          <form className='bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4'>
            {/* <Typography variant='p' style={{ fontWeight: "500" }}>
              Nft Address
            </Typography>
            <TextField
              required
              fullWidth
              label='Nft contract address'
              placeholder='address'
              variant='filled'
              helperText='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <h3 className='text-center font-bold text-purple-500 mb-8'>
              Upload your Nft
            </h3>

            <Typography variant='p' style={{ fontWeight: "500" }}>
              Nft Name
            </Typography>
            <TextField
              required
              fullWidth
              label='name'
              placeholder='Name'
              variant='filled'
              helperText='Name'
              value={formParams.name}
              onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }
            />
            <Typography variant='p' style={{ fontWeight: "500" }}>
              Description
            </Typography>
            <TextField
              required
              fullWidth
              label='Description'
              placeholder='Description'
              variant='filled'
              helperText='Description'
              value={formParams.description}
              onChange={(e) =>
                updateFormParams({ ...formParams, description: e.target.value })
              }
            />

            <Typography variant='p' style={{ fontWeight: "500" }}>
              Upload Nft image
            </Typography>
            <br />
            <br />

            <div>
              <label
                className='block text-purple-500 text-sm font-bold mb-2'
                htmlFor='image'
              ></label>
              <input type={"file"} onChange={OnChangeFile}></input>
            </div>
            <br></br>
            <div className='text-green text-center'>{message}</div>
            <br></br>
            <br></br>
            <br></br>
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={listNFT}
              disabled={!fileURL}
            >
              Mint Nft
            </Button> */}
            {/* <button onClick={listNFT} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
              upload Nft
            </button> ddd*/}
            {/* 
            <br />
            <br />
            <br />
            <br />
            <Typography variant='p' style={{ fontWeight: "500" }}>
              Nft ID to update uri of
            </Typography>
            <TextField
              required
              fullWidth
              label='NFT Id'
              placeholder='NFT Id'
              variant='filled'
              helperText='Nft Id'
              value={tokenid}
              onChange={(e) => setTokenid(e.target.value)}
            />
            <Typography variant='p' style={{ fontWeight: "500" }}>
              Nft Name
            </Typography>
            <TextField
              required
              fullWidth
              label='name'
              placeholder='Name'
              variant='filled'
              helperText='Name'
              value={updateformParams.name}
              onChange={(e) =>
                updateUpdateFormParams({
                  ...updateformParams,
                  name: e.target.value,
                })
              }
            />
            <Typography variant='p' style={{ fontWeight: "500" }}>
              Description
            </Typography>
            <TextField
              required
              fullWidth
              label='Description'
              placeholder='Description'
              variant='filled'
              helperText='Description'
              value={updateformParams.description}
              onChange={(e) =>
                updateUpdateFormParams({
                  ...updateformParams,
                  description: e.target.value,
                })
              }
            />
            <Typography variant='p' style={{ fontWeight: "500" }}>
              Nft image
            </Typography>
            <div>
              <label
                className='block text-purple-500 text-sm font-bold mb-2'
                htmlFor='image'
              ></label>
              <input type={"file"} onChange={OnupdateChangeFile}></input>
            </div>
            <br></br>
            <div className='text-green text-center'>{updatemessage}</div>
            <br></br>
            <br></br>
            <br></br>
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={updateuri}
              disabled={!updatefileURL}
            >
              update Token uri
            </Button>
            <br />
            <br /> */}

            <div>
              <h3 className='text-center font-bold text-purple-500 mb-8'>
                Add to whitelist(0x47ee0394)
              </h3>
              <Typography variant='p' style={{ fontWeight: "500" }}>
                _add (address)
              </Typography>
              <TextField
                required
                fullWidth
                label='Wallet address'
                placeholder='address'
                variant='filled'
                helperText='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={addToWhitelist}
              >
                Whitelist
              </Button>
            </div>
            <br />
            <br />
            <div>
              <h3 className='text-center font-bold text-purple-500 mb-8'>
                Safe Mint(0x6871ee40)
              </h3>
              {/* <Typography variant='p' style={{ fontWeight: "500" }}>
                Nft Address
              </Typography> */}
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={safeMint}
              >
                Safe Mint
              </Button>
            </div>

            <br />
            <div>
              <h3 className='text-center font-bold text-purple-500 mb-8'>
                updateUri (0x570b3c6a)
              </h3>
              <Typography variant='p' style={{ fontWeight: "500" }}>
                URI
              </Typography>
              <TextField
                required
                fullWidth
                label='URI'
                placeholder='URI'
                variant='filled'
                helperText='uri'
                value={uri}
                onChange={(e) => setUri(e.target.value)}
              />
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={updateUri}
              >
                Update URI
              </Button>
            </div>

            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PresaleAllocation;
