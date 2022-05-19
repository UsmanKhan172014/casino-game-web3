<template>
  <div class="row justify-content-center mt-4">
    <div class="card">
      <div class="card-header text-center">
        <img
          width="100px"
          height="100px"
          src="https://gocbeglobal.com/Themes/GoCBE_Custom_Theme_1/assets/img/user_img_placeholder.jpg"
          class="rounded"
          alt=""
        />
      </div>

      <div class="card-body">
        <h4>Name: John Doe</h4>
        <h4>Email: john@example.com</h4>
      </div>

      <div class="card-footer text-center">
        <h4>Network: {{ web3.networkId }}</h4>
        <p>Account: {{ web3.coinbase }}</p>
        <h4>Balance:{{ web3.balance }}</h4>
        <button class="btn btn-primary">Connect Wallet</button>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      errorMessage: "",
      account:null
    };
  },

  computed: {
    ...mapGetters("web3", ["getInstance"]),
    web3() {
      return this.getInstance;
    },
  },
  methods: {
    ...mapMutations("web3", ["registerWeb3Instance"]),
    async initWeb3() {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.send("eth_requestAccounts");
          const instance = new Web3(window.ethereum);
          // Get necessary info on your node
          const networkId = await instance.eth.net.getId();
          const coinbase = await instance.eth.getCoinbase();
          const balance = await instance.eth.getBalance(coinbase);
          // Save it to store

          this.account=coinbase;
          this.registerWeb3Instance({
            networkId,
            coinbase,
            balance,
          });
          this.errorMessage = "";
        } catch (err) {
          console.error("User denied web3 access", error);
          this.errorMessage =
            "Please connect to your Ethereum address on Metamask before connecting to this website";
          return;
        }
      } else {
        console.error("No web3 provider detected");
        this.errorMessage =
          "No web3 provider detected. Did you install the Metamask extension on this browser?";
        return;
      }
    },
    async loadProfile(){
      // console.log(this.account);
      const response =await this.$axios.$post('/api/user/UserByWalletAddress',{
        walletAddress:"Testing1"
      })
      this.account=response.firstname;
      console.log(this.account)

    }
  },
  beforeMount() {
    this.initWeb3();
    this.loadProfile()
  },
};
</script>
