import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("OneMillionDollarThug", function () {

    let KingMedalNFT;
    let USDCKing;
    let OneMillionDollarThug;
    let TwoMillionDollarThug;
   
    let user;
    let kingMedalNFT;
    let usdcKing: any;
    let oneMillionDollarThug: any;
    let twoMillionDollarThug: any;

    let userAddress: any;
    let oneMillionDollarThugAddress: any;
    let twoMillionDollarThugAddress: any;
    let kingMedalNFTAddress: any;
    let usdcKingAddress: any;

    let wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    let uniswapV3SwapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
    let usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    let aaveV3PoolAddress = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2"
    let eulerFlashLoanAddress = "0x07df2ad9878F8797B4055230bbAE5C808b8259b3"


    describe("Deployment", function () {
        it("Should delploy and set up contracts", async function () {


            KingMedalNFT = await ethers.getContractFactory("KingMedalNFT");
            USDCKing = await ethers.getContractFactory("USDCKing");
            OneMillionDollarThug = await ethers.getContractFactory("OneMillionDollarThug");
            TwoMillionDollarThug = await ethers.getContractFactory("TwoMillionDollarThug");
       
            kingMedalNFT = await KingMedalNFT.deploy();
            kingMedalNFTAddress = kingMedalNFT.address;

            usdcKing = await USDCKing.deploy(
                kingMedalNFTAddress,
                usdcAddress
            )
            usdcKingAddress = usdcKing.address;

            oneMillionDollarThug = await OneMillionDollarThug.deploy(
                usdcKingAddress,
                usdcAddress,
                aaveV3PoolAddress
            )
            oneMillionDollarThugAddress = oneMillionDollarThug.address;
                
            twoMillionDollarThug = await TwoMillionDollarThug.deploy(
                usdcKingAddress,
                usdcAddress,
                eulerFlashLoanAddress
            )
            twoMillionDollarThugAddress = twoMillionDollarThug.address;

            console.log("USDCKingAddress: ", usdcKingAddress);
            console.log("KingMedalNFTAddress: ", kingMedalNFTAddress);
            console.log("OneMillionDollarThugAddress: ", oneMillionDollarThugAddress);
            console.log("TwoMillionDollarThugAddress: ", twoMillionDollarThugAddress);


        });

        it("fund thugs with little USDC", async function () {

            const signers = await ethers.getSigners();
            user = signers[0];
            userAddress = user.address;

            let balanceBeforeETH = await ethers.provider.getBalance(userAddress);
            balanceBeforeETH = ethers.utils.formatEther(balanceBeforeETH);
            console.log(`ETH balance before swap : ${balanceBeforeETH} ETH`);
            
            const wethAbi = require("../artifacts/contracts/interfaces/UniswapV3/IWETH9.sol/IWETH9.json").abi;
            const usdcAbi = require("../artifacts/contracts/interfaces/UniswapV3/IERC20.sol/IERC20.json").abi;
            const routerAbi = require("../artifacts/contracts/interfaces/UniswapV3/ISwapRouter.sol/ISwapRouter.json").abi;

            let wethContract = await ethers.getContractAt(wethAbi, wethAddress, user);
            let usdcContract = await ethers.getContractAt(usdcAbi, usdcAddress, user);
            let swapRouterContract = await ethers.getContractAt(routerAbi, uniswapV3SwapRouterAddress, user);

            let amountIn = ethers.utils.parseEther("10");
            await wethContract.deposit({ value: amountIn.mul(2) });
            await wethContract.approve(uniswapV3SwapRouterAddress, amountIn.mul(2));

            const paramsForThug1 = {
                tokenIn: wethAddress,
                tokenOut: usdcAddress,
                fee: 3000,
                recipient: oneMillionDollarThugAddress,
                deadline: Math.floor(Date.now() / 1000) + 20*60, // 20 minutes
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            };
            
            await swapRouterContract.exactInputSingle(paramsForThug1);

            const paramsForThug2 = {
                tokenIn: wethAddress,
                tokenOut: usdcAddress,
                fee: 3000,
                recipient: twoMillionDollarThugAddress,
                deadline: Math.floor(Date.now() / 1000) + 20*60, // 20 minutes
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            };
            
            await swapRouterContract.exactInputSingle(paramsForThug2);

            let balanceAfterETH = await ethers.provider.getBalance(userAddress);
            balanceAfterETH = ethers.utils.formatEther(balanceAfterETH);
            console.log(`ETH balance after swap : ${balanceAfterETH} ETH`);

        });

    });

    describe("One million dollar thug", function () {

        it("thug should become king", async function () {

            let kingBefore = await usdcKing.king();
            console.log("King before: ", kingBefore);
            
            await oneMillionDollarThug.makeOneMillionAndBecomeKing();
            
            let kingAfter = await usdcKing.king()
            console.log("King after: ", kingAfter);

        })

    });

    describe("Two million dollar thug", function () {

        it("another thug should become king", async function () {
            
            let kingBefore = await usdcKing.king();
            console.log("King before: ", kingBefore);

            await twoMillionDollarThug.makeTwoMillionAndBecomeKing();

            let kingAfter = await usdcKing.king()
            console.log("King after: ", kingAfter);

        })
    });



});
