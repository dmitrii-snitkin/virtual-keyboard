class Keyboard {

    constructor (textarea) {
        this.textarea = textarea;
        this.isCapsLock = false;
        this.isShift = false;
        this.lingua = 'ENG';
        this.letterShiftedSetEng = {
            '49': ['1', '!'],
            '50': ['2', '@'],
            '51': ['3', '#'],
            '52': ['4', '$'],
            '53': ['5', '%'],
            '54': ['6', '^'],
            '55': ['7', '&'],
            '56': ['8', '*'],
            '57': ['9', '('],
            '48': ['0', ')'],
            '188': [',', '<'],
            '190': ['.', '>'],
            '191': ['/', '?'],
            '219': ['[', '{'],
            '221': [']', '}'],
            '220': ['\\', '|'],
            '186': [';', ':'],
            '222': ['\'', '"'],
            '189': ['-', '_'],
            '187': ['=', '+'],
            '192': ['`', '~'],
        };
        
        this.letterSetEng = {
            '65': 'a',
            '66': 'b',
            '67': 'c',
            '68': 'd',
            '69': 'e',
            '70': 'f',
            '71': 'g',
            '72': 'h',
            '73': 'i',
            '74': 'j',
            '75': 'k',
            '76': 'l',
            '77': 'm',
            '78': 'n',
            '79': 'o',
            '80': 'p',
            '81': 'q',
            '82': 'r',
            '83': 's',
            '84': 't',
            '85': 'u',
            '86': 'v',
            '87': 'w',
            '88': 'x',
            '89': 'y',
            '90': 'z',
        };
		
        this.letterShiftedSetRus = {
            '49': ['1', '!'],
            '50': ['2', '"'],
            '51': ['3', '№'],
            '52': ['4', ';'],
            '53': ['5', '%'],
            '54': ['6', ':'],
            '55': ['7', '?'],
            '56': ['8', '*'],
            '57': ['9', '('],
            '48': ['0', ')'],
            '191': ['.', ','],
            '220': ['\\', '/'],
            '189': ['-', '_'],
            '187': ['=', '+'],
        };
		
        this.letterSetRus = {
            '65': 'ф',
            '66': 'и',
            '67': 'с',
            '68': 'в',
            '69': 'у',
            '70': 'а',
            '71': 'п',
            '72': 'р',
            '73': 'ш',
            '74': 'о',
            '75': 'л',
            '76': 'д',
            '77': 'ь',
            '78': 'т',
            '79': 'щ',
            '80': 'з',
            '81': 'й',
            '82': 'к',
            '83': 'ы',
            '84': 'е',
            '85': 'г',
            '86': 'м',
            '87': 'ц',
            '88': 'ч',
            '89': 'н',
            '90': 'я',
            '219': 'х',
            '221': 'ъ',
            '186': 'ж',
            '222': 'э',
            '188': 'б',
            '190': 'ю',
            '192': 'ё',
        };
        this.letterShiftedSet = this.letterShiftedSetEng;
        this.letterSet = this.letterSetEng;
    }

    addChar(char) {
        let start = this.textarea.selectionStart;
        let end = this.textarea.selectionEnd;
        this.textarea.setRangeText(char, start, end, 'end');
        this.textarea.focus();
    }

    deleteChar() {
        let start = this.textarea.selectionStart;
        let end = this.textarea.selectionEnd;
        if (start !== end) {
            this.textarea.setRangeText('', start, end, 'end');
        } else {
            let content = this.textarea.value;
            let firstPart = content.substring(0, start - 1);
            let secondPart = content.substring(start, content.length);
            this.textarea.value = `${firstPart}${secondPart}`;
            this.textarea.setSelectionRange(start - 1, start - 1)
        }
    }

    changeCapsLock() {
        this.isCapsLock = !(this.isCapsLock);
    }

    linguaChange() {
        if (this.lingua == 'ENG') {
            this.lingua = 'РУС';
            this.letterShiftedSet = this.letterShiftedSetRus;
            this.letterSet = this.letterSetRus;
        } else if (this.lingua == 'РУС') {
            this.lingua = 'ENG';
            this.letterShiftedSet = this.letterShiftedSetEng;
            this.letterSet = this.letterSetEng;
        }
    }

    toLeft () {
        let start = this.textarea.selectionStart;
        let end = this.textarea.selectionEnd;

        if (start == 0 && this.textarea.selectionDirection == 'backward') {
            return;
        }

        if (this.isShift) {
            
			if (start == end) {
				this.textarea.setSelectionRange(start - 1, end);
				this.textarea.selectionDirection = 'backward';
			} else if (this.textarea.selectionDirection == 'backward') {
				this.textarea.setSelectionRange(start - 1, end);
				this.textarea.selectionDirection = 'backward';
			} else {
				this.textarea.setSelectionRange(start, end - 1);
			}
			
        } else {
            if (start == end) {
                this.textarea.setSelectionRange(start - 1, start - 1);
            } else {
                this.textarea.setSelectionRange(start, start);
            }
        }
    }

    toRight () {
        let start = this.textarea.selectionStart;
        let end = this.textarea.selectionEnd;

        if (this.isShift) {
				if (this.textarea.selectionDirection == 'forward') {
					this.textarea.setSelectionRange(start, end + 1);
				} else {
					this.textarea.setSelectionRange(start + 1, end);
					this.textarea.selectionDirection = 'backward';
				}
        } else {
            if (start == end) {
                this.textarea.setSelectionRange(end + 1, end + 1);
            } else {
                this.textarea.setSelectionRange(end, end);
            }
        }
    }
	
	getLineNumber (position) {
		let textareaArray = this.textarea.value.split('\n');
		let linesLength = textareaArray[0].length;
		if (position <= linesLength) {
			return 0;
		}
		for (let i = 1; i < textareaArray.length; i++) {
			linesLength += textareaArray[i].length + 1;
			if (position <= linesLength) {
				return i;
			}
		}
	}
	
	getPositionInLine (position) {
		let textareaArray = this.textarea.value.split('\n');
		let linesLength = textareaArray[0].length;
		if (position <= linesLength) {
			return position;
		}
		for (let i = 1; i < textareaArray.length; i++) {
			linesLength += textareaArray[i].length + 1;
			if (position <= linesLength) {
				let positionInLine = textareaArray[i].length - (linesLength - position);
				return positionInLine;
			}
		}
	}
	
	toUp () {
		console.log('direction before: ' + this.textarea.selectionDirection);
		let start = this.textarea.selectionStart;
        let end = this.textarea.selectionEnd;
		let startNew = start;
		let endNew = end;
		let startLine = this.getLineNumber(start);
		let endLine = this.getLineNumber(end);
		let currentPosition = this.textarea.selectionDirection == 'forward' ? end : start;
		let currentLine = this.getLineNumber(currentPosition);
		let textareaArray = this.textarea.value.split('\n');
		let positionInLine = this.getPositionInLine(start);
		let prevLineLength = textareaArray[currentLine - 1] ? textareaArray[currentLine - 1].length : 0;
		
		if (prevLineLength < positionInLine) {
				endNew = end - positionInLine - 1;
				startNew = start - positionInLine - 1;
		} else {
				endNew = end - prevLineLength - 1;
				startNew = start - prevLineLength - 1;
		}
		
		if (startLine == 0) {
			if (start == end) {
				if (this.isShift) {
					this.textarea.setSelectionRange(0, end);
					this.textarea.selectionDirection = 'backward';
				} else {
					this.textarea.setSelectionRange(0, 0);
				}
			} else {
				if (this.isShift) {
					if (this.textarea.selectionDirection == 'forward') {
						if (startLine == endLine) {
							this.textarea.setSelectionRange(start, start);
						} else {
							this.textarea.setSelectionRange(start, endNew);
							this.textarea.selectionDirection = 'forward';
						}
					} else {
						this.textarea.setSelectionRange(0, end);
						this.textarea.selectionDirection = 'backward';
					}
				} else {
					this.textarea.setSelectionRange(start, start);
				}
			}
		} else {
			if (this.isShift) {
				if (start == end) {
					console.log('start: ' + start, '; end: ' + end);
					console.log('startNew: ' + startNew, '; endNew: ' + endNew);
					this.textarea.setSelectionRange(startNew, end);
					this.textarea.selectionDirection = 'backward';
				} else {
					console.log('start: ' + start, '; end: ' + end);
					console.log('startNew: ' + startNew, '; endNew: ' + endNew);
					if (this.textarea.selectionDirection == 'forward') {
						if (startLine == endLine) {
							this.textarea.setSelectionRange(endNew, start);
							this.textarea.selectionDirection = 'backward';
						} else {
							if (endNew < start) {
								this.textarea.setSelectionRange(endNew, start);
								this.textarea.selectionDirection = 'backward';
							} else {
								this.textarea.setSelectionRange(start, endNew);
								this.textarea.selectionDirection = 'forward';
							}
						}
					} else {
						this.textarea.setSelectionRange(startNew, end);
						this.textarea.selectionDirection = 'backward';
					}	
				}
			} else {
				if (start == end) {
					this.textarea.setSelectionRange(startNew, startNew);
				} else {
					this.textarea.setSelectionRange(start, start);
				}
			}
		}
		console.log('direction after: ' + this.textarea.selectionDirection);
	}
	
	toDown () {
		let start = this.textarea.selectionStart;
        let end = this.textarea.selectionEnd;
		let startNew = start;
		let endNew = end;
		let textareaArray = this.textarea.value.split('\n');
		let startLine = this.getLineNumber(start);
		let endLine = this.getLineNumber(end);
		let currentPosition = this.textarea.selectionDirection == 'forward' ? end : start;
		let currentLine = this.getLineNumber(currentPosition);
		let positionInLine = this.getPositionInLine(currentPosition);
		let nextLineLength = textareaArray[currentLine + 1] ? textareaArray[currentLine + 1].length : 0;
		
		if (nextLineLength < positionInLine) {
			if (this.textarea.selectionDirection == 'forward') {
				endNew = end + (textareaArray[currentLine].length - positionInLine) + nextLineLength + 1;
			} else {
				startNew = start + (textareaArray[currentLine].length - positionInLine) + nextLineLength + 1;
			}
		} else {
			if (this.textarea.selectionDirection == 'forward') {
				endNew = end + textareaArray[currentLine].length + 1;
			} else {
				startNew = start + textareaArray[currentLine].length + 1;
			}
		}
		
		if (endLine == textareaArray.length - 1) {
			let veryEnd = this.textarea.value.length;			
			if (start == end) {
				if (this.isShift) {
					this.textarea.selectionDirection = 'forward';
					this.textarea.setSelectionRange(start, veryEnd);
				} else {
					this.textarea.setSelectionRange(veryEnd, veryEnd);
				}
			} else {
				if (this.isShift) {
					if (this.textarea.selectionDirection == 'forward') {
						this.textarea.setSelectionRange(start, veryEnd);
					} else {
						this.textarea.setSelectionRange(startNew, end);
						this.textarea.selectionDirection = 'backward';
					}
				} else {
					this.textarea.setSelectionRange(end, end);
				}		
			}
		} else {
			if (this.isShift) {
				if (start == end) {
					this.textarea.setSelectionRange(start, endNew);
					this.textarea.selectionDirection = 'forward';
				} else {
					if (this.textarea.selectionDirection == 'forward') {
						this.textarea.setSelectionRange(start, endNew);
					} else {
						if (startLine == endLine) {
							this.textarea.setSelectionRange(end, startNew);
							this.textarea.selectionDirection = 'forward';
						} else {
							if (startNew > end) {
								this.textarea.setSelectionRange(end, startNew);
								this.textarea.selectionDirection = 'farward';
							} else {
								this.textarea.setSelectionRange(startNew, end);
								this.textarea.selectionDirection = 'backward';
							}
							
							
							
							
						}
					}	
				}
			} else {
				if (start == end) {
					this.textarea.setSelectionRange(endNew, endNew);
				} else {
					this.textarea.setSelectionRange(end, end);
				}
				
			}
		}
	}
}

const audio = document.querySelector('.audio');
const textarea = document.querySelector('.textarea');
const keys = document.querySelectorAll('.key');
const keyLetters = document.querySelectorAll('.key-letter');
const keyBackSpace = document.querySelector('.key-backspace');
const keyTab = document.querySelector('.key-tab');
const keyCapsLock = document.querySelector('.key-capslock');
const keyEnter = document.querySelector('.key-enter');
const keyShift = document.querySelector('.key-shift');
const keySpace = document.querySelector('.key-space');
const keyLinguaChange = document.querySelector('.key-lingua-change');
const keyArrows = document.querySelectorAll('.key-arrow');
const keyArrowLeft = document.querySelector('.key-arrow-left');
const keyArrowRight = document.querySelector('.key-arrow-right');
const keyArrowUp = document.querySelector('.key-arrow-up');
const keyArrowDown = document.querySelector('.key-arrow-down');
const keySound = document.querySelector('.key-sound');


const keyboard = new Keyboard(textarea);
textarea.focus();

keys.forEach((item) => {
    
    if (item.dataset.keyCode != 20 && item.dataset.keyCode != 'lingua-change' && item.dataset.keyCode != 173) { 
        item.addEventListener('click', () => {
            textarea.focus();

            item.classList.add('active');
            setTimeout(() => {
                item.classList.remove('active');
            }, 100);

        });

        item.addEventListener('mouseup', () => {
            item.classList.remove('active');
        });

        item.addEventListener('mouseout', () => {
            item.classList.remove('active');
        });
    }

    item.addEventListener('mousedown', () => {
        item.classList.add('active');
    });

});

keyLetters.forEach((item) => item.addEventListener('mousedown', () => {
    keyboard.addChar(item.textContent);

    setTimeout(() => {
        audio.src = 'audio/letter.mp3';
        audio.play();
    }, 100);
}));

keyBackSpace.addEventListener('mousedown', () => {
    keyboard.deleteChar();

    setTimeout(() => {
        audio.src = 'audio/backspace.mp3';
        audio.play();
    }, 100);
});

keyTab.addEventListener('mousedown', () => {
    keyboard.addChar('  ');

    setTimeout(() => {
        audio.src = 'audio/tab.mp3';
        audio.play();
    }, 100);
});

keyCapsLock.addEventListener('mousedown', () => {
    setTimeout(() => {
        audio.src = 'audio/capslock.mp3';
        audio.play();
    }, 100);

    if (keyboard.isCapsLock) {
        keyCapsLock.classList.remove('active');
        keyLetters.forEach((item) => {
            item.textContent = item.textContent.toLowerCase();
        });
    } else {
        keyCapsLock.classList.add('active');
        keyLetters.forEach((item) => {
            item.textContent = item.textContent.toUpperCase();
        });
    }
    
    keyboard.changeCapsLock();
});

keyEnter.addEventListener('click', () => {
    setTimeout(() => {
        audio.src = 'audio/enter.mp3';
        audio.play();
    }, 100);

    keyboard.addChar('\n');
});

keyShift.addEventListener('mousedown', () => {
    setTimeout(() => {
        audio.src = 'audio/shift.mp3';
        audio.play();
    }, 100);

    keyboard.isShift = true;
    keyLetters.forEach((item) => {
        item.textContent = item.textContent.toUpperCase();
    });

    for (let prop in keyboard.letterShiftedSet) {
        if (keyboard.letterShiftedSet[prop] && prop) {
            document.querySelector(`.key[data-key-code="${prop}"]`).textContent = keyboard.letterShiftedSet[prop][1];
        }
    }
	
    keyShift.addEventListener('mouseout', () => {
        let event = new Event("mouseup");
        keyShift.dispatchEvent(event);
    });
});

keyShift.addEventListener('mouseup', () => {
    keyboard.isShift = false;
    if (!keyboard.isCapsLock) {
        keyLetters.forEach((item) => {
            item.textContent = item.textContent.toLowerCase();
        });
    }

    for (let prop in keyboard.letterShiftedSet) {
        if (keyboard.letterShiftedSet[prop] && prop) {
            document.querySelector(`.key[data-key-code="${prop}"]`).textContent = keyboard.letterShiftedSet[prop][0];
        }
    }
});

keySpace.addEventListener('mousedown', () => {
    setTimeout(() => {
        audio.src = 'audio/space.mp3';
        audio.play();
    }, 100);

    keyboard.addChar(' ');
});

keyArrows.forEach((item) => {
    item.addEventListener('mousedown', () => {
        setTimeout(() => {
            audio.src = 'audio/letter.mp3';
            audio.play();
        }, 100);
    });
});

keyArrowLeft.addEventListener('mousedown', () => {
    keyboard.toLeft();
});

keyArrowRight.addEventListener('mousedown', () => {
    keyboard.toRight();
});

keyArrowUp.addEventListener('mousedown', () => {
    keyboard.toUp();
});

keyArrowDown.addEventListener('mousedown', () => {
    keyboard.toDown();
});

keyLinguaChange.addEventListener('mousedown', () => {
    setTimeout(() => {
        audio.src = 'audio/letter.mp3';
        audio.play();
    }, 100);

    keys.forEach((item) => {
        item.classList.add('content-changing');
        item.classList.add('active');
    });

    setTimeout(() => {
        keyboard.linguaChange();
        keyLinguaChange.textContent = keyboard.lingua;
    
        for (let prop in keyboard.letterShiftedSet) {

            if (keyboard.letterShiftedSet[prop] && prop) {
                document.querySelector(`.key[data-key-code="${prop}"]`).textContent = keyboard.letterShiftedSet[prop][0];
            }
        }
    
        for (let prop in keyboard.letterSet) {

            if (keyboard.letterSet[prop] && prop) {
                document.querySelector(`.key[data-key-code="${prop}"]`).textContent = keyboard.letterSet[prop][0];
            }
        }
    
        if (keyboard.isCapsLock) {
            keyLetters.forEach((item) => {
                item.textContent = item.textContent.toUpperCase();
            });
        }

        if (keyboard.lingua == 'РУС') {
            textarea.placeholder = 'Введите текст...';
        } else if (keyboard.lingua == 'ENG') {
            textarea.placeholder = 'Type a text...';
        }
           
    }, 200);

    keyLinguaChange.addEventListener('mouseout', () => {
        let event = new Event("mouseup");
        keyLinguaChange.dispatchEvent(event);
    });
})

keyLinguaChange.addEventListener('mouseup', () => {
	keys.forEach((item) => {
		item.classList.remove('content-changing');
		
		if (item == keyCapsLock) {
			
			if (!keyboard.isCapsLock) {
				item.classList.remove('active');
			}

		} else if (item == keySound) {

			if (audio.muted !== true) {
				item.classList.remove('active');
			}

		} else {
			item.classList.remove('active');
		}
	});
});

keySound.addEventListener('mousedown', () => {
    setTimeout(() => {
        audio.src = 'audio/letter.mp3';
        audio.play();
    }, 100);

    if (audio.muted == true) {
        audio.muted = false;
        keySound.classList.remove('active');
        document.querySelector('.sound-img').src = 'icons/sound_on.png';
        document.querySelector('.sound-img').alt = 'Sound on';
    } else {
        audio.muted = true;
        keySound.classList.add('active');
        document.querySelector('.sound-img').src = 'icons/sound_off.png';
        document.querySelector('.sound-img').alt = 'Sound off';
    }
});

document.addEventListener('keydown', (e) => {
    
    if (e.keyCode == 13 || e.keyCode == 20) {
        document.querySelector(`.key[data-key-code="${e.keyCode}"]`).click();
    }

    if (e.keyCode == 16) {
        keyLetters.forEach((item) => {
            item.textContent = item.textContent.toUpperCase();
        });
    
        for (let prop in keyboard.letterShiftedSet) {
            if (keyboard.letterShiftedSet[prop] && prop) {
                document.querySelector(`.key[data-key-code="${prop}"]`).textContent = keyboard.letterShiftedSet[prop][1];
            }
        }
    }

    let event = new Event("mousedown");
    document.querySelector(`.key[data-key-code="${e.keyCode}"]`).dispatchEvent(event);
    
    e.preventDefault();
});

document.addEventListener('keyup', (e) => {
    let event = new Event("mouseup");
    document.querySelector(`.key[data-key-code="${e.keyCode}"]`).dispatchEvent(event);
});

document.addEventListener('keypress', (e) => {
    let event = new Event("click");
    document.querySelector(`.key[data-key-code="${e.keyCode}"]`).dispatchEvent(event);
});