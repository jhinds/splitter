// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

import angular from 'angular';
import { default as contract } from 'truffle-contract'
import { default as Web3 } from 'web3';
import splitter_artifacts from '../../build/contracts/Splitter.json'

const app = angular.module('SplitterApp', []);
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const Splitter = contract(splitter_artifacts);
let accounts;
let account;

let load = () => {
  return web3.eth.getAccounts((err, accs) => {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure Your Ethereum Client is Running.");
      return;
    }

    accounts = accs;
    account = accounts[0];
    return account;
  })
}

load();

app.config(($locationProvider) => {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller("SplitterController",
  ['$scope', '$location', '$http', '$q', '$window', '$timeout', ($scope) => {
    Splitter.setProvider(web3.currentProvider);

    $scope.sendMoney = async (amountToSend) => {
      const splitter = await Splitter.deployed();
      const sent = await splitter.sendMoney(amountToSend, {from: account});
    }
}]);
