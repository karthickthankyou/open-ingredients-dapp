const { ethers, upgrades } = require('hardhat')
const { contractAddress } = require('../contractAddress.json')

async function upgrade() {
  const [deployer] = await ethers.getSigners()
  console.log('Upgrading CarbonCredits with account:', deployer.address)

  const OpenIngredients = await ethers.getContractFactory('OpenIngredients')
  const openIngredients = await upgrades.upgradeProxy(
    contractAddress,
    OpenIngredients,
  )
  console.log('CarbonCredits upgraded at:', openIngredients.address)
}

upgrade()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

export {}
