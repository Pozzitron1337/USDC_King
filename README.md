# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# Project initialization

Create package.json
```
yarn init
```

Add depencencies
```
yarn add hardhat @openzeppelin/contracts @openzeppelin/contracts-upgradeable
```

Copy openzeppeinn project to contracts folder
```
cp -r node_modules/@openzeppelin contracts/openzeppelin
```

Run test
```
yarn run test
```

https://defillama.com/
https://docs.aave.com/developers/guides/flash-loans
https://github.com/yuichiroaoki/poly-flash/blob/main/contracts/aave/AaveFlashloan.sol
https://docs.uniswap.org/contracts/v3/guides/local-environment
https://docs.euler.finance/developers/getting-started/integration-guide#flash-loans