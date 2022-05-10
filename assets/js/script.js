const arrKeys = [["Backquote","`","Ё"],["Digit1","1"],["Digit2","2"],["Digit3","3"],["Digit4","4"],["Digit5","5"],["Digit6","6"],["Digit7","7"],["Digit8","8"],["Digit9","9"],["Digit0","0"],["NumpadSubtract","-"],["Equal","="],["Backspace","Backspace"],
                ["Tab","Tab"],["KeyQ","Q","Й"],["KeyW","W","Ц"],["KeyE","E","У"],["KeyR","R","К"],["KeyT","T","Е"],["KeyY","Y","Н"],["KeyU","U","Г"],["KeyI","I","Ш"],["KeyO","O","Ў"],["KeyP","P","З"],["BracketLeft","[","Х"],["BracketRight","]","'"],["Backslash","\\"],[46,"DEL"],
                ["CapsLock","Caps Lock"],["KeyA","A","Ф"],["KeyS","S","Ы"],["KeyD","D","В"],["KeyF","F","А"],["KeyG","G","П"],["KeyH","H","Р"],["KeyJ","J","О"],["KeyK","K","Л"],["KeyL","L","Д"],["Semicolon",";","Ж"],["Quote","'","Э"],["Enter","ENTER"],
                ["ShiftLeft","Shift"],["KeyZ","Z","Я"],["KeyX","X","Ч"],["KeyC","C","С"],["KeyV","V","М"],["KeyB","B","І"],["KeyN","N","Т"],["KeyM","M","Ь"],["NumpadDecimal",",","Б"],["Period",".","Ю"],["Slash","/"],["ShiftRight","Shift"],["ArrowUp","&#9650;"],
                ["ControlLeft","Ctrl"],["MetaLeft","Win"],["AltLeft","Alt"],["Space","&nbsp;"],["AltRight","Alt"],["ControlRight","Ctrl"],["ArrowLeft","&#9668;"],["ArrowDown","&#9660;"],["ArrowRight","&#9658;"]];
const KEYMANAG = ["Backspace","Tab","DEL","Caps Lock","ENTER","Shift","Ctrl","Win","Alt","&#9650;","&#9668;","&#9660;","&#9658;"];
const ARROWS = ["&#9650;","&nbsp;","&#9668;","&#9660;","&#9658;"];
creatKeys();
function creatKeys() {
    const KEYBOARD = document.createElement('div');
    KEYBOARD.classList.add('keyboard');
    KEYBOARD.innerHTML = '<textarea></textarea><div class="keyboard-keys"></div>';
    document.body.prepend(KEYBOARD);
    arrKeys.forEach(el => {
        let key = document.createElement('button');
        key.classList.add('key');
        key.setAttribute('value', el[0]);
        if (KEYMANAG.includes(el[1])) key.classList.add('key-manage');
        const KEYLEFT = ["Backspace", "DEL", "ENTER", "&#9650;", "&#9658;"].indexOf(el[1]) !== -1;
        switch (el[1]) {
            case "Backspace": key.classList.add('backspace');
            break;
            case "Tab": key.classList.add('tab');
            break;
            case "Caps Lock": key.classList.add('caps-lock', 'caps-lock-light', 'caps-lock-active');
            break;
            case "ENTER": key.classList.add('enter');
            break;
            case "Shift": key.classList.add('shift');
            break;
            case "Ctrl": key.classList.add('ctrl');
            break;
            case "&nbsp;": key.classList.add('space');
        }
        if (!ARROWS.includes(el[1])) {key.textContent = el[1];} 
        else { key.innerHTML = el[1]};
        if (KEYLEFT) {key.style.marginRight = 0};
        key.addEventListener('keydown', keyPress);
        key.addEventListener('keyup', keyPress);
        key.addEventListener('click', inputKeyTextarea);
        key.addEventListener('keydown', inputKeyTextarea);
        document.querySelector('.keyboard-keys').append(key);
    });
    
    let par = document.createElement('p');
    par.classList.add('class-p');
    par.textContent = "Switch the language - Ctrl + Shift";
    par.addEventListener('click', checkLangClick);
    document.querySelector('.keyboard').append(par);
    document.querySelector('[value=Space]').focus();
}
function keyPress(e) {
    document.querySelectorAll('.key').forEach(el => {
        if(el.value == e.code || el.value == e.keyCode) {
            el.classList.toggle('key-down');
        }
    })
}
function checkLangInit () {
    let index = 1;
    if (localStorage.getItem('lang') == "BY") index = 2;
    changeLang(index);
}
function checkLangClick () {
    let index = 1;
    if (localStorage.getItem('lang') == "EN" || localStorage.getItem('lang') == null) {
        index = 2;
        localStorage.setItem('lang', "BY");
    } else {
        index = 1;
        localStorage.setItem('lang', "EN");
    }
    changeLang(index);
}
function changeLang(ind) {
    for (let elKey of arrKeys) {
        if (elKey[2] == undefined) continue;
        let key = document.querySelector(`[value=${elKey[0]}]`);
        key.textContent = elKey[ind];
    }
}
function inputKeyTextarea(e) {
    const TEXTAREA = document.querySelector('textarea');
    if(!e.target.classList.contains('key-manage')) {
        TEXTAREA.value += e.target.textContent;
    } else {
        if(e.target.value == 'Backspace') {
            TEXTAREA.value = TEXTAREA.value.substring(0, TEXTAREA.value.length - 1);
        }
        if(e.target.value == 'CapsLock' || e.code == 'CapsLock') {
            let caps = document.querySelector('[value=CapsLock]');
            caps.classList.toggle('caps-lock-active');
            let keysChar = document.querySelectorAll('.key:not(.key-manage)');
            if(caps.classList.contains('caps-lock-active')) {
                keysChar.forEach(el => el.textContent = el.textContent.toUpperCase());
            } else {
                keysChar.forEach(el => el.textContent = el.textContent.toLowerCase());
            }
        }
        if(e.repeat) {
            checkLangClick();
            console.log("fgh");
        }
    }
}
window.addEventListener('load', checkLangInit);