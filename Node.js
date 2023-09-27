const fs = require('fs'),
      {remote} = require('electron'),
      clipboardy    = require('clipboardy'),
      BrowserWindow = remote.BrowserWindow;

const LOAD_IMAGE = '.UP43G',
      NEW_POST = '.glyphsSpriteNew_post__outline__24__grey_9.u-__7';

function get_files(path){
    return fs.readdirSync(path, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => __dirname + '/../../' + path + '/' + dirent.name);
}

function randomRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createWindow (session_id, hidden) {
    win = new BrowserWindow({
        width: 500,
        height: 500
    });
    win.loadURL('https://www.instagram.com');
    return win;
}

////select the files to upload////

var files = UPLOAD_POST_FOLDER_CUSTOM
var file_to_upload = files[randomRange(0, files.length - 1)];

///////////////////////////////////////

function async upload_image(){
    // click the upload button on the page
    await electron_window.webContents.executeJavaScript(`
        async function click_upload_button(){
            let new_post_button = document.querySelector('${NEW_POST}');
            await sleep(1000);
            new_post_button.click()
        }
        click_upload_button();
    `);
    // write the path of the file and press enter in the file selector
    await sleep(500);
    let previous_clipboard = clipboardy.readSync();
    clipboardy.writeSync(file_to_upload);
    await fake_input.keyTap('l', 'control');
    await fake_input.keyTap('v', 'control');
    await fake_input.keyTap('enter');
    clipboardy.writeSync(previous_clipboard);       
    await sleep(2000);

}