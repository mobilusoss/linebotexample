var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/linebot/callback', function(request, response) {
  var params = request.body;
  if (!params || !params.result){
    response.send('No params');
  } else {
    params.result.forEach(function(msg){
      var form = {};
      form.to = [msg.content.from];
      form.toChannel = 1383378250;
      form.eventType = "138311608800106203";
      form.content = {
        contentType: 1,
        toType: 1,
        text: "うるせー"
      };

      var request = require('request');
      customRequest = request.defaults({'proxy': process.env.FIXIE_URL});
      customRequest.post({
        url:'https://trialbot-api.line.me/v1/events',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Line-ChannelID': process.env.LINE_CHANNEL_ID,
          'X-Line-ChannelSecret': process.env.LINE_CHANNEL_SECRET,
          'X-Line-Trusted-User-With-ACL': process.env.LINE_CHANNEL_MID
        },
        body: JSON.stringify(form)
      });
    });
    response.send('ok');
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
