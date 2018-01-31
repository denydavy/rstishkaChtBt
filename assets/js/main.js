(function() {

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    var Application = PIXI.Application,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        Graphics = PIXI.Graphics;

    var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    console.log(isSafari);
    var recorder; // globally accessible
    var microphone;

    loader
        .add("go", "assets/images/go_btn_2.png")
        .add("arr", "assets/images/arr.png")
        .add("dino", "assets/images/dino-3.svg")
        .add("main_f", "assets/images/frame_main.png")
        .add("speech_f", "assets/images/frame_speech.png")
        .add("logo", "assets/images/logo.png")
        .add("ref_m", "assets/images/main_refract.png")
        .add("overlay_s", "assets/images/overlay_speech.png")
        .add("overlay_m", "assets/images/overlay_main.png")
        .add("bg_main", "assets/images/screen_main_bg.svg")
        .add("speech_bg", "assets/images/screen_speech_bg.svg")
        .add("speaker_holes", "assets/images/speaker_holes.png")
        .add("speech_lines", "assets/images/speech_lines.png")
        .add("ref_s", "assets/images/speech_refract.png")
        .add("mars", "assets/images/mars.png")
        .add("venus", "assets/images/venus.png")
        .add("jupiter", "assets/images/jupiter.png")
        .add("saturn", "assets/images/saturn.png")
        .add("neptune", "assets/images/neptune.png")
        .add("uranus", "assets/images/uranus.png")
        .add("mercury", "assets/images/mercury.png")
        .add("mars_with_glow", "assets/images/mars_with_glow.png")
        .add("venus_with_glow", "assets/images/venus_with_glow.png")
        .add("jupiter_with_glow", "assets/images/jupiter_with_glow.png")
        .add("saturn_with_glow", "assets/images/saturn_with_glow.png")
        .add("neptune_with_glow", "assets/images/neptune_with_glow.png")
        .add("uranus_with_glow", "assets/images/uranus_with_glow.png")
        .add("mercury_with_glow", "assets/images/mercury_with_glow.png")
        .add("popup_m_bg", "assets/images/popup_m_bg.svg")
        .add("popup_submit_btn", "assets/images/popup_submit_btn.png")
        .add("rocket", "assets/images/dinorocket.png")
        .add("flame", "assets/images/fire.png")
        .add("space_bg", "assets/images/bg-space.png")
        .add("dino_0", "assets/images/dino_talk/speak_open0000.png")
        .add("dino_1", "assets/images/dino_talk/speak_open0001.png")
        .add("dino_2", "assets/images/dino_talk/speak_open0002.png")
        .add("dino_3", "assets/images/dino_talk/speak_open0003.png")
        .add("dino_4", "assets/images/dino_talk/speak_open0004.png")
        .add("dino_5", "assets/images/dino_talk/speak_open0005.png")
        .add("dino_6", "assets/images/dino_talk/speak_open0006.png")
        .add("dino_7", "assets/images/dino_talk/speak_open0007.png")
        .add("dino_8", "assets/images/dino_talk/speak_open0008.png")
        .add("dino_9", "assets/images/dino_talk/speak_open0009.png")
        .add("dino_10", "assets/images/dino_talk/speak_open0010.png")
        .add("dino_11", "assets/images/dino_talk/speak_close0011.png")
        .add("dino_12", "assets/images/dino_talk/speak_close0012.png")
        .add("dino_13", "assets/images/dino_talk/speak_close0013.png")
        .add("dino_14", "assets/images/dino_talk/speak_close0014.png")
        .add("dino_15", "assets/images/dino_talk/speak_open0015.png")
        .add("dino_16", "assets/images/dino_talk/speak_open0016.png")
        .add("dino_17", "assets/images/dino_talk/speak_open0017.png")
        .add("dino_18", "assets/images/dino_talk/speak_open0018.png")
        .add("dino_19", "assets/images/dino_talk/speak_open0019.png")
        .add("dino_20", "assets/images/dino_talk/speak_open0020.png")
        .add("dino_21", "assets/images/dino_talk/speak_close0021.png")
        .add("dino_22", "assets/images/dino_talk/speak_close0022.png")
        .add("dino_23", "assets/images/dino_talk/speak_close0023.png")
        .add("dino_24", "assets/images/dino_talk/speak_close0024.png")
        .add("dino_25", "assets/images/dino_talk/speak_open0025.png")
        .add("dino_26", "assets/images/dino_talk/speak_open0026.png")
        .add("dino_27", "assets/images/dino_talk/speak_open0027.png")
        .add("dino_28", "assets/images/dino_talk/speak_open0028.png")
        .add("dino_29", "assets/images/dino_talk/speak_open0029.png")
        .add("dino_30", "assets/images/dino_talk/speak_open0030.png")
        .add("dino_31", "assets/images/dino_talk/speak_open0031.png")
        .add("dino_32", "assets/images/dino_talk/speak_open0032.png")
        .add("dino_33", "assets/images/dino_talk/speak_open0033.png")
        .add("dino_34", "assets/images/dino_talk/speak_open0034.png")
        .add("dino_35", "assets/images/dino_talk/speak_open0035.png")
        .add("dino_36", "assets/images/dino_talk/speak_open0036.png")
        .add("dino_37", "assets/images/dino_talk/speak_open0037.png")
        .add("dino_38", "assets/images/dino_talk/speak_open0038.png")
        .add("dino_39", "assets/images/dino_talk/speak_open0039.png")
        .add("dino_40", "assets/images/dino_talk/speak_open0040.png")
        .add("dino_41", "assets/images/dino_talk/speak_open0041.png")
        .add("dino_42", "assets/images/dino_talk/speak_open0042.png")
        .add("dino_43", "assets/images/dino_talk/speak_open0043.png")
        .add("dino_44", "assets/images/dino_talk/speak_open0044.png")
        .add("dino_45", "assets/images/dino_talk/speak_open0045.png")
        .add("dino_46", "assets/images/dino_talk/speak_open0046.png")
        .add("dino_47", "assets/images/dino_talk/speak_open0047.png")
        .add("dino_48", "assets/images/dino_talk/speak_open0048.png")
        .add("dino_49", "assets/images/dino_talk/speak_open0049.png")
        .add("dino_50", "assets/images/dino_talk/speak_open0050.png")
        .add("dino_51", "assets/images/dino_talk/speak_close0051.png")
        .add("dino_52", "assets/images/dino_talk/speak_close0052.png")
        .add("dino_53", "assets/images/dino_talk/speak_close0053.png")
        .add("dino_54", "assets/images/dino_talk/speak_close0054.png")
        .add("dino_55", "assets/images/dino_talk/speak_open0055.png")
        .add("dino_56", "assets/images/dino_talk/speak_open0056.png")
        .add("dino_57", "assets/images/dino_talk/speak_open0057.png")
        .add("dino_58", "assets/images/dino_talk/speak_open0058.png")
        .add("dino_59", "assets/images/dino_talk/speak_open0059.png")
        .add("dino_60", "assets/images/dino_talk/speak_open0060.png")
        .add("dino_61", "assets/images/dino_talk/speak_close0061.png")
        .add("dino_62", "assets/images/dino_talk/speak_close0062.png")
        .add("dino_63", "assets/images/dino_talk/speak_close0063.png")
        .add("dino_64", "assets/images/dino_talk/speak_close0064.png")
        .add("dino_65", "assets/images/dino_talk/speak_open0065.png")
        .add("dino_66", "assets/images/dino_talk/speak_open0066.png")
        .add("dino_67", "assets/images/dino_talk/speak_open0067.png")
        .add("dino_68", "assets/images/dino_talk/speak_open0068.png")
        .add("dino_69", "assets/images/dino_talk/speak_open0069.png")
        .add("dino_70", "assets/images/dino_talk/speak_open0070.png")
        .add("dino_71", "assets/images/dino_talk/speak_open0071.png")
        .add("dino_72", "assets/images/dino_talk/speak_open0072.png")
        .add("dino_73", "assets/images/dino_talk/speak_open0073.png")
        .add("dino_74", "assets/images/dino_talk/speak_open0074.png")
        .add("dino_75", "assets/images/dino_talk/speak_open0075.png")
        .add("dino_76", "assets/images/dino_talk/speak_open0076.png")
        .add("dino_77", "assets/images/dino_talk/speak_open0077.png")
        .add("dino_78", "assets/images/dino_talk/speak_open0078.png")
        .add("dino_79", "assets/images/dino_talk/speak_open0079.png")
        .add("dino_80", "assets/images/dino_talk/speak_open0080.png")
        .add("space_bg_1", "assets/images/bg_space_1.png")
        .add("space_bg_2", "assets/images/bg_space_2.png")
        .add("space_bg_3", "assets/images/bg_space_3.png")
        .add("main_f_iphone", "assets/images/frame_iphone.png")
        .load(loadFonts);

    var app = new Application({
        width: WIDTH,
        height: HEIGHT,
        antialias: true,
        resolution: 2
    });

    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(WIDTH, HEIGHT);
    app.renderer.backgroundColor = 0xebebf5;

    document.body.appendChild(app.view);

    var audio = document.querySelector("#dino_sound");
    var sound = false;
    var buttons = [];

    audio.addEventListener("ended", function () {
        sound = false;
    });

    function loadFonts() {
        // make sure fonts are loaded before we actually draw shit
        WebFont.load({
            custom: {
                families: ['src'],
                urls: ['assets/fonts/fonts.css']
            },
            active: function (e) {
                setup();
            }
        });
    }

    function setup() {
        var monitor = build_main_monitor();
        var voice_monitor = build_voice_monitor();
        var speaker = build_speaker();
        var l_arr = build_arrow();
        var r_arr = build_arrow();
        var PlanetMng = new Planet();
        var planet = build_planet(PlanetMng.get_current());
        var go_button = build_go_button();
        var elems = [monitor, voice_monitor, speaker, planet];
        var speak_btn = build_speak_btn();
        var allow_sound_popup = build_popup();
        var padding = 27;
        var bps = 0;
        var speakpop;
        var iphone5_coef = 1;

        go_button.scale.set(.7);
        if (WIDTH < 375 && HEIGHT < 600) {
            elems.forEach(function (t) {
                t.scale.set(.8);
            });
            l_arr.scale.set(.1);
            r_arr.scale.set(.1);
            allow_sound_popup.children[1].scale.set(.85);
            allow_sound_popup.children[1].position.set((WIDTH - allow_sound_popup.children[1].width) / 2, (HEIGHT - allow_sound_popup.children[1].height) / 2);
            go_button.scale.set(.3);
            padding = 20;
            bps = 0;
            iphone5_coef = 1.5;
        }

        l_arr.scale.set(.25);
        r_arr.scale.set(.25);
        go_button.scale.set(.5);


        speak_btn.position.set(0, HEIGHT - speak_btn.height);
        monitor.position.set((WIDTH - monitor.width) / 2, 12 + bps);
        voice_monitor.position.set(monitor.x-2, monitor.y + monitor.height - 30 + bps);
        speaker.position.set(voice_monitor.x + voice_monitor.width + 60 * iphone5_coef - voice_monitor.children[1].width, voice_monitor.y + 12 + bps);
        l_arr.position.set(0, voice_monitor.y + voice_monitor.height + 5 + planet.children[1].height + 10);
        r_arr.anchor.set(1, 1);
        r_arr.rotation = Math.PI;
        r_arr.position.set(WIDTH - r_arr.width, voice_monitor.y + voice_monitor.height + 5 + planet.children[1].height + 10);
        planet.position.set((WIDTH - planet.width) / 2, voice_monitor.y + voice_monitor.height + bps);
        go_button.position.set((WIDTH - go_button.width) / 2, (speak_btn.y + (planet.y + planet.height)) / 2 - 20);

        go_button.interactive = true;
        speak_btn.interactive = true;
        l_arr.interactive = true;
        r_arr.interactive = true;

        buttons.push(go_button);
        buttons.push(speak_btn);
        buttons.push(l_arr);
        buttons.push(r_arr);

        PlanetMng.set_planet(planet);
        startRecording();

        r_arr.on("pointerdown", PlanetMng.next);
        l_arr.on("pointerdown", PlanetMng.prev);
        go_button.on("pointerdown", function () {
            document.querySelector("#dino_sound").pause();

            // build_flight_animation(PlanetMng.get_current());
            location.href = "https://brainrus.ru/" + PlanetMng.get_current().name_en;
            go_button.interactive = false;
            speak_btn.interactive = false;
            l_arr.interactive = false;
            r_arr.interactive = false;
        });

        speak_btn.on("pointerdown", function () {
            document.querySelector("#dino_sound").pause();

            speakpop = build_speak_popup();
            go_button.interactive = false;
            speak_btn.interactive = false;
            l_arr.interactive = false;
            r_arr.interactive = false;
            startRecording();
            setTimeout(function () {
                app.stage.removeChild(speakpop);
                if (recorder) {
                    recorder.stopRecording(stopRecordingCallback);
                    go_button.interactive = false;
                    speak_btn.interactive = false;
                    l_arr.interactive = false;
                    r_arr.interactive = false;
                } else {
                    go_button.interactive = true;
                    speak_btn.interactive = true;
                    l_arr.interactive = true;
                    r_arr.interactive = true;
                }

            }, 3000);
        });
    }

    function transform_rec_text(rec_text) {

        if (rec_text !== undefined) {
            var name_en = '';
            switch (rec_text) {
                case 'марс':
                    name_en = 'mars';
                    break;
                case 'венера':
                    name_en = 'venus';
                    break;
                case 'меркурий':
                    name_en = 'mercury';
                    break;
                case 'юпитер':
                    name_en = 'jupiter';
                    break;
                case 'сатурн':
                    name_en = 'saturn';
                    break;
                case 'нептун':
                    name_en = 'neptune';
                    break;
                case 'уран':
                    name_en = 'uranus';
                    break;
                default:
                    console.log(rec_text);
            }
            if (name_en !== '') {
                // build_flight_animation({name_en: name_en});
                location.href = "https://brainrus.ru/" + name_en;
            } else {
                build_norec_popup();
                buttons.map(function (t) {
                    t.interactive = true;
                })
            }

        }
    }

    function draw_circle(x, y, r, f, a) {
        var c = new Graphics();

        c.beginFill(f, a);
        c.drawCircle(x, y, r);
        c.endFill();

        return c;
    }

    function build_speak_popup() {
        var popup_wrapper = new PIXI.Container();
        var button_wrapper = new PIXI.Container();
        var balls_wrapper = new PIXI.Container();
        var rect = new PIXI.Graphics();
        var btn_bg = new Sprite(loader.resources.popup_m_bg.texture);
        var btn_text_style = new PIXI.TextStyle({
            fontFamily: "src",
            fontSize: 21,
            fill: "#081d4a",
            wordWrap: true,
            wordWrapWidth: btn_bg.width / 2 - 20,
            align: "center"
        });
        var btn_text = new PIXI.Text("ПРОИЗНОСИ НАЗВАНИЕ ПЛАНЕТЫ", btn_text_style);
        var tml = new TimelineMax({repeat: -1});
        var c1 = draw_circle(0, 0, 5, 0x1761a4, 1);
        var c2 = draw_circle(20, 0, 5, 0x1761a4, .5);
        var c3 = draw_circle(40, 0, 5, 0x1761a4, .1);

        balls_wrapper.addChild(c1);
        balls_wrapper.addChild(c2);
        balls_wrapper.addChild(c3);


        btn_bg.scale.set(.5, .5);
        btn_text.anchor.set(0, 0);
        btn_bg.position.set(0, 0);
        btn_text.position.set((btn_bg.width - btn_text.width) / 2, (btn_bg.height - btn_text.height) / 2 - 10);

        button_wrapper.addChild(btn_bg);
        button_wrapper.addChild(btn_text);

        popup_wrapper.addChild(rect);
        popup_wrapper.addChild(button_wrapper);
        popup_wrapper.addChild(balls_wrapper);
        button_wrapper.position.set((WIDTH - button_wrapper.width) / 2, (HEIGHT - button_wrapper.height) / 2);
        balls_wrapper.position.set((WIDTH - button_wrapper.width) / 2 + button_wrapper.width / 2 - 15, (HEIGHT - button_wrapper.height) / 2 + button_wrapper.height / 1.2 - 5);
        rect.beginFill(0x000000, .5);
        rect.drawRect(0, 0, WIDTH, HEIGHT);
        rect.endFill();


        tml.staggerTo(balls_wrapper.children, .3, {y: -3}, .2);
        tml.staggerTo(balls_wrapper.children, .3, {y: 0}, .2, "-=.2");
        app.stage.addChild(popup_wrapper);
        return popup_wrapper;


    }

    function build_flight_animation(planetObj) {
        var wrapper = new PIXI.Container();
        var bg1 = new Sprite(loader.resources.space_bg_1.texture);
        var bg2 = new Sprite(loader.resources.space_bg_2.texture);
        var bg3 = new Sprite(loader.resources.space_bg_3.texture);
        var bg_wrapper = new PIXI.Container();

        var planet = new Sprite(loader.resources[planetObj.name_en + '_with_glow'].texture);
        var rocket_group = new PIXI.Container();
        var rocket = new Sprite(loader.resources.rocket.texture);
        var flame = new Sprite(loader.resources.flame.texture);

        bg_wrapper.addChild(bg1);
        bg_wrapper.addChild(bg2);
        bg_wrapper.addChild(bg3);

        bg1.scale.set(3, 3);
        bg2.scale.set(3, 3);
        bg3.scale.set(3, 3);
        bg2.position.set(0, 0);
        bg3.position.set(0, 0);


        planet.anchor.set(.5, .5);
        flame.scale.set(.3, .3);
        rocket.scale.set(.3, .3);
        planet.scale.set(.2, .2);

        planet.position.set(WIDTH - planet.width, 120);
        bg_wrapper.position.set(0, 0);
        bg_wrapper.scale.set(.3, .3);
        rocket_group.addChild(flame);
        rocket_group.addChild(rocket);
        rocket_group.pivot.x = 1;
        rocket_group.pivot.y = 0;

        flame.position.set((rocket_group.width - flame.width) / 2, rocket_group.height - flame.height / 2.5);
        rocket_group.position.set(WIDTH - rocket_group.width, HEIGHT + rocket_group.height + 400);

        var flameTml = new TimelineMax({yoyo: true, repeat: -1});
        flameTml.to(flame.position, .4, {y: rocket_group.height - flame.height - 10});

        flameTml.play();

        var bgTml = new TimelineMax({repeat: -1, paused: true});
        bgTml.fromTo(bg_wrapper.children[2], 4, {y: -1600}, {y: 0, ease: Power0.easeNone});
        bgTml.fromTo(bg_wrapper.children[1], 4, {y: -1800}, {y: 0, ease: Power0.easeNone}, "-=4");


        var rocketTml = new TimelineMax();
        rocketTml.to(rocket_group.position, 2, {
            x: (WIDTH - rocket_group.width) / 2, y: 220, ease: Power4.easeOut,
            onComplete: function () {
//                rocketTml.pause();
                bgTml.play(0);
                rocketTml.to(planet.scale, 2, {x: 0.4, y: 0.4});

                rocketTml.to(rocket_group.position, 1, {y: 110}, "-=1");
                rocketTml.to(rocket_group.position, 3, {y: 10, x: WIDTH / 1.1, ease: Power4.easeIn}, "-=1");
                rocketTml.to(rocket_group, .4, {rotation: .5}, "-=1.5");
                rocketTml.to(rocket_group.skew, 1, {x: .1, y: -.1}, "-=2.5");
                rocketTml.to(rocket_group.scale, 2, {
                    x: 0, y: 0.01, ease: Power2.easeOut, onComplete: function () {
                        location.href = "https://brainrus.ru/" + planetObj.name_en;
                    }
                }, "-=2.7");
            }
        });


//

        wrapper.addChild(bg_wrapper);
        wrapper.addChild(planet);
        wrapper.addChild(rocket_group);
        app.stage.addChild(wrapper);
    }

    function build_popup() {
        var popup_wrapper = new PIXI.Container();
        var button_wrapper = new PIXI.Container();

        var rect = new PIXI.Graphics();
        var btn_bg = new Sprite(loader.resources.popup_m_bg.texture);
        var btn_text_style = new PIXI.TextStyle({
            fontFamily: "src",
            fontSize: 22,
            fill: "#081d4a",
            wordWrap: true,
            wordWrapWidth: btn_bg.width / 2 - 20,
            align: "center"
        });
        var btn_text = new PIXI.Text("ВЫБЕРИ ПЛАНЕТУ, КОТОРУЮ ТЫ ХОЧЕШЬ ПОСЕТИТЬ!", btn_text_style);
        var submit_btn = new PIXI.Sprite(loader.resources.popup_submit_btn.texture);

        submit_btn.scale.set(.3, .3);
        btn_bg.scale.set(.6, .6);
        btn_text.anchor.set(0, 0);
        btn_bg.position.set(0, 0);
        btn_text.position.set((btn_bg.width - btn_text.width) / 2, (btn_bg.height - btn_text.height) / 2);
        submit_btn.position.set((btn_bg.width - submit_btn.width) / 2, btn_bg.height - submit_btn.height / 2);

        button_wrapper.addChild(btn_bg);
        button_wrapper.addChild(btn_text);
        button_wrapper.addChild(submit_btn);
        popup_wrapper.addChild(rect);
        popup_wrapper.addChild(button_wrapper);


        button_wrapper.position.set((WIDTH - button_wrapper.width) / 2, (HEIGHT - button_wrapper.height) / 2);
        rect.beginFill(0x000000, .5);
        rect.drawRect(0, 0, WIDTH, HEIGHT);
        rect.endFill();

        submit_btn.interactive = true;

        submit_btn.on("tap", function () {
            popup_wrapper.visible = false;
            document.querySelector("#dino_sound").play();
            sound = true;
        });

        app.stage.addChild(popup_wrapper);
        return popup_wrapper;
    }

    function build_norec_popup() {
        var popup_wrapper = new PIXI.Container();
        var button_wrapper = new PIXI.Container();

        var rect = new PIXI.Graphics();
        var btn_bg = new Sprite(loader.resources.popup_m_bg.texture);
        var btn_text_style = new PIXI.TextStyle({
            fontFamily: "src",
            fontSize: 22,
            fill: "#081d4a",
            wordWrap: true,
            wordWrapWidth: btn_bg.width / 2 - 20,
            align: "center"
        });
        var btn_text = new PIXI.Text("УПС... \n ПОПРОБУЙ ЕЩЁ РАЗ!", btn_text_style);
        var submit_btn = new PIXI.Sprite(loader.resources.popup_submit_btn.texture);

        submit_btn.scale.set(.3, .3);
        btn_bg.scale.set(.5, .5);
        btn_text.anchor.set(0, 0);
        btn_bg.position.set(0, 0);
        btn_text.position.set((btn_bg.width - btn_text.width) / 2, (btn_bg.height - btn_text.height) / 2 - 5);
        submit_btn.position.set((btn_bg.width - submit_btn.width) / 2, btn_bg.height - submit_btn.height / 2);

        button_wrapper.addChild(btn_bg);
        button_wrapper.addChild(btn_text);
        button_wrapper.addChild(submit_btn);
        popup_wrapper.addChild(rect);
        popup_wrapper.addChild(button_wrapper);


        button_wrapper.position.set((WIDTH - button_wrapper.width) / 2, (HEIGHT - button_wrapper.height) / 2);
        rect.beginFill(0x000000, .5);
        rect.drawRect(0, 0, WIDTH, HEIGHT);
        rect.endFill();

        submit_btn.interactive = true;

        submit_btn.on("tap", function () {
            popup_wrapper.visible = false;
        });

        app.stage.addChild(popup_wrapper);
        return popup_wrapper;
    }

    function Planet() {
        var planet = 0;
        var pl_group = null;
        var pl_map = [
            {
                name_en: "mercury",
                name_ru: "МЕРКУРИЙ"
            },
            {
                name_en: "venus",
                name_ru: "ВЕНЕРА"
            },
            {
                name_en: "mars",
                name_ru: "МАРС"
            },
            {
                name_en: "jupiter",
                name_ru: "ЮПИТЕР"
            },
            {
                name_en: "saturn",
                name_ru: "САТУРН"
            },
            {
                name_en: "neptune",
                name_ru: "НЕПТУН"
            },
            {
                name_en: "uranus",
                name_ru: "УРАН"
            }
        ];

        function prev() {
            planet = planet - 1 < 0 ? pl_map.length - 1 : planet - 1;
            update_planet();
            return pl_map[planet];
        }

        function next() {
            planet = planet + 1 > pl_map.length - 1 ? 0 : planet + 1;
            update_planet();
            return pl_map[planet];
        }

        function get_current() {
            return pl_map[planet];
        }

        function set_planet(planet_obj) {
            pl_group = planet_obj;
        }

        function update_planet() {
            var cur_planet = get_current();
            var off = WIDTH < 375 && HEIGHT < 600 ? 17.5 : 0;

            pl_group.children[0].setTexture(loader.resources[cur_planet.name_en].texture);
            pl_group.children[1].setText(cur_planet.name_ru);
            pl_group.children[1].position.set((pl_group.width - pl_group.children[1].width) / 2 + off, 5);
        }

        return {
            prev: prev,
            next: next,
            get_current: get_current,
            update_planet: update_planet,
            set_planet: set_planet
        };
    }

    function build_main_monitor() {
        var monitor = new PIXI.Container();
        var graphics = new Graphics();
        var bg = new Sprite(loader.resources.bg_main.texture);
        // var frame = new Sprite(loader.resources.main_f.texture);
        var frame = new Sprite(loader.resources.main_f_iphone.texture);
        var logo = new Sprite(loader.resources.logo.texture);
        var dino = new Sprite(loader.resources.dino_0.texture);
        var overlay = new Sprite(loader.resources.overlay_m.texture);
        var bl = new Sprite(loader.resources.ref_m.texture);
        var txt_s = new PIXI.TextStyle({
            fontFamily: 'src',
            fontSize: 18,
            fill: "white"
        });
        var txt = new PIXI.Text("ПРОИЗНЕСИ НАЗВАНИЕ ПЛАНЕТЫ", txt_s);
        var txt_group = new PIXI.Container();

        var mask = new Graphics();

        frame.scale.set(.3, .3);
        bg.scale.set(.6, .5);
        logo.scale.set(.3, .3);
        dino.scale.set(.5, .5);
        overlay.scale.set(.3, .25);
        bl.scale.set(.32, .3);

        bg.position.set(10, 6);
        overlay.position.set(10, 10);
        logo.position.set(20, 22);
        dino.position.set(40, 0);
        bl.position.set(13, 2);
        graphics.beginFill(0x081d4a, .5);
        graphics.drawRect(0, 0, bg.width - 10, txt.height + 15);
        graphics.endFill();
        txt.position.set((graphics.width - txt.width) / 2 + 8, (graphics.height - txt.height) / 2);
        txt_group.position.set(bg.x - 5, bg.y + bg.height - graphics.height);

        txt_group.addChild(graphics);
        txt_group.addChild(txt);
        monitor.addChild(bg);
        monitor.addChild(logo);
        monitor.addChild(dino);
        monitor.addChild(overlay);
        monitor.addChild(bl);
        monitor.addChild(txt_group);
        monitor.addChild(frame);

        mask.beginFill(0x000000, 0);
        mask.drawRect(0, 0, monitor.width, monitor.height / 1.18);
        mask.endFill();

        monitor.addChild(mask);

        app.stage.addChild(monitor);
        monitor.mask = mask;

        var ad = animated_dino();

        setInterval(function () {
            ad.swap_src(dino);
        }, 50);

        return monitor;
    }

    function animated_dino() {
        var frame = 0;

        function get_frame() {
            frame = frame + 1 > 80 ? 0 : frame + 1;
            return frame;
        }

        function swap_src(o) {
            if (sound) {
                o.setTexture(loader.resources['dino_' + get_frame()].texture);
            } else {
                if ((/(1|2|3|4)$/).test(frame + "")) {
                    swap_src(o);
                }
            }
        }

        return {
            swap_src: swap_src
        };
    }

    function build_voice_monitor() {
        var wrapper = new PIXI.Container();
        var bg = new Sprite(loader.resources.speech_bg.texture);
        var frame = new Sprite(loader.resources.speech_f.texture);
        var overlay = new Sprite(loader.resources.overlay_s.texture);
        var lines = new Sprite(loader.resources.speech_lines.texture);
        var lines2 = new Sprite(loader.resources.speech_lines.texture);
        var bl = new Sprite(loader.resources.ref_s.texture);
        var mask = new Graphics();

        wrapper.addChild(mask);

        frame.scale.set(.3, .3);
        bg.scale.set(.6, .6);
        overlay.scale.set(.3, .3);
        lines.scale.set(.3, .3);
        lines2.scale.set(.3, .3);
        bl.scale.set(.3, .3);

        bg.position.set(12, 12);
        lines.position.set(14, 17);
        lines2.position.set(lines.x - lines.width, lines.y);
        overlay.position.set(12, 14);
        bl.position.set(13, 15);

        wrapper.addChild(bg);
        wrapper.addChild(lines);
        wrapper.addChild(lines2);
        wrapper.addChild(overlay);
        wrapper.addChild(bl);
        wrapper.addChild(frame);

        mask.beginFill(0x000000, 0);
        mask.drawRect(4, 0, wrapper.width / 2 + 15, wrapper.height);
        mask.endFill();
        app.stage.addChild(wrapper);

        wrapper.mask = mask;
        var tml = new TimelineMax({repeat: -1});
        tml.to(lines.position, 1, {x: lines.width});
        tml.to(lines2.position, 1, {x: lines2.width / 100}, "-=1");
        return wrapper;
    }

    function build_speaker() {
        var wrapper = new PIXI.Container();
        var speaker = new Sprite(loader.resources.speaker_holes.texture);

        speaker.scale.set(.3, .3);

        wrapper.addChild(speaker);
        app.stage.addChild(wrapper);
        return wrapper;
    }

    function build_arrow() {
        var arr = new Sprite(loader.resources.arr.texture);

        arr.scale.set(.3, .3);

        app.stage.addChild(arr);
        return arr;
    }

    function build_planet(planetObj) {
        var container = new PIXI.Container();
        var planet = new Sprite(loader.resources[planetObj.name_en].texture);
        var planet_txt_style = new PIXI.TextStyle({
            fontFamily: 'src',
            fontSize: 26,
            fill: "#081d4a",
            align: "center"
        });
        var planet_txt = new PIXI.Text(planetObj.name_ru, planet_txt_style);

        planet.scale.set(.25, .25);
        container.addChild(planet);
        container.addChild(planet_txt);
        planet_txt.position.set((container.width - planet_txt.width) / 2, 5);
        planet.position.set((container.width - planet.width) / 2, planet_txt.y + planet_txt.height );

        app.stage.addChild(container);
        return container;
    }

    function build_go_button() {
        var wrapper = new PIXI.Container();
        var btn = new Sprite(loader.resources.go.texture);
        var ts = new PIXI.TextStyle({
            fontFamily: 'src',
            fontSize: 32,
            fill: "white",
        });
        var txt = new PIXI.Text("ПОЛЕТЕЛИ", ts);

        wrapper.addChild(btn);
        wrapper.addChild(txt);

        txt.position.set((wrapper.width - txt.width) / 2, (wrapper.height - txt.height) / 2);
        app.stage.addChild(wrapper);

        return wrapper;
    }

    function build_speak_btn() {
        var wrapper = new PIXI.Container();
        var g = new Graphics();
        var ts = new PIXI.TextStyle({
            fontFamily: 'src',
            fontSize: 18,
            fill: "white",
        });
        var txt = new PIXI.Text("ГОВОРИ", ts);

        g.beginFill(0x1761a4, 1);
        g.drawRect(0, 0, WIDTH, 40);

        wrapper.addChild(g);
        wrapper.addChild(txt);
        app.stage.addChild(wrapper);
        txt.position.set((wrapper.width - txt.width) / 2, (wrapper.height - txt.height) / 2);
        return wrapper;
    }

    function startRecording() {
        if (!microphone) {
            captureMicrophone(function (mic) {
                microphone = mic;
                if (isSafari) {
                    // audio.muted = true;
                    // setSrcObject(microphone, audio);
                    // audio.play();
                    console.log('Please click startRecording button again. First time we tried to access your microphone. Now we will record it.');
                    return;
                }
            });
            return;
        }
        // audio.muted = true;
        // setSrcObject(microphone, audio);
        // audio.play();
        var options = {
            type: 'audio',
            recorderType: StereoAudioRecorder,
            desiredSampRate: 16000,
            // numberOfAudioChannels: isEdge ? 1 : 2,
            checkForInactiveTracks: true,
            bufferSize: 16384
        };
        if (navigator.platform && navigator.platform.toString().toLowerCase().indexOf('win') === -1) {
            options.sampleRate = 48000; // or 44100 or remove this line for default
        }
        if (recorder) {
            recorder.destroy();
            recorder = null;
        }
        recorder = RecordRTC(microphone, options);
        recorder.startRecording();
    }

    function captureMicrophone(callback) {
        if (microphone) {
            callback(microphone);
            return;
        }
        if (typeof navigator.mediaDevices === 'undefined' || !navigator.mediaDevices.getUserMedia) {
            console.log('This browser does not supports WebRTC getUserMedia API.');
            if (!!navigator.getUserMedia) {
                console.log('This browser seems supporting deprecated getUserMedia API.');
            }
        }
        navigator.mediaDevices.getUserMedia(
            {
                audio: isEdge ? true : {
                    echoCancellation: false
                }
            }
        ).then(function (mic) {
            callback(mic);
        }).catch(function (error) {
            console.log('Unable to capture your microphone. Please check console logs.');
            console.error(error);
        });
    }


    function getFileName(fileExtension) {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var date = d.getDate();
        return 'Record-' + year + month + date + '-' + getRandomString() + '.' + fileExtension;
    }


    function getRandomString() {
        if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
            var a = window.crypto.getRandomValues(new Uint32Array(3)),
                token = '';
            for (var i = 0, l = a.length; i < l; i++) {
                token += a[i].toString(36);
            }
            return token;
        } else {
            return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
        }
    }

    function stopRecordingCallback() {
        if (!recorder ) return;

        var blob, file;

        var blp = new Promise(function(resolve, reject){
            recorder.getDataURL(function(dataURL) {
                resolve(dataURL);
            });
        }).then(
            function(res){
                blob = dataURItoBlob(res);
                file = new File([blob], getFileName('wav'), {
                    type: 'audio/wav'
                });

                var rec_text = new Promise(function (resolve, reject) {
                    resolve(sendToServer(blob));
                }).then(
                    function (res) {
                        transform_rec_text(res);
                    },
                    function (err) {
                        console.log('error : ', err);
                        buttons.map(function (t) {
                            t.interactive = true;
                        });
                    }
                );
            },
            function(err){
                console.log(err);
            }
        )

        // invokeSaveAsDialog(file)

    }

    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);

        // create a view into the buffer
        var ia = new Uint8Array(ab);

        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return blob;

    }

    function sendToServer(file) {
        return new Promise(function (resolve, reject) {
            var url = 'https://speech.kotbot.ru/upload';
            var xhr = new XMLHttpRequest();
            var fd = new FormData();
            xhr.responseType = 'json';
            xhr.open("POST", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // Every thing ok, file uploaded
                    // resp = this.response;
                    // console.log(resp.text); // handle response.
                    resolve(this.response.text);
                } else if (xhr.status === 500) {
                    // with some error
                    console.log(this.response);
                    //reject(false);
                }
            };
            fd.append("uploadfile", file, getFileName('wav'));
            xhr.send(fd);
        });
    }
})();