const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    language: ('en' || localStorage.getItem('lang')),    
  },

  init() {
    if (localStorage.getItem('lang')) {
      Keyboard.properties.language = localStorage.getItem('lang');
    }

    // Create main elements
    this.elements.textArea = document.createElement('textarea');
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements    
    this.elements.textArea.classList.add('use-keyboard-input');
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.textArea.placeholder = 'Click here';

    // Add to DOM
    document.body.appendChild(this.elements.textArea);
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
          let area = document.querySelector('.use-keyboard-input');
          area.focus();
          area.selectionEnd = area.selectionStart;
        });
      });
      element.addEventListener('keydown', (e) => {        
        let arrKeyCode = [13, 9, 20, 16, 17, 18, 8, 37, 39];
        document.querySelectorAll('.keyboard__key').forEach(key => {          
          if (key.textContent === e.key) {            
            key.classList.add('keyboard__key_active')
            setTimeout(() => key.classList.remove('keyboard__key_active'), 200);
          } else if (key.textContent === 'backspace ' && e.keyCode === 8 || key.textContent === 'keyboard_return ' && e.keyCode === 13 || 
            key.textContent === 'space_bar ' && e.keyCode === 32 || key.textContent === 'keyboard_arrow_left ' && e.keyCode === 37 ||
            key.textContent === 'keyboard_arrow_right ' && e.keyCode === 39)   {
          key.classList.add('keyboard__key_active')
          setTimeout(() => key.classList.remove('keyboard__key_active'), 200);
          } 
        });
        if( !(arrKeyCode.includes(e.keyCode)) ) {
          this.properties.value += e.key;             
        } else {
          switch(e.keyCode) {
          case 13:
            this.properties.value += '\n';
            break;
          case 32:
            this.properties.value += ' ';
            break;
          case 8:
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            break;
          case 37:
            this.properties.value += '';
            break;
          case 39:
            this.properties.value += '';
            break;
          }
        }
      })
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      {
        en: ['1', '!'],
        ru: ['1', '!'],
      },
      {
        en: ['2', '@'],
        ru: ["2", "'"],
      },
      {
        en: ['3', '#'],
        ru: ['3', '???'],
      },
      {
        en: ['4', '$'],
        ru: ['4', ';'],
      },
      {
        en: ['5', '%'],
        ru: ['5', '%'],
      },
      {
        en: ['6', '^'],
        ru: ['6', ':'],
      },
      {
        en: ['7', '&'],
        ru: ['7', '?'],
      },
      {
        en: ['8', '*'],
        ru: ['8', '*'],
      },
      {
        en: ['9', '('],
        ru: ['9', '('],
      },
      {
        en: ['0', ')'],
        ru: ['0', ')'],
      },
      {
        en: 'backspace',
        ru: 'backspace',
      },
      {
        en: 'q',
        ru: '??',
      },
      {
        en: 'w',
        ru: '??',
      },
      {
        en: 'e',
        ru: '??',
      },
      {
        en: 'r',
        ru: '??',
      },
      {
        en: 't',
        ru: '??',
      },
      {
        en: 'y',
        ru: '??',
      },
      {
        en: 'u',
        ru: '??',
      },
      {
        en: 'i',
        ru: '??',
      },
      {
        en: 'o',
        ru: '??',
      },
      {
        en: 'p',
        ru: '??',
      },
      {
        en: 'en',
        ru: 'ru',
      },      
      {
        en: 'caps',
        ru: 'caps',
      },
      {
        en: 'a',
        ru: '??',
      },
      {
        en: 's',
        ru: '??',
      },
      {
        en: 'd',
        ru: '??',
      },
      {
        en: 'f',
        ru: '??',
      },
      {
        en: 'g',
        ru: '??',
      },
      {
        en: 'h',
        ru: '??',
      },
      {
        en: 'j',
        ru: '??',
      },
      {
        en: 'k',
        ru: '??',
      },
      {
        en: 'l',
        ru: '??',
      },     
      {
        en: 'enter',
        ru: 'enter',
      },
      {
        en: 'shift',
        ru: 'shift',
      },
      {
        en: 'z',
        ru: '??',
      },
      {
        en: 'x',
        ru: '??',
      },
      {
        en: 'c',
        ru: '??',
      },
      {
        en: 'v',
        ru: '??',
      },
      {
        en: 'b',
        ru: '??',
      },
      {
        en: 'n',
        ru: '??',
      },
      {
        en: 'm',
        ru: '??',
      },
      {
        en: [',', '<'],
        ru: '??',
      },
      {
        en: ['/', '>'],
        ru: '??',
      },
      {
        en: ['.', '?'],
        ru: ['.', ','],
      },      
      {
        en: 'done',
        ru: 'done',
      },
      {
        en: [';', ':'],
        ru: '??',
      },
      {
        en: ["'", "'"],
        ru: '??',
      },
      {
        en: 'space',
        ru: 'space',
      },
      {
        en: ['[', '{'],
        ru: '??',
      },
      {
        en: [']', '}'],
        ru: '??',
      },
      {
        en: 'leftArrow',
        ru: 'leftArrow',
      },
      {
        en: 'rightArrow',
        ru: 'rightArrow',
      },  
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => `<i class="material-icons">${icon_name}</i>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'en', 'ru', 'enter', '.'];         

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      switch (key[this.properties.language]) {
        case 'speech':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('record_voice_over');
          keyElement.addEventListener('click', () => {
            this._toggleSpeech();
            this._speech()
            keyElement.classList.toggle('keyboard__key--active', this.properties.speech);
        });
        break;
      
        case 'leftArrow':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_left');

          keyElement.addEventListener('click', () => {
              this._changePositionLeft();
            
          });

          break;

        case 'rightArrow':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_right');

          keyElement.addEventListener('click', () => {
            this._changePositionRight();
          });

          break;

        case 'en':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = key[this.properties.language].toLowerCase();

          keyElement.addEventListener('click', () => {
            let area = document.querySelector('.use-keyboard-input');
            this._toggleEnRu();
            area.focus();
          });

          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = `<span>${key[this.properties.language].toLowerCase()}</span>`;

          keyElement.addEventListener('click', () => {
            this._toggleShift();
            keyElement.classList.toggle('keyboard__key--active', this.properties.shift);
          });

          break;

        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {                        
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent('oninput');
          });

          break;
              
        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            let area = document.querySelector('.use-keyboard-input');            
            this._toggleCapsLock();
            area.focus();
            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');
          keyElement.addEventListener('click', () => {
            let area = document.querySelector('.use-keyboard-input');            
            this.properties.value += area.setRangeText('\n', area.selectionStart, area.selectionEnd, 'end');
            area.focus();
            this._triggerEvent('oninput');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this._triggerEvent('oninput');
          });

          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('check_circle');

          keyElement.addEventListener('click', () => {
            this.close();
            this._triggerEvent('onclose');
          });

          break;

        default:
          keyElement.textContent = key[this.properties.language][0].toLowerCase();

          keyElement.addEventListener('click', () => {
            let area = document.querySelector('.use-keyboard-input');

          if (this.properties.shift && Array.isArray(key[this.properties.language])) {
              this.properties.value += area.setRangeText(key[this.properties.language][1], area.selectionStart, area.selectionEnd, 'end');
            } else if (this.properties.shift) {             
              this.properties.value += area.setRangeText((this.properties.capsLock ? key[this.properties.language][0].toLowerCase() : key[this.properties.language][0].toUpperCase()), area.selectionStart, area.selectionEnd, 'end');
            } else {              
              this.properties.value += area.setRangeText((this.properties.capsLock ? key[this.properties.language][0].toUpperCase() : key[this.properties.language][0].toLowerCase()), area.selectionStart, area.selectionEnd, 'end');
            }
                      
              area.focus();
              this._triggerEvent('oninput');
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak.includes(key[this.properties.language][0]) || insertLineBreak.includes(key[this.properties.language])) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  _changePositionLeft() {
      let area = document.querySelector('.use-keyboard-input')
      const startPosition = area.selectionEnd;
      let newPosition = startPosition - 1;
      if (newPosition < 0) {
          newPosition = 0;
      } 
      area.focus()
      area.selectionStart = newPosition;
      area.selectionEnd = area.selectionStart;
  },

  _changePositionRight() {
      let area = document.querySelector('.use-keyboard-input')
      const startPosition = area.selectionEnd;
      let newPosition = startPosition + 1;
      area.focus()
      area.selectionStart = newPosition;
      area.selectionEnd = area.selectionStart;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
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

    for (const key of this.elements.keys) {
      if(key.childElementCount === 0) {
        if (this.properties.language === 'en') {
          if (this.properties.shift) {
            switch(key.textContent) {
              case '1':
                key.textContent = '!'
                break;
              case '2':
                key.textContent = '@'
                break;
              case '3':
                key.textContent = '#'
                break;
              case '4':
                key.textContent = '$'
                break;
              case '5':
                key.textContent = '%'
                break;
              case '6':
                key.textContent = '^'
                break;
              case '7':
                key.textContent = '&'
                break;
              case '8':
                key.textContent = '*'
                break;
              case '9':
                key.textContent = '('
                break;
              case '0':
                key.textContent = ')'
                break;
              case '[':
                key.textContent = '{'
                break;
              case ']':
                key.textContent = '}'
                break;
              case ';':
                key.textContent = ':'
                break;
              case "'":
                key.textContent = "'"
                break;
              case ',':
                key.textContent = '<'
                break;
              case '.':
                key.textContent = '>'
                break;
              case '/':
                key.textContent = '?'
                break;
              }
          } else {
            switch(key.textContent) {
              case '!':
                key.textContent = '1'
                break;
              case '@':
                key.textContent = '2'
                break;
              case '#':
                key.textContent = '3'
                break;
              case '$':
                key.textContent = '4'
                break;
              case '%':
                key.textContent = '5'
                break;
              case '^':
                key.textContent = '6'
                break;
              case '&':
                key.textContent = '7'
                break;
              case '*':
                key.textContent = '8'
                break;
              case '(':
                key.textContent = '9'
                break;
              case ')':
                key.textContent = '0'
                break;
              case '{':
                key.textContent = '['
                break;
              case '}':
                key.textContent = ']'
                break;
              case ':':
                key.textContent = ';'
                break;
              case "'":
                key.textContent = "'"
                break;
              case '<':
                key.textContent = ','
                break;
              case '>':
                key.textContent = '.'
                break;
              case '?':
                key.textContent = '/'
                break;
              }
            }
          } else if (this.properties.language === 'ru') {
            if (this.properties.shift) {
              switch(key.textContent) {
                case '1':
                  key.textContent = '!'
                  break;
                case '2':
                  key.textContent = "'"
                  break;
                case '3':
                  key.textContent = '???'
                  break;
                case '4':
                  key.textContent = ';'
                  break;
                case '5':
                  key.textContent = '%'
                  break;
                case '6':
                  key.textContent = ':'
                  break;
                case '7':
                  key.textContent = '?'
                  break;
                case '8':
                  key.textContent = '*'
                  break;
                case '9':
                  key.textContent = '('
                  break;
                case '0':
                  key.textContent = ')'
                  break;
                case '.':
                  key.textContent = ','
                  break;
              }
            } else {
              switch(key.textContent) {
                case '!':
                  key.textContent = '1'
                  break;
                case "'":
                  key.textContent = '2'
                  break;
                case '???':
                  key.textContent = '3'
                  break;
                case ';':
                  key.textContent = '4'
                  break;
                case '%':
                  key.textContent = '5'
                  break;
                case ':':
                  key.textContent = '6'
                  break;
                case '?':
                  key.textContent = '7'
                  break;
                case '*':
                  key.textContent = '8'
                  break;
                case '(':
                  key.textContent = '9'
                  break;
                case ')':
                  key.textContent = '0'
                  break;
                case ',':
                  key.textContent = '.'
                  break;
                }
              }
            }          
          }
        }
      },

  _toggleEnRu() {
    if (this.properties.language === 'en') {
      this.properties.language = 'ru';
      localStorage.setItem('lang', 'ru');
    } else {
      this.properties.language = 'en';
      localStorage.setItem('lang', 'en');
    }
    for (const key of this.elements.keys) {
    if(key.childElementCount === 0) {
      if (this.properties.language === 'ru') {
        switch (key.textContent) {
          case 'q':
            key.textContent = '??'
            break;
          case 'w':
            key.textContent = '??'
            break;
          case 'e':
            key.textContent = '??'
            break;
          case 'r':
            key.textContent = '??'
            break;
          case 't':
            key.textContent = '??'
            break;
          case 'y':
            key.textContent = '??'
            break;
          case 'u':
            key.textContent = '??'
            break;
          case 'i':
            key.textContent = '??'
            break;
          case 'o':
            key.textContent = '??'
            break;
          case 'p':
            key.textContent = '??'
            break; 
          case 'en':
            key.textContent = 'ru'
            break;         
          case 'a':
            key.textContent = '??'
            break;
          case 's':
            key.textContent = '??'
            break;
          case 'd':
            key.textContent = '??'
            break;
          case 'f':
            key.textContent = '??'
            break;
          case 'g':
            key.textContent = '??'
            break;
          case 'h':
            key.textContent = '??'
            break;
          case 'j':
            key.textContent = '??'
            break;
          case 'k':
            key.textContent = '??'
            break;
          case 'l':
            key.textContent = '??'
            break;          
          case 'z':
            key.textContent = '??'
            break;
          case 'x':
            key.textContent = '??'
            break;
          case 'c':
            key.textContent = '??'
            break;
          case 'v':
            key.textContent = '??'
            break;
          case 'b':
            key.textContent = '??'
            break;
          case 'n':
            key.textContent = '??'
            break;
          case 'm':
            key.textContent = '??'
            break;
          case ',':
            key.textContent = '??'
            break;
          case '/':
            key.textContent = '??'
            break;
          case '.':
            key.textContent = '.'
            break;
          case ';':
            key.textContent = '??'
            break;
          case "'":
            key.textContent = '??'
            break;
          case '[':
            key.textContent = '??'
            break;
          case ']':
            key.textContent = '??'
            break;          
          }
        } else {
          switch (key.textContent) {
          case '??':
            key.textContent = 'q'
            break;
          case '??':
            key.textContent = 'w'
            break;
          case '??':
            key.textContent = 'e'
            break;
          case '??':
            key.textContent = 'r'
            break;
          case '??':
            key.textContent = 't'
            break;
          case '??':
            key.textContent = 'y'
            break;
          case '??':
            key.textContent = 'u'
            break;
          case '??':
            key.textContent = 'i'
            break;
          case '??':
            key.textContent = 'o'
            break;
          case '??':
            key.textContent = 'p'
            break; 
          case 'ru':
            key.textContent = 'en'
            break;         
          case '??':
            key.textContent = 'a'
            break;
          case '??':
            key.textContent = 's'
            break;
          case '??':
            key.textContent = 'd'
            break;
          case '??':
            key.textContent = 'f'
            break;
          case '??':
            key.textContent = 'g'
            break;
          case '??':
            key.textContent = 'h'
            break;
          case '??':
            key.textContent = 'j'
            break;
          case '??':
            key.textContent = 'k'
            break;
          case '??':
            key.textContent = 'l'
            break;          
          case '??':
            key.textContent = 'z'
            break;
          case '??':
            key.textContent = 'x'
            break;
          case '??':
            key.textContent = 'c'
            break;
          case '??':
            key.textContent = 'v'
            break;
          case '??':
            key.textContent = 'b'
            break;
          case '??':
            key.textContent = 'n'
            break;
          case '??':
            key.textContent = 'm'
            break;
          case '??':
            key.textContent = ','
            break;
          case '??':
            key.textContent = '/'
            break;
          case '.':
            key.textContent = '.'
            break;
          case '??':
            key.textContent = ';'
            break;
          case '??':
            key.textContent = "'"
            break;
          case '??':
            key.textContent = '['
            break;
          case '??':
            key.textContent = ']'
            break;          
         }
        }
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
