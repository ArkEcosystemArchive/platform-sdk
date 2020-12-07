import { Media } from "./media";

const LINKS = {
	images: [
		"https://i.imgur.com/123456.png",
		"https://i.imgur.com/123456.jpeg",
		"https://raw.githubusercontent.com/ArkEcosystem/peers/master/logo.png",
		"https://raw.githubusercontent.com/ArkEcosystem/peers/master/image-1.jpeg",
		"https://raw.githubusercontent.com/ArkEcosystem/peers/master/image-2.jpg",
		"https://gitlab.com/pages/arkecosystem/-/raw/master/static/logo.png",
		"https://gitlab.com/pages/arkecosystem/-/raw/master/static/image-1.jpeg",
		"https://live.staticflickr.com/12345/50287053112_b0f1d60cd2_1k.jpg",
		"https://farm1.staticflickr.com/0/1418878_1e92283336_m.jpg",
	],
	videos: [
		"https://vimeo.com/123456",
		"http://vimeo.com/54321",
		"http://www.vimeo.com/54321",
		"https://player.vimeo.com/video/45054101",
		"https://youtube.com/watch?v=123456",
		"https://www.youtube.com/watch?v=at5215",
		"https://youtu.be/dQ12W3r5",
		"https://youtu.be/w_1x521ui",
	],
};

let data;
let subject;

beforeEach(() => {
	data = {};
	subject = new Media(data);
});

it.each(LINKS.images)("should add a logo (%s)", (url) => {
	expect(data).toEqual({});

	subject.logo(url);

	expect(data).not.toEqual({});
});

it.each(LINKS.images)("should add an image (%s)", (url) => {
	expect(data).toEqual({});

	subject.image(url);

	expect(data).not.toEqual({});
});

it.each(LINKS.videos)("should add a video (%s)", (url) => {
	expect(data).toEqual({});

	subject.video(url);

	expect(data).not.toEqual({});
});
