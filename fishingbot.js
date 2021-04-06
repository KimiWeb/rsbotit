//kalastusbotti
var robot = require('robotjs');
function main() {
    console.log("Aloitetaan");
    sleep(6000);

    //ikuinen loop. sulkeutuu kun painaa terminaalissa ctrl + c
    while (true)  {
        var fish= findFish();
        //jos puuta ei löydy lähettää error viestin
        if (fish == false){
            rotateCamera();
            console.log('kalastuspaikkoja ei löytynyt');
            continue;
        }

        robot.moveMouse(fish.x, fish.y);
        sleep(1000);
        robot.mouseClick();
        sleep(18000);
        //pudottaa puut inventorysta
        dropLogs();
    }
}

  
function dropLogs() {
    var inventory_x = 575;
    var inventory_y = 323;
    var inventory1_x = 615;
    var inventory1_y = 323;
    //pudottaa kalat
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
    //pudottaa kalat toiselta riviltä
    robot.moveMouse(inventory1_x, inventory1_y);
    robot.mouseClick('right');
    sleep(1000);
    robot.moveMouse(inventory1_x- 5, inventory1_y + 40);
    robot.mouseClick();
    sleep(1000);
    robot.mouseClick('right');
    sleep(1000); 
    robot.moveMouse(inventory1_x- 5, inventory1_y + 80);
    sleep(100);
    robot.mouseClick();
    sleep(500);
    robot.mouseClick('right');
    sleep(1000);
    robot.moveMouse(inventory1_x- 5, inventory1_y + 115);
    sleep(100);
    robot.mouseClick();
    sleep(1000);   
    robot.mouseClick('right');
    sleep(1000);
    robot.moveMouse(inventory1_x- 5, inventory1_y + 160);
    sleep(100);
    robot.mouseClick();
    sleep(2000);    
}

function testScreenCapture() {
    var img = robot.screen.capture(0, 0, 1980, 1080);
    var pixel_color = img.colorAt(237, 343);
    var pixel_color1 = img.colorAt(259, 353);
    console.log(pixel_color);
    console.log(pixel_color1);
}
function findFish() {
    var x = 3, y = 57, width = 520, height = 340;
    var img = robot.screen.capture(x, y, width, height);
//löytää värit
    var tree_colors = ["465163"];

    for (var i = 0; i < 3000; i++) {
        var random_x = getRandomInt(0, width-1);
        var random_y = getRandomInt(0, height-1);
        var sample_color = img.colorAt(random_x, random_y);

        if (tree_colors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            console.log("Löydettiin kalat koordinaateista: " + screen_x + ", " + screen_y + " väri on " + sample_color);
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
