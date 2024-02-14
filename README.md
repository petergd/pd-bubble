# pd-bubble

A custom web component that can be used in web applications or websites. It provides a container for several types of messages to a user, such as "success", "error", "warning", "forbidden", "info", "tag" and more. Almost all message icons are based upon [iconocss](https://saeedalipoor.github.io/icono/). There is also option to listen the message on browsers supporting SpeechSynthesis of the Web Speech API.
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/pd-bubble)

[Demo page (by unpkg.com)](https://unpkg.com/pd-bubble@1.1.3/pd-bubble.html)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

`node.js`

### Installing

`$ npm install pd-bubble`

## Running the tests

`npm test`

### Tests output explanation

#### pd-bubble

_**canSpeak**_

_✓ checks if browser can use speechSynthesis from Web Speech API, return will be true or false_

_**queue**_

_✓ this is the messages queue it is an empty array [] upon initialization_

_**speechSynthesis**_

_✓ loads speech synthesis utterance_

_**forceSpeakBubble**_

_✓ check if bubble messages are enforced to be spoken upon click_

_**delayTime**_

_✓ this is the delay time that a user can set for each bubble as a threshold in the total delay time until the bubble closes. Value should be 0 in the constructor_

_**bbIcons**_

_✓ @font-face string containing the appropriate CSS for the icon fonts used_

_✓ check that string holds certain CSS rules_

_**sRoot**_

_✓ Checks that component is attached to DOM and is equal to <pd-bubble>_

_✓ Checks that component is attached to DOM and has empty innerHTML_

_**initSpeechSynthesis()**_

_✓ Checks speechSynthesisUtterance after custom element is rendered_

_✓ Checks speechSynthesis selected language "en-US" after being checked if it is supported by Web Speech API_

_**getColors()**_

_✓ Get foreground and background colors of the message bubble on type "warning"_

_✓ Get foreground and background colors of the message bubble on type "forbidden"_

_✓ Get foreground and background colors of the message bubble on type "error"_

_✓ Get foreground and background colors of the message bubble on type "info"_

_✓ Get foreground and background colors of the message bubble on type "tag"_

_✓ Get foreground and background colors of the message bubble on type "success"_

_**bubble()**_

_✓ Creates a message bubble of type - warning

_✓ Creates a message bubble of type - error_

_✓ Creates a message bubble of type - forbidden_

_✓ Creates a message bubble of type - tag_

_✓ Creates a message bubble of type - info_

_✓ Creates a message bubble of type - success_

_**Adding bubble messages by changing text attribute on a rendered element**_

_✓ pd-bubble_

##### Array

_**indexOf()**_

_✓ should return -1 when the value is not present. This is a demo test to check that the response from the testing framework is ok._


## Deployment

Add the custom element tag to your HTML page. 

The element's parameters are:

 - **speakit** (boolean - default false). Setting it to true gives the ability to the user to hear the message upon click on browsers supporting SpeechSynthesis. 
 - **delay** (integer default 0). This is a delay time that is added on the overall delay time of each bubble. After that overall delay time each message bubble is removed using a simple fade-up effect. To calculate the overall time a simple formula is used `overall message delay time = delay + (number of words in a message)*750ms`
 - **text** (text message default null). The actual message with a prefix used to determine the type for example `warning#:`,`error#:`.
 
`<pd-bubble speakit="true" delay="3000" text=""></pd-bubble>`

To display various messages simply add the type followed by `#:`, in front of the message e.g. **warning#:** and use javascript to set the **text** attribute of the element.

    customElements.whenDefined('pd-bubble').then(() => {  
        document.querySelector("pd-bubble:defined").setAttribute("text","warning#: Bubble container for a \"Warning\" message.");  
        document.querySelector("pd-bubble:defined").setAttribute("text","forbidden#: Bubble container for a \"Forbidden\" message.");  
        document.querySelector("pd-bubble:defined").setAttribute("text","error#: Bubble container for an \"Error\" message."); 
        document.querySelector("pd-bubble:defined").setAttribute("text","info#: Bubble container for an \"Info\" message.");  
        document.querySelector("pd-bubble:defined").setAttribute("text","tag#: Bubble container for a \"Tag\" message.");  
        document.querySelector("pd-bubble:defined").setAttribute("text","success#: Bubble container for a \"Success\" message.");
    });  

Additional `CSS` is used to position the messages container *pd-bubble*.

    <style>
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
    </style>

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request 😁

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* test-utils.js can be found in https://github.com/github/custom-element-boilerplate
