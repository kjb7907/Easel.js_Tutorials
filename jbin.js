var stage, w, h, loader;
var sky, grant, ground, hill, hill2;

function
getPixelRatio(context) {
    if (navigator.userAgent.match(/iPod/i)) {
        return 1;
    }
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
}

function doSetCanvasSize() {
    var ratio = getPixelRatio(canvas.getContext("2d"));
    //alert(ratio);
    w = window.innerWidth * ratio;
    h = window.innerHeight * ratio;
    wHf = Math.ceil(w >> 1);

    canvas.width = w;
    canvas.height = h;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
}

function resized() {
    doSetCanvasSize();
}

function init() {
    // examples.showDistractor();

    // Get canvas
    canvas = document.getElementById("testCanvas");
    canvas.getContext("2d").imageSmoothingEnabled = true;

    stage = new createjs.Stage(canvas);
    console.log(stage);

    doSetCanvasSize();

    // grab canvas width and height for later calculations:
    w = stage.canvas.width;
    h = stage.canvas.height;

    manifest = [
        {src: "SpriteCharacter.png", id: "grant"},
        {src: "Sky.png", id: "sky"},
        {src: "BlockRoad.png", id: "ground"}
        // {src: "hill1.png", id: "hill"},
        // {src: "hill2.png", id: "hill2"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "./images/");
}

function handleComplete() {
    // examples.hideDistractor();

    // 배경
    sky = new createjs.Shape();
    sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);
    //By default swapping between Stage for StageGL will not allow for vector drawing operation such as BitmapFill, useless you cache your shape.
    sky.cache(0, 0, w, h);

    // 하단 바닥
    var groundImg = loader.getResult("ground");
    ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
    ground.tileW = groundImg.width;
    ground.y = h - groundImg.height;

    //By default swapping between Stage for StageGL will not allow for vector drawing operation such as BitmapFill, useless you cache your shape.
    ground.cache(0, 0, w + groundImg.width, groundImg.height);

//            hill = new createjs.Bitmap(loader.getResult("hill"));
//            hill.setTransform(Math.random() * w, h - hill.image.height * 4 - groundImg.height, 4, 4);
//            hill.alpha = 0.5;
//
//            hill2 = new createjs.Bitmap(loader.getResult("hill2"));
//            hill2.setTransform(Math.random() * w, h - hill2.image.height * 3 - groundImg.height, 3, 3);

    var spriteSheet = new createjs.SpriteSheet({
        framerate: 30,
        "images": [loader.getResult("grant")],
        "frames": {width: 200, height: 220, regX: 100, regY: 220},
        "animations": {"run":{"frames":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"speed":0.2},"walkRt":{"frames":[3,4,6],"speed":0.08},"warpIn":{"frames":[7,7,7,7,8,9,10,11,12],"next":"standRt","speed":0.2}}
    });
    grant = new createjs.Sprite(spriteSheet, "run");
    grant.x = stage.canvas.width / 2;
    grant.y = stage.canvas.height/1.9
    ;

    stage.addChild(sky, hill, hill2, ground, grant);
    stage.addEventListener("stagemousedown", handleJumpStart);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function handleJumpStart() {
    grant.gotoAndPlay("jump");
}

function tick(event) {
    var deltaS = event.delta / 1000;
    var position = grant.x + 150 * deltaS;

//            var grantW = grant.getBounds().width * grant.scaleX;
//            grant.x = (position >= w + grantW) ? -grantW : position;

//     ground.x = (ground.x - deltaS * 150) % ground.tileW;
//            hill.x = (hill.x - deltaS * 30);
//            if (hill.x + hill.image.width * hill.scaleX <= 0) {
//                hill.x = w;
//            }
//            hill2.x = (hill2.x - deltaS * 45);
//            if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
//                hill2.x = w;
//            }

    stage.update(event);
}