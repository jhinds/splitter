var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', (accounts) => {

  var contract;
  var owner = accounts[0];
  var recipent1 = accounts[1];
  var recipent2 = accounts[2];

  beforeEach(() => {
    return Splitter.new(recipent1, recipent2, {from: owner})
    .then((instance) => {
      contract = instance;
      // is this even doing anything?
      recipent1 = recipent1;
      recipent2 = recipent2;
    });
  });

  it("should be able to send and have the balances be seen", function() {
    var ownerAmount;
    var recipent1Amount;
    var recipent2Amount;

    return contract.sendMoney({from: owner, value: 13})
      .then((_txn) => {
        return contract.accounts(recipent1);
      })
      .then((_recipent1Amount) => {
        recipent1Amount = _recipent1Amount;
        return contract.accounts(recipent2);
      })
      .then((_recipent2Amount) => {
        recipent2Amount = _recipent2Amount;
        return contract.accounts(owner);
      })
      .then((_ownerAmount) => {
        ownerAmount = _ownerAmount;
        assert.equal(recipent1Amount, 6, "Mismatch in expected funds for recipent1");
        assert.equal(recipent2Amount, 6, "Mismatch in expected funds for recipent2");
        assert.equal(ownerAmount, 1, "Mismatch in expected funds for owner");
      });
  });

  it("should allow users to withdraw money", function() {
    var startingBalance;
    var endingBalance;

    return contract.sendMoney({from: owner, value: 21})
      .then((_txn) => {
        return contract.accounts(recipent1);
        })
        .then((_recipent1Amount) => {
          startingBalance = _recipent1Amount;
          return contract.withdrawMoney({from: recipent1})
        }).then((_withdrew) => {
          return contract.accounts(recipent1);
        })
        .then((_endingBalance) => {
          endingBalance = _endingBalance;
          assert.equal(startingBalance, 10, "Mismatach for staring balance");
          assert.equal(endingBalance, 0, "Should have no funds in balance");
          return;
        });
  });

});
