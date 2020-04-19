module.exports = {
  mongoURI:'mongodb://' + (process.env.DB_HOST ? process.env.DB_HOST : 'localhost') + '/petclinic',
}
