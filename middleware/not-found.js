const notFound = (req, res) => {
  return res.status(404).send('Page not found Ejiro!')
}

module.exports = notFound
