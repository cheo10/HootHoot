function wiki(req,res){
  console.log('POPPP');
  res.json({ text: '[:frame:]https://en.wikipedia.org/wiki/Special:Search/' + req.body.searchTerm + '[:frame:]' });
}

module.exports = wiki;