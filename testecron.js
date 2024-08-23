const cron = require('node-cron');





cron.schedule('*/1 * * * *', async function() {
   fetch('http://localhost:3000/wake',)
   .then(response=>{console.log('fetch bem sucedido')})
   .catch(err =>{console.log('deu erro'+ err)}) 
});