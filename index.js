/*global generateResponse */
/*global buildSpeechletResponse */



/*global json_decode*/
/*global file_get_contents*/


exports.handler = (event, context) => {
    // TODO implement
    //New Session
try {
    
    if (event.session.new) {
        console.log("New Session");
        }    
//var url = "https://btc-e.com/api/2/btc_usd/ticker";
//var json = json_decode(file_get_contents(url), true);
//var price = json["ticker"]["last"];
    switch (event.request.type) {
    // > Launch Request
        case "LaunchRequest":
            console.log('LAUNCH REQUEST');
            context.succeed(
            generateResponse(buildSpeechletResponse('Miu is scared of Shumba', true),
            {}));
            break;
    // > Intent Request
        case "IntentRequest":
            console.log('INTENT REQUEST');
            break;
    // > Session Ended Request
        case "SessionEndedRequest": 
            console.log('SESSION ENDED REQUEST');
            break;
        default:
            context.fail('INVALED REQUEST TYPE ${event.request.type}');
        }
    }catch(error) {context.fail('Exception: ${error}')}
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
