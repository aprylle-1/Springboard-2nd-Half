/** User class for message.ly */

const db = require("../db");
const { DB_URI } = require("../config");
const bcrypt = require('bcrypt')
const {BCRYPT_WORK_FACTOR} = require('../config')
/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) {
    const join_at = new Date (Date.now()).toISOString()
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const results = await db.query(`
      INSERT INTO users
      (username, password, first_name, last_name, phone, join_at, last_login_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING username, password, first_name, last_name, phone;`
      ,[username, hashedPassword, first_name, last_name, phone, join_at, join_at])
    return results.rows[0]
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { 
    const results = await db.query(`SELECT password from users WHERE username = $1`,[username])
    const hashedPassword = results.rows[0]["password"]
    const is_correct_password = bcrypt.compare(password, hashedPassword)
    return is_correct_password
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const curr_date = new Date (Date.now()).toISOString()
    await db.query(`UPDATE users SET last_login_at = $1 WHERE username = $2`, [curr_date, username])
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const results = await db.query(`SELECT * FROM users;`)
    return results.rows
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const results = await db.query(`SELECT * from users WHERE username = $1`, [username])
    return results.rows[0]
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const results = await (db.query(`
        SELECT m.id, u.username, u.first_name, u.last_name, u.phone, m.body, m.sent_at, m.read_at 
        FROM messages m LEFT JOIN users u
        ON m.to_username = u.username 
        WHERE from_username = $1;`, [username]))
    return results.rows
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    const results = await db.query(`
          SELECT m.id, u.username, u.first_name, u.last_name, u.phone, m.body, m.sent_at, m.read_at
          FROM messages m LEFT JOIN users u
          ON m.from_username = u.username
          WHERE to_username = $1;`, [username])
    return results.rows;
  }
}


module.exports = User;