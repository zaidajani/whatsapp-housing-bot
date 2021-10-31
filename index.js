const wa = require('@open-wa/wa-automate');
const axios = require('axios');
const url = `http://localhost:4000/`;

wa.create().then(client => start(client));

function start(client) {
  axios.get(url).then((res) => {
    const summary = res.data;
    client.onMessage(async msg => {
      await client.sendText(message.from, 'Hi, welcome to whatsapp housing.\nTo view available homes in mumbai, type 1\nTo talk to an expert, type 2\nTo sell your house, type 3.');
    });
    client.onMessage(async message => {
      if (message.body === '1') {
        await client.sendText(message.from, "Check out homes available near mumbai.")
        let i;
        for (i = 0; i < summary.length; i++) {
          const data = `${summary[i].house}, ${summary[i].state}, ${summary[i].city}, ${summary[i].address}, ${summary[i].zip}, ${summary[i].owner}, ${summary[i].phone}`
          await client.sendText(message.from, `Home ${i+1}: \n${data}`);
        }
        await client.sendText(message.from, "Thanks");
        return;
      }
      else if (message.body === '2') {
        await client.sendText(message.from, "Enter your query")
        client.onMessage(async message => {
          const query = message.body;
          const data = await axios.post(`${url}/userquery`, {query});
          await client.sendText(message.from, data.data);
        });
      }
    });
  });
}