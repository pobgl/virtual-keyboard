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
    language: 'en',    
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
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
        ru: ['3', '№'],
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
        ru: 'й',
      },
      {
        en: 'w',
        ru: 'ц',
      },
      {
        en: 'e',
        ru: 'у',
      },
      {
        en: 'r',
        ru: 'к',
      },
      {
        en: 't',
        ru: 'е',
      },
      {
        en: 'y',
        ru: 'н',
      },
      {
        en: 'u',
        ru: 'г',
      },
      {
        en: 'i',
        ru: 'ш',
      },
      {
        en: 'o',
        ru: 'щ',
      },
      {
        en: 'p',
        ru: 'з',
      },
      {
        en: 'en',
        ru: 'ru'
      },      
      {
        en: 'caps',
        ru: 'caps',
      },
      {
        en: 'a',
        ru: 'ф',
      },
      {
        en: 's',
        ru: 'ы',
      },
      {
        en: 'd',
        ru: 'в',
      },
      {
        en: 'f',
        ru: 'а',
      },
      {
        en: 'g',
        ru: 'п',
      },
      {
        en: 'h',
        ru: 'р',
      },
      {
        en: 'j',
        ru: 'о',
      },
      {
        en: 'k',
        ru: 'л',
      },
      {
        en: 'l',
        ru: 'д',
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
        ru: 'я',
      },
      {
        en: 'x',
        ru: 'ч',
      },
      {
        en: 'c',
        ru: 'с',
      },
      {
        en: 'v',
        ru: 'м',
      },
      {
        en: 'b',
        ru: 'и',
      },
      {
        en: 'n',
        ru: 'т',
      },
      {
        en: 'm',
        ru: 'ь',
      },
      {
        en: [',', '<'],
        ru: 'б',
      },
      {
        en: ['.', '>'],
        ru: 'ю',
      },
      {
        en: ['/', '?'],
        ru: ['.', ','],
      },      
      {
        en: 'done',
        ru: 'done',
      },
      {
        en: [';', ':'],
        ru: 'ж',
      },
      {
        en: ["'", "'"],
        ru: 'э',
      },
      {
        en: 'space',
        ru: 'space',
      },
      {
        en: ['[', '{'],
        ru: 'х',
      },
      {
        en: [']', '}'],
        ru: 'ъ',
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
      insertLineBreak = ['backspace', 'en', 'ru', 'enter', '/'];         

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
            let area = document.querySelector('.use-keyboard-input');            
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
                  key.textContent = '№'
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
                case '№':
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
    } else {
      this.properties.language = 'en';
    }
    for (const key of this.elements.keys) {
    if(key.childElementCount === 0) {
      if (this.properties.language === 'ru') {
        switch (key.textContent) {
          case 'q':
            key.textContent = 'й'
            break;
          case 'w':
            key.textContent = 'ц'
            break;
          case 'e':
            key.textContent = 'у'
            break;
          case 'r':
            key.textContent = 'к'
            break;
          case 't':
            key.textContent = 'е'
            break;
          case 'y':
            key.textContent = 'н'
            break;
          case 'u':
            key.textContent = 'г'
            break;
          case 'i':
            key.textContent = 'ш'
            break;
          case 'o':
            key.textContent = 'щ'
            break;
          case 'p':
            key.textContent = 'з'
            break;          
          case 'a':
            key.textContent = 'ф'
            break;
          case 's':
            key.textContent = 'ы'
            break;
          case 'd':
            key.textContent = 'в'
            break;
          case 'f':
            key.textContent = 'а'
            break;
          case 'g':
            key.textContent = 'п'
            break;
          case 'h':
            key.textContent = 'р'
            break;
          case 'j':
            key.textContent = 'о'
            break;
          case 'k':
            key.textContent = 'л'
            break;
          case 'l':
            key.textContent = 'д'
            break;          
          case 'z':
            key.textContent = 'я'
            break;
          case 'x':
            key.textContent = 'ч'
            break;
          case 'c':
            key.textContent = 'с'
            break;
          case 'v':
            key.textContent = 'м'
            break;
          case 'b':
            key.textContent = 'и'
            break;
          case 'n':
            key.textContent = 'т'
            break;
          case 'm':
            key.textContent = 'ь'
            break;
          case ',':
            key.textContent = 'б'
            break;
          case '.':
            key.textContent = 'ю'
            break;
          case '/':
            key.textContent = '.'
            break;
          case ';':
            key.textContent = 'ж'
            break;
          case "'":
            key.textContent = 'э'
            break;
          case '[':
            key.textContent = 'х'
            break;
          case ']':
            key.textContent = 'ъ'
            break;
          case 'en':
            key.textContent = 'ru'
            break;
          }
        } else {
          switch (key.textContent) {
          case 'й':
            key.textContent = 'q'
            break;
          case 'ц':
            key.textContent = 'w'
            break;
          case 'у':
            key.textContent = 'e'
            break;
          case 'к':
            key.textContent = 'r'
            break;
          case 'е':
            key.textContent = 't'
            break;
          case 'н':
            key.textContent = 'y'
            break;
          case 'г':
            key.textContent = 'u'
            break;
          case 'ш':
            key.textContent = 'i'
            break;
          case 'щ':
            key.textContent = 'o'
            break;
          case 'з':
            key.textContent = 'p'
            break;          
          case 'ф':
            key.textContent = 'a'
            break;
          case 'ы':
            key.textContent = 's'
            break;
          case 'в':
            key.textContent = 'd'
            break;
          case 'а':
            key.textContent = 'f'
            break;
          case 'п':
            key.textContent = 'g'
            break;
          case 'р':
            key.textContent = 'h'
            break;
          case 'о':
            key.textContent = 'j'
            break;
          case 'л':
            key.textContent = 'k'
            break;
          case 'д':
            key.textContent = 'l'
            break;          
          case 'я':
            key.textContent = 'z'
            break;
          case 'ч':
            key.textContent = 'x'
            break;
          case 'с':
            key.textContent = 'c'
            break;
          case 'м':
            key.textContent = 'v'
            break;
          case 'и':
            key.textContent = 'b'
            break;
          case 'т':
            key.textContent = 'n'
            break;
          case 'ь':
            key.textContent = 'm'
            break;
          case 'б':
            key.textContent = ','
            break;
          case 'ю':
            key.textContent = '.'
            break;
          case '.':
            key.textContent = '/'
            break;
          case 'ж':
            key.textContent = ';'
            break;
          case 'э':
            key.textContent = "'"
            break;
          case 'х':
            key.textContent = '['
            break;
          case 'ъ':
            key.textContent = ']'
            break;
          case 'ru':
            key.textContent = 'en'
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
