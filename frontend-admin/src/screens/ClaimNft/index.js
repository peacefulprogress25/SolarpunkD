import { ethers } from "ethers";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Claim as claimJson } from "../../abi";
import CsvUploader from "../../components/CsvUploader/CsvUploader";

export default function ClaimNft() {
  const [fetchedData, setFetchedData] = useState({
    claimableAmount: null,
    getClaimableAmount: null,
    isAuthorized: null,
    isWhitelisted: null,
    owner: null,
    token: null,
  });

  const [fetchInput, setFetchInput] = useState({
    claimableAmountInput: null,
    getClaimableAmountInput: null,
    isAuthorizedInput: null,
    isWhitelistedInput: null,
  });

  const [writeInput, setWriteInput] = useState({
    authorize_address: "",
    batchWhitelistAddresses_recipients: "",
    batchWhitelistAddresses_amount: "",
    deauthorize_address: "",
    depositTokens_amount: "",
    initialize_tokenAddress: "",
    removeFromWhitelist_recipient: "",
    transferOwnership_ownerAddress: "",
    whitelistAddress_recipients: "",
    whitelistAddress_amount: "",
  });

  const handleFetchInput = (e) => {
    let { name, value } = e.target;
    setFetchInput((input) => ({ ...input, [name]: value }));
  };

  const handleWriteInput = (e) => {
    let { name, value } = e.target;
    setWriteInput((input) => ({ ...input, [name]: value }));
  };

  const claimableAmountFn = async () => {
    if (!fetchInput?.claimableAmountInput) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const amount = await contract.claimableAmount(
        fetchInput?.claimableAmountInput
      );
      console.log(amount);
      setFetchedData((data) => ({
        ...data,
        claimableAmount: amount.toString(),
      }));
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const getClaimableAmountFn = async () => {
    if (!fetchInput?.getClaimableAmountInput) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const amount = await contract.getClaimableAmount(
        fetchInput?.getClaimableAmountInput
      );
      console.log(amount);
      setFetchedData((data) => ({
        ...data,
        getClaimableAmount: amount.toString(),
      }));
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const isAuthorizedFn = async () => {
    if (!fetchInput?.isAuthorizedInput) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.isAuthorized(fetchInput?.isAuthorizedInput);
      console.log(result);
      setFetchedData((data) => ({ ...data, isAuthorized: result.toString() }));
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };
  const isWhitelistedFn = async () => {
    if (!fetchInput?.isWhitelistedInput) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.isWhitelisted(
        fetchInput?.isWhitelistedInput
      );
      console.log(result);
      setFetchedData((data) => ({ ...data, isWhitelisted: result.toString() }));
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };
  const ownerFn = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.owner();
      console.log(result);
      setFetchedData((data) => ({ ...data, owner: result }));
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };
  const tokenFn = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.token();
      console.log(result);
      setFetchedData((data) => ({ ...data, token: result }));
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const authorizeFn = async () => {
    if (!writeInput?.authorize_address) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.authorize(writeInput?.authorize_address);
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const batchWhitelistFn = async () => {
    if (
      !writeInput?.batchWhitelistAddresses_amount ||
      !writeInput?.batchWhitelistAddresses_recipients
    ) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Amount = JSON.parse(writeInput?.batchWhitelistAddresses_amount);

    Amount.map((item) => ethers.utils.parseUnits(item, "ether"));

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.batchWhitelistAddresses(
        JSON.parse(writeInput?.batchWhitelistAddresses_recipients),
        Amount
      );
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const claimTokensFn = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.claimTokens();
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const deauthorizeFn = async () => {
    if (!writeInput?.deauthorize_address) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.deauthorize(
        writeInput?.deauthorize_address
      );
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const depositTokensFn = async () => {
    if (!writeInput?.depositTokens_amount) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Amount = ethers.utils.parseUnits(
      writeInput?.depositTokens_amount,
      "ether"
    );

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.depositTokens(Amount);
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const initializeFn = async () => {
    if (!writeInput?.initialize_tokenAddress) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.initialize(
        writeInput?.initialize_tokenAddress
      );
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const removeFromWhitelistFn = async () => {
    if (!writeInput?.removeFromWhitelist_recipient) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.removeFromWhitelist(
        writeInput?.removeFromWhitelist_recipient
      );
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };
  const transferOwnershipFn = async () => {
    if (!writeInput?.transferOwnership_ownerAddress) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.transferOwnership(
        writeInput?.transferOwnership_ownerAddress
      );
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const renounceOwnershipFn = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.renounceOwnership();
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const whitelistAddressFn = async () => {
    if (
      !writeInput?.whitelistAddress_amount ||
      !writeInput?.whitelistAddress_recipients
    ) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Amount = ethers.utils.parseUnits(
      writeInput?.whitelistAddress_amount,
      "ether"
    );

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.whitelistAddress(
        writeInput?.whitelistAddress_recipients,
        Amount
      );
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const handleFile = (data) => {
    try {
      if (!data.length) {
        return;
      }

      let addresses = [];
      let amount = [];

      for (let i in data) {
        addresses.push(data[i]?.["0"]);
        amount.push(data[i]?.["1"]);
      }
      setWriteInput((input) => ({
        ...input,
        batchWhitelistAddresses_recipients: JSON.stringify(addresses),
        batchWhitelistAddresses_amount: JSON.stringify(amount),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className='singlePage'
      style={{
        marginTop: "100px",
        position: "absolute",
        right: "400px",
        width: "500px",
      }}
    >
      <CssBaseline />
      <Typography variant='h5' style={{ fontWeight: "600" }}>
        Claim
      </Typography>

      <>
        <p className='steps'> Claimable Amount</p>
        <TextField
          required
          fullWidth
          label='Recipient Address'
          placeholder='Recipient Address'
          variant='filled'
          helperText='Recipient Address'
          value={fetchInput.claimableAmountInput}
          onChange={handleFetchInput}
          name='claimableAmountInput'
        />
        <Typography
          variant='h6'
          style={{ fontWeight: "400", textAlign: "left" }}
        >
          Result : {fetchedData.claimableAmount}
        </Typography>
        <Button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            marginBottom: "30px",
          }}
          onClick={claimableAmountFn}
        >
          Claimable Amount
        </Button>

        <p className='steps'> Get Claimable Amount</p>
        <TextField
          required
          fullWidth
          label='Address'
          placeholder='Address'
          variant='filled'
          helperText='Address'
          value={fetchInput.getClaimableAmountInput}
          onChange={handleFetchInput}
          name='getClaimableAmountInput'
        />

        <Typography
          variant='h6'
          style={{ fontWeight: "400", textAlign: "left" }}
        >
          Result : {fetchedData.getClaimableAmount}
        </Typography>

        <Button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            marginBottom: "30px",
          }}
          onClick={getClaimableAmountFn}
        >
          Get Claimable Amount
        </Button>

        <p className='steps'> isAuthorized</p>
        <TextField
          required
          fullWidth
          label='Address'
          placeholder='Address'
          variant='filled'
          helperText='Address'
          value={fetchInput.isAuthorizedInput}
          onChange={handleFetchInput}
          name='isAuthorizedInput'
        />
        <Typography
          variant='h6'
          style={{ fontWeight: "400", textAlign: "left" }}
        >
          Result : {fetchedData.isAuthorized}
        </Typography>
        <Button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            marginBottom: "30px",
          }}
          onClick={isAuthorizedFn}
        >
          isAuthorized
        </Button>

        <p className='steps'> isWhitelisted</p>
        <TextField
          required
          fullWidth
          label='Address'
          placeholder='Address'
          variant='filled'
          helperText='Address'
          value={fetchInput.isWhitelistedInput}
          onChange={handleFetchInput}
          name='isWhitelistedInput'
        />

        <Typography
          variant='h6'
          style={{ fontWeight: "400", textAlign: "left" }}
        >
          Result : {fetchedData.isWhitelisted}
        </Typography>
        <Button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            marginBottom: "30px",
          }}
          onClick={isWhitelistedFn}
        >
          isWhitelisted
        </Button>

        <div className='variable-display'>
          <div
            className='variable-display-titles'
            style={{ width: "fit-content" }}
          >
            <div className='variable-display-title'>
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={ownerFn}
              >
                Owner
              </Button>
            </div>
            <div className='variable-display-title'>
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={tokenFn}
              >
                Token
              </Button>
            </div>
          </div>
          <div className='variable-display-values'>
            <div className='variable-display-value'>
              <Typography
                variant='h6'
                style={{ fontWeight: "200", fontSize: "13px" }}
              >
                {fetchedData.owner ? `${fetchedData.owner}` : ""}
              </Typography>
            </div>

            <div className='variable-display-value'>
              {" "}
              <Typography
                variant='h6'
                style={{ fontWeight: "200", fontSize: "13px" }}
              >
                {fetchedData.token ? `${fetchedData.token}` : ""}
              </Typography>
            </div>
          </div>
        </div>

        {/* <p className='heading'>
          Presale Contract :{" "}
          <i> Adding as Mint to EarthERC20Token and increaseing </i>
        </p> */}
        <p className='steps'>1. authorize (0xb6a5d7de)</p>
        <TextField
          required
          fullWidth
          label='authorize address'
          placeholder='authorize address'
          variant='filled'
          helperText='authorize address'
          name='authorize_address'
          value={writeInput.authorize_address}
          onChange={handleWriteInput}
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={authorizeFn}
        >
          Authorize
        </Button>

        <p className='steps'>2.batchWhitelistAddresses (0x8b98f3a5) </p>
        <TextField
          required
          fullWidth
          label='recipient address'
          placeholder='recipient address'
          variant='filled'
          helperText='recipient address'
          value={writeInput.batchWhitelistAddresses_recipients}
          name='batchWhitelistAddresses_recipients'
          onChange={handleWriteInput}
        />

        <TextField
          required
          fullWidth
          label='Amount'
          placeholder='Amount'
          variant='filled'
          helperText='Amount'
          value={writeInput.batchWhitelistAddresses_amount}
          name='batchWhitelistAddresses_amount'
          onChange={handleWriteInput}
        />
        <br />

        <CsvUploader handleFile={handleFile} />
        <br />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={batchWhitelistFn}
        >
          Batch whitelist addresses
        </Button>
        <br />
        <br />
        <p className='steps'>3. claimTokens (0x48c54b9d)</p>
        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={claimTokensFn}
        >
          Claim
        </Button>
        <br />
        <br />
        <p className='steps'>4.Deauthorize (0xb6a5d7de)</p>
        <TextField
          required
          fullWidth
          label='deauthorize address'
          placeholder='deauthorize address'
          variant='filled'
          helperText='deauthorize address'
          name='deauthorize_address'
          value={writeInput.deauthorize_address}
          onChange={handleWriteInput}
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={deauthorizeFn}
        >
          Deauthorize
        </Button>

        <p className='steps'>5.depositTokens (0xdd49756e)</p>
        <TextField
          required
          fullWidth
          label='amount'
          placeholder='amount'
          variant='filled'
          helperText='amount'
          name='depositTokens_amount'
          value={writeInput.depositTokens_amount}
          onChange={handleWriteInput}
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={depositTokensFn}
        >
          Deposit Tokens
        </Button>

        <p className='steps'>6.initialize (0xc4d66de8)</p>
        <TextField
          required
          fullWidth
          label='token address'
          placeholder='token address'
          variant='filled'
          helperText='token address'
          name='initialize_tokenAddress'
          value={writeInput.initialize_tokenAddress}
          onChange={handleWriteInput}
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={initializeFn}
        >
          Initialize
        </Button>

        <p className='steps'>7. removeFromWhitelist(0x8ab1d681)</p>
        <TextField
          required
          fullWidth
          label='recipient address'
          placeholder='recipient address'
          variant='filled'
          helperText='recipient address'
          name='removeFromWhitelist_recipient'
          value={writeInput.removeFromWhitelist_recipient}
          onChange={handleWriteInput}
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={removeFromWhitelistFn}
        >
          Remove from whitelist
        </Button>
        <br />
        <br />
        <p className='steps'>8. renounceOwnership (0x715018a6)</p>
        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={renounceOwnershipFn}
        >
          renounceOwnership
        </Button>
        <br />
        <br />

        <p className='steps'>9. transferOwnership (0xf2fde38b)</p>
        <TextField
          required
          fullWidth
          label='newOwner address'
          placeholder='newOwner address'
          variant='filled'
          helperText='newOwner address'
          name='transferOwnership_ownerAddress'
          value={writeInput.transferOwnership_ownerAddress}
          onChange={handleWriteInput}
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={transferOwnershipFn}
        >
          Transfer Ownership
        </Button>

        <p className='steps'>10. whitelistAddress (0x200c7295)</p>
        <TextField
          required
          fullWidth
          label='recipient address'
          placeholder='recipient address'
          variant='filled'
          helperText='recipient address'
          value={writeInput.whitelistAddress_recipients}
          name='whitelistAddress_recipients'
          onChange={handleWriteInput}
        />

        <TextField
          required
          fullWidth
          label='Amount'
          placeholder='Amount'
          variant='filled'
          helperText='Amount'
          value={writeInput.whitelistAddress_amount}
          name='whitelistAddress_amount'
          onChange={handleWriteInput}
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={whitelistAddressFn}
        >
          Whitelist address
        </Button>
        <br />
        <br />
      </>
    </div>
  );
}
