import "jest-extended";

import { BIP39 } from "./bip39";

const english = "slogan miracle truck skate erosion huge bright where aspect rural average almost cram glide gown";
const japanese =
	"ひつぎ　ためる　むすぶ　ひかん　こうちゃ　すきま　えつらん　るいけい　いとこ　のちほど　いやす　あんまり　ぎしき　じだい　しなん";
const korean =
	"직업 여섯 포인트 지급 백색 손가락 그림 화요일 계절 정말 골짜기 개별 덩어리 상자 생신";
const chinese_simplified = "凤 谢 迈 霸 夫 祖 知 徙 合 恰 相 多 难 雨 孩";
const chinese_traditional = "鳳 謝 邁 霸 夫 祖 知 徙 合 恰 相 多 難 雨 孩";
const french =
	"remplir lézard temporel refuge éclipse furtif bermuda victoire angle pollen appeler affaire citoyen farine fermer";
const random = "@!#$^$%^&*&^(";

test("#generate", async () => {
	expect(BIP39.generate("chinese_simplified")).toBeString();
	expect(BIP39.generate("chinese_traditional")).toBeString();
	expect(BIP39.generate("english")).toBeString();
	expect(BIP39.generate("french")).toBeString();
	expect(BIP39.generate("italian")).toBeString();
	expect(BIP39.generate("japanese")).toBeString();
	expect(BIP39.generate("korean")).toBeString();
	expect(BIP39.generate("spanish")).toBeString();
});

test("#generate with number of words", async () => {
	expect(BIP39.generate("english").split(" ")).toHaveLength(12);
	expect(BIP39.generate("english", 12).split(" ")).toHaveLength(12);
	expect(BIP39.generate("english", 24).split(" ")).toHaveLength(24);
	expect(BIP39.generate("english", 36).split(" ")).toHaveLength(12);
});

test("#validate", async () => {
	expect(BIP39.validate(english, "english")).toBeTrue();
	expect(BIP39.validate(japanese, "japanese")).toBeTrue();
	expect(BIP39.validate(korean, "korean")).toBeTrue();
	expect(BIP39.validate(chinese_simplified, "chinese_simplified")).toBeTrue();
	expect(BIP39.validate(chinese_traditional, "chinese_traditional")).toBeTrue();
	expect(BIP39.validate(french, "french")).toBeTrue();
	expect(BIP39.validate(random, "english")).toBeFalse();
});

test("#toSeed", async () => {
	expect(BIP39.toSeed(english)).toBeInstanceOf(Buffer);
	expect(BIP39.toSeed(japanese)).toBeInstanceOf(Buffer);
	expect(BIP39.toSeed(korean)).toBeInstanceOf(Buffer);
	expect(BIP39.toSeed(chinese_simplified)).toBeInstanceOf(Buffer);
	expect(BIP39.toSeed(chinese_traditional)).toBeInstanceOf(Buffer);
	expect(BIP39.toSeed(french)).toBeInstanceOf(Buffer);
	expect(BIP39.toSeed(random)).toBeInstanceOf(Buffer);
});

test("#toEntropy", async () => {
	expect(BIP39.toEntropy(english)).toBeString();
});

test("#normalize", async () => {
	expect(BIP39.normalize(english)).toBe(english);
	expect(BIP39.normalize(japanese)).toBe(japanese);
	expect(BIP39.normalize(korean)).toBe(korean);
	expect(BIP39.normalize(chinese_simplified)).toBe(chinese_simplified);
	expect(BIP39.normalize(chinese_traditional)).toBe(chinese_traditional);
	expect(BIP39.normalize(french)).toBe(french);
	expect(BIP39.normalize(random)).toBe(random);
});
