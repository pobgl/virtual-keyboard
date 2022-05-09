const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: []
    },
  
    eventHandlers: {
      oninput: null,
      onclose: null
    },
  
    properties: {
      value: "",
      capsLock: false      
    },
  
    init() {
      // Create main elements
      this.elements.main = document.createElement("div");
      this.elements.keysContainer = document.createElement("div");
  
      // Setup main elements
      this.elements.main.classList.add("keyboard", "keyboard--hidden");
      this.elements.keysContainer.classList.add("keyboard__keys");
      this.elements.keysContainer.appendChild(this._createKeys());
  
      this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
  
      // Add to DOM
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
  
      // Automatically use keyboard for elements with .use-keyboard-input
      document.querySelectorAll(".use-keyboard-input").forEach(element => {
        element.addEventListener("focus", () => {
          this.open(element.value, currentValue => {
            element.value = currentValue;
          });
        });
      });
    },
  
    
    keyLayoutNumberEn: [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "En",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", 
      "done", "[", "]", "space"
    ],
    
    keyLayoutNumberRu: [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "Ru",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?", 
      "done", "ж", "э", "space"
    ],

    keyLayoutSymbolEn: [
      "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "En",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", 
      "done", "-", "+", "space"
    ],
    
    keyLayoutSymbolRu: [
      "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "Ru",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?", 
      "done", "ж", "э", "space"
    ],

    _createKeys(keyLayout = this.keyLayoutNumberEn) {
      const fragment = document.createDocumentFragment();
      

      // Creates HTML for an icon
      const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
      };
  
      keyLayout.forEach(key => {
        const keyElement = document.createElement("button");
        const insertLineBreak = ["backspace", "En", "Ru", "enter", "?"].indexOf(key) !== -1;
  
        // Add attributes/classes
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");
  
        switch (key) {
          case "backspace":
            keyElement.classList.add("keyboard__key--wide");
            keyElement.innerHTML = createIconHTML("backspace");
  
            keyElement.addEventListener("click", () => {
              this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
              this._triggerEvent("oninput");
            });
  
          break;
  
          case "caps":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
            keyElement.innerHTML = createIconHTML("keyboard_capslock");
  
            keyElement.addEventListener("click", () => {
              this._toggleCapsLock();
              keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
            });
  
          break;

            case "shift":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
            keyElement.innerHTML = "shift";
  
            keyElement.addEventListener("click", () => {
              this._toggleShift();
              keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
            });
  
          break;

            // кнопка переключения раскладки
            case "En" || "Ru":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--toggle");
            keyElement.innerHTML = "En";
  
            keyElement.addEventListener("click", () => {
              this._toggleEnRu();
              (keyElement.classList.toggle("keyboard__key--shift", this.properties.enRu ? "En" : "Ru"));
            });
  
          break;
  
          case "enter":
            keyElement.classList.add("keyboard__key--wide");
            keyElement.innerHTML = createIconHTML("keyboard_return");
  
            keyElement.addEventListener("click", () => {
              this.properties.value += "\n";
              this._triggerEvent("oninput");
            });
  
          break;
  
          case "space":
            keyElement.classList.add("keyboard__key--extra-wide");
            keyElement.innerHTML = createIconHTML("space_bar");
  
            keyElement.addEventListener("click", () => {
              this.properties.value += " ";
              this._triggerEvent("oninput");
            });
  
          break;
  
          case "done":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
            keyElement.innerHTML = createIconHTML("check_circle");
  
            keyElement.addEventListener("click", () => {
              this.close();
              this._triggerEvent("onclose");
            });
  
          break;
  
          default:
            keyElement.textContent = key.toLowerCase();
  
            keyElement.addEventListener("click", () => {
              this.properties.value +=  
              this.properties.shift && this.properties.capsLock && this.properties.enRu ? this.keyLayoutSymbolRu[this.keyLayoutNumberEn.indexOf(key)].toLowerCase() 
              : this.properties.shift && !this.properties.capsLock && this.properties.enRu ? this.keyLayoutSymbolRu[this.keyLayoutNumberEn.indexOf(key)].toUpperCase()
              : this.properties.shift && !this.properties.capsLock && !this.properties.enRu ? this.keyLayoutSymbolEn[this.keyLayoutNumberEn.indexOf(key)].toUpperCase()
              : !this.properties.shift && !this.properties.capsLock && !this.properties.enRu ? this.keyLayoutNumberEn[this.keyLayoutNumberEn.indexOf(key)].toUpperCase() 
              : !this.properties.shift && !this.properties.capsLock && this.properties.enRu ? this.keyLayoutNumberRu[this.keyLayoutNumberEn.indexOf(key)].toLowerCase() 
              : !this.properties.shift && !this.properties.capsLock && !this.properties.enRu ? this.keyLayoutNumberEn[this.keyLayoutNumberEn.indexOf(key)].toLowerCase()
              : !this.properties.shift && this.properties.capsLock && !this.properties.enRu ? this.keyLayoutNumberEn[this.keyLayoutNumberEn.indexOf(key)].toUpperCase()
              : !this.properties.shift && this.properties.capsLock && this.properties.enRu ? this.keyLayoutNumberRu[this.keyLayoutNumberEn.indexOf(key)].toUpperCase()   
              : this.properties.shift && this.properties.capsLock && !this.properties.enRu ? this.keyLayoutSymbolEn[this.keyLayoutNumberEn.indexOf(key)].toLowerCase()
              : this.keyLayoutNumberEn[this.keyLayoutNumberEn.indexOf(key)].toLowerCase();       

              this._triggerEvent("oninput");
            });              
          break;
        }
  
        fragment.appendChild(keyElement);
  
        if (insertLineBreak) {
          fragment.appendChild(document.createElement("br"));
        }
      });
  
      return fragment;
    },
  
    _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == "function") {
        this.eventHandlers[handlerName](this.properties.value);
      }
    },
  
    _toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;
  
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    },

    _toggleShift() {
      this.properties.shift = !this.properties.shift;
  
      for (let i = 0; i < this.elements.keys.length - 1; i++) {
        const key = this.elements.keys[i];
  
        if (key.childElementCount === 0) {
          if (this.properties.enRu) {
            if (this.properties.capsLock && !this.properties.shift) {
              key.textContent = this.keyLayoutNumberRu[i].toUpperCase();
            } else if (this.properties.capsLock && this.properties.shift) {
              key.textContent = this.keyLayoutSymbolRu[i].toLowerCase();
            } else if (!this.properties.capsLock && this.properties.shift) {
              key.textContent = this.keyLayoutSymbolRu[i].toUpperCase();           
            } else {
              key.textContent = this.keyLayoutNumberRu[i].toLowerCase();
            }
          } else {
            if (this.properties.capsLock && !this.properties.shift) {
              key.textContent = this.keyLayoutNumberEn[i].toUpperCase();
            } else if (this.properties.capsLock && this.properties.shift) {
              key.textContent = this.keyLayoutSymbolEn[i].toLowerCase();
            } else if (!this.properties.capsLock && this.properties.shift) {
              key.textContent = this.keyLayoutSymbolEn[i].toUpperCase();            
            } else {
              key.textContent = this.keyLayoutNumberEn[i].toLowerCase();
            }
          }
        }
      }
    },

    _toggleEnRu() {
      this.properties.enRu = !this.properties.enRu;
      for (let i = 0; i < this.elements.keys.length - 1; i++) {
        const key = this.elements.keys[i];
        if (key.childElementCount === 0) {
          if (!this.properties.enRu) {
            if (this.properties.capsLock && !this.properties.shift) {
              key.textContent = this.keyLayoutNumberEn[i].toUpperCase();
            } else if (this.properties.capsLock && this.properties.shift) {
              key.textContent = this.keyLayoutSymbolEn[i].toLowerCase();
            } else if (!this.properties.capsLock && this.properties.shift) {
              key.textContent = this.keyLayoutSymbolEn[i].toUpperCase();            
            } else {
              key.textContent = this.keyLayoutNumberEn[i].toLowerCase();
            }            
          } else {
            if (this.properties.capsLock && !this.properties.shift) {
              key.textContent = this.keyLayoutNumberRu[i].toUpperCase();
            } else if (this.properties.capsLock && this.properties.shift) {
              key.textContent = this.keyLayoutSymbolRu[i].toLowerCase();
            } else if (!this.properties.capsLock && this.properties.shift) {
              key.textContent = this.keyLayoutSymbolRu[i].toUpperCase();            
            } else {
              key.textContent = this.keyLayoutNumberRu[i].toLowerCase();
            }
          }
        }
      }
    },    
  
    open(initialValue, oninput, onclose) {
      this.properties.value = initialValue || "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.remove("keyboard--hidden");
    },
  
    close() {
      this.properties.value = "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.add("keyboard--hidden");
    }
  };
  
  window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
  });