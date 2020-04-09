
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
          tag: {
            color: "#000", bgColor: "#dddddd"
          },
          success: {
            color: "#fff", bgColor: "#090"
          },
          bookmark: {
            color: "#000", bgColor: "#f0f0df0"
          },
          mail: {
            color: "#fff", bgColor: "#004d66"
          },
      }
      this.queue = [];
      this.forceSpeakBubble = false;
      this.delayTime = 0;
      this.fade = "up";
      this.initSpeechSynthesis();
      this.bbIcons = ".bubble-forbidden,.bubble-mail,.bubble-mail:before,.bubble-success,.bubble-tag,.bubble-tag:after,[class*=bubble-]{border:.125rem solid}.bubble-info:after,.bubble-tag:after,.bubble-warning:after{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.bubble-error:after,.bubble-error:before,.bubble-forbidden:before,.bubble-success:before{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.bubble-forbidden{width:1.75rem;height:1.75rem;border-width:.125rem;border-radius:50%;margin:.1875rem;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.bubble-forbidden:before{width:1.5rem;height:.125rem;box-shadow:inset 0 0 0 2rem}.bubble-bookmark{width:0;height:0;border:1rem solid;border-bottom-color:transparent;box-shadow:0 -.875rem;border-radius:.1875rem .1875rem 0 0;margin:.9625rem .75rem .675rem 0}.bubble-tag{width:1.85rem;height:2.5rem;border-radius:.375rem .375rem .25rem .25rem;border-top:none;transform:rotate(46deg);margin:.6125rem .5rem}.bubble-tag:before{position:absolute;top:-0.4075rem;left: 0.09325rem;width:1.40625rem;height:1.2125rem;border-width:.125rem 0 0 .125rem;border-style:solid;-webkit-transform:rotate(46deg);transform:rotate(46deg);border-radius:.3125rem 0 0}.bubble-tag:after{top:.0625rem;width:.1875rem;height:.1875rem;border-radius:50%}.bubble-mail{width:1.75rem;height:1.125rem;overflow:hidden;margin:.5rem .1875rem}.bubble-mail:before{position:absolute;width:1.5625rem;height:1.5625rem;-webkit-transform:rotate(50deg) skew(-10deg,-20deg);transform:rotate(50deg) skew(-10deg,-20deg);top:-1.25rem;left:-.1875rem}.bubble-error:after,.bubble-error:before,.bubble-success:after,.bubble-success:before{box-shadow:inset 0 0 0 2rem}.bubble-error{width:1.875rem;height:1.875rem;margin:.125rem}.bubble-error:before,.bubble-success:before{width:1.25rem;height:.125rem}.bubble-error:after{height:1.25rem;width:.125rem}.bubble-error:before,.bubble-success:before{width:1.125rem}.bubble-error:after{height:1.125rem}.bubble-error{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.bubble-success{width:1.75rem;height:1.75rem;margin:.1875rem 0 .1875rem .375rem;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.bubble-success:after{position:absolute;height:.75rem;width:.125rem;left:.25rem;bottom:.875rem}.bubble-success{border-radius:50%;width:1.875rem;height:1.875rem;margin:.125rem}.bubble-success:before{width:.875rem;top:.9415rem;left:.875rem}.bubble-success:after{height:.5rem;left:.4375rem;bottom:.625rem}.bubble-warning{overflow:visible;width:1.875rem;border-bottom:.125rem solid;border-radius:0 0 .25rem .25rem;margin:1.625rem .125rem .375rem}.bubble-warning:before{position:absolute;width:1.625rem;height:1.625rem;left:.0625rem;top:-.875rem;border-width:.125rem 0 0 .125rem;border-style:solid;border-radius:.25rem 0;-webkit-transform:rotate(45deg) skew(12deg,12deg);transform:rotate(45deg) skew(12deg,12deg)}.bubble-warning:after{width:.25rem;height:.1875rem;top:-.875rem;box-shadow:inset 0 0 0 2rem,0 .1875rem,0 .5rem}.bubble-warning{height:1.875rem;margin:.125rem}.bubble-warning:before{display:none}.bubble-warning:after{box-shadow:inset 0 0 0 2rem,0 .1875rem,0 .3125rem,0 .625rem;top:.375rem}.bubble-info{overflow:visible;width:1.875rem;border-bottom:.0625rem solid;border-radius:0 0 .25rem .25rem;margin:1.625rem .125rem .375rem}.bubble-info:before{position:absolute;width:1.625rem;height:1.625rem;left:.0625rem;top:0;border-width:.125rem 0 0 .125rem;border-style:solid;border-radius:.25rem 0;-webkit-transform:rotate(45deg) skew(12deg,12deg);transform:rotate(45deg) skew(12deg,12deg)}.bubble-info:after{width:.25rem;height:.5rem;top:0;box-shadow:inset 0 0 0 2rem,0 .125rem,0 .5rem}.bubble-info{height:1.875rem;margin:.125rem}.bubble-info:before{display:none}.bubble-info:after{box-shadow:inset 0 0 0 1.875rem,0 .225rem,0 -.225rem #fff,0 -.75rem;top:.8975rem}[class*=bubble-]{display:inline-block;vertical-align:middle;position:relative;font-style:normal;color:currentColor;text-align:left;text-indent:-62.5rem;direction:ltr}[class*=bubble-]:after,[class*=bubble-]:before{content:'';pointer-events:none}.bubble-error,.bubble-info,.bubble-success,.bubble-warning{border-radius:50%;width:1.875rem;height:1.875rem;margin:.125rem}.bubble-mic,.bubble-mic:before{border:.125rem solid}.bubble-mic:after,.bubble-mic:before{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.bubble-mic{width:1.375rem;height:.9375rem;border-width:0 .125rem .125rem;border-radius:1.25rem/0 0 1.25rem 1.25rem;margin:.75rem .375rem .4375rem}.bubble-mic:before{width:.625rem;height:1.125rem;top:-.6875rem;border-radius:1.25rem}.bubble-mic:after{width:.125rem;height:.125rem;bottom:-.25rem;box-shadow:inset 0 0 0 2rem,0 .125rem,0 .25rem,-.125rem .25rem,-.25rem .25rem,-.375rem .25rem,.125rem .25rem,.25rem .25rem,.375rem .25rem}[class*=bubble-],[class*=bubble-] *{box-sizing:border-box}@keyframes up { 0% { opacity: 1; } 100% { opacity: 0; margin-top: -15%; } } @keyframes down { 0% { opacity: 1; } 100% { opacity: 0; margin-bottom: -15%; } }";
      //this.bbIconsStyle = document.querySelector("style#bubble-icons");
      //if(this.bbIconsStyle == null || typeof this.bbIconsStyle == "undefined") {
          let style = document.createElement("style");
          style.append(this.bbIcons); 
	//}
      //let style = this.bbIconsStyle.cloneNode(true);
      //style.append('');
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
		let elem = el.querySelector('[class*=bubble-]');
		let oldClass = elem.className;
	//alert(oldClass.replace(/[^\s]/gi, ''));
		if (!window.speechSynthesis.speaking) {
			elem.classList.remove(oldClass);
			elem.classList.add('bubble-mic');
			
		}
        if(msg.length) {                
            self.speechSynthesis.text = msg; 
            window.speechSynthesis.speak(self.speechSynthesis);
            self.speechSynthesis.onend = () => {
				elem.classList.add(oldClass);
				elem.classList.remove('bubble-mic');
                
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

	  style.append('.bubble.'+ type +' { color: ' + colorSet.color + '; background-color: ' + colorSet.bgColor + '; position: relative; width: 100%;height:auto; min-height: 5rem; max-height: 20rem; display: block; border-radius: 0.25rem; padding: 0.25rem; z-index: 99999; margin-top: 2%;display:block;} .bubble.'+ type +' span { position: absolute;top: calc(50% - '+ (['bookmark','tag','mail'].indexOf(type) >= 0 ? 1.75 : 1.275 ) +'rem);padding: 0; width:1.875rem; height:'+ (['bookmark','mail'].indexOf(type) >= 0 ? 1.275 : 1.875 ) +'rem } .bubble p { position: absolute;top:0; margin-left: 1.625rem;width:calc(100% - 3.375rem); padding: 0 0 0 0.75rem; text-align: right; font-size: 1.125rem;} .up { animation-name: up; animation-iteration-count: 1; animation-duration: 2s; animation-timing-function: linear; animation-fill-mode: forwards; }');
      self.sRoot.append(style);
      let div = document.createElement('div');
      let span = document.createElement('span');
      let p = document.createElement('p');
      p.innerHTML = msg;
      div.className += "bubble "+type; 
      div.setAttribute("role",(["warning","error","info"].includes(type) ? "alert" : "status"));
      div.setAttribute("aria-live",(["warning","error","info"].includes(type) ? "assertive" : "polite"));
      div.setAttribute("aria-atomic","true");
	  span.classList.add("bubble-" + type);
      div.appendChild(span);
      div.appendChild(p);
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