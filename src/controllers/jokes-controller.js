const { connection: MySqlDbConnection } = require("../utils/db");

const fetchJoke = async (req, res) => {
  MySqlDbConnection
    .promise()
    .query(`SELECT j.Joke, jt.JokeType
      FROM Jokes j
      INNER JOIN JokeTypes jt ON j.JokeTypeId = jt.Id
      ORDER BY RAND()
      LIMIT 1;`)
    .then(([rows, fields]) => {
      res.status(200).send({
        success: true,
        data: rows,
      });
    })
    .catch(console.error) // TODO: Handel errors
}

const jokeTypes = async (req, res) => {
  MySqlDbConnection
    .promise()
    .query('SELECT * FROM JokeTypes;')
    .then(([rows, fields]) => {
      res.status(200).send({
        success: true,
      });
    })
    .catch(console.error)
}

const addJoke = async (req, res) => {
  MySqlDbConnection
    .promise()
    .execute(`INSERT INTO Jokes (Joke, Delivery, JokeTypeId)
      VALUES (?, ?, ?);`,['What kind of motorbike does Santa ride?', "A Holly Davidson!", 2]) // TODO: values must be received from request
    .then(([rows, fields]) => {
      res.status(200).send({
        success: true,
        data: rows,
      });
    })
    .catch(console.log)
}

module.exports = {
  fetchJoke,
  jokeTypes,
  addJoke
}