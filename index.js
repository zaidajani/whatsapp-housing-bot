const wa = require('@open-wa/wa-automate');
const axios = require('axios');
const url = `http://localhost:4000/`;

wa.create().then(client => start(client));

function start(client) {
  axios.get(url).then((res) => {
    const summary = res.data;
    const data = `${summary.house}, ${summary.state}, ${summary.city}, ${summary.address}, ${summary.zip}, ${summary.owner}, ${summary.phone}`
    client.onMessage(async message => {
      if (message.body === 'Hi') {
        await client.sendText(message.from, `Hi \nAvailable homes: \n${JSON.stringify(data)}`);
        // await client.sendText(message.from, "hi");
      }
    });
  });
}