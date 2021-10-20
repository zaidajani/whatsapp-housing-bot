const wa = require('@open-wa/wa-automate');
const axios = require('axios');
const url = `http://localhost:4000/`;

wa.create().then(client => start(client));

function start(client) {
  axios.get(url).then((res) => {
    const summary = res.data;
    client.onMessage(async message => {
      if (message.body === 'Hi') {
        await client.sendText(message.from, "Hi, check out our available homes near mumbai!")
        let i;
        for (i = 0; i < summary.length; i++) {
          const data = `${summary[i].house}, ${summary[i].state}, ${summary[i].city}, ${summary[i].address}, ${summary[i].zip}, ${summary[i].owner}, ${summary[i].phone}`
          await client.sendText(message.from, `Hi \nHome ${i+1}: \n${data}`);
        }
      }
    });
  });
}