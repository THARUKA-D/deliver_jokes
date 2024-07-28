const { connection: MySqlDbConnection } = require("../utils/db");

const fetchJoke = async (_, res) => {
  MySqlDbConnection
    .promise()
    .query(`SELECT j.Joke, j.Delivery, jt.JokeType
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
    .catch(() => {
      res.status(500).send({
        success: false,
      });
    })
}

const jokeTypes = async (_, res) => {
  MySqlDbConnection
    .promise()
    .query('SELECT * FROM JokeTypes;')
    .then(([rows, _]) => {
      res.status(200).send({
        success: true,
        data: rows
      });
    })
    .catch(()=>{
      res.status(500).send({
        success: false,
      });
    }) 
}

const addJoke = async (req, res) => {
  const {
    isCustomJoke,
    jokeTypeId,
    customJokeType,
    joke,
    jokeDelivery
  } = req.body;

  let newTypeId;

  if (isCustomJoke) {
    MySqlDbConnection
      .promise()
      .execute(`INSERT INTO JokeTypes (JokeType)
      VALUES (?);`, [customJokeType])
      .then(([rows, _]) => {
        newTypeId = rows.insertId;
      })
      .catch(() => {
        res.status(500).send({
          success: false,
        });
      })
  }

  MySqlDbConnection
    .promise()
    .execute(`INSERT INTO Jokes (Joke, Delivery, JokeTypeId)
      VALUES (?, ?, ?);`, [joke, jokeDelivery, isCustomJoke ? newTypeId : jokeTypeId])
    .then(() => {
      res.status(200).send({
        success: true,
      });
    })
    .catch(() => {
      res.status(500).send({
        success: false,
      });
    })
}

module.exports = {
  fetchJoke,
  jokeTypes,
  addJoke
}
