## Telegraph.network

Deployed to https://frozen-beyond-32806.herokuapp.com/ without web3JS
<br>

### Idea
Build an IPFS storage based blog that is powered by CloudFlare IPFS. The storage will be decentralized, however the hash of the content will be stored in a Smart Contract with the title. This title will be fetched by web3 in the React frontend, and clicking on the title will take you to a SPA that serves the IPFS content via Cloudflare Gateway and parses the markdown. When the reader clicks on "tip", the tip is sent to the owner of the smart contract.

![Rough Idea](https://i.imgur.com/lK3snRz.png)

### Why use IPFS?
>To store Ethereum’s 38 page PDF yellow paper (520Kb) = $4472 USD. See: http://eth-converter.com/ for conversions.

IPFS can also help you be anonymous. It is also decentralized, thus tamper proof.

<hr>


# How do I plan to implement it?
<ul>
<li>Frontend where you write the Blog in Markdown
<li>The markdown file is then pushed to ipfs using the ipfs module on NPM.
<li>The hash value is returned to the user, and then added to the smart contract, additionally, the title is also added to the smart contract.
<li>The Smart Contract is now listed on a page, when clicked, will redirect to gateway/ipfs/hashValue.
<li>User must have IPFS daemon running.
<li>Upon tipping, the tip value is transferred to the owner of the Smart Contract.
</ul>
<hr>

# Progress <br>
1. Completed editor, file pushes to IPFS<br>
2. Connected to Ethereum Testnet<br>
3. Developed a express app to do all that<br>
4. Can list from Smart Contract<br>





Paper Can be found [here](https://www.researchgate.net/publication/344692172_EthJourn_A_framework_for_incentive-driven_decentralized_journalism_network_on_Blockchain_and_P2P_storage).
