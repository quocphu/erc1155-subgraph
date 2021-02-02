
const Card = artifacts.require("Card");

contract("Card token", async (accounts) => {
    it("Should  mint card success", async () => {
        var token = await Card.new("url");
        console.log('Addresss---->: ', token.address);
        id = 1
        amount = 10
        data = Buffer.from("", "hex")
        await token.mint(accounts[1], id, amount, data)
        await token.mint(accounts[2], id + 1, amount, data)

        ids = []
        amounts = []
        for (var i = 10; i < 20; i++) {
            ids.push(i)
            amounts.push(i + 10)
        }
        console.log(ids);
        console.log(amounts);
        await token.mintBatch(accounts[3], ids, amounts, data)

    })

})