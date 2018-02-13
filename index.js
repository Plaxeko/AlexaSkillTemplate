/*global generateResponse */
/*global buildSpeechletResponse */
var https = require('https');
exports.handler = (event, context) => {
    //New Session
try {
    
    if (event.session.new) {
        console.log("New Session");
        }    
    switch (event.request.type) {
    // > Launch Request
        case "LaunchRequest":
            console.log('LAUNCH REQUEST');
            context.succeed(
            generateResponse(buildSpeechletResponse('Welcome to, AHHHHH the price of bitcoin is falling. Should I tell you when bitcoin drops by 1000?', true),
            {}));
            break;
    // > Intent Request
        case "IntentRequest":
            console.log('INTENT REQUEST');
            switch(event.request.intent.name){
                case "GetCurrentValue":
                var endpoint = "https://api.coindesk.com/v1/bpi/currentprice.json";
                var body = "";
                https.get(endpoint, (response) => {
                    response.on('data', (chunk) => {body += chunk});
                    response.on('end', () => {
                        var data = JSON.parse(body);
                        var currentBTCprice = data.bpi.USD.rate_float;
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`The Current bitcoin price is ${currentBTCprice}`, true),
                                {}
                                )
                            );
                        });
                    });
            break;
            default:
            throw "Invalid intent";
            }
            break;
    // > Session Ended Request
        case "SessionEndedRequest": 
            console.log('SESSION ENDED REQUEST');
            break;
        default:
            context.fail(`INVALED REQUEST TYPE ${event.request.type}`);
        }
    }catch(error) {context.fail(`Exception: ${error}`)}
};



//helper
buildSpeechletResponse = (outputText, shouldEndSession) => {
    return {
        outputSpeech: {
            type: "PlainText",
            text:outputText
        },
        shouldEndSession: shouldEndSession
    };
};
generateResponse = (speechletResponse, sessionAttributes) => {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
};
