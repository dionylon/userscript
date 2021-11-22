// ==UserScript==
// @name         wheelbarrow
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Let's start a WAR! Bilibili auto comment script.
// @author       Dionys
// @match        https://www.baidu.com/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

var EXPAND = false;
var RUNNING_CONFIG = {
    sendInterval: 1000, // comment send interval, ms
    textSplitMode: 'line', // none: send whole input text || line: once a line || chunck: send fixed size's text
    textSplitSize: 20, // only used in chunck mode, the size of the chunck in chars
}
function init() {
    console.log('init..');
}
function shootBullet(text) {
    if(!text)console.log('Empty text!');
    console.log(text);
    // TODO 开始发送
}

// attach action panel
function attachWeapon(items) {
    let baseWrapper = document.createElement('div');
    baseWrapper.classList.add('bbWeapon');

    let ctrlBtn = document.createElement('span');
    ctrlBtn.classList.add('bbw-ctrl-btn');
    ctrlBtn.style.background = '#4e6ef2';
    ctrlBtn.style.top = '.5rem';
    ctrlBtn.style.color = 'white';
    ctrlBtn.style.right = '.5rem';
    ctrlBtn.style.width = '16px';
    ctrlBtn.style.height = '16px';
    ctrlBtn.style.fontSize = '16px';
    ctrlBtn.style.lineHeight = '1';
    ctrlBtn.style.textAlign = 'center';
    ctrlBtn.style.transform = 'rotate(45deg)';
    ctrlBtn.style.cursor = 'pointer';
    ctrlBtn.innerHTML = '+';
    ctrlBtn.addEventListener('click', e=> {
        EXPAND = !EXPAND;
        if(!EXPAND) {
            let panels = baseWrapper.getElementsByClassName('bbw-config-panel');
            if(panels){
                for(let p of panels)baseWrapper.removeChild(p);
            }
        }else{
            let configPanel = document.createElement('div');
            configPanel.innerHTML = '<br/>';
            configPanel.classList.add('bbw-config-panel', 'bg');
            // 输入框（用于输入文本，能支持大段的文本，考虑加入打开文件功能）
            let inputArea = document.createElement('textarea');
            inputArea.type = 'text';
            inputArea.style = 'background: #eeeeee; font-size:12pt;';
            inputArea.innerHTML = '发一条友善的评论:)';
            inputArea.rows = 5;
            inputArea.cols = 40;
            inputArea.id = 'bbw-text';
            configPanel.append(inputArea);
            // 条件选择框（配置触发时间间隔和文本分割的模式

            // 启动按钮
            let startBtn = document.createElement('span');
            startBtn.innerHTML = '启动';
            startBtn.addEventListener('click', e=>{
                let textArea = document.getElementById('bbw-text');
                if(!textArea){
                    console.log('配置出错！ ');
                    return;
                }
                let text = textArea.value;
                shootBullet(text);
            });
            configPanel.append(startBtn);
            baseWrapper.append(configPanel);
        }
    });

    baseWrapper.append(ctrlBtn);
    items.append(baseWrapper);
}

function test() {
    let keywordInput = document.getElementById("form");
    console.log(keywordInput);
    attachWeapon(keywordInput);
}

test();