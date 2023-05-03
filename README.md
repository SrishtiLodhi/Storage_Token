
<h1>Token Storage</h1>

<p>Token Storage is a smart contract that allows users to deposit and withdraw ERC20 tokens in a decentralized and secure way. The contract includes a capacity limit, preventing the deposit of tokens that exceed the limit.</p>

<h2>Getting Started</h2>

<h3>Prerequisites</h3>

<p>To run Token Storage, you will need:</p>

<ul>
  <li>Node.js (v12 or higher)</li>
  <li>Hardhat (v2 or higher)</li>
</ul>

<h3>Installation</h3>

<p>Clone this repository.</p>

<pre><code>git clone https://github.com/your-username/token-storage.git</code></pre>

<p>Navigate to the project directory and install the required dependencies.</p>

<pre><code>cd token-storage
npm install</code></pre>

<p>Compile the contracts.</p>

<pre><code>npx hardhat compile</code></pre>

<h2>Usage</h2>

<p>Deploy the contracts to the blockchain.</p>

<pre><code>npx hardhat run scripts/deploy.js --network &lt;network-name&gt;</code></pre>

<p>Replace &lt;network-name&gt; with the name of the network you want to deploy to (e.g., goerli).</p>

<p>Run the tests to ensure the contracts are working correctly.</p>

<pre><code>npx hardhat test --network &lt;network-name&gt;</code></pre>

<p>Replace &lt;network-name&gt; with the name of the network you want to test on.</p>

<h2>Contributing</h2>

<p>Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.</p>

<p>Please make sure to update tests as appropriate.</p>

<h2>License</h2>

<p>MIT</p>
