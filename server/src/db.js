require('dotenv');
require('mongoose')
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(connection => {
    console.log(
      `Connected to Mongo! Database name: ${connection.connections[0].name}`
    );
  })

  .catch(err => {
    console.log('Err connecting to mongo', err);
  });
