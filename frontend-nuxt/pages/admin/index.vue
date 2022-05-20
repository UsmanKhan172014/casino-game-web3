<template>
  <div class="container">
      <Navbar/>
    <div class="row justify-content-center">
        <div class="col-md-12 text-center">
          <h1>{{fetchedBalance}}</h1>

        </div>
    </div>
    <div class="card">
      <div class="card-body">
          <div class="form-group">
               <label>Enter the Receiver Address</label>
               <input class="form-control" type="text" v-model="receiverAddress">
          </div>
          <div class="form-group">
            <label>Enter Amount</label>
            <input class="form-control" type="text" v-model="amount">

          </div>
      </div>
    <div class="form-group text-center">
      <button @click="transfertoken()" class="btn btn-primary  ">
        Send Amount
      </button>
    </div>


    </div>
  </div>

</template>

<script>
import abi from "../../../backend/abi/tokens.json";
import { ethers } from "ethers";

export default {
  components: {

  },
  data() {
    return {
      contractAddress: "0x2c9f3d54882c7b6aa9A8F09518dFCaE6a46a2A19", // Contract Address.
      fetchedBalance: "",
      receiverAddress:"",
      amount:""
      // balance: this.balance,
    };
  },
  async mounted() {
    this.totalbalance()
    // this.transfertoken()
  },

  methods: {
    async totalbalance() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const myToken = new ethers.Contract(this.contractAddress, abi, provider);
      const balance = await myToken.balanceOf("0xE6a60007AE143532BBdd03a8D711f8e146A127F0");
      this.fetchedBalance = balance;
      console.log(balance);
    },
    async transfertoken() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.enable();
      const signer = await provider.getSigner();
      //  console.log(await provider.getSigner().getAddress())
      const myToken = new ethers.Contract(this.contractAddress, abi, signer);
      const transfer = await myToken.transfer(this.receiverAddress,this.amount);
      // await axios.post('localhost:5000/')
      console.log(transfer);
    },


  }
};
</script>
