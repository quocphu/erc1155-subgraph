
const Card = artifacts.require("Card");

contract("Card token", async (accounts) => {
    it("Should  mint card success", async () => {
        var token = await Card.at("0xEa2ff902dbeEECcc828757B881b343F9316752e5")
        console.log('Addresss---->: ', token.address);
        id = 11
        amount = 9
        data = Buffer.from("", "hex")

        await token.safeTransferFrom(accounts[1], accounts[4], id, amount, data, { from: accounts[1] })
        console.log('Transfer from ', accounts[1] + '-->' + accounts[4]);
    })

})