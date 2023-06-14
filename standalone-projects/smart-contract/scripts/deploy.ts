const { ethers, upgrades } = require('hardhat')
const fs = require('fs')
const path = require('path')

const deploy = async () => {
  const OpenIngredients = await ethers.getContractFactory('OpenIngredients')
  console.log('Deploying OpenIngredients...')
  const openIngredients = await upgrades.deployProxy(OpenIngredients, [])
  console.log('CarbonCredits deployed to:', openIngredients.address)

  fs.writeFileSync(
    path.join(__dirname, '../contractAddress.json'),
    JSON.stringify({ contractAddress: openIngredients.address }, null, 2),
  )
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

export {}
