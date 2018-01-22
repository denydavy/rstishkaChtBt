let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let Application = PIXI.Application,
loader = PIXI.loader,
resources = PIXI.loader.resources,
Sprite = PIXI.Sprite,
Graphics = PIXI.Graphics;

loader
	.add("go", "assets/images/go_btn.png")
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
	.add("space_bg", "assets/images/space_bg.png")
	.load(loadFonts)
	
let app = new Application({
	width: WIDTH, 
	height: HEIGHT,
	antialias: true,
	resolution:2
	});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(WIDTH, HEIGHT);
app.renderer.backgroundColor = 0xebebf5;

document.body.appendChild(app.view);

function loadFonts(){
	// make sure fonts are loaded before we actually draw shit
	 WebFont.load({
		    custom: {
		      families: ['src'],
		      urls: ['assets/fonts/fonts.css']
		    },
		    active: e => {
		    	setup();
		    }
	 });
}

function setup(){
	let header = build_header();
	let monitor = build_main_monitor();
	let voice_monitor = build_voice_monitor();
	let speaker = build_speaker();
	let l_arr = build_arrow();
	let r_arr = build_arrow();
	let PlanetMng = new Planet();
	var planet = build_planet(PlanetMng.get_current());
	let go_button = build_go_button();
	let allow_sound_popup = build_popup();
	
	monitor.position.set((WIDTH - monitor.width)/2, 12+header.height+12);
	voice_monitor.position.set(monitor.x, monitor.y + monitor.height + 5);
	speaker.position.set(voice_monitor.x + voice_monitor.width + 24, voice_monitor.y + 5);
	l_arr.position.set(0, voice_monitor.y+voice_monitor.height + 12);
	r_arr.anchor.set(1,1);
	r_arr.rotation = Math.PI;
	r_arr.position.set(WIDTH - r_arr.width, voice_monitor.y+voice_monitor.height + 12);
	planet.position.set((WIDTH - planet.width) / 2, voice_monitor.y + voice_monitor.height );
	go_button.position.set((WIDTH - go_button.width)/2, HEIGHT - go_button.height);
	
	go_button.interactive = true;
	l_arr.interactive = true;
	r_arr.interactive = true;

	PlanetMng.set_planet(planet);
	
	r_arr.on("pointerdown", PlanetMng.next);
	l_arr.on("pointerdown", PlanetMng.prev);
	go_button.on("pointerdown", function(){
		let final_cutscene = build_flight_animation(PlanetMng.get_current());
		
	});
	
	
}

function build_flight_animation(planetObj){
	let wrapper = new PIXI.Container();
	let bg = new Sprite(loader.resources.space_bg.texture);
	let planet = new Sprite(loader.resources[planetObj.name_en+'_with_glow'].texture);
	let rocket_group = new PIXI.Container();
	let rocket = new Sprite(loader.resources.rocket.texture);
	let flame = new Sprite(loader.resources.flame.texture);
	
	
	flame.scale.set(.4,.4);
	rocket.scale.set(.4,.4);
	planet.scale.set(.4,.4);
	planet.position.set((WIDTH - planet.width)/2, 40);
	bg.scale.set(.4,.4)
	bg.position.set(0,0);
	
	rocket_group.addChild(flame);
	rocket_group.addChild(rocket);
	rocket_group.pivot.x = 1;
	rocket_group.pivot.y = 0;
	
	flame.position.set((rocket_group.width - flame.width)/2,rocket_group.height-flame.height/2.5);
	rocket_group.position.set(WIDTH - rocket_group.width, (HEIGHT - rocket_group.height)/2);
	
	var flameTml = new TimelineMax({yoyo:true, repeat:-1});
	flameTml.to(flame.position, .4, {y:rocket_group.height-flame.height-10});
	
	flameTml.play();
	
	var rocketTml = new TimelineMax();
	rocketTml.fromTo(rocket_group.position, 2, {x:(WIDTH - rocket_group.width)/2, y: rocket_group.height*1.5}, {x:(WIDTH - rocket_group.width)/2, y:120, ease: Power4.easeOut});
	rocketTml.to(rocket_group.position, 3,  {y:100, x:WIDTH/1.1, ease: Power4.easeIn, delay: 2},"-=.3");
	rocketTml.to(rocket_group, .4, {rotation: .5},"-=1.5")
	rocketTml.to(rocket_group.scale, 2, {x:0,y:0},"-=2.7");
	
	
	wrapper.addChild(bg);
	wrapper.addChild(planet);
	wrapper.addChild(rocket_group);
	app.stage.addChild(wrapper);
}

function build_popup(){
	let popup_wrapper = new PIXI.Container();
	let button_wrapper = new PIXI.Container();
	
	let rect = new PIXI.Graphics();
	let btn_bg = new Sprite(loader.resources.popup_m_bg.texture);
	let btn_text_style = new PIXI.TextStyle({
		fontFamily:"src",
		fontSize: 22,
		fill: "#081d4a",
		wordWrap: true,
		wordWrapWidth: btn_bg.width/2 - 20,
		align: "center"
	});
	let btn_text = new PIXI.Text("ВЫБЕРИ ПЛАНЕТУ КОТОРУЮ ТЫ ХОЧЕШЬ ПОСЕТИТЬ!", btn_text_style);
	let submit_btn = new PIXI.Sprite(loader.resources.popup_submit_btn.texture);
	
	submit_btn.scale.set(.3,.3);
	btn_bg.scale.set(.6,.6);
	btn_text.anchor.set(0,0);
	btn_bg.position.set(0,0);
	btn_text.position.set((btn_bg.width - btn_text.width)/2, (btn_bg.height - btn_text.height)/2);
	submit_btn.position.set((btn_bg.width - submit_btn.width)/2,btn_bg.height-submit_btn.height/2);
	
	button_wrapper.addChild(btn_bg);
	button_wrapper.addChild(btn_text);
	button_wrapper.addChild(submit_btn);
	popup_wrapper.addChild(rect);
	popup_wrapper.addChild(button_wrapper);
	
	
	button_wrapper.position.set((WIDTH - button_wrapper.width)/2, (HEIGHT-button_wrapper.height)/2);
	rect.beginFill(0x000000, .5);
	rect.drawRect(0,0,WIDTH, HEIGHT);
	rect.endFill();
	
	submit_btn.interactive = true;
	
	submit_btn.on("pointerdown", function(){
		popup_wrapper.visible = false;
		document.querySelector("#dino_sound").play();
	});
	
	app.stage.addChild(popup_wrapper);
	return popup_wrapper;
}


function Planet () {
	var planet = 0;
	var pl_group = null;
	let pl_map = [
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
	]
	
	function prev(){
		planet = planet - 1 < 0 ? pl_map.length - 1 : planet - 1;
		update_planet();
		return pl_map[planet];
	}
	
	function next(){
		planet =  planet + 1 > pl_map.length -1  ? 0 : planet + 1;
		update_planet();
		return pl_map[planet];
	}
	
	function get_current(){
		return pl_map[planet];
	}
	
	function set_planet(planet_obj){
		pl_group = planet_obj;
	}
	
	function update_planet(){
		let cur_planet = get_current();

		pl_group.children[0].setTexture(loader.resources[cur_planet.name_en].texture);
		pl_group.children[1].setText(cur_planet.name_ru);
		pl_group.children[1].position.set((pl_group.width - pl_group.children[1].width)/ 2, pl_group.children[0].y + pl_group.children[0].height);

	}
	
	return {
		prev: prev,
		next: next,
		get_current: get_current,
		update_planet: update_planet,
		set_planet: set_planet
	}
}

function build_header(){
	let m_header_style = new PIXI.TextStyle({
		fontFamily:"src",
		fontSize: 24,
		fill: "#081d4a"
	});
	let m_header = new PIXI.Text("ВЫБЕРИ ПЛАНЕТУ", m_header_style);
	
	app.stage.addChild(m_header);
	m_header.position.set((WIDTH-m_header.width)/2, 12);
	
	return m_header;
}

function build_main_monitor(){
	let monitor = new PIXI.Container();
	let bg = new Sprite(loader.resources.bg_main.texture);
	let frame = new Sprite(loader.resources.main_f.texture);	
	let logo = new Sprite(loader.resources.logo.texture);
	let dino = new Sprite(loader.resources.dino.texture);
	let overlay = new Sprite(loader.resources.overlay_m.texture);
	let bl = new Sprite(loader.resources.ref_m.texture);
	
	frame.scale.set(.3,.3);
	bg.scale.set(.6,.6);
	logo.scale.set(.3,.3);
	dino.scale.set(.6,.6);
	overlay.scale.set(.3,.3);
	bl.scale.set(.3,.3);
	
	bg.position.set(10,6);
	overlay.position.set(10,10);
	logo.position.set(20,22);
	dino.position.set(10,12);
	bl.position.set(13,2);
	
	monitor.addChild(bg);
	monitor.addChild(logo);
	monitor.addChild(dino);
	monitor.addChild(overlay);
	monitor.addChild(bl);
	monitor.addChild(frame);
	app.stage.addChild(monitor);	
	
	return monitor;
}

function build_voice_monitor(){
	var wrapper = new PIXI.Container();
	let bg = new Sprite(loader.resources.speech_bg.texture);
	let frame = new Sprite(loader.resources.speech_f.texture);
	let overlay = new Sprite(loader.resources.overlay_s.texture);
	let lines = new Sprite(loader.resources.speech_lines.texture);
	let bl = new Sprite(loader.resources.ref_s.texture);
	
	frame.scale.set(.3,.3);
	bg.scale.set(.6,.6)
	overlay.scale.set(.3,.3);
	lines.scale.set(.3,.3);
	bl.scale.set(.3,.3);
	
	bg.position.set(12,12);
	lines.position.set(14,17);
	overlay.position.set(12,14);
	bl.position.set(13,15);
	
	wrapper.addChild(bg);
	wrapper.addChild(lines);
	wrapper.addChild(overlay);
	wrapper.addChild(bl);
	wrapper.addChild(frame);
	app.stage.addChild(wrapper);
	
	return wrapper;
}

function build_speaker(){
	let speaker = new Sprite(loader.resources.speaker_holes.texture);
	
	speaker.scale.set(.3,.3);
	
	app.stage.addChild(speaker);
	return speaker;
}

function build_arrow() {
	var arr = new Sprite(loader.resources.arr.texture);
	
	arr.scale.set(.3, .3);
	
	app.stage.addChild(arr);
	return arr;
}

function build_planet(planetObj){
	let container = new PIXI.Container();
	let planet = new Sprite(loader.resources[planetObj.name_en].texture);
	let planet_txt_style = new PIXI.TextStyle({
		fontFamily: 'src',
		fontSize: 26,
		fill: "#081d4a"
	})
	let planet_txt = new PIXI.Text(planetObj.name_ru, planet_txt_style);

	planet.scale.set(.3,.3);
	container.addChild(planet);
	container.addChild(planet_txt);
	planet.position.set((container.width - planet.width)/2, 0);
	planet_txt.position.set((container.width - planet_txt.width)/ 2, planet.y + planet.height);

	app.stage.addChild(container);
	return container;
}

function build_go_button(){
	let go_button = new Sprite(loader.resources.go.texture);
	
	go_button.scale.set(.3,.3);
	app.stage.addChild(go_button);
	
	return go_button;
}