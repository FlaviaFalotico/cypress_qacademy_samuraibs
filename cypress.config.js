const { defineConfig } = require("cypress");
const { Pool } = require('pg');

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    viewportWidth: 1440,
    viewportHeight: 900,
    dbConfig: {
      host: "heffalump.db.elephantsql.com",
      user: "fczszxft",
      password: "TtkIYgN4b_XSmSmg4J1TukHBhpgPbssc",
      database: "fczszxft",
      port: 5432,
    },

    setupNodeEvents(on, config) {
      const pool = new Pool(config.dbConfig);

      on("task", {
        removeUser(email) {
          return new Promise(function (resolve) {
            pool.query(
              "DELETE FROM public.users WHERE email = $1",
              [email],
              function (error, result) {
                if (error) {
                  throw error;
                }
                resolve({ success: result });
              }
            );
          });
        },

        findToken(email) {
          return new Promise(function(resolve) {
            pool.query(
              `SELECT ut.token FROM users u INNER JOIN user_tokens ut ON u.id = ut.user_id WHERE u.email = $1 ORDER BY ut.created_at`, [email],
              function (error, result) {
                if (error) {
                  throw error;
                }
                resolve({ token: result.rows[0].token });
              }
            )
          })
        }
      });
    },
  },
});
