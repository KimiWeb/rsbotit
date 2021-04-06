var robot = require('robotjs');
let Jimp = require('jimp')
function main() {
    console.log("Aloitetaan");
    sleep(6000);

    //ikuinen loop. sulkeutuu kun painaa terminaalissa ctrl + c
    while (true)  {
        var tree = findTree();
        //jos puuta ei löydy lähettää error viestin
        if (tree == false){
            rotateCamera();
            console.log('Puita ei löytynyt');
            continue;
        }

        robot.moveMouse(tree.x, tree.y);
        sleep(1000);
        robot.mouseClick();
        sleep(14000);
        //pudottaa puut inventorysta
        dropLogs();
    }
}

  
function dropLogs() {
    var inventory_x = 575;
    var inventory_y = 323;

    //pudottaa logit
    robot.moveMouse(inventory_x, inventory_y);
    robot.mouseClick('right');
    sleep(1000);
    robot.moveMouse(inventory_x- 5, inventory_y + 40);
    robot.mouseClick();
    sleep(1000);
    robot.mouseClick('right');
    sleep(1000); 
    robot.moveMouse(inventory_x- 5, inventory_y + 80);
    sleep(100);
    robot.mouseClick();
    sleep(500);
    robot.mouseClick('right');
    sleep(1000);
    robot.moveMouse(inventory_x- 5, inventory_y + 115);
    sleep(100);
    robot.mouseClick();
    sleep(1000);   
    robot.mouseClick('right');
    sleep(1000);
    robot.moveMouse(inventory_x- 5, inventory_y + 160);
    sleep(100);
    robot.mouseClick();
    sleep(2000);    
}

function testScreenCapture() {
    var img = robot.screen.capture(0, 0, 1980, 1080);
    var pixel_color = img.colorAt(369, 235);
    console.log(pixel_color);
}
function findTree() {
    var x = 3, y = 57, width = 520, height = 340;
    var img = robot.screen.capture(x, y, width, height);
//löytää värit
    var tree_colors = ["242b0a", "191915", "2d360b", "4f5f11"];

    for (var i = 0; i < 3000; i++) {
        var random_x = getRandomInt(0, width-1);
        var random_y = getRandomInt(0, height-1);
        var sample_color = img.colorAt(random_x, random_y);

        if (tree_colors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            console.log("Löydettiin puu koordinaateista: " + screen_x + ", " + screen_y + " väri on " + sample_color);
            return {x: screen_x, y: screen_y};
        }
    }
    //ei kuvaa screen shotissa
    return false;
}

function rotateCamera() {
    console.log("Rotaing camera");
    robot.keyToggle('right', 'down');
    sleep(1000);
    robot.keyToggle('right', 'up');
}

function sleep (ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
testScreenCapture();
main();




//Jos haluaa ottaa testi kuvan robotilla sen voi tehdä alla olevalla koodilla. Pitää muistaa ottaa koodi pois kommentoinnista.
/*
var width = 520, height = 340;
var fileName = 'image4'
const img = robot.screen.capture(3, 57, width, height).image;
new Jimp({data: img, width, height}, (err, image) => {
      image.write(fileName);
});
var x = 3, y = 57, width = 520, height = 340;
*/

//kuvan kaappaus funktio
function screenCaptureToFile2(robotScreenPic, path) {
    return new Promise((resolve, reject) => {
        try {
            const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
            let pos = 0;
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
                image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
            });
            image.write(path, resolve);
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
}

/*
var pic = robot.screen.capture();
screenCaptureToFile2(pic);
*/
