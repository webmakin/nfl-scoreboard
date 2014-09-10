// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

if (Meteor.isClient) {
  Session.setDefault("result", [{"away_team":"example1","home_team":"example2"}]);

  Meteor.setInterval(function(){
    Meteor.call('test', function(e,r){
    console.log('polled');
     var data = EJSON.parse(r.content);
    if(!(_.isEqual(Session.get("result"), data.games))){
      console.log('notequal');
      Session.set("result", data.games);
    }
    else{
       console.log('equal');
    }
  })}, 10000);

  Meteor.call('test', function(e,r){
      // console.log("r", r);
      var data = EJSON.parse(r.content);
      Session.set("result", data.games);
      console.log("api-call",  data.games);
  });

  Template.scoreboard.result = function(){
    return Session.get("result");
  };

  Template.fullBoard.result = function(){
    var id  = Session.get("chosen");
    var data = Session.get("result");
    var result = 'This doesnt exist';
      for (var key in data) {
         var obj = data[key];
         if(obj.id==id){
           return obj;
         }
      }
    return result;  
  };

}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    
    Meteor.methods({
      test: function(){
        return HTTP.get("https://api.sportsdatallc.org/nfl-t1/2014/REG/1/boxscore.json?api_key=7kx4cmggh487nhxgbwcju7ze")
      }
    });

    // if(Games.find({}).count()==0){
    //    HTTP.get("https://api.sportsdatallc.org/nfl-t1/2014/REG/1/boxscore.json?api_key=7kx4cmggh487nhxgbwcju7ze", function(err, res){
    //     var data = EJSON.parse(res.content);
    //     Games.insert(data.games);
    //    });
    // }
  
  });
 
}


