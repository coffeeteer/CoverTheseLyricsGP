User.update({age:sequelize.col('age')+1},{where:{id:123}})


app.put('/vote/:ip/:entry_id/:votecount/:createdAt' function(req, res) {
      console.log('JW *** app.put db select ');
      var ip = req.params.ip;
      var entry_id = req.params.entry_id;
      var votecount = req.params.votecount;
      var created = req.params.created


      contestantVotes.findOne({
          where: {
            ip: ip,
            entry_id: entry_id,
            createdAt:createdAt
            
          }
      }).then(function(result) {
          return res.json(result);
      });
//     .then(function(result) {
//console.log('here is your result:',result);
//     res.send(result)   
//});

 });