-include .env

.PHONY: all test deploy

build :; forge build

test:; forge test

install :; forge install cyfrin/foundry-devops@0.2.2 --no-commit && forge install smartcontractskit/chainlink-brownie-contracts@1.1.1 --no-commit && forge install foundry-rs/forge-std@v1.8.2 --no-commit && forge install transmissions11/solmate@v6 --no-commit

deploy-sepolia:
	@forge script script/DeployCrowdfunding.s.sol:DeployCrowdfunding --rpc-url $(SEPOLIA_RPC_URL) --account developmentPrivateKey --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv

deploy-amoy:
	@forge script script/DeployCrowdfunding.s.sol:DeployCrowdfunding --rpc-url $(AMOY_RPC_URL) --account developmentPrivateKey --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv
deployMatic-amoy:
	@forge script script/DeployMatic.s.sol:DeployMatic --rpc-url $(AMOY_RPC_URL) --account developmentPrivateKey --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv
mint-amoy:
	@forge script script/Interactions.s.sol:MintMatic --rpc-url $(AMOY_RPC_URL) --account developmentPrivateKey --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv