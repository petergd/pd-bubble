export class pdBubble extends HTMLElement {
    static get observedAttributes() {
      return ['text','speakit','delay'];
    }
    constructor() {
      super();
      this.sRoot = this.attachShadow({
        mode: 'closed'
      });
      this.speechSynthesis;
      this.canSpeak = window.hasOwnProperty('speechSynthesis');
      this.types = {
          warning: {
            color: "#000", bgColor: "#ffd61d"
          },
          forbidden: {
            color: "#fff", bgColor: "#000"
          },
          error: {
            color: "#fff", bgColor: "#900"
          },
          info: {
            color: "#fff", bgColor: "#009"
          },
          help: {
            color: "#000", bgColor: "#dddddd"
          },
          success: {
            color: "#fff", bgColor: "#090"
          },
      }
      this.queue = [];
      this.forceSpeakBubble = false;
      this.delayTime = 0;
      this.fade = "up";
      this.initSpeechSynthesis();
      this.bbIcons = '.bubble-icon { text-align: left; font-display: block; font-style: normal; font-weight: normal; font-variant: normal; text-transform: none; line-height: 1; height: 1rem; width: 1rem; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } .bubble-warning::before { content: "❕"; } .bubble-forbidden::before { content: "🚫"; } .bubble-error::before {  content: "💥"; } .bubble-info::before { content: "ℹ"; } .bubble-help::before { content: "🙏"; } .bubble-success::before { content: "👏"; }.bubble-warning.bubble-mic::before,.bubble-forbidden.bubble-mic::before,.bubble-error.bubble-mic::before,.bubble-info.bubble-mic::before,.bubble-help.bubble-mic::before,.bubble-success.bubble-mic::before { content: "🎙"; }';
      this.bbIconsStyle = document.querySelector("style#bubble-icons");
      if(this.bbIconsStyle == null || typeof this.bbIconsStyle == "undefined") {
          this.bbIconsStyle = document.createElement("style");
          this.bbIconsStyle.append(this.bbIcons); 
	  }
      let style = this.bbIconsStyle.cloneNode(true);
      style.append('@keyframes up { 0% { opacity: 1; } 100% { opacity: 0; margin-top: -5%; } } @keyframes down { 0% { opacity: 1; } 100% { opacity: 0; margin-bottom: -5%; } }');
      this.sRoot.append(style);
    }
    initSpeechSynthesis() {
        let self = this;
        try {
            self.speechSynthesis = new SpeechSynthesisUtterance();
            let voices,supportedLanguages;
            let clientLang = navigator.languages.length ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
            self.speechSynthesis.lang = clientLang;
            voices = window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => {
                try {
                    voices = window.speechSynthesis.getVoices();
                    supportedLanguages = voices.map((voice) => { return voice.lang; });
                    supportedLanguages = [...new Set(supportedLanguages)];
                    clientLang = navigator.languages.length ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
                    let rgxp = new RegExp(clientLang,'g');
                    supportedLanguages = supportedLanguages.filter((lang) =>{
                        return rgxp.test(lang); 
                    });
                    if(supportedLanguages.length > 0) {
                        voices = voices.filter((voice) => { return voice.lang == (supportedLanguages.length > 0 ? supportedLanguages[0] : "" ); });
                        self.speechSynthesis.voice = voices[Math.floor(Math.random() * voices.length)];    
                        self.canSpeak = true;
                    } else {
                        throw new Error("Unsupported Language Detected");
                    }    
                } catch (err) {
                    console.log(err.toString());
                }
            };
            supportedLanguages = [...new Set(supportedLanguages)];
            let rgxp = new RegExp(clientLang,'g');
            supportedLanguages = supportedLanguages.filter((lang) =>{
                return rgxp.test(lang); 
            });
            if(supportedLanguages.length > 0) {
                voices = voices.filter((voice) => { return voice.lang == (supportedLanguages.length > 0 ? supportedLanguages[0] : "" ); });
                self.speechSynthesis.voice = voices[Math.floor(Math.random() * voices.length)];    
                self.canSpeak = true;
            }
        } catch (err) {
            console.error(err);
        }
    }
    speechBubble(el, msg) {
        let self = this;
		if (!window.speechSynthesis.speaking) {
			el.querySelector('.bubble-icon').classList.toggle('bubble-mic');
		}
        if(msg.length) {                
            self.speechSynthesis.text = msg; 
            window.speechSynthesis.speak(self.speechSynthesis);
            self.speechSynthesis.onend = () => {
                el.querySelector('.bubble-icon').classList.toggle('bubble-mic');
                el.classList.add("up");
                self.remove(el, 600);
                window.speechSynthesis.cancel();
            } 
        } else {
            self.bubble('warning#: Your browser does not support Speech Synthesis feature. Please try using one that does support this feature.');
        }         
    }
    getColors(iconType) {
      for(let key in this.types) {
        if(key == iconType) {
          return this.types[key];
        }
      }
    }
    async remove(el, ms, callback) {
      let response = await new Promise(async (resolve) => {
          let pdTimeout = await setTimeout(async () => {
            if (typeof(el) !== "undefined" && el.innerHTML !== null && el.innerHTML.length > 0 && typeof(el.parentNode) !== "undefined" && el.parentNode !== null && el.parentNode.innerHTML.length > 0) {
              this.queue = this.queue.filter((elm) => {
                  return elm != el.textContent;
              });
              await el.parentNode.removeChild(el);
              clearTimeout(pdTimeout);
              resolve(true);
            }
          }, ms);
        })
        .then(async () => {
            if (typeof callback == "function") {
                callback();
            }
        }).catch(error => {
          console.error(error.toString());
        });
    }
    async bubble(msg, type, speak = false) {
      let self = this;
      let colorSet = self.getColors(type);
      let style = document.createElement("style");
      style.append('.bubble.'+ type +' { color: ' + colorSet.color + '; background-color: ' + colorSet.bgColor + '; position: relative; width: 100%; max-height: auto; height: auto; display: flex; align-items; center; align-content: center; border-radius: 0.25rem; padding: 0.75rem; z-index: 99999; margin-top: 2%;} .bubble i { flex-grow: 1; padding: auto; font-size: 1.5rem;} .bubble span { flex-grow: 2; padding: auto; text-align: right; font-size: 1.125rem;} .up { animation-name: up; animation-iteration-count: 1; animation-duration: 2s; animation-timing-function: linear; animation-fill-mode: forwards; }');
      self.sRoot.append(style);
      let div = document.createElement('div');
      let i = document.createElement('i');
      let span = document.createElement('span');
      span.innerHTML = msg;
      div.className += "bubble "+type; 
      div.setAttribute("role",(["warning","error","info"].includes(type) ? "alert" : "status"));
      div.setAttribute("aria-live",(["warning","error","info"].includes(type) ? "assertive" : "polite"));
      div.setAttribute("aria-atomic","true");
      i.className += "bubble-icon bubble-" + type;
      div.appendChild(i);
      div.appendChild(span);
      let res = await new Promise( async (resolve) => { 
        self.sRoot.appendChild(div);
        self.queue.push(msg);
        await resolve(true);
      });
      self.sRoot.querySelector(".bubble."+type).addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(self.canSpeak == true && speak == true) {
            await self.speechBubble(div, msg);
        } else {
            let target = e.target.classList.contains("bubble") ? e.target : e.target.parentElement;
            if(!target.classList.contains("up")) {
                target.classList.add("up");
                await self.remove(target, 600);
            }    
        }
      }, false);
      let queueSpeechTime = self.queue.length > 0 ? (self.queue.join(" ").split(" ").length*750) + self.delayTime : 0;
      setInterval(async () => {
        div.classList.add("up");
        await self.remove(div, 600);
      }, queueSpeechTime);
      return (res === true);
    }
    
    
    connectedCallback() {
      this.forceSpeakBubble = (this.getAttribute("speakit") == "true");
      this.delayTime = isNaN(parseInt(this.getAttribute("delay"))) ? 0 : parseInt(this.getAttribute("delay")) ;
    }

    disconnectedCallback() {
      console.log('Disconnected.');
    }

    adoptedCallback() {
      console.log('Adopted.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "delay") {
            this.delayTime = isNaN(parseInt(this.getAttribute("delay"))) ? 0 : parseInt(this.getAttribute("delay")) ;
        }
        if(name == "speakit") {
            this.forceSpeakBubble = (this.getAttribute("speakit") == "true");
        }
        if(name == "text") {
            let params = this.getAttribute("text").split("#:");
            if(params.length && params.length == 2) {
                return this.bubble(params[1].trim(), params[0], this.forceSpeakBubble);
            }        
        }
    }
}
if (!window.customElements.get('pd-bubble')) {
  window.pdBubble = pdBubble;
  window.customElements.define('pd-bubble', pdBubble);
}