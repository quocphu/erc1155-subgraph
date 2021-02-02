
const Card = artifacts.require("Card");

contract("Card token", async (accounts) => {
    it("Should  mint card success", async () => {
        var token = await Card.at("0xEa2ff902dbeEECcc828757B881b343F9316752e5")
        console.log('Addresss---->: ', token.address);
        id= 11;
        amount=10
        data = Buffer.from("", "hex")
        await token.mint(accounts[1], id,amount,data)
        console.log(accounts[1]);

    })

})