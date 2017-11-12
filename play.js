var sH = 210;
var canvas, stage, skyDrop, w, h, wHf, loader;
var manifest;
var loadingContainer;
var loadingContainerShadowLayer, loadingBackgroundLayer, loadingShadow, loadingProgressText;
var imgs;
var spriteSheets = {};
var sps = {};
var isAllImageLoaded = false;
var isTransitioningToStart = false;
var isWarpingIn = false;
var isTransformingTukTuk = false;
var walkDirection = 1;
var isWalking = false;
var isMouseDown = false;
var isMouseDownEnabled = true;
var currentWheelPosition = 0;
var xO = 0; // xOffset
var yO = 0; // yOffset
var playStep = 0;
var wheelTickLeft = 0;
var MIN_PLAYSTEP = 0;
var MAX_PLAYSTEP = 10201;
var leftArr = {"start":0,"text_resume":0,"text_born":300,"wat":600,"hat":1055,"bioboard":1506,"macbook":1826,"dev_exp_platform":2114,"macbookseparator":[2349,2539,3026,3953],"dev_crossplatform":2439,"dev_prog_lang":2781,"dev_web_stack_1":3206,"dev_web_stack_2":3489,"dev_web_stack_3":3773,"dev_extra_skill_set":4043,"design_skill":4323,"design_skill_set":4543,"design_video_making":4763,"design_ux_skill_set":5013,"photography_start":5253,"photography_1":5458,"photography_2":5693.5,"photography_3":5926.5,"microphone":6356.5,"awards":6706.5,"floating_platform":7960,"timeline_x":7990};
var playStepMarker = [{"name":"startWalk","stepFrom":0,"stepTo":1506,"xOffsetFrom":0,"xOffsetTo":1506,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"MacBook","stepFrom":1506,"stepTo":1826,"xOffsetFrom":1506,"xOffsetTo":1826,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"DevCrossPlatform","stepFrom":1826,"stepTo":2439,"xOffsetFrom":1826,"xOffsetTo":2439,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"ProgrammingLanguage","stepFrom":2439,"stepTo":2781,"xOffsetFrom":2439,"xOffsetTo":2781,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"DevWebStack1","stepFrom":2781,"stepTo":3206,"xOffsetFrom":2781,"xOffsetTo":3206,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"DevWebStack2","stepFrom":3206,"stepTo":3489,"xOffsetFrom":3206,"xOffsetTo":3489,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"DevWebStack3","stepFrom":3489,"stepTo":3773,"xOffsetFrom":3489,"xOffsetTo":3773,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"DevWebStack3","stepFrom":3773,"stepTo":4043,"xOffsetFrom":3773,"xOffsetTo":4043,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"DesignSkill","stepFrom":4043,"stepTo":4323,"xOffsetFrom":4043,"xOffsetTo":4323,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"DesignSkillSet","stepFrom":4323,"stepTo":4543,"xOffsetFrom":4323,"xOffsetTo":4543,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"DesignVideoMaking","stepFrom":4543,"stepTo":4763,"xOffsetFrom":4543,"xOffsetTo":4763,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"DesignUXSkillSet","stepFrom":4763,"stepTo":5013,"xOffsetFrom":4763,"xOffsetTo":5013,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"Microphone","stepFrom":5013,"stepTo":6356.5,"xOffsetFrom":5013,"xOffsetTo":6356.5,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"Awards","stepFrom":6356.5,"stepTo":6706.5,"xOffsetFrom":6356.5,"xOffsetTo":6706.5,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"FloatingPlatform","stepFrom":6706.5,"stepTo":7960,"xOffsetFrom":6706.5,"xOffsetTo":7960,"yOffsetFrom":0,"yOffsetTo":0,"walkAnim":"walkRt"},{"name":"Floating","stepFrom":7960,"stepTo":9666,"xOffsetFrom":7960,"xOffsetTo":7960,"yOffsetFrom":0,"yOffsetTo":853,"walkAnim":"standRt"},{"name":"endWalk","stepFrom":9666,"stepTo":10201,"xOffsetFrom":7960,"xOffsetTo":8495,"yOffsetFrom":853,"yOffsetTo":853,"walkAnim":"walkRt"}];
var triggers = [{"name":"Hat","playStep":935},{"name":"BioBoard","playStep":1386},{"name":"MacBook","playStep":1826},{"name":"DevCrossPlatform","playStep":2239},{"name":"ProgrammingLanguage","playStep":2481},{"name":"DevWebStack1","playStep":3006},{"name":"DevWebStack2","playStep":3289},{"name":"DevWebStack3","playStep":3523},{"name":"DevExtraSkillSet","playStep":3923},{"name":"DesignSkill","playStep":4223},{"name":"DesignSkillSet","playStep":4443},{"name":"DesignVideoMaking","playStep":4663},{"name":"DesignUXSkillSet","playStep":4863},{"name":"PublicSpeaking","playStep":6256.5},{"name":"Training","playStep":6376.5},{"name":"Writer","playStep":6456.5},{"name":"MC","playStep":6496.5},{"name":"Awards","playStep":6706.5},{"name":"Awards2002","playStep":6731.5},{"name":"Awards2003","playStep":6786.5},{"name":"Awards2004","playStep":6941.5},{"name":"Awards2005","playStep":7006.5},{"name":"Awards2006","playStep":7061.5},{"name":"Awards2007","playStep":7101.5},{"name":"Awards2008","playStep":7256.5},{"name":"Awards2009","playStep":7411.5},{"name":"Awards2010","playStep":7561.5},{"name":"Awards2015","playStep":7591.5},{"name":"SocialIcons","playStep":10101}];
var trigged = {};
var walkAnim = 'walkRt';
var currentSocialIconDown = '';
var hatTransition = {y: 0};
var designSkillTransition = {y: 0};
var designSkillSetTransition = {y: 0};
var designVideoMakingTransition = {y: 0};
var designUXSkillSetTransition = {y: 0};
var socialIconsTransition = {icon_facebook_y: -210, icon_twitter_y: -210, icon_google_plus_y: -210, icon_linked_in_y: -210, icon_instagram_y: -210, icon_youtube_y: -210};
var toStartTransition = {scale: 1};
var warpInTransition = {y: 0};
var cloud1Position = -120;
var cloud2Position = 200;
var angleA = 0;
var angleB = Math.PI / 2;
var angleC = Math.PI;
var shareArea = {obj: null, bottom: -100};

var social_icons_name_map = {};

function getPixelRatio(context) {
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

function init() {
    shareArea.obj = document.getElementById('share-area');

    // Get canvas
    canvas = document.getElementById("canvas");
    canvas.getContext("2d").imageSmoothingEnabled = true;
    doSetCanvasSize();

    // Init stage
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Touch.enable(stage);

    initEvents();
    initLoadingResources();

    // Load Images
    manifest = [
        {"src":"Sky.png?v=1.4.6","id":"sky"},
        {"src":"Cloud1.png?v=1.4.6","id":"cloud1"},
        {"src":"Tree1.png?v=1.4.6","id":"t1"},
        {"src":"Tree2.png?v=1.4.6","id":"t2"},
        {"src":"Wheel.png?v=1.4.6","id":"mousewheel"},
        {"src":"BuildingBG.png?v=1.4.6","id":"building_bg"},
        {"src":"TukTuk.png?v=1.4.6","id":"tuktuk"},
        {"src":"TextBorn2.png?v=1.4.6","id":"text_born"},
        {"src":"TextResume2.png?v=1.4.6","id":"text_resume"},
        {"src":"BioBoard.png?v=1.4.6","id":"bioboard"},
        {"src":"BioDetails.png?v=1.4.6","id":"biodetails"},
        {"src":"Wat.png?v=1.4.6","id":"wat"},
        {"src":"Hat.png?v=1.4.6","id":"hat"},
        {"src":"HatFront.png?v=1.4.6","id":"hatfront"},
        {"src":"MacBookLeft.png?v=1.4.6","id":"mbl"},
        {"src":"MacBookCenter.png?v=1.4.6","id":"mbc"},
        {"src":"MacBookRight.png?v=1.4.6","id":"mbr"},
        {"src":"DevExperiencedPlatform.png?v=1.4.6","id":"dev_exp_platform"},
        {"src":"DevCrossPlatform.png?v=1.4.6","id":"dev_crossplatform"},
        {"src":"DevProgrammingLanguage.png?v=1.4.6","id":"dev_prog_lang"},
        {"src":"DevWebStack1.png?v=1.4.6","id":"dev_web_stack_1"},
        {"src":"DevWebStack2.png?v=1.4.6","id":"dev_web_stack_2"},
        {"src":"DevWebStack3.png?v=1.4.6","id":"dev_web_stack_3"},
        {"src":"DevExtraSkillSet.png?v=1.4.6","id":"dev_extra_skill_set"},
        {"src":"MacBookSeparator.png?v=1.4.6","id":"macbookseparator"},
        {"src":"DesignSkill.png?v=1.4.6","id":"design_skill"},
        {"src":"DesignSkillSet.png?v=1.4.6","id":"design_skill_set"},
        {"src":"DesignVideoEditing.png?v=1.4.6","id":"design_video_making"},
        {"src":"DesignUXSkillSet.png?v=1.4.6","id":"design_ux_skill_set"},
        {"src":"PhotographyStart.png?v=1.4.6","id":"photography_start"},
        {"src":"Photography1.png?v=1.4.6","id":"photography_1"},
        {"src":"Photography2.png?v=1.4.6","id":"photography_2"},
        {"src":"Photography3.png?v=1.4.6","id":"photography_3"},
        {"src":"Microphone.png?v=1.4.6","id":"microphone"},
        {"src":"PublicSpeaking.png?v=1.4.6","id":"public_speaking"},
        {"src":"Training.png?v=1.4.6","id":"training"},
        {"src":"Writer.png?v=1.4.6","id":"writer"},
        {"src":"MC.png?v=1.4.6","id":"mc"},
        {"src":"AwardsLeft.png?v=1.4.6","id":"awl"},
        {"src":"AwardsCenter.png?v=1.4.6","id":"awc"},
        {"src":"AwardsRight.png?v=1.4.6","id":"awr"},
        {"src":"Awards2002.png?v=1.4.6","id":"awards_2002"},
        {"src":"Awards2003.png?v=1.4.6","id":"awards_2003"},
        {"src":"Awards2004.png?v=1.4.6","id":"awards_2004"},
        {"src":"Awards2005.png?v=1.4.6","id":"awards_2005"},
        {"src":"Awards2006.png?v=1.4.6","id":"awards_2006"},
        {"src":"Awards2007.png?v=1.4.6","id":"awards_2007"},
        {"src":"Awards2008.png?v=1.4.6","id":"awards_2008"},
        {"src":"Awards2009.png?v=1.4.6","id":"awards_2009"},
        {"src":"Awards2010.png?v=1.4.6","id":"awards_2010"},
        {"src":"Awards2015.png?v=1.4.6","id":"awards_2015"},
        {"src":"BlockRoad.png?v=1.4.6","id":"rb"},
        {"src":"BlockRoadEnd.png?v=1.4.6","id":"rbend"},
        {"src":"UnderConstructionSign.png?v=1.4.6","id":"under_construction_sign"},
        {"src":"FloatingPlatform.png?v=1.4.6","id":"floating_platform"},
        {"src":"TimelineStart.png?v=1.4.6","id":"timeline_start"},
        {"src":"TimelineThaiplus.png?v=1.4.6","id":"timeline_thaiplus"},
        {"src":"TimelineNuuNeoI.png?v=1.4.6","id":"timeline_nuuneoi"},
        {"src":"TimelineHLP.png?v=1.4.6","id":"timeline_hlp"},
        {"src":"TimelineDroidSans.png?v=1.4.6","id":"timeline_droidsans"},
        {"src":"TimelineMOLOME.png?v=1.4.6","id":"timeline_molome"},
        {"src":"TimelineTheCheeseFactory.png?v=1.4.6","id":"timeline_thecheesefactory"},
        {"src":"TimelineEmptyLine.png?v=1.4.6","id":"timeline_empty_line"},
        {"src":"TimelineNewPage.png?v=1.4.6","id":"timeline_newpage"},
        {"src":"TextTheEnd.png?v=1.4.6","id":"text_the_end"},
        {"src":"TextKnowMeMore.png?v=1.4.6","id":"text_know_me_more"},
        {"src":"TextOrContactMe.png?v=1.4.6","id":"text_or_contact_me"},
        {"src":"TextAllRightReserved.png?v=1.4.6","id":"text_all_right_reserved"},
        {"src":"TextNuuNeoICom.png?v=1.4.6","id":"text_nuuneoi_com"},
        {"src":"SocialIcons.png?v=1.4.6","id":"social_icons"},
        {"src":"TukTukButtons.png?v=1.4.6","id":"tuktuk_buttons"},
        {"src":"SpriteCharacter.png?v=1.4.6","id":"character"},
        {"src":"TukTukDriverSprite.png?v=1.4.6","id":"tuktuk_character"}
    ];

    refreshStageAndUpdate();

    // Loader
    loader = new createjs.LoadQueue(true);
    loader.setMaxConnections(10);
    loader.on("progress", handleOverAllImageLoadProgress);
    loader.addEventListener("complete", handleImageLoaded);
    loader.loadManifest(manifest, true, "./cv/images/");

    // Ticker
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);
}

function initEvents() {
    window.addEventListener("DOMContentLoaded", function () {
        window.scrollTo(-1, 0);
    }, false);

    // Handle Mouse Wheel
    canvas.addEventListener("mousewheel", MouseWheelHandler, false);
    canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    // Handle Mouse Click/Move/Up
    stage.on("stagemousedown", function(evt) {
        if (isTransitioningToStart || isWarpingIn || !isMouseDownEnabled) {
            window.scrollTo(-1, 0);
            return;
        }

        // Handle TouchEvent for Clickable Icons
        var obj = stage.getObjectUnderPoint(evt.stageX, evt.stageY);
        var event = {target: null, type: "mouseover"};
        if (obj != null) {
            currentSocialIconDown = obj.name;
            for (key in social_icons_name_map) {
                if (obj.name == key) {
                    event.target = social_icons_name_map[key];
                    socialIconMouseHandle(event);
                    return;
                }
            }
        }
        // End Handle TouchEvent for Clickable Icons

        isMouseDown = true;
        if (evt.stageX > w / 2)
            walkDirection = 1;
        else
            walkDirection = -1;
        sps["character"][0].gotoAndPlay(walkAnim);
        sps["tuktuk_character"][0].gotoAndPlay(walkAnim);
        isWalking = true;
        //refreshStageAndUpdate();
        evt.preventDefault();
        window.scrollTo(-1, 0);
    });
    stage.on("stagemousemove", function(evt) {
        // Handle TouchEvent for Clickable Icons
        if (currentSocialIconDown != '') {
            var obj = stage.getObjectUnderPoint(evt.stageX, evt.stageY);
            var event = {target: null, type: "mouseout"};
            if (obj != null && obj.name == null) {
                for (var i = 0; i <= 6; i++) {
                    for (key in social_icons_name_map) {
                        event.target = social_icons_name_map[key];
                        socialIconMouseHandle(event);
                    }
                }
            } else if (obj != null && obj.name != null) {
                event.type = "mouseover";
                if (obj != null) {
                    for (key in social_icons_name_map) {
                        if (obj.name == key) {
                            if (currentSocialIconDown == obj.name)
                            {
                                event.target = social_icons_name_map[key];
                                socialIconMouseHandle(event);
                            }
                            break;
                        }
                    }
                }
            }
        }
        // End Handle TouchEvent for Clickable Icons

        if (!isMouseDown)
            return;
        if (evt.stageX > w / 2 && walkDirection == -1)
            walkDirection = 1;
        else if (evt.stageX <= w / 2 && walkDirection == 1)
            walkDirection = -1;
        else
            return;
        //refreshStageAndUpdate();
        evt.preventDefault();
    });
    stage.on("stagemouseup", function(evt) {
        isMouseDown = false;
        isWalking = false;
        sps["character"][0].gotoAndPlay("standRt");
        sps["tuktuk_character"][0].gotoAndPlay('standRt');
        evt.preventDefault();

        // Handle TouchEvent for Clickable Icons
        var obj = stage.getObjectUnderPoint(evt.stageX, evt.stageY);
        var event = {target: null, type: "mouseout"};
        for (key in social_icons_name_map) {
            event.target = social_icons_name_map[key];
            socialIconMouseHandle(event);
        }
        event.type = "click";
        if (obj != null) {
            for (key in social_icons_name_map) {
                if (obj.name == key) {
                    event.target = social_icons_name_map[key];
                    if (currentSocialIconDown == obj.name)
                        socialIconMouseHandle(event);
                    break;
                }
            }
        }
        // End Handle TouchEvent for Clickable Icons

        currentSocialIconDown = '';
    });

    // Disable Right Mouse Click
    canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };

    // Handle Key
    window.addEventListener('keydown', function (evt) {
        if (isTransitioningToStart || isWarpingIn) {
            window.scrollTo(-1, 0);
            return;
        }
        if (evt.keyCode == 39) { // Right
            isMouseDown = true;
            walkDirection = 1;
        } else if (evt.keyCode == 37) { // Left
            isMouseDown = true;
            walkDirection = -1;
        } else if (evt.keyCode == 84) {
            toggleTukTukStatus();
            return;
        } else {
            return;
        }
        if (sps["character"][0].currentAnimation != walkAnim)
            sps["character"][0].gotoAndPlay(walkAnim);
        if (sps["tuktuk_character"][0].currentAnimation != walkAnim)
            sps["tuktuk_character"][0].gotoAndPlay(walkAnim);
        isWalking = true;
        window.scrollTo(-1, 0);
        //refreshStageAndUpdate();
        evt.preventDefault();
    });
    window.addEventListener('keyup', function (evt) {
        if (evt.keyCode == 37 || evt.keyCode == 39) {
            isMouseDown = false;
            isWalking = false;
            sps["character"][0].gotoAndPlay("standRt");
            sps["tuktuk_character"][0].gotoAndPlay('standRt');
            evt.preventDefault();
        }
    });
}

function toggleTukTukStatus() {
    if (isTransformingTukTuk)
        return;
    isTransformingTukTuk = true;
    var transitionValue = {t: 0};
    if (sps["character"][0].visible) {
        sps["character"][0].visible = false;
        sps["tuktuk_character"][0].gotoAndPlay('warpIn');
        sps["tuktuk_character"][0].visible = true;
        sps["tuktuk_buttons"][0].visible = false;
        sps["tuktuk_buttons"][1].visible = true;
        createjs.Tween.get(toStartTransition).to({t: 10}, 300, createjs.Ease.linear).call(function() {
            isTransformingTukTuk = false;
            sps["tuktuk_character"][0].gotoAndPlay('standRt');
        });
    } else {
        sps["tuktuk_character"][0].gotoAndPlay('warpOut');
        sps["tuktuk_buttons"][0].visible = true;
        sps["tuktuk_buttons"][1].visible = false;
        createjs.Tween.get(toStartTransition).to({t: 10}, 300, createjs.Ease.linear).call(function() {
            isTransformingTukTuk = false;
            sps["character"][0].visible = true;
            sps["tuktuk_character"][0].visible = false;
            sps["tuktuk_character"][0].gotoAndPlay('standRt');
        });
    }
}

function initLoadingResources() {
    var scale = Math.min(w, h) / 800;
    loadingShadow = new createjs.Shadow("#000000", 5 * scale, 5 * scale, 20 * scale);

    loadingContainer = new createjs.Shape();
    loadingContainer.width = w;
    loadingContainer.height = h;

    loadingContainerShadowLayer = new createjs.Shape();
    loadingContainerShadowLayer.width = w;
    loadingContainerShadowLayer.height = h;
    loadingContainerShadowLayer.shadow = loadingShadow;
    loadingContainerShadowLayer.alpha = 0.5;

    loadingBackgroundLayer = new createjs.Shape();
    loadingBackgroundLayer.width = w;
    loadingBackgroundLayer.height = h;

    loadingProgressText = new createjs.Text("0%", "20px Arial", "#000000");
    loadingProgressText.font = Math.ceil(scale * 20) + "px Arial";
    var b = loadingProgressText.getBounds();
    loadingProgressText.x = (w - b.width) / 2;
    loadingProgressText.y = (h - b.height) / 2;

    stage.addChild(loadingBackgroundLayer);
    stage.addChild(loadingContainerShadowLayer);
    stage.addChild(loadingContainer);
    stage.addChild(loadingProgressText);
}

function handleOverAllImageLoadProgress() {
    var percent = Math.ceil(loader.progress * 100);
    loadingProgressText.text = percent + "%";
    var b = loadingProgressText.getBounds();
    loadingProgressText.x = (w - b.width) / 2;
    loadingProgressText.y = (h - b.height) / 2;
}

function handleImageLoaded() {
    var s;

    isAllImageLoaded = true;


    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("sky")],
            frames: {width: 2400, height: 840, regX: 1200, regY: 840},
            animations: {"img":[0,0]}
        });
        spriteSheets["sky"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("cloud1")],
            frames: {width: 624, height: 372, regX: 312, regY: 372},
            animations: {"img":[0,0]}
        });
        spriteSheets["cloud1"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("t1")],
            frames: {width: 140, height: 260, regX: 70, regY: 260},
            animations: {"img":[0,0]}
        });
        spriteSheets["t1"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("t2")],
            frames: {width: 400, height: 216, regX: 200, regY: 216},
            animations: {"img":[0,0]}
        });
        spriteSheets["t2"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("mousewheel")],
            frames: {width: 160, height: 160, regX: 80, regY: 160},
            animations: {"wheel":{"frames":[0,1,2],"speed":0.05}}
        });
        spriteSheets["mousewheel"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("building_bg")],
            frames: {width: 1092, height: 576, regX: 546, regY: 576},
            animations: {"img":[0,0]}
        });
        spriteSheets["building_bg"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("tuktuk")],
            frames: {width: 400, height: 280, regX: 200, regY: 280},
            animations: {"img":[0,0]}
        });
        spriteSheets["tuktuk"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("text_born")],
            frames: {width: 460, height: 100, regX: 230, regY: 100},
            animations: {"img":[0,0]}
        });
        spriteSheets["text_born"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("text_resume")],
            frames: {width: 616, height: 184, regX: 308, regY: 184},
            animations: {"img":[0,0]}
        });
        spriteSheets["text_resume"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("bioboard")],
            frames: {width: 940, height: 672, regX: 470, regY: 672},
            animations: {"img":[0,0]}
        });
        spriteSheets["bioboard"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("biodetails")],
            frames: {width: 744, height: 400, regX: 372, regY: 400},
            animations: {"img":[0,0]}
        });
        spriteSheets["biodetails"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("wat")],
            frames: {width: 1400, height: 748, regX: 700, regY: 748},
            animations: {"img":[0,0]}
        });
        spriteSheets["wat"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("hat")],
            frames: {width: 1832, height: 836, regX: 916, regY: 836},
            animations: {"img":[0,0]}
        });
        spriteSheets["hat"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("hatfront")],
            frames: {width: 1000, height: 400, regX: 500, regY: 400},
            animations: {"img":[0,0]}
        });
        spriteSheets["hatfront"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("mbl")],
            frames: {width: 848, height: 840, regX: 424, regY: 840},
            animations: {"img":[0,0]}
        });
        spriteSheets["mbl"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("mbc")],
            frames: {width: 248, height: 840, regX: 124, regY: 840},
            animations: {"img":[0,0]}
        });
        spriteSheets["mbc"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("mbr")],
            frames: {width: 320, height: 840, regX: 160, regY: 840},
            animations: {"img":[0,0]}
        });
        spriteSheets["mbr"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("dev_exp_platform")],
            frames: {width: 1632, height: 472, regX: 816, regY: 472},
            animations: {"img":[0,0]}
        });
        spriteSheets["dev_exp_platform"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("dev_crossplatform")],
            frames: {width: 500, height: 488, regX: 250, regY: 488},
            animations: {"img":[0,0]}
        });
        spriteSheets["dev_crossplatform"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("dev_prog_lang")],
            frames: {width: 1720, height: 528, regX: 860, regY: 528},
            animations: {"img":[0,0]}
        });
        spriteSheets["dev_prog_lang"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("dev_web_stack_1")],
            frames: {width: 1212, height: 512, regX: 606, regY: 512},
            animations: {"img":[0,0]}
        });
        spriteSheets["dev_web_stack_1"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("dev_web_stack_2")],
            frames: {width: 960, height: 408, regX: 480, regY: 408},
            animations: {"img":[0,0]}
        });
        spriteSheets["dev_web_stack_2"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("dev_web_stack_3")],
            frames: {width: 1224, height: 408, regX: 612, regY: 408},
            animations: {"img":[0,0]}
        });
        spriteSheets["dev_web_stack_3"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("dev_extra_skill_set")],
            frames: {width: 544, height: 504, regX: 272, regY: 504},
            animations: {"img":[0,0]}
        });
        spriteSheets["dev_extra_skill_set"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("macbookseparator")],
            frames: {width: 20, height: 624, regX: 10, regY: 624},
            animations: {"img":[0,0]}
        });
        spriteSheets["macbookseparator"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("design_skill")],
            frames: {width: 616, height: 664, regX: 308, regY: 664},
            animations: {"img":[0,0]}
        });
        spriteSheets["design_skill"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("design_skill_set")],
            frames: {width: 744, height: 664, regX: 372, regY: 664},
            animations: {"img":[0,0]}
        });
        spriteSheets["design_skill_set"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("design_video_making")],
            frames: {width: 644, height: 644, regX: 322, regY: 644},
            animations: {"img":[0,0]}
        });
        spriteSheets["design_video_making"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("design_ux_skill_set")],
            frames: {width: 1032, height: 672, regX: 516, regY: 672},
            animations: {"img":[0,0]}
        });
        spriteSheets["design_ux_skill_set"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("photography_start")],
            frames: {width: 560, height: 612, regX: 280, regY: 612},
            animations: {"img":[0,0]}
        });
        spriteSheets["photography_start"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("photography_1")],
            frames: {width: 952, height: 640, regX: 476, regY: 640},
            animations: {"img":[0,0]}
        });
        spriteSheets["photography_1"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("photography_2")],
            frames: {width: 932, height: 640, regX: 466, regY: 640},
            animations: {"img":[0,0]}
        });
        spriteSheets["photography_2"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("photography_3")],
            frames: {width: 932, height: 640, regX: 466, regY: 640},
            animations: {"img":[0,0]}
        });
        spriteSheets["photography_3"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("microphone")],
            frames: {width: 1860, height: 564, regX: 930, regY: 564},
            animations: {"img":[0,0]}
        });
        spriteSheets["microphone"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("public_speaking")],
            frames: {width: 480, height: 148, regX: 240, regY: 148},
            animations: {"img":[0,0]}
        });
        spriteSheets["public_speaking"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("training")],
            frames: {width: 268, height: 136, regX: 134, regY: 136},
            animations: {"img":[0,0]}
        });
        spriteSheets["training"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("writer")],
            frames: {width: 200, height: 112, regX: 100, regY: 112},
            animations: {"img":[0,0]}
        });
        spriteSheets["writer"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("mc")],
            frames: {width: 108, height: 112, regX: 54, regY: 112},
            animations: {"img":[0,0]}
        });
        spriteSheets["mc"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awl")],
            frames: {width: 560, height: 640, regX: 280, regY: 640},
            animations: {"img":[0,0]}
        });
        spriteSheets["awl"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awc")],
            frames: {width: 200, height: 640, regX: 100, regY: 640},
            animations: {"img":[0,0]}
        });
        spriteSheets["awc"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awr")],
            frames: {width: 584, height: 640, regX: 292, regY: 640},
            animations: {"img":[0,0]}
        });
        spriteSheets["awr"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awards_2002")],
            frames: {width: 680, height: 388, regX: 340, regY: 388},
            animations: {"img":[0,0]}
        });
        spriteSheets["awards_2002"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awards_2003")],
            frames: {width: 732, height: 388, regX: 366, regY: 388},
            animations: {"img":[0,0]}
        });
        spriteSheets["awards_2003"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awards_2004")],
            frames: {width: 568, height: 388, regX: 284, regY: 388},
            animations: {"img":[0,0]}
        });
        spriteSheets["awards_2004"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awards_2005")],
            frames: {width: 676, height: 388, regX: 338, regY: 388},
            animations: {"img":[0,0]}
        });
        spriteSheets["awards_2005"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awards_2006")],
            frames: {width: 32, height: 384, regX: 16, regY: 384},
            animations: {"img":[0,0]}
        });
        spriteSheets["awards_2006"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awards_2007")],
            frames: {width: 956, height: 388, regX: 478, regY: 388},
            animations: {"img":[0,0]}
        });
        spriteSheets["awards_2007"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awards_2008")],
            frames: {width: 1124, height: 388, regX: 562, regY: 388},
            animations: {"img":[0,0]}
        });
        spriteSheets["awards_2008"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awards_2009")],
            frames: {width: 532, height: 388, regX: 266, regY: 388},
            animations: {"img":[0,0]}
        });
        spriteSheets["awards_2009"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awards_2010")],
            frames: {width: 32, height: 388, regX: 16, regY: 388},
            animations: {"img":[0,0]}
        });
        spriteSheets["awards_2010"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("awards_2015")],
            frames: {width: 468, height: 388, regX: 234, regY: 388},
            animations: {"img":[0,0]}
        });
        spriteSheets["awards_2015"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("rb")],
            frames: {width: 800, height: 200, regX: 400, regY: 200},
            animations: {"img":[0,0]}
        });
        spriteSheets["rb"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("rbend")],
            frames: {width: 848, height: 160, regX: 424, regY: 160},
            animations: {"img":[0,0]}
        });
        spriteSheets["rbend"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("under_construction_sign")],
            frames: {width: 200, height: 192, regX: 100, regY: 192},
            animations: {"img":[0,0]}
        });
        spriteSheets["under_construction_sign"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("floating_platform")],
            frames: {width: 432, height: 108, regX: 216, regY: 108},
            animations: {"img":[0,0]}
        });
        spriteSheets["floating_platform"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("timeline_start")],
            frames: {width: 928, height: 112, regX: 464, regY: 112},
            animations: {"img":[0,0]}
        });
        spriteSheets["timeline_start"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("timeline_thaiplus")],
            frames: {width: 928, height: 400, regX: 464, regY: 400},
            animations: {"img":[0,0]}
        });
        spriteSheets["timeline_thaiplus"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("timeline_nuuneoi")],
            frames: {width: 928, height: 400, regX: 464, regY: 400},
            animations: {"img":[0,0]}
        });
        spriteSheets["timeline_nuuneoi"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("timeline_hlp")],
            frames: {width: 928, height: 400, regX: 464, regY: 400},
            animations: {"img":[0,0]}
        });
        spriteSheets["timeline_hlp"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("timeline_droidsans")],
            frames: {width: 928, height: 400, regX: 464, regY: 400},
            animations: {"img":[0,0]}
        });
        spriteSheets["timeline_droidsans"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("timeline_molome")],
            frames: {width: 928, height: 400, regX: 464, regY: 400},
            animations: {"img":[0,0]}
        });
        spriteSheets["timeline_molome"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("timeline_thecheesefactory")],
            frames: {width: 928, height: 400, regX: 464, regY: 400},
            animations: {"img":[0,0]}
        });
        spriteSheets["timeline_thecheesefactory"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("timeline_empty_line")],
            frames: {width: 928, height: 400, regX: 464, regY: 400},
            animations: {"img":[0,0]}
        });
        spriteSheets["timeline_empty_line"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("timeline_newpage")],
            frames: {width: 928, height: 400, regX: 464, regY: 400},
            animations: {"img":[0,0]}
        });
        spriteSheets["timeline_newpage"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("text_the_end")],
            frames: {width: 340, height: 60, regX: 170, regY: 60},
            animations: {"img":[0,0]}
        });
        spriteSheets["text_the_end"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("text_know_me_more")],
            frames: {width: 328, height: 28, regX: 164, regY: 28},
            animations: {"img":[0,0]}
        });
        spriteSheets["text_know_me_more"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("text_or_contact_me")],
            frames: {width: 320, height: 28, regX: 160, regY: 28},
            animations: {"img":[0,0]}
        });
        spriteSheets["text_or_contact_me"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("text_all_right_reserved")],
            frames: {width: 788, height: 36, regX: 394, regY: 36},
            animations: {"img":[0,0]}
        });
        spriteSheets["text_all_right_reserved"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("text_nuuneoi_com")],
            frames: {width: 284, height: 36, regX: 142, regY: 36},
            animations: {"inactive":{"frames":[0]},"active":{"frames":[1]}}
        });
        spriteSheets["text_nuuneoi_com"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("social_icons")],
            frames: {width: 120, height: 120, regX: 60, regY: 120},
            animations: {"iconFacebook":{"frames":[0]},"iconFacebookActive":{"frames":[1]},"iconTwitter":{"frames":[2]},"iconTwitterActive":{"frames":[3]},"iconGooglePlus":{"frames":[4]},"iconGooglePlusActive":{"frames":[5]},"iconLinkedIn":{"frames":[6]},"iconLinkedInActive":{"frames":[7]},"iconInstagram":{"frames":[8]},"iconInstagramActive":{"frames":[9]},"iconYouTube":{"frames":[10]},"iconYouTubeActive":{"frames":[11]},"iconEmail":{"frames":[12]},"iconEmailActive":{"frames":[13]}}
        });
        spriteSheets["social_icons"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("tuktuk_buttons")],
            frames: {width: 128, height: 128, regX: 64, regY: 128},
            animations: {"iconTukTuk":{"frames":[0]},"iconTukTukActive":{"frames":[1]},"iconMan":{"frames":[2]},"iconManActive":{"frames":[3]}}
        });
        spriteSheets["tuktuk_buttons"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("character")],
            frames: {width: 200, height: 220, regX: 100, regY: 220},
            animations: {"standRt":{"frames":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"speed":0.2},"walkRt":{"frames":[3,4,6],"speed":0.08},"warpIn":{"frames":[7,7,7,7,8,9,10,11,12],"next":"standRt","speed":0.2}}
        });
        spriteSheets["character"] = ss;
    }

    {
        var ss = new createjs.SpriteSheet({
            framerate: 25,
            images: [loader.getResult("tuktuk_character")],
            frames: {width: 400, height: 280, regX: 200, regY: 280},
            animations: {"standRt":{"frames":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"speed":0.2},"walkRt":{"frames":[0,3,4,5,6,7],"speed":0.2},"warpIn":{"frames":[8,9,10,11],"speed":0.15},"warpOut":{"frames":[11,10,9,8],"speed":0.15}}
        });
        spriteSheets["tuktuk_character"] = ss;
    }
    sps["sky"] = [];
    sps["cloud1"] = [];
    sps["t1"] = [];
    sps["t2"] = [];
    sps["mousewheel"] = [];
    sps["building_bg"] = [];
    sps["tuktuk"] = [];
    sps["text_born"] = [];
    sps["text_resume"] = [];
    sps["bioboard"] = [];
    sps["biodetails"] = [];
    sps["wat"] = [];
    sps["hat"] = [];
    sps["hatfront"] = [];
    sps["mbl"] = [];
    sps["mbc"] = [];
    sps["mbr"] = [];
    sps["dev_exp_platform"] = [];
    sps["dev_crossplatform"] = [];
    sps["dev_prog_lang"] = [];
    sps["dev_web_stack_1"] = [];
    sps["dev_web_stack_2"] = [];
    sps["dev_web_stack_3"] = [];
    sps["dev_extra_skill_set"] = [];
    sps["macbookseparator"] = [];
    sps["design_skill"] = [];
    sps["design_skill_set"] = [];
    sps["design_video_making"] = [];
    sps["design_ux_skill_set"] = [];
    sps["photography_start"] = [];
    sps["photography_1"] = [];
    sps["photography_2"] = [];
    sps["photography_3"] = [];
    sps["microphone"] = [];
    sps["public_speaking"] = [];
    sps["training"] = [];
    sps["writer"] = [];
    sps["mc"] = [];
    sps["awl"] = [];
    sps["awc"] = [];
    sps["awr"] = [];
    sps["awards_2002"] = [];
    sps["awards_2003"] = [];
    sps["awards_2004"] = [];
    sps["awards_2005"] = [];
    sps["awards_2006"] = [];
    sps["awards_2007"] = [];
    sps["awards_2008"] = [];
    sps["awards_2009"] = [];
    sps["awards_2010"] = [];
    sps["awards_2015"] = [];
    sps["rb"] = [];
    sps["rbend"] = [];
    sps["under_construction_sign"] = [];
    sps["floating_platform"] = [];
    sps["timeline_start"] = [];
    sps["timeline_thaiplus"] = [];
    sps["timeline_nuuneoi"] = [];
    sps["timeline_hlp"] = [];
    sps["timeline_droidsans"] = [];
    sps["timeline_molome"] = [];
    sps["timeline_thecheesefactory"] = [];
    sps["timeline_empty_line"] = [];
    sps["timeline_newpage"] = [];
    sps["text_the_end"] = [];
    sps["text_know_me_more"] = [];
    sps["text_or_contact_me"] = [];
    sps["text_all_right_reserved"] = [];
    sps["text_nuuneoi_com"] = [];
    sps["social_icons"] = [];
    sps["tuktuk_buttons"] = [];
    sps["character"] = [];
    sps["tuktuk_character"] = [];

    ac("sky", 0, "sky", 1.000000, "img");


    ac("sky", 1, "sky", 1.000000, "img");


    ac("sky", 2, "sky", 1.000000, "img");


    ac("building_bg", 0, "building_bg", 1.000000, "img");


    ac("building_bg", 1, "building_bg", 1.000000, "img");


    ac("building_bg", 2, "building_bg", 1.000000, "img");


    ac("building_bg", 3, "building_bg", 1.000000, "img");


    ac("cloud1", 0, "cloud1", 1.000000, "img");


    ac("cloud1", 1, "cloud1", 1.000000, "img");


    ac("t1", 0, "t1", 1.000000, "img");


    ac("t1", 1, "t1", 1.000000, "img");


    ac("t1", 2, "t1", 1.000000, "img");


    ac("t1", 3, "t1", 1.000000, "img");


    ac("t1", 4, "t1", 1.000000, "img");


    ac("t1", 5, "t1", 1.000000, "img");


    ac("t1", 6, "t1", 1.000000, "img");


    ac("t1", 7, "t1", 1.000000, "img");


    ac("t1", 8, "t1", 1.000000, "img");


    ac("t1", 9, "t1", 1.000000, "img");


    ac("t1", 10, "t1", 1.000000, "img");


    ac("t1", 11, "t1", 1.000000, "img");


    ac("t1", 12, "t1", 1.000000, "img");


    ac("t1", 13, "t1", 1.000000, "img");


    ac("t1", 14, "t1", 1.000000, "img");


    ac("t1", 15, "t1", 1.000000, "img");


    ac("t1", 16, "t1", 1.000000, "img");


    ac("t1", 17, "t1", 1.000000, "img");


    ac("t1", 18, "t1", 1.000000, "img");


    ac("t1", 19, "t1", 1.000000, "img");


    ac("t1", 20, "t1", 1.000000, "img");


    ac("t1", 21, "t1", 1.000000, "img");


    ac("t1", 22, "t1", 1.000000, "img");


    ac("t1", 23, "t1", 1.000000, "img");


    ac("t1", 24, "t1", 1.000000, "img");


    ac("t1", 25, "t1", 1.000000, "img");


    ac("t1", 26, "t1", 1.000000, "img");


    ac("t1", 27, "t1", 1.000000, "img");


    ac("t1", 28, "t1", 1.000000, "img");


    ac("t1", 29, "t1", 1.000000, "img");


    ac("t1", 30, "t1", 1.000000, "img");


    ac("t1", 31, "t1", 1.000000, "img");


    ac("t1", 32, "t1", 1.000000, "img");


    ac("t1", 33, "t1", 1.000000, "img");


    ac("t1", 34, "t1", 1.000000, "img");


    ac("t1", 35, "t1", 1.000000, "img");


    ac("t1", 36, "t1", 1.000000, "img");


    ac("t1", 37, "t1", 1.000000, "img");


    ac("t1", 38, "t1", 1.000000, "img");


    ac("t1", 39, "t1", 1.000000, "img");


    ac("wat", 0, "wat", 1.000000, "img");


    ac("bioboard", 0, "bioboard", 1.000000, "img");


    ac("biodetails", 0, "biodetails", 0.000000, "img");


    ac("t1", 40, "t1", 1.000000, "img");


    ac("t1", 41, "t1", 1.000000, "img");


    ac("t1", 42, "t1", 1.000000, "img");


    ac("t1", 43, "t1", 1.000000, "img");


    ac("t1", 44, "t1", 1.000000, "img");


    ac("t2", 0, "t2", 1.000000, "img");


    ac("t2", 1, "t2", 1.000000, "img");


    ac("t2", 2, "t2", 1.000000, "img");


    ac("t2", 3, "t2", 1.000000, "img");


    ac("t2", 4, "t2", 1.000000, "img");


    ac("t2", 5, "t2", 1.000000, "img");


    ac("t2", 6, "t2", 1.000000, "img");


    ac("t2", 7, "t2", 1.000000, "img");


    ac("t2", 8, "t2", 1.000000, "img");


    ac("t2", 9, "t2", 1.000000, "img");


    ac("t2", 10, "t2", 1.000000, "img");


    ac("t2", 11, "t2", 1.000000, "img");


    ac("t2", 12, "t2", 1.000000, "img");


    ac("t2", 13, "t2", 1.000000, "img");


    ac("t2", 14, "t2", 1.000000, "img");


    ac("t2", 15, "t2", 1.000000, "img");


    ac("t2", 16, "t2", 1.000000, "img");


    ac("t2", 17, "t2", 1.000000, "img");


    ac("t2", 18, "t2", 1.000000, "img");


    ac("t2", 19, "t2", 1.000000, "img");


    ac("t2", 20, "t2", 1.000000, "img");


    ac("rb", 0, "rb", 1.000000, "img");


    ac("rb", 1, "rb", 1.000000, "img");


    ac("rb", 2, "rb", 1.000000, "img");


    ac("rb", 3, "rb", 1.000000, "img");


    ac("rb", 4, "rb", 1.000000, "img");


    ac("rb", 5, "rb", 1.000000, "img");


    ac("rb", 6, "rb", 1.000000, "img");


    ac("rb", 7, "rb", 1.000000, "img");


    ac("rb", 8, "rb", 1.000000, "img");


    ac("rb", 9, "rb", 1.000000, "img");


    ac("rb", 10, "rb", 1.000000, "img");


    ac("rb", 11, "rb", 1.000000, "img");


    ac("rb", 12, "rb", 1.000000, "img");


    ac("rb", 13, "rb", 1.000000, "img");


    ac("rb", 14, "rb", 1.000000, "img");


    ac("rb", 15, "rb", 1.000000, "img");


    ac("rb", 16, "rb", 1.000000, "img");


    ac("rb", 17, "rb", 1.000000, "img");


    ac("rb", 18, "rb", 1.000000, "img");


    ac("rb", 19, "rb", 1.000000, "img");


    ac("rb", 20, "rb", 1.000000, "img");


    ac("rb", 21, "rb", 1.000000, "img");


    ac("rb", 22, "rb", 1.000000, "img");


    ac("rb", 23, "rb", 1.000000, "img");


    ac("rb", 24, "rb", 1.000000, "img");


    ac("rb", 25, "rb", 1.000000, "img");


    ac("rb", 26, "rb", 1.000000, "img");


    ac("rb", 27, "rb", 1.000000, "img");


    ac("rb", 28, "rb", 1.000000, "img");


    ac("rb", 29, "rb", 1.000000, "img");


    ac("rb", 30, "rb", 1.000000, "img");


    ac("rb", 31, "rb", 1.000000, "img");


    ac("rb", 32, "rb", 1.000000, "img");


    ac("rb", 33, "rb", 1.000000, "img");


    ac("rb", 34, "rb", 1.000000, "img");


    ac("rb", 35, "rb", 1.000000, "img");


    ac("rbend", 0, "rbend", 1.000000, "img");


    ac("hat", 0, "hat", 1.000000, "img");


    ac("mbl", 0, "mbl", 1.000000, "img");


    ac("mbc", 0, "mbc", 1.000000, "img");


    ac("mbc", 1, "mbc", 1.000000, "img");


    ac("mbc", 2, "mbc", 1.000000, "img");


    ac("mbc", 3, "mbc", 1.000000, "img");


    ac("mbc", 4, "mbc", 1.000000, "img");


    ac("mbc", 5, "mbc", 1.000000, "img");


    ac("mbc", 6, "mbc", 1.000000, "img");


    ac("mbc", 7, "mbc", 1.000000, "img");


    ac("mbc", 8, "mbc", 1.000000, "img");


    ac("mbc", 9, "mbc", 1.000000, "img");


    ac("mbc", 10, "mbc", 1.000000, "img");


    ac("mbc", 11, "mbc", 1.000000, "img");


    ac("mbc", 12, "mbc", 1.000000, "img");


    ac("mbc", 13, "mbc", 1.000000, "img");


    ac("mbc", 14, "mbc", 1.000000, "img");


    ac("mbc", 15, "mbc", 1.000000, "img");


    ac("mbc", 16, "mbc", 1.000000, "img");


    ac("mbc", 17, "mbc", 1.000000, "img");


    ac("mbc", 18, "mbc", 1.000000, "img");


    ac("mbc", 19, "mbc", 1.000000, "img");


    ac("mbc", 20, "mbc", 1.000000, "img");


    ac("mbc", 21, "mbc", 1.000000, "img");


    ac("mbc", 22, "mbc", 1.000000, "img");


    ac("mbc", 23, "mbc", 1.000000, "img");


    ac("mbc", 24, "mbc", 1.000000, "img");


    ac("mbc", 25, "mbc", 1.000000, "img");


    ac("mbc", 26, "mbc", 1.000000, "img");


    ac("mbc", 27, "mbc", 1.000000, "img");


    ac("mbc", 28, "mbc", 1.000000, "img");


    ac("mbc", 29, "mbc", 1.000000, "img");


    ac("mbc", 30, "mbc", 1.000000, "img");


    ac("mbc", 31, "mbc", 1.000000, "img");


    ac("mbc", 32, "mbc", 1.000000, "img");


    ac("mbc", 33, "mbc", 1.000000, "img");


    ac("mbc", 34, "mbc", 1.000000, "img");


    ac("mbc", 35, "mbc", 1.000000, "img");


    ac("mbr", 0, "mbr", 1.000000, "img");


    ac("dev_exp_platform", 0, "dev_exp_platform", 0.000000, "img");


    ac("macbookseparator", 0, "macbookseparator", 1.000000, "img");


    ac("macbookseparator", 1, "macbookseparator", 1.000000, "img");


    ac("macbookseparator", 2, "macbookseparator", 1.000000, "img");


    ac("macbookseparator", 3, "macbookseparator", 1.000000, "img");


    ac("dev_crossplatform", 0, "dev_crossplatform", 0.000000, "img");


    ac("dev_prog_lang", 0, "dev_prog_lang", 0.000000, "img");


    ac("dev_web_stack_1", 0, "dev_web_stack_1", 0.000000, "img");


    ac("dev_web_stack_2", 0, "dev_web_stack_2", 0.000000, "img");


    ac("dev_web_stack_3", 0, "dev_web_stack_3", 0.000000, "img");


    ac("dev_extra_skill_set", 0, "dev_extra_skill_set", 0.000000, "img");


    ac("design_skill", 0, "design_skill", 1.000000, "img");


    ac("design_skill_set", 0, "design_skill_set", 1.000000, "img");


    ac("design_video_making", 0, "design_video_making", 1.000000, "img");


    ac("design_ux_skill_set", 0, "design_ux_skill_set", 1.000000, "img");


    ac("photography_start", 0, "photography_start", 1.000000, "img");


    ac("photography_1", 0, "photography_1", 1.000000, "img");


    ac("photography_2", 0, "photography_2", 1.000000, "img");


    ac("photography_3", 0, "photography_3", 1.000000, "img");


    ac("microphone", 0, "microphone", 1.000000, "img");


    ac("public_speaking", 0, "public_speaking", 0.000000, "img");


    ac("training", 0, "training", 0.000000, "img");


    ac("writer", 0, "writer", 0.000000, "img");


    ac("mc", 0, "mc", 0.000000, "img");


    ac("awl", 0, "awl", 1.000000, "img");


    ac("awc", 0, "awc", 1.000000, "img");


    ac("awc", 1, "awc", 1.000000, "img");


    ac("awc", 2, "awc", 1.000000, "img");


    ac("awc", 3, "awc", 1.000000, "img");


    ac("awc", 4, "awc", 1.000000, "img");


    ac("awc", 5, "awc", 1.000000, "img");


    ac("awc", 6, "awc", 1.000000, "img");


    ac("awc", 7, "awc", 1.000000, "img");


    ac("awc", 8, "awc", 1.000000, "img");


    ac("awc", 9, "awc", 1.000000, "img");


    ac("awc", 10, "awc", 1.000000, "img");


    ac("awc", 11, "awc", 1.000000, "img");


    ac("awc", 12, "awc", 1.000000, "img");


    ac("awc", 13, "awc", 1.000000, "img");


    ac("awc", 14, "awc", 1.000000, "img");


    ac("awc", 15, "awc", 1.000000, "img");


    ac("awc", 16, "awc", 1.000000, "img");


    ac("awc", 17, "awc", 1.000000, "img");


    ac("awc", 18, "awc", 1.000000, "img");


    ac("awc", 19, "awc", 1.000000, "img");


    ac("awr", 0, "awr", 1.000000, "img");


    ac("awards_2002", 0, "awards_2002", 0.000000, "img");


    ac("awards_2003", 0, "awards_2003", 0.000000, "img");


    ac("awards_2004", 0, "awards_2004", 0.000000, "img");


    ac("awards_2005", 0, "awards_2005", 0.000000, "img");


    ac("awards_2006", 0, "awards_2006", 0.000000, "img");


    ac("awards_2007", 0, "awards_2007", 0.000000, "img");


    ac("awards_2008", 0, "awards_2008", 0.000000, "img");


    ac("awards_2009", 0, "awards_2009", 0.000000, "img");


    ac("awards_2010", 0, "awards_2010", 0.000000, "img");


    ac("awards_2015", 0, "awards_2015", 0.000000, "img");


    ac("timeline_start", 0, "timeline_start", 1.000000, "img");


    ac("timeline_thaiplus", 0, "timeline_thaiplus", 1.000000, "img");


    ac("timeline_nuuneoi", 0, "timeline_nuuneoi", 1.000000, "img");


    ac("timeline_hlp", 0, "timeline_hlp", 1.000000, "img");


    ac("timeline_droidsans", 0, "timeline_droidsans", 1.000000, "img");


    ac("timeline_molome", 0, "timeline_molome", 1.000000, "img");


    ac("timeline_thecheesefactory", 0, "timeline_thecheesefactory", 1.000000, "img");


    ac("timeline_empty_line", 0, "timeline_empty_line", 1.000000, "img");


    ac("timeline_newpage", 0, "timeline_newpage", 1.000000, "img");


    ac("text_the_end", 0, "text_the_end", 1.000000, "img");


    ac("text_know_me_more", 0, "text_know_me_more", 1.000000, "img");


    ac("text_or_contact_me", 0, "text_or_contact_me", 1.000000, "img");


    ac("text_all_right_reserved", 0, "text_all_right_reserved", 1.000000, "img");


    ac("text_nuuneoi_com", 0, "text_nuuneoi_com", 1.000000, "inactive");


    ac("social_icons", 0, "social_icons", 1.000000, "iconFacebook");


    ac("social_icons", 1, "social_icons", 1.000000, "iconFacebook");


    ac("social_icons", 2, "social_icons", 1.000000, "iconFacebook");


    ac("social_icons", 3, "social_icons", 1.000000, "iconFacebook");


    ac("social_icons", 4, "social_icons", 1.000000, "iconFacebook");


    ac("social_icons", 5, "social_icons", 1.000000, "iconFacebook");


    ac("social_icons", 6, "social_icons", 1.000000, "iconFacebook");


    ac("floating_platform", 0, "floating_platform", 1.000000, "img");


    ac("floating_platform", 1, "floating_platform", 1.000000, "img");


    ac("floating_platform", 2, "floating_platform", 1.000000, "img");


    ac("floating_platform", 3, "floating_platform", 1.000000, "img");


    ac("floating_platform", 4, "floating_platform", 1.000000, "img");


    ac("floating_platform", 5, "floating_platform", 1.000000, "img");


    ac("floating_platform", 6, "floating_platform", 1.000000, "img");


    ac("floating_platform", 7, "floating_platform", 1.000000, "img");


    ac("floating_platform", 8, "floating_platform", 1.000000, "img");


    ac("floating_platform", 9, "floating_platform", 1.000000, "img");


    ac("text_resume", 0, "text_resume", 1.000000, "img");


    ac("mousewheel", 0, "mousewheel", 1.000000, "wheel");


    ac("text_born", 0, "text_born", 1.000000, "img");


    ac("character", 0, "character", 1.000000, "standRt");


    ac("tuktuk_character", 0, "tuktuk_character", 1.000000, "standRt");


    ac("hatfront", 0, "hatfront", 1.000000, "img");


    ac("tuktuk", 0, "tuktuk", 1.000000, "img");


    ac("under_construction_sign", 0, "under_construction_sign", 1.000000, "img");


    ac("under_construction_sign", 1, "under_construction_sign", 1.000000, "img");


    ac("tuktuk_buttons", 0, "tuktuk_buttons", 1.000000, "iconTukTuk");


    ac("tuktuk_buttons", 1, "tuktuk_buttons", 1.000000, "iconTukTuk");



    extraInit();

    // Transition
    stage.removeChild(loadingBackgroundLayer);
    stage.removeChild(loadingContainerShadowLayer);
    stage.removeChild(loadingContainer);
    stage.removeChild(loadingProgressText);
    stage.addChild(loadingBackgroundLayer);
    stage.addChild(loadingContainerShadowLayer);
    stage.addChild(loadingContainer);
    //stage.addChild(loadingProgressText);

    sps["tuktuk_character"][0].visible = false;
    sps["tuktuk_buttons"][1].visible = false;

    isTransitioningToStart = true;
    createjs.Tween.get(toStartTransition).to({scale: 20}, 500, createjs.Ease.linear).call(function() {
        isTransitioningToStart = false;
        isWarpingIn = true;
        stage.removeChild(loadingBackgroundLayer);
        stage.removeChild(loadingContainerShadowLayer);
        stage.removeChild(loadingContainer);
        sps['character'][0].gotoAndPlay('warpIn');
        createjs.Tween.get(warpInTransition).to({y: 185}, 400, createjs.Ease.quintOut).call(function() {
            isWarpingIn = false;
        });
    });
    createjs.Tween.get(loadingBackgroundLayer).wait(200).to({alpha: 0}, 300, createjs.Ease.linear);
    createjs.Tween.get(loadingContainerShadowLayer).wait(200).to({alpha: 0}, 300, createjs.Ease.linear);
    createjs.Tween.get(loadingContainer).wait(200).to({alpha: 0}, 300, createjs.Ease.linear);

    refreshStageAndUpdate();
}

var ac = doAddChild = function(sprite_key, sprite_index, spritesheet_key, alpha, frameset) {
    var s = sps[sprite_key][sprite_index] = new createjs.Sprite(spriteSheets[spritesheet_key]);
    s.alpha = alpha;
    s.gotoAndPlay(frameset);
    stage.addChild(s);
}

function extraInit() {
    social_icons_name_map = {
        'icon_facebook'   : sps["social_icons"][0],
        'icon_twitter'    : sps["social_icons"][1],
        'icon_googleplus' : sps["social_icons"][2],
        'icon_linkedin'   : sps["social_icons"][3],
        'icon_instagram'  : sps["social_icons"][4],
        'icon_youtube'    : sps["social_icons"][5],
        'icon_email'      : sps["social_icons"][6],
        'text_nuuneoi_com': sps["text_nuuneoi_com"][0],

        'icon_tuktuk'     : sps["tuktuk_buttons"][0],
        'icon_man'        : sps["tuktuk_buttons"][1],
    };
    for (key in social_icons_name_map) {
        social_icons_name_map[key].name = key;
    }

    sps["social_icons"][0].gotoAndPlay('iconFacebook');
    sps["social_icons"][1].gotoAndPlay('iconTwitter');
    sps["social_icons"][2].gotoAndPlay('iconGooglePlus');
    sps["social_icons"][3].gotoAndPlay('iconLinkedIn');
    sps["social_icons"][4].gotoAndPlay('iconInstagram');
    sps["social_icons"][5].gotoAndPlay('iconYouTube');
    sps["social_icons"][6].gotoAndPlay('iconEmail');

    for (var i = 0; i <= 6; i++) {
        sps["social_icons"][i].cursor = "pointer";
        sps["social_icons"][i].on("mouseover", socialIconMouseHandle);
        sps["social_icons"][i].on("mouseout", socialIconMouseHandle);
        sps["social_icons"][i].on("click", socialIconMouseHandle);
    }

    sps["tuktuk_buttons"][0].gotoAndPlay('iconTukTuk');
    sps["tuktuk_buttons"][0].cursor = "pointer";
    sps["tuktuk_buttons"][0].on("mouseover", socialIconMouseHandle);
    sps["tuktuk_buttons"][0].on("mouseout", socialIconMouseHandle);
    sps["tuktuk_buttons"][0].on("click", socialIconMouseHandle);

    sps["tuktuk_buttons"][1].gotoAndPlay('iconMan');
    sps["tuktuk_buttons"][1].cursor = "pointer";
    sps["tuktuk_buttons"][1].on("mouseover", socialIconMouseHandle);
    sps["tuktuk_buttons"][1].on("mouseout", socialIconMouseHandle);
    sps["tuktuk_buttons"][1].on("click", socialIconMouseHandle);

    var hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(- sps["text_nuuneoi_com"][0].getBounds().width / 2, - sps["text_nuuneoi_com"][0].getBounds().height, sps["text_nuuneoi_com"][0].getBounds().width, sps["text_nuuneoi_com"][0].getBounds().height);
    sps["text_nuuneoi_com"][0].hitArea = hit;
    sps["text_nuuneoi_com"][0].cursor = "pointer";
    sps["text_nuuneoi_com"][0].on("mouseover", socialIconMouseHandle);
    sps["text_nuuneoi_com"][0].on("mouseout", socialIconMouseHandle);
    sps["text_nuuneoi_com"][0].on("click", socialIconMouseHandle);
}

function socialIconMouseHandle(event) {
    var pair = [
        {inactive: 'iconFacebook', active: 'iconFacebookActive', url: 'http://facebook.com/nuuneoicom'},
        {inactive: 'iconTwitter', active: 'iconTwitterActive', url: 'http://twitter.com/nuuneoi'},
        {inactive: 'iconGooglePlus', active: 'iconGooglePlusActive', url: 'https://plus.google.com/+nuuneoi/posts'},
        {inactive: 'iconLinkedIn', active: 'iconLinkedInActive', url: 'https://www.linkedin.com/in/nuuneoi'},
        {inactive: 'iconInstagram', active: 'iconInstagramActive', url: 'http://instagram.com/nuuneoicom'},
        {inactive: 'iconYouTube', active: 'iconYouTubeActive', url: 'http://www.youtube.com/nuuneoi'},
        {inactive: 'iconEmail', active: 'iconEmailActive', url: 'http://nuuneoi.com/contact'},
    ];
    switch (event.type) {
        case "mouseover":
            for (var i = 0; i <= 6; i++) {
                if (event.target == sps["social_icons"][i]) {
                    isMouseDownEnabled = false;
                    sps["social_icons"][i].gotoAndPlay(pair[i].active);
                    return;
                }
            }
            if (event.target == sps["text_nuuneoi_com"][0]) {
                isMouseDownEnabled = false;
                sps["text_nuuneoi_com"][0].gotoAndPlay("active");
                return;
            }
            if (event.target == sps["tuktuk_buttons"][0]) {
                isMouseDownEnabled = false;
                sps["tuktuk_buttons"][0].gotoAndPlay("iconTukTukActive");
                return;
            }
            if (event.target == sps["tuktuk_buttons"][1]) {
                isMouseDownEnabled = false;
                sps["tuktuk_buttons"][1].gotoAndPlay("iconManActive");
                return;
            }
            break;
        case "mouseout":
            for (var i = 0; i <= 6; i++) {
                if (event.target == sps["social_icons"][i]) {
                    isMouseDownEnabled = true;
                    sps["social_icons"][i].gotoAndPlay(pair[i].inactive);
                    return;
                }
            }
            if (event.target == sps["text_nuuneoi_com"][0]) {
                isMouseDownEnabled = true;
                sps["text_nuuneoi_com"][0].gotoAndPlay("inactive");
                return;
            }
            if (event.target == sps["tuktuk_buttons"][0]) {
                isMouseDownEnabled = true;
                sps["tuktuk_buttons"][0].gotoAndPlay("iconTukTuk");
                return;
            }
            if (event.target == sps["tuktuk_buttons"][1]) {
                isMouseDownEnabled = true;
                sps["tuktuk_buttons"][1].gotoAndPlay("iconMan");
                return;
            }
            break;
        case "click":
            for (var i = 0; i <= 6; i++) {
                if (event.target == sps["social_icons"][i]) {
                    window.open(pair[i].url, "_blank");
                    return;
                }
            }
            if (event.target == sps["text_nuuneoi_com"][0]) {
                window.open("http://nuuneoi.com", "_blank");
                return;
            }
            if (event.target == sps["tuktuk_buttons"][0]) {
                toggleTukTukStatus();
                return;
            }
            if (event.target == sps["tuktuk_buttons"][1]) {
                toggleTukTukStatus();
                return;
            }
            break;
        default:
            break;
    }
}

function resized() {
    doSetCanvasSize();

    var scale = Math.min(w, h) / 800;
    loadingShadow.offsetX = 5 * scale;
    loadingShadow.offsetY = 5 * scale;
    loadingShadow.blur = 20 * scale;

    loadingContainer.width = w;
    loadingContainer.height = h;
    loadingContainerShadowLayer.width = w;
    loadingContainerShadowLayer.height = h;
    loadingBackgroundLayer.width = w;
    loadingBackgroundLayer.height = h;
    loadingProgressText.font = Math.ceil(scale * 20) + "px Arial";
    var b = loadingProgressText.getBounds();
    loadingProgressText.x = (w - b.width) / 2;
    loadingProgressText.y = (h - b.height) / 2;
    updateCircularLoading();

    refreshStageAndUpdate();
}

function refreshStage() {
    if (isTransitioningToStart) {
        refreshStageCode();
        updateCircularLoading();
        return;
    }

    if (isAllImageLoaded) {
        refreshStageCode();
        doTransition();
    } else {
        updateCircularLoading();
    }

    stage.update();
}

function refreshStageCode() {

    // sky
    r("sky", 0, 1.000000, 0, 0, 0, 0, 0, "c", "b", 0, 0);

    // sky
    r("sky", 1, 1.000000, -600, 0, 0, 0, 0, "c", "b", 0, 0);

    // sky
    r("sky", 2, 1.000000, 600, 0, 0, 0, 0, "c", "b", 0, 0);

    // building_bg
    r("building_bg", 0, 0.685714, -393, 0, 0, 0, 0, "c", "b", 0, 0);

    // building_bg
    r("building_bg", 1, 0.685714, -120, 0, 0, 0, 0, "c", "b", 0, 0);

    // building_bg
    r("building_bg", 2, 0.685714, 153, 0, 0, 0, 0, "c", "b", 0, 0);

    // building_bg
    r("building_bg", 3, 0.685714, 426, 0, 0, 0, 0, "c", "b", 0, 0);

    // cloud1
    r("cloud1", 0, 0.442857, -120, 105, 0, 0, 0, "c", "b", 0, 0);

    // cloud1
    r("cloud1", 1, 0.442857, 200, 150, 0, 0, 0, "c", "b", 0, 0);

    // t1
    r("t1", 0, 0.309524, -225, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 1, 0.309524, -193, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 2, 0.309524, -161, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 3, 0.309524, -129, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 4, 0.309524, -97, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 5, 0.309524, -65, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 6, 0.309524, -33, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 7, 0.309524, -1, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 8, 0.309524, 31, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 9, 0.309524, 63, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 10, 0.309524, 95, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 11, 0.309524, 127, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 12, 0.309524, 159, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 13, 0.309524, 191, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 14, 0.309524, 223, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 15, 0.309524, 255, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 16, 0.309524, 287, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 17, 0.309524, 319, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 18, 0.309524, 351, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 19, 0.309524, 383, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 20, 0.309524, 415, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 21, 0.309524, 785, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 22, 0.309524, 817, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 23, 0.309524, 849, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 24, 0.309524, 881, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 25, 0.309524, 913, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 26, 0.309524, 945, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 27, 0.309524, 977, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 28, 0.309524, 1009, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 29, 0.309524, 1041, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 30, 0.309524, 1073, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 31, 0.309524, 1105, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 32, 0.309524, 1137, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 33, 0.309524, 1169, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 34, 0.309524, 1201, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 35, 0.309524, 1233, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 36, 0.309524, 1265, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 37, 0.309524, 1297, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 38, 0.309524, 1329, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 39, 0.309524, 1361, 38, 0, 1, 1, "c", "b", 0, 0);

    // wat
    r("wat", 0, 0.890476, 600, 40, 0, 1, 1, "c", "b", 0, 0);

    // bioboard
    r("bioboard", 0, 0.800000, 1506, 30, 0, 1, 1, "c", "b", 0, 0);

    // biodetails
    r("biodetails", 0, 0.476190, 1506, 78, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 40, 0.309524, 1652, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 41, 0.309524, 1684, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 42, 0.309524, 1716, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 43, 0.309524, 1748, 38, 0, 1, 1, "c", "b", 0, 0);

    // t1
    r("t1", 44, 0.309524, 1780, 38, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 0, 0.257143, 4124, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 1, 0.257143, 4204, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 2, 0.257143, 4284, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 3, 0.257143, 4364, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 4, 0.257143, 4444, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 5, 0.257143, 4524, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 6, 0.257143, 4604, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 7, 0.257143, 4684, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 8, 0.257143, 4764, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 9, 0.257143, 4844, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 10, 0.257143, 4924, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 11, 0.257143, 5004, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 12, 0.257143, 5084, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 13, 0.257143, 6044, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 14, 0.257143, 6124, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 15, 0.257143, 6204, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 16, 0.257143, 6284, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 17, 0.257143, 6364, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 18, 0.257143, 6444, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 19, 0.257143, 6524, 30, 0, 1, 1, "c", "b", 0, 0);

    // t2
    r("t2", 20, 0.257143, 6604, 30, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 0, 0.238095, -400, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 1, 0.238095, -200, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 2, 0.238095, 0, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 3, 0.238095, 200, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 4, 0.238095, 400, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 5, 0.238095, 600, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 6, 0.238095, 800, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 7, 0.238095, 1000, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 8, 0.238095, 1200, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 9, 0.238095, 1400, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 10, 0.238095, 1600, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 11, 0.238095, 1800, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 12, 0.238095, 2000, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 13, 0.238095, 3200, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 14, 0.238095, 3400, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 15, 0.238095, 3600, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 16, 0.238095, 3800, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 17, 0.238095, 4000, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 18, 0.238095, 4200, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 19, 0.238095, 4400, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 20, 0.238095, 4600, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 21, 0.238095, 4800, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 22, 0.238095, 5000, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 23, 0.238095, 5200, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 24, 0.238095, 5400, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 25, 0.238095, 5600, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 26, 0.238095, 5800, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 27, 0.238095, 6000, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 28, 0.238095, 6200, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 29, 0.238095, 6400, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 30, 0.238095, 6600, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 31, 0.238095, 6800, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 32, 0.238095, 7000, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 33, 0.238095, 7200, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 34, 0.238095, 7400, -10, 0, 1, 1, "c", "b", 0, 0);

    // rb
    r("rb", 35, 0.238095, 7600, -10, 0, 1, 1, "c", "b", 0, 0);

    // rbend
    r("rbend", 0, 0.190476, 7806, 0, 0, 1, 1, "c", "b", 0, 0);

    // hat
    r("hat", 0, 0.995238, 1055, 210, 0, 1, 1, "c", "b", 0, 0);

    // mbl
    r("mbl", 0, 1.000000, 1826, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 0, 1.000000, 1962, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 1, 1.000000, 2022, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 2, 1.000000, 2082, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 3, 1.000000, 2142, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 4, 1.000000, 2202, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 5, 1.000000, 2262, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 6, 1.000000, 2322, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 7, 1.000000, 2382, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 8, 1.000000, 2442, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 9, 1.000000, 2502, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 10, 1.000000, 2562, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 11, 1.000000, 2622, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 12, 1.000000, 2682, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 13, 1.000000, 2742, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 14, 1.000000, 2802, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 15, 1.000000, 2862, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 16, 1.000000, 2922, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 17, 1.000000, 2982, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 18, 1.000000, 3042, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 19, 1.000000, 3102, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 20, 1.000000, 3162, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 21, 1.000000, 3222, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 22, 1.000000, 3282, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 23, 1.000000, 3342, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 24, 1.000000, 3402, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 25, 1.000000, 3462, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 26, 1.000000, 3522, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 27, 1.000000, 3582, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 28, 1.000000, 3642, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 29, 1.000000, 3702, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 30, 1.000000, 3762, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 31, 1.000000, 3822, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 32, 1.000000, 3882, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 33, 1.000000, 3942, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 34, 1.000000, 4002, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbc
    r("mbc", 35, 1.000000, 4062, 0, 0, 1, 1, "c", "b", 0, 0);

    // mbr
    r("mbr", 0, 1.000000, 4132, 0, 0, 1, 1, "c", "b", 0, 0);

    // dev_exp_platform
    r("dev_exp_platform", 0, 0.561905, 2114, 80, 0, 1, 1, "c", "b", 0, 0);

    // macbookseparator
    r("macbookseparator", 0, 0.742857, 2349, 54, 0, 1, 1, "c", "b", 0, 0);

    // macbookseparator
    r("macbookseparator", 1, 0.742857, 2539, 54, 0, 1, 1, "c", "b", 0, 0);

    // macbookseparator
    r("macbookseparator", 2, 0.742857, 3026, 54, 0, 1, 1, "c", "b", 0, 0);

    // macbookseparator
    r("macbookseparator", 3, 0.742857, 3953, 54, 0, 1, 1, "c", "b", 0, 0);

    // dev_crossplatform
    r("dev_crossplatform", 0, 0.580952, 2439, 75, 0, 1, 1, "c", "b", 0, 0);

    // dev_prog_lang
    r("dev_prog_lang", 0, 0.628571, 2781, 68, 0, 1, 1, "c", "b", 0, 0);

    // dev_web_stack_1
    r("dev_web_stack_1", 0, 0.609524, 3206, 70, 0, 1, 1, "c", "b", 0, 0);

    // dev_web_stack_2
    r("dev_web_stack_2", 0, 0.485714, 3489, 71, 0, 1, 1, "c", "b", 0, 0);

    // dev_web_stack_3
    r("dev_web_stack_3", 0, 0.485714, 3773, 71, 0, 1, 1, "c", "b", 0, 0);

    // dev_extra_skill_set
    r("dev_extra_skill_set", 0, 0.600000, 4043, 74, 0, 1, 1, "c", "b", 0, 0);

    // design_skill
    r("design_skill", 0, 0.790476, 4323, 210, 0, 1, 1, "c", "b", 0, 0);

    // design_skill_set
    r("design_skill_set", 0, 0.790476, 4543, 210, 0, 1, 1, "c", "b", 0, 0);

    // design_video_making
    r("design_video_making", 0, 0.766667, 4763, 210, 0, 1, 1, "c", "b", 0, 0);

    // design_ux_skill_set
    r("design_ux_skill_set", 0, 0.800000, 5013, 210, 0, 1, 1, "c", "b", 0, 0);

    // photography_start
    r("photography_start", 0, 0.728571, 5253, 37, 0, 1, 1, "c", "b", 0, 0);

    // photography_1
    r("photography_1", 0, 0.761905, 5458, 38, 0, 1, 1, "c", "b", 0, 0);

    // photography_2
    r("photography_2", 0, 0.761905, 5693, 38, 0, 1, 1, "c", "b", 0, 0);

    // photography_3
    r("photography_3", 0, 0.761905, 5926, 38, 0, 1, 1, "c", "b", 0, 0);

    // microphone
    r("microphone", 0, 0.671429, 6356, 40, 0, 1, 1, "c", "b", 0, 0);

    // public_speaking
    r("public_speaking", 0, 0.176190, 6344, 145, 0, 1, 1, "c", "b", 0, 0);

    // training
    r("training", 0, 0.161905, 6445, 127, 0, 1, 1, "c", "b", 0, 0);

    // writer
    r("writer", 0, 0.133333, 6513, 116, 0, 1, 1, "c", "b", 0, 0);

    // mc
    r("mc", 0, 0.133333, 6571, 108, 0, 1, 1, "c", "b", 0, 0);

    // awl
    r("awl", 0, 0.761905, 6706, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 0, 0.761905, 6801, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 1, 0.761905, 6851, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 2, 0.761905, 6901, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 3, 0.761905, 6951, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 4, 0.761905, 7001, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 5, 0.761905, 7051, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 6, 0.761905, 7101, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 7, 0.761905, 7151, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 8, 0.761905, 7201, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 9, 0.761905, 7251, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 10, 0.761905, 7301, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 11, 0.761905, 7351, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 12, 0.761905, 7401, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 13, 0.761905, 7451, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 14, 0.761905, 7501, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 15, 0.761905, 7551, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 16, 0.761905, 7601, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 17, 0.761905, 7651, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 18, 0.761905, 7701, 40, 0, 1, 1, "c", "b", 0, 0);

    // awc
    r("awc", 19, 0.761905, 7751, 40, 0, 1, 1, "c", "b", 0, 0);

    // awr
    r("awr", 0, 0.761905, 7849, 40, 0, 1, 1, "c", "b", 0, 0);

    // awards_2002
    r("awards_2002", 0, 0.461905, 6861, 69, 0, 1, 1, "c", "b", 0, 0);

    // awards_2003
    r("awards_2003", 0, 0.461905, 6920, 69, 0, 1, 1, "c", "b", 0, 0);

    // awards_2004
    r("awards_2004", 0, 0.461905, 7060, 69, 0, 1, 1, "c", "b", 0, 0);

    // awards_2005
    r("awards_2005", 0, 0.461905, 7134, 69, 0, 1, 1, "c", "b", 0, 0);

    // awards_2006
    r("awards_2006", 0, 0.457143, 7114, 70, 0, 1, 1, "c", "b", 0, 0);

    // awards_2007
    r("awards_2007", 0, 0.461905, 7264, 69, 0, 1, 1, "c", "b", 0, 0);

    // awards_2008
    r("awards_2008", 0, 0.461905, 7441, 69, 0, 1, 1, "c", "b", 0, 0);

    // awards_2009
    r("awards_2009", 0, 0.461905, 7526, 69, 0, 1, 1, "c", "b", 0, 0);

    // awards_2010
    r("awards_2010", 0, 0.461905, 7610, 69, 0, 1, 1, "c", "b", 0, 0);

    // awards_2015
    r("awards_2015", 0, 0.461905, 7696, 69, 0, 1, 1, "c", "b", 0, 0);

    // timeline_start
    r("timeline_start", 0, 0.133333, 7990, 99, 0, 1, 1, "c", "b", 0, 0);

    // timeline_thaiplus
    r("timeline_thaiplus", 0, 0.476190, 7990, 197, 0, 1, 1, "c", "b", 0, 0);

    // timeline_nuuneoi
    r("timeline_nuuneoi", 0, 0.476190, 7990, 297, 0, 1, 1, "c", "b", 0, 0);

    // timeline_hlp
    r("timeline_hlp", 0, 0.476190, 7990, 397, 0, 1, 1, "c", "b", 0, 0);

    // timeline_droidsans
    r("timeline_droidsans", 0, 0.476190, 7990, 497, 0, 1, 1, "c", "b", 0, 0);

    // timeline_molome
    r("timeline_molome", 0, 0.476190, 7990, 597, 0, 1, 1, "c", "b", 0, 0);

    // timeline_thecheesefactory
    r("timeline_thecheesefactory", 0, 0.476190, 7990, 697, 0, 1, 1, "c", "b", 0, 0);

    // timeline_empty_line
    r("timeline_empty_line", 0, 0.476190, 7990, 797, 0, 1, 1, "c", "b", 0, 0);

    // timeline_newpage
    r("timeline_newpage", 0, 0.476190, 7990, 897, 0, 1, 1, "c", "b", 0, 0);

    // text_the_end
    r("text_the_end", 0, 0.071429, 8495, 1029, 0, 1, 1, "c", "b", 0, 0);

    // text_know_me_more
    r("text_know_me_more", 0, 0.033333, 8495, 1007, 0, 1, 1, "c", "b", 0, 0);

    // text_or_contact_me
    r("text_or_contact_me", 0, 0.033333, 8480, 953, 0, 1, 1, "c", "b", 0, 0);

    // text_all_right_reserved
    r("text_all_right_reserved", 0, 0.042857, 8495, 929, 0, 1, 1, "c", "b", 0, 0);

    // text_nuuneoi_com
    r("text_nuuneoi_com", 0, 0.042857, 8558, 929, 0, 1, 1, "c", "b", 0, 0);

    // social_icons
    r("social_icons", 0, 0.142857, 8418, 1063, 0, 1, 1, "c", "b", 0, 0);

    // social_icons
    r("social_icons", 1, 0.142857, 8449, 1063, 0, 1, 1, "c", "b", 0, 0);

    // social_icons
    r("social_icons", 2, 0.142857, 8480, 1063, 0, 1, 1, "c", "b", 0, 0);

    // social_icons
    r("social_icons", 3, 0.142857, 8511, 1063, 0, 1, 1, "c", "b", 0, 0);

    // social_icons
    r("social_icons", 4, 0.142857, 8542, 1063, 0, 1, 1, "c", "b", 0, 0);

    // social_icons
    r("social_icons", 5, 0.142857, 8573, 1063, 0, 1, 1, "c", "b", 0, 0);

    // social_icons
    r("social_icons", 6, 0.142857, 8540, 940, 0, 1, 1, "c", "b", 0, 0);

    // floating_platform
    r("floating_platform", 0, 0.128571, 7960, 7, 0, 1, 0, "c", "b", 0, 0);

    // floating_platform
    r("floating_platform", 1, 0.128571, 8067, 860, 0, 1, 1, "c", "b", 0, 0);

    // floating_platform
    r("floating_platform", 2, 0.128571, 8174, 860, 0, 1, 1, "c", "b", 0, 0);

    // floating_platform
    r("floating_platform", 3, 0.128571, 8281, 860, 0, 1, 1, "c", "b", 0, 0);

    // floating_platform
    r("floating_platform", 4, 0.128571, 8388, 860, 0, 1, 1, "c", "b", 0, 0);

    // floating_platform
    r("floating_platform", 5, 0.128571, 8495, 860, 0, 1, 1, "c", "b", 0, 0);

    // floating_platform
    r("floating_platform", 6, 0.128571, 8602, 860, 0, 1, 1, "c", "b", 0, 0);

    // floating_platform
    r("floating_platform", 7, 0.128571, 8709, 860, 0, 1, 1, "c", "b", 0, 0);

    // floating_platform
    r("floating_platform", 8, 0.128571, 8816, 860, 0, 1, 1, "c", "b", 0, 0);

    // floating_platform
    r("floating_platform", 9, 0.128571, 8923, 860, 0, 1, 1, "c", "b", 0, 0);

    // text_resume
    r("text_resume", 0, 0.219048, 0, 140, 0, 1, 1, "c", "b", 0, 0);

    // mousewheel
    r("mousewheel", 0, 0.190476, 0, 85, 0, 1, 1, "c", "b", 0, 0);

    // text_born
    r("text_born", 0, 0.119048, 300, 110, 0, 1, 1, "c", "b", 0, 0);

    // character
    r("character", 0, 0.261905, 0, 210, 1, 0, 0, "c", "b", 0, 0);

    // tuktuk_character
    r("tuktuk_character", 0, 0.333333, 0, 27, 1, 0, 0, "c", "b", 0, 0);

    // hatfront
    r("hatfront", 0, 0.476190, 1055, 226, 0, 1, 1, "c", "b", 0, 0);

    // tuktuk
    r("tuktuk", 0, 0.333333, 800, 7, 0, 1, 1, "c", "b", 0, 0);

    // under_construction_sign
    r("under_construction_sign", 0, 0.228571, 7840, 0, 0, 1, 1, "c", "b", 0, 0);

    // under_construction_sign
    r("under_construction_sign", 1, 0.228571, 7870, 0, 0, 1, 1, "c", "b", 0, 0);

    // tuktuk_buttons
    r("tuktuk_buttons", 0, 0.152381, 0, 5, 0, 0, 0, "l", "b", 5, 0);

    // tuktuk_buttons
    r("tuktuk_buttons", 1, 0.152381, 0, 5, 0, 0, 0, "l", "b", 5, 0);

}

function updateCircularLoading() {
    // Quick fix for Safari
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        return;
    }
    var scale = Math.min(w, h) * toStartTransition.scale / 800;
    var centerX = w / 2, centerY = h / 2;
    var d = Math.PI / 90;

    angleA = angleA + Math.PI * 6 / 90;
    angleB = angleB - Math.PI * 4 / 90;
    angleC = angleC + Math.PI * 2 / 90;

    loadingBackgroundLayer.graphics.clear();
    loadingBackgroundLayer.graphics.beginFill(createjs.Graphics.getRGB(120,144,216)).drawRect(0, 0, w, centerY - 80 * scale);
    loadingBackgroundLayer.graphics.beginFill(createjs.Graphics.getRGB(120,144,216)).drawRect(0, 0, centerX - 80 * scale, h);
    loadingBackgroundLayer.graphics.beginFill(createjs.Graphics.getRGB(120,144,216)).drawRect(centerX + 80 * scale, 0, w - centerX - 80 * scale, h);
    loadingBackgroundLayer.graphics.beginFill(createjs.Graphics.getRGB(120,144,216)).drawRect(0, centerY + 80 * scale, w, h - centerY - 80 * scale);

    loadingContainerShadowLayer.graphics.clear();
    loadingContainerShadowLayer.graphics
        .beginFill(createjs.Graphics.getRGB(40,40,40))
        .arc(centerX, centerY, 160 * scale, 0, Math.PI * 2, false)
        .arc(centerX, centerY, 138 * scale, Math.PI * 2, 0, true);

    loadingContainer.graphics.clear();
    loadingContainer.graphics
        .beginFill(createjs.Graphics.getRGB(40,40,40))
        .arc(centerX, centerY, 160 * scale, 0, Math.PI * 2, false)
        .arc(centerX, centerY, 138 * scale, Math.PI * 2, 0, true);
    loadingContainer.graphics
        .beginFill(createjs.Graphics.getRGB(240,240,240))
        .arc(centerX, centerY, 140 * scale, 0, Math.PI * 2, false)
        .arc(centerX, centerY, 118 * scale, Math.PI * 2, 0, true);
    loadingContainer.graphics
        .beginFill(createjs.Graphics.getRGB(255,255,255))
        .arc(centerX, centerY, 120 * scale, 0, Math.PI * 2, false)
        .arc(centerX, centerY, 80 * scale, Math.PI * 2, 0, true);

    loadingContainer.graphics
        .beginFill(createjs.Graphics.getRGB(40,40,40))
        .arc(centerX, centerY, 80.1 * scale, angleA, angleA + Math.PI, false)
        .arc(centerX, centerY, 40 * scale, angleA + Math.PI, angleA, true);

    loadingContainer.graphics
        .beginFill(createjs.Graphics.getRGB(220,0,0))
        .arc(centerX, centerY, 50.1 * scale, angleB, angleB + Math.PI, false)
        .arc(centerX, centerY, 40 * scale, angleB + Math.PI, angleB, true);

    loadingContainer.graphics
        .beginFill(createjs.Graphics.getRGB(40,40,40))
        .arc(centerX, centerY, 40.1 * scale, angleC, angleC + Math.PI, false)
        .arc(centerX, centerY, 30 * scale, angleC + Math.PI, angleC, true);
}

var r = rs = refreshSprite = function(sprite_key, sprite_index, ratio, x, y, useWalkDirection, xFactor, yFactor, pivotX, pivotY, marginX, marginY) {
    var s = sps[sprite_key][sprite_index];
    var sc = h * ratio / s.getBounds().height;
    var xAxis = wHf;
    if (pivotX == 'r')
        xAxis = w - (s.getBounds().width * sc / 2);
    else if (pivotX == 'l')
        xAxis = s.getBounds().width * sc / 2;
    var yAxis = h;
    s.x = xAxis + marginX * h / sH + ((x - xO * xFactor) * h / sH);
    s.y = yAxis + marginY * h / sH - (h * (y - yO * yFactor) / sH);
    s.scaleX = (useWalkDirection ? walkDirection : 1) * sc;
    s.scaleY = sc;
}

function doTransition() {


    // text_born
    {
        var from = 50;
        var to = 100;
        var diff = 120;
        var sprite_index = 0;
        if (xO < leftArr['text_born'] - diff) {
            sps["text_born"][sprite_index].y = h - (h * (210 - from) / 210);
        } else if (xO >= leftArr['text_born']) {
            sps["text_born"][sprite_index].y = h - (h * (210 - to) / 210);
        } else {
            sps["text_born"][sprite_index].y = h - (h * (210 - (from + (xO - (leftArr['text_born'] - diff)) / (diff) * from)) / 210);
        }
    }

    // hat
    {
        sps["hat"][0].y = h - (h * (210 - hatTransition.y) / 210);
        sps["hatfront"][0].y = h - (h * (210 - hatTransition.y + 16) / 210);
    }

    // design skill
    {
        sps["design_skill"][0].y = h - (h * (210 - designSkillTransition.y) / 210);
    }

    // design skill set
    {
        sps["design_skill_set"][0].y = h - (h * (210 - designSkillSetTransition.y) / 210);
    }

    // design video making
    {
        sps["design_video_making"][0].y = h - (h * (210 - designVideoMakingTransition.y) / 210);
    }

    // design skill set
    {
        sps["design_ux_skill_set"][0].y = h - (h * (210 - designUXSkillSetTransition.y) / 210);
    }

    // Cloud
    {
        sps["cloud1"][0].x = wHf + ((cloud1Position) * h / 210);
        sps["cloud1"][1].x = wHf + ((cloud2Position) * h / 210);
    }

    // Social Icons
    {
        sps["social_icons"][0].y = h - (h * (210 - (- 643 + socialIconsTransition.icon_facebook_y) - yO) / 210);
        sps["social_icons"][1].y = h - (h * (210 - (- 643 + socialIconsTransition.icon_twitter_y) - yO) / 210);
        sps["social_icons"][2].y = h - (h * (210 - (- 643 + socialIconsTransition.icon_google_plus_y) - yO) / 210);
        sps["social_icons"][3].y = h - (h * (210 - (- 643 + socialIconsTransition.icon_linked_in_y) - yO) / 210);
        sps["social_icons"][4].y = h - (h * (210 - (- 643 + socialIconsTransition.icon_instagram_y) - yO) / 210);
        sps["social_icons"][5].y = h - (h * (210 - (- 643 + socialIconsTransition.icon_youtube_y) - yO) / 210);
    }

    // character
    {
        sps["character"][0].y = h - (h * (210 - warpInTransition.y) / 210);
    }

    // Share Area
    {
        shareArea.obj.style.bottom = shareArea.bottom + 'px';
    }
}

function refreshStageAndUpdate() {
    refreshStage();
    stage.update();
}

function tick(event) {
    // update cloud position
    var wHalf = Math.ceil((w >> 1) * 210 / h);
    cloud1Position -= event.delta / 1000 * 10;
    cloud2Position -= event.delta / 1000 * 5;
    if (cloud1Position < - wHalf - 80)
        cloud1Position = wHalf + 80;
    if (cloud2Position < - wHalf - 80)
        cloud2Position = wHalf + 80;
    // update the stage:
    if (isWalking) {
        var playStepBefore = playStep;
        if (walkDirection > 0)
            playStep += event.delta / 1000 * 150;
        else
            playStep -= event.delta / 1000 * 150;
        checkTrigger(playStepBefore, playStep);
        if (playStep < MIN_PLAYSTEP || playStep > MAX_PLAYSTEP) {
            if (playStep < MIN_PLAYSTEP)
                playStep = MIN_PLAYSTEP;
            else if (playStep > MAX_PLAYSTEP)
                playStep = MAX_PLAYSTEP;
            isWalking = false;
            currentWheelPosition = 0;
            sps["character"][0].gotoAndPlay("standRt");
            sps["tuktuk_character"][0].gotoAndPlay('standRt');
        }
        if (!isMouseDown) {
            wheelTickLeft--;
            if (wheelTickLeft <= 0) {
                isWalking = false;
                currentWheelPosition = 0;
                sps["character"][0].gotoAndPlay("standRt");
                sps["tuktuk_character"][0].gotoAndPlay('standRt');
            }
        }
        //document.title = "x: " + xO;
    }
    if (playStep >= MAX_PLAYSTEP) {
        walkDirection = -1;
    }
    calculateXOffsetFromPlayStep();
    refreshStage();
    stage.update(event);
}

function checkTrigger(before, after) {
    for (var key in triggers) {
        var val = triggers[key];
        if (val['playStep'] >= before && val['playStep'] <= after) {
            switch (val['name']) {
                case 'Hat':
                {
                    if (!trigged[val['name']]) {
                        trigged[val['name']] = true;
                        createjs.Tween.get(hatTransition).to({y: 210}, 500, createjs.Ease.circInOut);
                    }
                }
                    break;
                case 'BioBoard':
                    fadeInIfNotTrigged(val['name'], 'biodetails', 0);
                    break;
                case 'MacBook':
                    fadeInIfNotTrigged(val['name'], 'dev_exp_platform', 0);
                    break;
                case 'ProgrammingLanguage':
                    fadeInIfNotTrigged(val['name'], 'dev_prog_lang', 0);
                    break;
                case 'DevCrossPlatform':
                    fadeInIfNotTrigged(val['name'], 'dev_crossplatform', 0);
                    break;
                case 'DevWebStack1':
                    fadeInIfNotTrigged(val['name'], 'dev_web_stack_1', 0);
                    break;
                case 'DevWebStack2':
                    fadeInIfNotTrigged(val['name'], 'dev_web_stack_2', 0);
                    break;
                case 'DevWebStack3':
                    fadeInIfNotTrigged(val['name'], 'dev_web_stack_3', 0);
                    break;
                case 'DevExtraSkillSet':
                    fadeInIfNotTrigged(val['name'], 'dev_extra_skill_set', 0);
                    break;
                case 'DesignSkill':
                {
                    if (!trigged[val['name']]) {
                        trigged[val['name']] = true;
                        createjs.Tween.get(designSkillTransition).to({y: 172}, 500, createjs.Ease.circInOut);
                    }
                }
                    break;
                case 'DesignSkillSet':
                {
                    if (!trigged[val['name']]) {
                        trigged[val['name']] = true;
                        createjs.Tween.get(designSkillSetTransition).to({y: 172}, 500, createjs.Ease.circInOut);
                    }
                }
                    break;
                case 'DesignVideoMaking':
                {
                    if (!trigged[val['name']]) {
                        trigged[val['name']] = true;
                        createjs.Tween.get(designVideoMakingTransition).to({y: 171}, 500, createjs.Ease.circInOut);
                    }
                }
                    break;
                case 'DesignUXSkillSet':
                {
                    if (!trigged[val['name']]) {
                        trigged[val['name']] = true;
                        createjs.Tween.get(designUXSkillSetTransition).to({y: 171}, 500, createjs.Ease.circInOut);
                    }
                }
                    break;
                case 'PublicSpeaking':
                    fadeInIfNotTrigged(val['name'], 'public_speaking', 0);
                    break;
                case 'Training':
                    fadeInIfNotTrigged(val['name'], 'training', 0);
                    break;
                case 'Writer':
                    fadeInIfNotTrigged(val['name'], 'writer', 0);
                    break;
                case 'MC':
                    fadeInIfNotTrigged(val['name'], 'mc', 0);
                    break;
                case 'Awards2002':
                    fadeInIfNotTrigged(val['name'], 'awards_2002', 0);
                    break;
                case 'Awards2003':
                    fadeInIfNotTrigged(val['name'], 'awards_2003', 0);
                    break;
                case 'Awards2004':
                    fadeInIfNotTrigged(val['name'], 'awards_2004', 0);
                    break;
                case 'Awards2005':
                    fadeInIfNotTrigged(val['name'], 'awards_2005', 0);
                    break;
                case 'Awards2006':
                    fadeInIfNotTrigged(val['name'], 'awards_2006', 0);
                    break;
                case 'Awards2007':
                    fadeInIfNotTrigged(val['name'], 'awards_2007', 0);
                    break;
                case 'Awards2008':
                    fadeInIfNotTrigged(val['name'], 'awards_2008', 0);
                    break;
                case 'Awards2009':
                    fadeInIfNotTrigged(val['name'], 'awards_2009', 0);
                    break;
                case 'Awards2010':
                    fadeInIfNotTrigged(val['name'], 'awards_2010', 0);
                    break;
                case 'Awards2015':
                    fadeInIfNotTrigged(val['name'], 'awards_2015', 0);
                    break;
                case 'SocialIcons':
                    bringInShareArea();
                    if (!trigged[val['name']]) {
                        trigged[val['name']] = true;
                        createjs.Tween.get(socialIconsTransition).to({icon_facebook_y: -118}, 500, createjs.Ease.backOut);
                        createjs.Tween.get(socialIconsTransition).wait(120).to({icon_twitter_y: -118}, 500, createjs.Ease.backOut);
                        createjs.Tween.get(socialIconsTransition).wait(240).to({icon_google_plus_y: -118}, 500, createjs.Ease.backOut);
                        createjs.Tween.get(socialIconsTransition).wait(360).to({icon_linked_in_y: -118}, 500, createjs.Ease.backOut);
                        createjs.Tween.get(socialIconsTransition).wait(480).to({icon_instagram_y: -118}, 500, createjs.Ease.backOut);
                        createjs.Tween.get(socialIconsTransition).wait(600).to({icon_youtube_y: -118}, 500, createjs.Ease.backOut);
                    }
                    break;
            }
        } else if (val['playStep'] >= after && val['playStep'] <= before) {
            switch (val['name']) {
                case 'SocialIcons':
                    bringOutShareArea();
                    break;
            }
        }
    }
}

function fadeInIfNotTrigged(trigger_key, sprite_key, sprite_index) {
    if (!trigged[trigger_key]) {
        trigged[trigger_key] = true;
        createjs.Tween.get(sps[sprite_key][sprite_index]).to({alpha: 1}, 500, createjs.Ease.circInOut);
    }
}

////////////////
// Calculation
////////////////
function calculateXOffsetFromPlayStep() {
    //document.title = "playStep: " + (playStep - 0);
    for (var key in playStepMarker) {
        var val = playStepMarker[key];
        if (playStep >= val['stepFrom'] && playStep < val['stepTo']) {
            // Calculate xO & yO
            if (playStep == val['stepFrom']) {
                xO = val['xOffsetFrom'];
                yO = val['yOffsetFrom'];
            } else {
                xO = val['xOffsetFrom'] + (val['xOffsetTo'] - val['xOffsetFrom']) * (playStep - val['stepFrom']) / (val['stepTo'] - val['stepFrom']);
                yO = val['yOffsetFrom'] + (val['yOffsetTo'] - val['yOffsetFrom']) * (playStep - val['stepFrom']) / (val['stepTo'] - val['stepFrom']);
            }
            // Setup anim
            walkAnim = val['walkAnim'];
            if (isWalking && sps["character"][0].currentAnimation != walkAnim)
                sps["character"][0].gotoAndPlay(walkAnim);
            if (isWalking && sps["tuktuk_character"][0].currentAnimation != walkAnim)
                sps["tuktuk_character"][0].gotoAndPlay(walkAnim);
            // Do something special by case
            switch (val['name'])
            {
                default:
                    break;
            }
            return;
        }
    }
    //xO = playStep;
}

//////////
// Event
//////////

function MouseWheelHandler(e) {
    if (isTransitioningToStart || isWarpingIn || !isMouseDownEnabled) {
        window.scrollTo(-1, 0);
        return;
    }

    var wheelDown = e.wheelDelta > 0;
    var wheelUp   = e.wheelDelta < 0;
    if (currentWheelPosition > 0 && wheelUp) {
        currentWheelPosition = 0;
    } else if (currentWheelPosition > 0 && wheelDown) {
        wheelTickLeft = 20;
        return;
    } else if (currentWheelPosition < 0 && wheelDown) {
        currentWheelPosition = 0;
    } else if (currentWheelPosition < 0 && wheelUp) {
        wheelTickLeft = 20;
        return;
    } else if (currentWheelPosition == 0) {
        if (wheelDown) {
            currentWheelPosition = 1;
            walkDirection = -1;
        } else {
            currentWheelPosition = -1;
            walkDirection = 1;
        }
        wheelTickLeft = 20;
    } else {
        return;
    }
    //refreshStageAndUpdate();
    if (currentWheelPosition != 0) {
        sps["character"][0].gotoAndPlay(walkAnim);
        sps["tuktuk_character"][0].gotoAndPlay(walkAnim);
        isWalking = true;
    } else {
        sps["character"][0].gotoAndPlay("standRt");
        sps["tuktuk_character"][0].gotoAndPlay('standRt');
        isWalking = false;
    }
}

///////////
// Share
///////////

var isBringingIn = false;
function bringInShareArea() {
    if (isBringingIn)
        return;
    isBringingIn = true;
    shareArea.bottom = -shareArea.obj.clientHeight;
    shareArea.obj.style.bottom = shareArea.bottom + 'px';
    shareArea.obj.style.opacity = 1;
    createjs.Tween.get(shareArea).to({bottom: 0}, 300, createjs.Ease.circOut).call(function() {
        isBringingIn = false;
    });
}

var isBringingOut = false;
function bringOutShareArea() {
    if (isBringingOut)
        return;
    isBringingOut = true;
    shareArea.bottom = 0;
    shareArea.obj.style.bottom = shareArea.bottom + 'px';
    shareArea.obj.style.opacity = 1;
    createjs.Tween.get(shareArea).to({bottom: -shareArea.obj.clientHeight}, 300, createjs.Ease.circOut).call(function() {
        isBringingOut = false;
    });
}