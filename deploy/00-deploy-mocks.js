const { developementChains } = require("../helper-hardhat-config")
const { ethers, network } = require("hardhat")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium, it cost 0.25 link
const GAS_PRICE_LINK = 1e9 // link per gas | calculated value based on the gas price of the chain

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]
    if (developementChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        //deploy mock contract
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks Deployed!")
        log("----------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
