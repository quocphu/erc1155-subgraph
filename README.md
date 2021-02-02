# Example Subgraph for erc1155
## Run the example
1. ### Start graph node
    * Change working directory to `docker`
    * Run the graph node `docker-compose up`
1. ### Deploy smart contract
    ```
    truffle build
    truffle tests tests/mint-card-for-parser-test.js 
    ```
1. ### Deploy subgraph
    Change the contract address in the file `subgraph.yaml` by the contract address from the preceded step.

    ```
    yarn codegen
    yarn create-local
    yarn deploy-local
    ```

## Docker
The docker-compose includes many serivces for testing purpose:
* The graph node: thegraph, ipfs, postgres, thegraph-graphql
* ganache-cli run at port 8545
* pgadmin run at port 5050

## SQL

```sql
--- sgd3 is the schema name that could be changed automatically by thegraph

-- Transfer history of a address
select * 
from sgd3.transfer
where "to"='0xd4039eb67cbb36429ad9dd30187b94f6a5122215'
OR "from"='0xd4039eb67cbb36429ad9dd30187b94f6a5122215'

-- Owner count of cards
select card_id, count(*)
from sgd3.card_owner
group by card_id

-- Balance of an address
select * 
from sgd3.card_owner
where "owner" = '0xd5cc383881d6d9a7dc1891a0235e11d03cb992d3'
order by card_id
```