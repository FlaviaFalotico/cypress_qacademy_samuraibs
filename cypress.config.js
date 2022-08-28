const { defineConfig } = require("cypress");
const { Pool } = require('pg');

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    viewportWidth: 1440,
    viewportHeight: 900,

    setupNodeEvents(on, config) {
      const pool = new Pool({
        host: "heffalump.db.elephantsql.com",
        user: "fczszxft",
        password: "TtkIYgN4b_XSmSmg4J1TukHBhpgPbssc",
        database: "fczszxft",
        port: 5432,
      });

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
      });
    },
  },
});
