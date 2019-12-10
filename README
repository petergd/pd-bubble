# pd-bubble

A custom web component that can be used in web applications or websites. It provides a container for several types of messages to a user, such as "success", "error", "warning", "forbidden", "info", "help". There is also option to listen the message on browsers supporting SpeechSynthesis of the Web Speech API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

`node.js`

### Installing

`$ npm install @github/pd-bubble`

## Running the tests

`npm test`

### Tests output explanation

  pd-bubble
    canSpeak
      ✓ checks if browser can use speechSynthesis from Web Speech API, return will be true or false
    queue
      ✓ this is the messages queue it is an empty array [] upon initialization
    speechSynthesis
      ✓ loads speech synthesis utterance
    forceSpeakBubble
      ✓ check if bubble messages are enforced to be spoken upon click
    delayTime
      ✓ this is the delay time that a user can set for each bubble as a threshold in the total delay time until the bubble closes. Value should be 0 in the constructor
    bbIcons
      ✓ @font-face string containing the appropriate CSS for the icon fonts used
      ✓ check that string holds certain CSS rules relative to the @font-face declaration
    sRoot
      ✓ Checks that component is attached to DOM and is equal to <pd-bubble>
LOG LOG: 'Disconnected.'
      ✓ Checks that component is attached to DOM and has empty innerHTML
LOG LOG: 'Disconnected.'
    initSpeechSynthesis()
      ✓ Checks speechSynthesisUtterance after custom element is rendered
LOG LOG: 'Disconnected.'
      ✓ Checks speechSynthesis selected language "en-US" after being checked if it is supported by Web Speech API
    getColors()
      ✓ Get foreground and background colors of the message bubble on type "warning"
      ✓ Get foreground and background colors of the message bubble on type "forbidden"
      ✓ Get foreground and background colors of the message bubble on type "error"
      ✓ Get foreground and background colors of the message bubble on type "info"
      ✓ Get foreground and background colors of the message bubble on type "help"
      ✓ Get foreground and background colors of the message bubble on type "success"
    bubble()
      ✓ Creates a message bubble of type - warning
      ✓ Creates a message bubble of type - error
      ✓ Creates a message bubble of type - forbidden
      ✓ Creates a message bubble of type - help
      ✓ Creates a message bubble of type - info
      ✓ Creates a message bubble of type - success
LOG LOG: 'Disconnected.'
    Adding bubble messages by changing text attribute on a rendered element
      ✓ pd-bubble

  Array
    #indexOf()
      ✓ should return -1 when the value is not present. This is a demo test to check that the response from the testing framework is ok.


## Deployment

Add the custom element tag to your HTML page. 

The element's parameters are:

 - speakit (boolean - default false). Setting it to true gives the ability to the user to hear the message upon click on browsers supporting SpeechSynthesis. 
 - delay (integer default 0). This is a delay time that is added on the overall delay time of each bubble. After that overall delay time each message bubble is removed using a simple fade-up effect. To calculate the overall time a simple formula is used `overall message delay time = delay + (number of words in a message)*750ms`
 - text (text message default null). The actual message with a prefix used to determine the type for example `warning#:`,`error#:`.
 
`<pd-bubble speakit="true" delay="3000" text=""></pd-bubble>`

To display various messages simply add the type followed by `#:`, in front of the message e.g. **warning#:** and use javascript to set the **text** attribute of the element.

`customElements.whenDefined('pd-bubble').then(() => {
  document.querySelector("pd-bubble:defined").setAttribute("text","warning#: Bubble container for a \"Warning\" message.");
  document.querySelector("pd-bubble:defined").setAttribute("text","forbidden#: Bubble container for a \"Forbidden\" message.");
  document.querySelector("pd-bubble:defined").setAttribute("text","error#: Bubble container for an \"Error\" message.");
  document.querySelector("pd-bubble:defined").setAttribute("text","info#: Bubble container for an \"Info\" message.");
  document.querySelector("pd-bubble:defined").setAttribute("text","help#: Bubble container for a \"Help\" message.");
  document.querySelector("pd-bubble:defined").setAttribute("text","success#: Bubble container for a \"Success\" message.");
});`

In addition `CSS` from index.html page of this project will be needed to be added as it is. If not provided then unicode emojis will be used instead of custom font icons. 

`<style id="bubble-icons">
@font-face { 
font-family: 'bubble-icons';
src: url('fonts/bubble-icons.eot');
src: url('fonts/bubble-icons.eot?#iefix') format('embedded-opentype'), url('fonts/bubble-icons.woff2') format('woff2'), url('fonts/bubble-icons.woff') format('woff'), url('fonts/bubble-icons.ttf')  format('truetype'), url('fonts/bubble-icons.svg#bubble-icons') format('svg');
font-weight: normal; 
font-style: normal; 
font-display: block; 
}
.bubble-icon { 
font-family: 'bubble-icons' !important; 
speak: none; 
font-style: normal; 
font-weight: normal; 
font-variant: normal; 
text-transform: none; 
line-height: 1; 
-webkit-font-smoothing: antialiased; 
-moz-osx-font-smoothing: grayscale; 
} 
.bubble-warning::before { 
content: '\e900'; 
} 
.bubble-forbidden::before { 
content: '\e901'; 
} 
.bubble-error::before {  
content: '\e902'; 
} 
.bubble-info::before {  
content: '\e903'; 
} 
.bubble-help::before {  
content: '\e904'; 
} 
.bubble-success::before {  
content: '\e905'; 
}
.bubble-warning.bubble-mic::before,
.bubble-forbidden.bubble-mic::before,
.bubble-error.bubble-mic::before,
.bubble-info.bubble-mic::before,
.bubble-help.bubble-mic::before,
.bubble-success.bubble-mic::before { 
content: '\e906'; 
}
</style>`

Additional `CSS` is used to position the messages container *pd-bubble*.

`<style>
body {
width: 100%;
}
:host {
display: block;
}
pd-bubble:not(:defined) {
display: none;
}
pd-bubble,
pd-bubble:defined {
position: sticky;
width: 20%;
top: 0;
z-index: 99999;
float: right;
height: auto;
margin: 2% 5% 0% 70%;
display: block;
padding: 0;
}	
</style>`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* test-utils.js can be found in https://github.com/github/custom-element-boilerplate