var dash_button = require('node-dash-button');
var request = require('request');
var debug = 0;
var macAdress=process.env.DASH_MAC;
var msg=process.env.MSG;
var emoticon=process.env.EMOTICON;
var token=process.env.TOKEN;
var duration=parseInt(process.env.DURATION || 5, 10);

var callEndpoint = function(m, e){
    var profileObj = {
        'status_text': m,
        'status_emoji': e
    };
    var url = 'https://slack.com/api/users.profile.set?token='+token+'&profile=' + encodeURIComponent(JSON.stringify(profileObj));
    if (debug === 1){
        console.log(url);
        console.log(JSON.stringify(profileObj))
    }
    request({
            url: url,
            method: 'POST'
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                if (debug === 1) {console.log((new Date()) + "Got response Value: " + response.statusCode);}
            }else{
                console.log((new Date()) + " - Error : "  + error + " - Status Code:" + (response ? response.statusCode : 'no response'));
            }
        });
};
console.log("Started dash button listener app", macAdress, token);
// ac:63:be:a4:5e:6b
var dash = dash_button(macAdress, null, null, "all");
dash.on("detected", function (btn){
    console.log("Button found with mac address :", btn);
    callEndpoint(msg,emoticon);
    setTimeout(function(){callEndpoint('','');}, duration * 60 * 1000);
});