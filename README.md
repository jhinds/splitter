# truffle-init-webpack
Example webpack project with Truffle. Includes contracts, migrations, tests, user interface and webpack build pipeline.

## Usage

To initialize a project with this example, run `truffle init webpack` inside an empty directory.

## Building and the frontend

1. First run `truffle compile`, then run `truffle migrate` to deploy the contracts onto your network of choice (default "development").
1. Then run `npm run dev` to build the app and serve it on http://localhost:8080

## Possible upgrades

* Use the webpack hotloader to sense when contracts or javascript have been recompiled and rebuild the application. Contributions welcome!

## Common Errors

* **Error: Can't resolve '../build/contracts/MetaCoin.json'**

This means you haven't compiled or migrated your contracts yet. Run `truffle compile` and `truffle migrate` first.

Full error:

```
ERROR in ./app/main.js
Module not found: Error: Can't resolve '../build/contracts/MetaCoin.json' in '/Users/tim/Documents/workspace/Consensys/test3/app'
 @ ./app/main.js 11:16-59
```


# SPLITTER

You will create a smart contract named Splitter whereby:

- there are 3 people: Alice, Bob and Carol
- we can see the balance of the Splitter contract on the web page
- whenever Alice sends ether to the contract, half of it goes to Bob and the other half to Carol
- we can see the balances of Alice, Bob and Carol on the web page
we can send ether to it from the web page
- It would be even better if you could team up with different people impersonating Alice, Bob and Carol, all cooperating on a test net.

Stretch goals:

- add a kill switch to the whole contract
- make the contract a utility that can be used by David, Emma and anybody with an address
- cover potentially bad input data


# UI
```
mkdir -p app/js
touch app/js/app.js
npm install create-html --save-dev
./node_modules/.bin/create-html \
  --title "Transfer MetaCoins" \
  --script "js/app.js" \
  --output app/index.html

```
