import { pdBubble } from "../pd-bubble.js";
import { TestUtils } from "../test-utils.js";

describe("pd-bubble", () => {
  describe("canSpeak", () => {
    it("checks if browser can use speechSynthesis from Web Speech API, return will be true or false", () => {
        const component = new pdBubble();
        expect(component.canSpeak).toBeTrue();
    });
  });
  describe("queue", () => {
    it("this is the messages queue it is an empty array [] upon initialization", () => {
        const component = new pdBubble();
        expect(component.queue).toEqual([]);
    });
  });
  describe("speechSynthesis", () => {
    it("loads speech synthesis utterance", () => {
        const component = new pdBubble();
        expect(component.speechSynthesis).toEqual(new SpeechSynthesisUtterance());
    });
  });
  describe("forceSpeakBubble", () => {
    it("check if bubble messages are enforced to be spoken upon click", () => {
        const component = new pdBubble();
        expect(component.forceSpeakBubble).toEqual(false);
    });
  });
  describe("delayTime", () => {
    it("this is the delay time that a user can set for each bubble as a threshold in the total delay time until the bubble closes. Value should be 0 in the constructor", () => {
        const component = new pdBubble();
        expect(component.delayTime).toEqual(0);
    });
  });
  describe("bbIcons", () => {
    it("@font-face string containing the appropriate CSS for the icon fonts used", () => {
        const component = new pdBubble();
        expect(typeof component.bbIcons).toBe("string");
    });
  });
  describe("bbIcons", () => {
    it("check that string holds certain CSS rules", () => {
        const component = new pdBubble();
        const rgxp = new RegExp('((\.bubble-.[\w]+|:after|:before|::after|::before|content:.+))|([")])+([")])+','g');
        expect(rgxp.test(component.bbIcons)).toBe(true);
    });
  });
  describe("sRoot", () => {
    it('Checks that component is attached to DOM and is equal to <pd-bubble>', async () => {
        const component = await TestUtils.render('pd-bubble');
        expect(component.outerHTML).toEqual("<pd-bubble></pd-bubble>");
    });
  });  
  describe("sRoot", () => {
    it('Checks that component is attached to DOM and has empty innerHTML', async () => {
        const component = await TestUtils.render('pd-bubble');
        expect(component.innerHTML.includes("")).toBeTruthy();
    });
  });   
  describe("initSpeechSynthesis()", () => {
    it('Checks speechSynthesisUtterance after custom element is rendered', async () => {
        const component = await TestUtils.render('pd-bubble');
        component.initSpeechSynthesis();
        expect(component.speechSynthesis).toEqual(new SpeechSynthesisUtterance());
    });
  });  
  describe("initSpeechSynthesis()", () => {
    let lang = navigator.languages.length ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    it('Checks speechSynthesis selected language "'+lang+'" after being checked if it is supported by Web Speech API', async () => {
        const component = await TestUtils.render('pd-bubble');
        component.initSpeechSynthesis();
        expect(component.speechSynthesis.lang).toEqual(lang);
    });
  }); 
  describe("getColors()", () => {
    it('Get foreground and background colors of the message bubble on type "warning"', () => {
        const component = new pdBubble();
        let colors = component.getColors("warning");
        expect(colors).toEqual({ color: '#000', bgColor: '#ffd61d' });
    });
  }); 
  describe("getColors()", () => {
    it('Get foreground and background colors of the message bubble on type "forbidden"', () => {
        const component = new pdBubble();
        let colors = component.getColors("forbidden");
        expect(colors).toEqual({ color: '#fff', bgColor: '#000' });
    });
  }); 
  describe("getColors()", () => {
    it('Get foreground and background colors of the message bubble on type "error"', () => {
        const component = new pdBubble();
        let colors = component.getColors("error");
        expect(colors).toEqual({ color: '#fff', bgColor: '#900' });
    });
  }); 
  describe("getColors()", () => {
    it('Get foreground and background colors of the message bubble on type "info"', () => {
        const component = new pdBubble();
        let colors = component.getColors("info");
        expect(colors).toEqual({ color: '#fff', bgColor: '#009' });
    });
  }); 
  describe("getColors()", () => {
    it('Get foreground and background colors of the message bubble on type "tag"', () => {
        const component = new pdBubble();
        let colors = component.getColors("tag");
        expect(colors).toEqual({ color: '#000', bgColor: '#dddddd' });
    });
  }); 
  describe("getColors()", () => {
    it('Get foreground and background colors of the message bubble on type "success"', () => {
        const component = new pdBubble();
        let colors = component.getColors("success");
        expect(colors).toEqual({ color: '#fff', bgColor: '#090' });
    });
  }); 
  describe("bubble()", () => {
    it('Creates a message bubble of type - warning', async () => {
        const component = new pdBubble();
        let bubble = await component.bubble("this is a warning message", "warning", false);
        expect(bubble).toBeTrue();
    });
  });
  describe("bubble()", () => {
    it('Creates a message bubble of type - error', async () => {
        const component = new pdBubble();
        let bubble = await component.bubble("this is an error message", "error", false);
        expect(bubble).toBeTrue();
    });
  });
  describe("bubble()", () => {
    it('Creates a message bubble of type - forbidden', async () => {
        const component = new pdBubble();
        let bubble = await component.bubble("this is a forbidden message", "forbidden", false);
        expect(bubble).toBeTrue();
    });
  });
  describe("bubble()", () => {
    it('Creates a message bubble of type - tag', async () => {
        const component = new pdBubble();
        let bubble = await component.bubble("this is a help message", "tag", false);
        expect(bubble).toBeTrue();
    });
  });
  describe("bubble()", () => {
    it('Creates a message bubble of type - info', async () => {
        const component = new pdBubble();
        let bubble = await component.bubble("this is an info message", "info", false);
        expect(bubble).toBeTrue();
    });
  });
  describe("bubble()", () => {
    it('Creates a message bubble of type - success', async () => {
        const component = new pdBubble();
        let bubble = await component.bubble("this is a success message", "success", false);
        expect(bubble).toBeTrue();
    });
  });
  describe("Adding bubble messages by changing text attribute on a rendered element", () => {
    it('pd-bubble', async () => {
        const component = await TestUtils.render('pd-bubble');
        component.setAttribute("delay",3000);
        component.setAttribute("speakit",false);
        component.setAttribute("text","warning#: Bubble container for a \"Warning\" message.");
        expect(component.queue.length).toEqual(1);
        expect(component.sRoot.innerHTML.length > 0).toBeTrue();
        component.setAttribute("text","error#: Bubble container for an \"Error\" message.");
        expect(component.queue.length).toEqual(2);
        expect(component.sRoot.innerHTML.length > 0).toBeTrue();
        let doc = new DOMParser().parseFromString(component.sRoot.children[2].outerHTML, "text/html");
        expect(doc.querySelector(".bubble.warning").innerHTML.length > 0).toBeTrue();
        doc = new DOMParser().parseFromString(component.sRoot.children[4].outerHTML, "text/html");
        expect(doc.querySelector(".bubble.error").innerHTML.length > 0).toBeTrue();
    });
  });  
});
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present. This is a demo test to check that the response from the testing framework is ok.', () => {
    assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});