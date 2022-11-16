const hash = require("crypto-js/sha256");

class Block {
  constructor(preHash, data) {
    this.preHash = preHash;
    this.data = data;
    this.timeStamp = new Date();

    this.hash = this.calculateHash();
    this.mineVar = 0;
  }

  calculateHash() {
    return hash(
      this.preHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar
    ).toString();
  }

  mine(difficulty) {
    while (!this.hash.startsWith('0'.repeat(difficulty))) {
      this.mineVar++;
      this.hash = this.calculateHash();
    }
  }
}

class BlockChain {
  constructor(difficulty) {
    const genesisBlock = new Block("0000", { isGenesis: true }); // stored the first block

    this.difficulty = difficulty
    this.chain = [genesisBlock]; //stores multiple blocks
  }
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(data) {
    const lastBlock = this.getLastBlock();
    const newBlock = new Block(lastBlock.hash, data);

    newBlock.mine(this.difficulty)

    this.chain.push(newBlock);
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const preBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (preBlock.preHash !== preBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

const thinhChain = new BlockChain(4)
  thinhChain.addBlock({
    name:'Tran Hung Thinh',
    age: 17,
    position: 'Developer'
  })
console.log(thinhChain);
