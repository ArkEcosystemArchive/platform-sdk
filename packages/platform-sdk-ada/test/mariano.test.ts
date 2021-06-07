import "jest-extended";
import { createService } from "./helpers";
import { ClientService, AddressService, PrivateKeyService, PublicKeyService, KeyPairService } from "../src/services";
import {
	addressFromAccountExtPublicKey,
	addressFromMnemonic,
	HARDENED_THRESHOLD,
	SHELLEY_COIN_PURPOSE,
	SHELLEY_COIN_TYPE,
	SHELLEY_DERIVATION_SCHEME,
} from "../src/services/shelley";
import lib from "cardano-crypto.js";
import { Buffer } from "buffer";

const data = [
	{
		from: "Simon",
		mnemonic:
			"excess behave track soul table wear ocean cash stay nature item turtle palm soccer lunch horror start stumble month panic right must lock dress",
		rootPrivateKey:
			"989c07d00e8d3d187c1855f25468e013fb1bcad93430fc5a298a259802118f451e846b73a627c54ab13d49f5995b8563b32ad860c019a28b0b953209cd11bc18",
		rootPublicKey:
			"909dfcc8c2c338fc5aeac5aacbbc2c6c5743b38236dbcb3939059fe26f18129e43548a19d62a34d1714b1ac21903524efffaba00c4f4fcb203649661b61e2ca6",
		purposeKey:
			"b84aa8ba6ac296e76641049863df87ddac6fa1d5f7e8056846892d9f03118f45b994db7de3bf5ad1bb0ebacaee0528037ea72d4d6261c49b89d19c72f83f841471da9dfc41bd00e395ac9afcde05fe55f810eadafa20c519612de09d0428042518ad1211fa89b233759a76c14a3d3aed01751a69b52dfd2381e6632ccab4cf3a",
		coinTypeKey:
			"a8143599e15fbd2125dfddb35f575fad241a457aa4c06071e922dda303118f450ddb88850e8c54cf94f15d5239a66736989cc646fe3e25d57520c276fc6af35b14e35820dc5714fe7990f6963b3815b840fcbce2878910079126a0b19f151c7b98e3aafc8c8ecefa379d88b6fd7463f3883b3c400fe171c36cc9fb464afc6f18",
		accountKeyPair:
			"40f6e71f05225766ea7fdf2fe71026ae9bcb9fa2f40c441ce91d6d1007118f4563a3149afff5f06616734449426d1a4a9d2fcdc3af838db399dc1a42988f27ecaec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
		accountPublicKey:
			"aec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
		stakeAccountPublicKey:
			"4e1f5bc155bca6b5a3968ffab702c9222d059483a17897ec5de38d61d83b2ce0ab80a173135ceb14b1535bf60bda490e0efad5ce222348cfa9b0f8fcfb55c66a",
		addresses: {
			testnet: {
				spend: [
					"addr_test1qqy6nhfyks7wdu3dudslys37v252w2nwhv0fw2nfawemmn8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sw96paj",
					"addr_test1qrhvwtn8sa3duzkm93v5kjjxlv5lvg67j530wyeumngu23lk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s4s8xvh",
					"addr_test1qrtlcnmfdyarpscqxa6nthjz0na7xyz3fa8vt3yjw2y5gs8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33saf6px4",
					"addr_test1qzawae46edstqpdy84hhymuldnflyup0kjrp9ss5mgzvgplk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sfwe8sv",
					"addr_test1qr37u32sathht33rxpfk80yrexxkypqyl9hg5c77lw5n58lk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sy2mmsd",
					"addr_test1qz6uqrj8jqtylttlrtn0wsh084jp58z8r2fkfhuun5nasw8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s06dfg3",
					"addr_test1qzvq73tc9m40m0jnmttkmf74p2lx5thuhsclu03chd0xkshk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sqqr8zu",
					"addr_test1qqq2jxjrrq8apv4u3gy9mjrufvs42myzasd65crwuhyvlp0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s883mq6",
					"addr_test1qrlge3t2tmlh7t2mmaas5gy7a82q5cdsuddhlff949xntmlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sncpvd9",
					"addr_test1qpf2jx3ndwqmldj89e9vpqcwmsw6h4wejp4gywz40wckmzlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33suyy5ja",
					"addr_test1qq9nms699rfkkmrs9m4kml466kk034uvhz48p0plq2lld00k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33snh2d4v",
					"addr_test1qpkm28ylwmxrh73mv040c0x6jqkh2mcrwx4a47yv80aq3vlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s7ula50",
					"addr_test1qpdc0wjy4jw296ky85fw8jf2c8d4x7fm2qxvdrlfq4jyvlhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s4y4raa",
					"addr_test1qqycmygp5pv2hn9kk8vljt98gpjpg3ywzd8ysdynwpa78llk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s7n2y6a",
					"addr_test1qqszcuht5uxtectkcpurxszpj7jt8uywynf6gde37ea6w40k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33st8yn6n",
					"addr_test1qrmxlw04xwvyrpt2n6q36f4m0xu4lwnted6y9q5v7uldp78k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sul03vu",
					"addr_test1qzxzfv4c7n30np5yv34sywv6vz095r3sd98a4f7nkfqqrk0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s30txsp",
					"addr_test1qrta0j6hx8ajchhzje9qg033940llyku5h83k5ttckar3jhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sym3tvw",
					"addr_test1qqchxm32j5pr7a758kzv462tuvdx8nxlwas7wzt83u7gt9hk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33suvg52n",
					"addr_test1qqxgjqsmcgc8h47pk63u33976pdsgdcej0eeyztkn6ygve8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s9dqqr4",
				],
				change: [
					"addr_test1qzfjfm724nv9qz6nfyagmj0j2uppr35gzv5qee8s7489wxlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33scc4thv",
					"addr_test1qzdcehzqelgwyzdzswc8f7743xvr3sywjq63s0auft8g0d8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sjv0ust",
					"addr_test1qz2t57ujlkxdtv86pwehqq74a4t93xz60vvesnvgt3qz6g0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sp6hm22",
					"addr_test1qrgpsfs4dpnzxksd9de06hetvgje7c0nganpeff7ja9wctlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s4y89zq",
					"addr_test1qqkuyrhjxa4zwtdrm2a7asueyghu5c9y54fugp5r9cyk3p0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33shmyva7",
					"addr_test1qqngtymqpmhsk4fsys722uthmdnf8a3ag0q4cy9qlq0vzy8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sdr5v70",
					"addr_test1qq2vqlqrln0uu7rw87kexcd2pr63jy8g5ymf2kukv3phqw0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s7jtsz8",
					"addr_test1qpsvmsvfy5xcm958mpyxq4tl94jv335z0qscrz20hud3rqlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33savcd3z",
					"addr_test1qrv5xqcdudp0tcsxu56ys6ytwl7vl3sfhnss5ualnzghpvhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33slyedse",
					"addr_test1qq94krqrkxd9j8vzpnq937heprm37hlktjezfh5sn63us30k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s8feequ",
					"addr_test1qztgk69s33xmmn6u68k60fm94dvxgj6qxxq82gqwn2t5xh8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33scqy2t5",
					"addr_test1qrux7uxa9k5jrrxzqs2qn6ap4u88xswefzl3v83zslwjl0hk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s5kxdpx",
					"addr_test1qz7jrlx9ptrwf6jtyksyfk5zqlp20y87lqvtytcsnyrmma0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sqccac0",
					"addr_test1qr75rhcc6qt7ecu3v8fcautu43facv85g3ckhgcym5tvgl8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33skcqy5k",
					"addr_test1qrelq0ht86rsvul5c3udeeplvcp8l9w67y2guru8qt52k3hk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33schfcfr",
					"addr_test1qrc9tpfyk9d4ywn8ezr45jqrvlx9qplt22qk3dz6am2dxclk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33suny99x",
					"addr_test1qqguca5n5u9vc8lqk8utketux84q7hlrecnj9s9c04246y0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sgwdwxs",
					"addr_test1qrn2qj4wu67csfmfzfkk2kawql42qsgz4kzsfr8hqdtvtg8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s2k7z3s",
					"addr_test1qq7ua3j55nzsz5wvhhga77nkcxx2x93rztlcehzdq9ssqshk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sq7qer4",
					"addr_test1qr5yfvk0wf3ccfwld3psnaxht9lyne6wdv3r92cxd8tx8rhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33syxyqc9",
				],
			},
			mainnet: {
				spend: [
					"addr1qyy6nhfyks7wdu3dudslys37v252w2nwhv0fw2nfawemmn8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sdn8p3d",
					"addr1q8hvwtn8sa3duzkm93v5kjjxlv5lvg67j530wyeumngu23lk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33skx6xqg",
					"addr1q8tlcnmfdyarpscqxa6nthjz0na7xyz3fa8vt3yjw2y5gs8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s7l8p22",
					"addr1qxawae46edstqpdy84hhymuldnflyup0kjrp9ss5mgzvgplk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s2cy8un",
					"addr1q837u32sathht33rxpfk80yrexxkypqyl9hg5c77lw5n58lk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s8uxmuj",
					"addr1qx6uqrj8jqtylttlrtn0wsh084jp58z8r2fkfhuun5nasw8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33svvsfyw",
					"addr1qxvq73tc9m40m0jnmttkmf74p2lx5thuhsclu03chd0xkshk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33srk78wr",
					"addr1qyq2jxjrrq8apv4u3gy9mjrufvs42myzasd65crwuhyvlp0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sy3vmv9",
					"addr1q8lge3t2tmlh7t2mmaas5gy7a82q5cdsuddhlff949xntmlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sswuvp6",
					"addr1q9f2jx3ndwqmldj89e9vpqcwmsw6h4wejp4gywz40wckmzlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33slje57z",
					"addr1qy9nms699rfkkmrs9m4kml466kk034uvhz48p0plq2lld00k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33ssphden",
					"addr1q9km28ylwmxrh73mv040c0x6jqkh2mcrwx4a47yv80aq3vlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sa2zacs",
					"addr1q9dc0wjy4jw296ky85fw8jf2c8d4x7fm2qxvdrlfq4jyvlhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33skjgr3z",
					"addr1qyycmygp5pv2hn9kk8vljt98gpjpg3ywzd8ysdynwpa78llk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sa9hykz",
					"addr1qyszcuht5uxtectkcpurxszpj7jt8uywynf6gde37ea6w40k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sg3enkv",
					"addr1q8mxlw04xwvyrpt2n6q36f4m0xu4lwnted6y9q5v7uldp78k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33slfj3qr",
					"addr1qxxzfv4c7n30np5yv34sywv6vz095r3sd98a4f7nkfqqrk0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sjekxu7",
					"addr1q8ta0j6hx8ajchhzje9qg033940llyku5h83k5ttckar3jhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s8dvtq3",
					"addr1qychxm32j5pr7a758kzv462tuvdx8nxlwas7wzt83u7gt9hk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sl645xv",
					"addr1qyxgjqsmcgc8h47pk63u33976pdsgdcej0eeyztkn6ygve8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sxmaq02",
				],
				change: [
					"addr1qxfjfm724nv9qz6nfyagmj0j2uppr35gzv5qee8s7489wxlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33smwgtmn",
					"addr1qxdcehzqelgwyzdzswc8f7743xvr3sywjq63s0auft8g0d8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s36juu5",
					"addr1qx2t57ujlkxdtv86pwehqq74a4t93xz60vvesnvgt3qz6g0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33szv2mx4",
					"addr1q8gpsfs4dpnzxksd9de06hetvgje7c0nganpeff7ja9wctlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33skj69wl",
					"addr1qykuyrhjxa4zwtdrm2a7asueyghu5c9y54fugp5r9cyk3p0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s5dev3p",
					"addr1qyngtymqpmhsk4fsys722uthmdnf8a3ag0q4cy9qlq0vzy8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sw4fvjs",
					"addr1qy2vqlqrln0uu7rw87kexcd2pr63jy8g5ymf2kukv3phqw0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33saykswc",
					"addr1q9svmsvfy5xcm958mpyxq4tl94jv335z0qscrz20hud3rqlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s769daa",
					"addr1q8v5xqcdudp0tcsxu56ys6ytwl7vl3sfhnss5ualnzghpvhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sujydux",
					"addr1qy94krqrkxd9j8vzpnq937heprm37hlktjezfh5sn63us30k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sylyevr",
					"addr1qxtgk69s33xmmn6u68k60fm94dvxgj6qxxq82gqwn2t5xh8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33smke28t",
					"addr1q8ux7uxa9k5jrrxzqs2qn6ap4u88xswefzl3v83zslwjl0hk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33shqmdde",
					"addr1qx7jrlx9ptrwf6jtyksyfk5zqlp20y87lqvtytcsnyrmma0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33srw9a5s",
					"addr1q875rhcc6qt7ecu3v8fcautu43facv85g3ckhgcym5tvgl8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s4waycf",
					"addr1q8elq0ht86rsvul5c3udeeplvcp8l9w67y2guru8qt52k3hk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33smp5c9u",
					"addr1q8c9tpfyk9d4ywn8ezr45jqrvlx9qplt22qk3dz6am2dxclk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sl9e9fe",
					"addr1qyguca5n5u9vc8lqk8utketux84q7hlrecnj9s9c04246y0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33stcsw20",
					"addr1q8n2qj4wu67csfmfzfkk2kawql42qsgz4kzsfr8hqdtvtg8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sfqrza0",
					"addr1qy7ua3j55nzsz5wvhhga77nkcxx2x93rztlcehzdq9ssqshk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33srgae02",
					"addr1q85yfvk0wf3ccfwld3psnaxht9lyne6wdv3r92cxd8tx8rhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s8seq56",
				],
			},
		},
		walletId: "98c83431e94407bc0889e09953461fe5cecfdf18",
	},
	{
		from: "Mariano",
		mnemonic:
			"submit teach debate stool guilt pen problem inquiry horn tissue cradle ankle member quarter conduct obvious device ivory top wink globe tool rate tonight",
		address:
			"addr_test1qq254lk4kl4zpfmr7wsz6qapn7qywks2f6spdhlsx2f7azdu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsq7n2ck",
		rootPrivateKey:
			"c85efc2a10e5c4543c445bfd38a2b1566f2f38d2cbeab02fe290fb92722df85bf137b29b1f7b7d736b24cce3971a2f2a3931cbac730949804463d628f60029a1",
		rootPublicKey:
			"52f79be32364ecd0846652a749a876e4eb550889273404991a92007ac88773f2a21d47deda83a49cb435a2adfd0fb6945efc5b07f384db06d27c69cc4f586805",
		purposeKey:
			"008a3f7e77fb2d0c4ffcba88f6c8ec70f68bf6156816fc903829567c742df85b3667d09d3b7fad77786174d63814ab7a1fd253525ba63762dd2df81974a8b70e6d8221173be66dd84e3de9dcd8c6e86c52849329dbde184b2fd7f5ba1278d6d0bc6659a37d58940f61b7c4aa0ad62b41a2f6009d0e5464f4b0776023e5e499c3",
		coinTypeKey:
			"b8e3df9ee1417a90fb88fe6f5e6850326b12d0d33c51eb8b0e750ad27b2df85b457fd4afd66a14c32a1177327f384d4a5051849753fc910316791c7cb2289490aac110eaac57635af252793e0fc75a2d869e3f716c6b13c8d266f2d67772e9b05e0a7cf90597976453166f5351925c7e6da18cc6eb0a397a84902b7ca3337936",
		accountKeyPair:
			"3899f3c5227cecf4baaee2865af7591b094e46bf92670217f1fdd2c2822df85be98a95f6454283b893b10b2ddeb4aa24068a1716450850daad5677b568ff6d5398abc2190ee1c207d6e210d3db1a09d33e62978e31140d7f1b0ba945f67707e489a20787ade9e802837741df511c773163372530e2cdaf1f8b0d37f360c4c31c",
		accountPublicKey:
			"98abc2190ee1c207d6e210d3db1a09d33e62978e31140d7f1b0ba945f67707e489a20787ade9e802837741df511c773163372530e2cdaf1f8b0d37f360c4c31c",
		stakeAccountPublicKey:
			"4e1f5bc155bca6b5a3968ffab702c9222d059483a17897ec5de38d61d83b2ce0ab80a173135ceb14b1535bf60bda490e0efad5ce222348cfa9b0f8fcfb55c66a",
		addresses: {
			testnet: {
				spend: [
					"addr_test1qq254lk4kl4zpfmr7wsz6qapn7qywks2f6spdhlsx2f7azdu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsq7n2ck",
					"addr_test1qrwrstd7wkn9lmfcru9ckn23f32maja6y4cd4vqrn0qwsyau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs64rzts",
					"addr_test1qzt6zp2uf2p3zwdvvdtv4vsh8wrvc7sj92ymj27nnemct84u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs54c0av",
					"addr_test1qqlx0yh88k4q0yxzrfmr2fn373hw98v4x2jv82f7tz82ysau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsnudj6x",
					"addr_test1qpgs3nex8wvaggzx9pnwjgh946e7zk3k8vc9lnf4jrk5fs4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsnfunm6",
					"addr_test1qqzs2j2nrp8rs746fd4csqlgzhajduujc5jmdrtvfud6qq4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs8wwuw3",
					"addr_test1qz6t0l0aalz6927drmsa9quykurq52c94zrlg35c83vnrh9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs520m9q",
					"addr_test1qzsfquf0vfqfyrl9nyhk0sh0q8uwkh37k2vn8f8vkr0ufc4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsy5y2ng",
					"addr_test1qrunat98cnyld0t9xrw6k8y0rlyc4fl6afcfe42x6j8ndwau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs7dva6t",
					"addr_test1qpgk22xhfm7s44jhjywqhc9knqkcgknq9mfzxxafxaptp0du9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsqeacjt",
					"addr_test1qprqnma5lwtswl9xwc7khjajjv3m5q6454rprj6ekuxa75au9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsy8gpx3",
					"addr_test1qzc8eds6awrf3hntdvdn6psnqlq6q08x92pdxy7cl9qgkedu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsv94ax6",
					"addr_test1qrkrv8g9yp4etkzkeu9zdph7gp9jd99lex7qy7k9t9t76d4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqss2cjup",
					"addr_test1qpwtdmnm4jdvtckct66hwn5mrezf2dtt6tqwmrejqvmfqq9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsm8nlf7",
					"addr_test1qq3hvl7akat6uncpy7p5nexrtqf7ezw7rx4y2vy7mu4z60du9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqszg8u6d",
					"addr_test1qp2v0enmvxr9qc2wmnxu0m4jlnda7amc7a5mqdj9lywanv9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs7h8y3g",
					"addr_test1qphkyjeht7shje9rcclsalgrxzpanq60r2xq6h76p6fglyau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsnvazwa",
					"addr_test1qpkmpxy5ru8ntl5c4kuszjvuze8vhxw9qccqq65n7tk5nlau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs6rkdah",
					"addr_test1qpux4pydcgh8t7eg4dfezyp5tqv83vt9cs7qm9apgj5094au9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsutqthv",
					"addr_test1qr7kmk8k5qnrrak4ma372ydjur8lrxwd5puhyacm0fv8pedu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsxnkukt",
				],
				change: [
					"addr_test1qrnfqqs0hp8wttld5camurccgwgwh4pk4w4lk3aped8spz9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsg05ap6",
					"addr_test1qz39tdwlmz3zu9pe7xzpnac98u95e6un24qyardmrm6qnk4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsgtex72",
					"addr_test1qqcf22q3jcm0zenhmsgwrwjewsrq5uv4n3y5ww7lv3kmm69u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs25dluy",
					"addr_test1qpfahu2up3j9nvjlct4pagjdsn33fv7pzcek9p70a6tqp84u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqss6gv7z",
					"addr_test1qrv3uf4ryzgtm3tphy3zfrumr4u4uykug6ujtmjsl886cy4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsv72jk9",
					"addr_test1qq8dhrkaq9qrjspmj8cx2cvq9k65gqqsknmx2c88ftrezfau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs4vnhpt",
					"addr_test1qpzx8khylqsxvf99nkju27dpk0t6eh7a3hu36uu295f2q74u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs9u50n4",
					"addr_test1qz0lrl3q6upf8m5eza03w9g78kz389779595qd37qf7gfzdu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqspmp2xt",
					"addr_test1qzsvw6jt5q8wfcp99z7j3llp0ee76funtlxpk7ce0qsrtm4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsqgw7u7",
					"addr_test1qpgmxuhkm7yfjyn2dtsf30aw3ke0ht5r6psumcjxr0tr0r9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs0rupta",
					"addr_test1qq46g3rn2yyukk9rvcqmtcr5r80yfqx8r3xtfxetgakh4qau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs384sp9",
					"addr_test1qpu7ekm37cpxqy50mtxcs3h5u53xw5n7rjq5rh87vg4mc84u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs03qm3u",
					"addr_test1qquuqeslwnla624kr6ltw5c0k0puz8wqqcl5prl5qn9tzm4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsgxy0cu",
					"addr_test1qr3jem3zn68k6s2gnak86urdw23wl7c6hgv8lr9tp69nt64u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsccusnh",
					"addr_test1qqshedeqws3tw07hqhgy23w4dlxjsk504dw4p888zhhwfc4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsr344za",
					"addr_test1qq5lp0npqczwhu4l24tmzukqmnyh8xtxnqw808ead4qw22du9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsxxmum3",
					"addr_test1qpg0yrkg8g4z43axj3wn2gqad4082yztjxssaqp0upcawl9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs0p4u3l",
					"addr_test1qq5ngmtn6y3tyhj66qzf5pzadpykpnzfseqrd3dyh7nlnwau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsfn4xtx",
					"addr_test1qqxjemkct5lg6r77h2nwelg5ckq0jn0wdusx6j750sld7j4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqstxk63x",
					"addr_test1qzuq9algg3rerg6tmmqg55zljahsac25898tqjesp8vmm0du9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsaywqx4",
				],
			},
			mainnet: {
				spend: [
					"addr1qy254lk4kl4zpfmr7wsz6qapn7qywks2f6spdhlsx2f7azdu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsrgw25f",
					"addr1q8wrstd7wkn9lmfcru9ckn23f32maja6y4cd4vqrn0qwsyau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqser7z80",
					"addr1qxt6zp2uf2p3zwdvvdtv4vsh8wrvc7sj92ymj27nnemct84u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqshr903n",
					"addr1qylx0yh88k4q0yxzrfmr2fn373hw98v4x2jv82f7tz82ysau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqss2sjke",
					"addr1q9gs3nex8wvaggzx9pnwjgh946e7zk3k8vc9lnf4jrk5fs4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsslpnh9",
					"addr1qyzs2j2nrp8rs746fd4csqlgzhajduujc5jmdrtvfud6qq4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsycnuzw",
					"addr1qx6t0l0aalz6927drmsa9quykurq52c94zrlg35c83vnrh9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqshujmfl",
					"addr1qxsfquf0vfqfyrl9nyhk0sh0q8uwkh37k2vn8f8vkr0ufc4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs8ze2lh",
					"addr1q8unat98cnyld0t9xrw6k8y0rlyc4fl6afcfe42x6j8ndwau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsam3ak5",
					"addr1q9gk22xhfm7s44jhjywqhc9knqkcgknq9mfzxxafxaptp0du9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsr0qc75",
					"addr1q9rqnma5lwtswl9xwc7khjajjv3m5q6454rprj6ekuxa75au9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs834p2w",
					"addr1qxc8eds6awrf3hntdvdn6psnqlq6q08x92pdxy7cl9qgkedu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs0nga29",
					"addr1q8krv8g9yp4etkzkeu9zdph7gp9jd99lex7qy7k9t9t76d4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsnu9js7",
					"addr1q9wtdmnm4jdvtckct66hwn5mrezf2dtt6tqwmrejqvmfqq9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsc3wl9p",
					"addr1qy3hvl7akat6uncpy7p5nexrtqf7ezw7rx4y2vy7mu4z60du9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsp76ukj",
					"addr1q92v0enmvxr9qc2wmnxu0m4jlnda7amc7a5mqdj9lywanv9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsap6yah",
					"addr1q9hkyjeht7shje9rcclsalgrxzpanq60r2xq6h76p6fglyau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqss6qzzz",
					"addr1q9kmpxy5ru8ntl5c4kuszjvuze8vhxw9qccqq65n7tk5nlau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqse4td3g",
					"addr1q9ux4pydcgh8t7eg4dfezyp5tqv83vt9cs7qm9apgj5094au9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqslaatmn",
					"addr1q87kmk8k5qnrrak4ma372ydjur8lrxwd5puhyacm0fv8pedu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs99tu65",
				],
				change: [
					"addr1q8nfqqs0hp8wttld5camurccgwgwh4pk4w4lk3aped8spz9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqstefad9",
					"addr1qx39tdwlmz3zu9pe7xzpnac98u95e6un24qyardmrm6qnk4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqstayxj4",
					"addr1qycf22q3jcm0zenhmsgwrwjewsrq5uv4n3y5ww7lv3kmm69u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsfzslsm",
					"addr1q9fahu2up3j9nvjlct4pagjdsn33fv7pzcek9p70a6tqp84u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsnv4vja",
					"addr1q8v3uf4ryzgtm3tphy3zfrumr4u4uykug6ujtmjsl886cy4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs0ghj66",
					"addr1qy8dhrkaq9qrjspmj8cx2cvq9k65gqqsknmx2c88ftrezfau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsk6whd5",
					"addr1q9zx8khylqsxvf99nkju27dpk0t6eh7a3hu36uu295f2q74u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsx2f0l2",
					"addr1qx0lrl3q6upf8m5eza03w9g78kz389779595qd37qf7gfzdu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqszdu225",
					"addr1qxsvw6jt5q8wfcp99z7j3llp0ee76funtlxpk7ce0qsrtm4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsr7n7sp",
					"addr1q9gmxuhkm7yfjyn2dtsf30aw3ke0ht5r6psumcjxr0tr0r9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsv4pp8z",
					"addr1qy46g3rn2yyukk9rvcqmtcr5r80yfqx8r3xtfxetgakh4qau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsj3gsd6",
					"addr1q9u7ekm37cpxqy50mtxcs3h5u53xw5n7rjq5rh87vg4mc84u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsv8amar",
					"addr1qyuuqeslwnla624kr6ltw5c0k0puz8wqqcl5prl5qn9tzm4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqstse05r",
					"addr1q83jem3zn68k6s2gnak86urdw23wl7c6hgv8lr9tp69nt64u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsmwpslg",
					"addr1qyshedeqws3tw07hqhgy23w4dlxjsk504dw4p888zhhwfc4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsq8g4wz",
					"addr1qy5lp0npqczwhu4l24tmzukqmnyh8xtxnqw808ead4qw22du9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs9sxuhw",
					"addr1q9g0yrkg8g4z43axj3wn2gqad4082yztjxssaqp0upcawl9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsvhguaq",
					"addr1qy5ngmtn6y3tyhj66qzf5pzadpykpnzfseqrd3dyh7nlnwau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs29gx8e",
					"addr1qyxjemkct5lg6r77h2nwelg5ckq0jn0wdusx6j750sld7j4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsgst6ae",
					"addr1qxuq9algg3rerg6tmmqg55zljahsac25898tqjesp8vmm0du9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs7jnq22",
				],
			},
		},
		spendAddresses: [
			"addr_test1qq254lk4kl4zpfmr7wsz6qapn7qywks2f6spdhlsx2f7azdu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsq7n2ck",
			"addr_test1qrnfqqs0hp8wttld5camurccgwgwh4pk4w4lk3aped8spz9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsg05ap6",
			"addr_test1qrwrstd7wkn9lmfcru9ckn23f32maja6y4cd4vqrn0qwsyau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs64rzts",
			"addr_test1qz39tdwlmz3zu9pe7xzpnac98u95e6un24qyardmrm6qnk4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsgtex72",
			"addr_test1qzt6zp2uf2p3zwdvvdtv4vsh8wrvc7sj92ymj27nnemct84u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs54c0av",
			"addr_test1qqlx0yh88k4q0yxzrfmr2fn373hw98v4x2jv82f7tz82ysau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsnudj6x",
		],
		walletId: "82d63879d8914699da73edbb65b091da16e21964",
	},
];

const baseAddressFromXpub = (spendXpub: Buffer, stakeXpub: Buffer, networkId: string): string => {
	const network = parseInt(networkId);
	const addrBuffer = lib.packBaseAddress(
		lib.getPubKeyBlake2b224Hash(spendXpub.slice(0, 32)),
		lib.getPubKeyBlake2b224Hash(stakeXpub.slice(0, 32)),
		network,
	);
	return lib.bech32.encode(network === 1 ? "addr" : "addr_test", addrBuffer);
};

describe.each(data)("Addresses from", (wallet) => {
	it.skip(`Identity Service ${wallet.from}'s Wallet`, async function () {
		const privateKey = createService(PrivateKeyService).fromMnemonic(wallet.mnemonic);
		expect(privateKey).toBe(wallet.rootPrivateKey);

		const publicKey = createService(PublicKeyService).fromMnemonic(wallet.mnemonic);
		expect(publicKey).toBe(wallet.rootPublicKey);

		const keys = createService(KeyPairService).fromMnemonic(wallet.mnemonic);
		expect(keys).toStrictEqual({ publicKey: wallet.rootPublicKey, privateKey: wallet.rootPrivateKey });
	});

	it.skip(`Client Service ${wallet.from}'s Wallet`, async function () {
		const client = createService(ClientService);

		const walletData = await client.wallet(wallet.walletId);
		expect(walletData).toBe(wallet.address);
	});

	it.skip(`${wallet.from}'s Private Key`, async () => {
		const mnemonic = wallet.mnemonic;

		let addresses: { [key: string]: string[] } = { testnet: [], mainnet: [] };
		for (let i = 0; i < 20; ++i) {
			addresses.testnet.push(await addressFromMnemonic(mnemonic, 0, false, i, "0"));
			addresses.mainnet.push(await addressFromMnemonic(mnemonic, 0, false, i, "1"));
		}
		expect(addresses.testnet).toEqual(wallet.addresses.testnet.spend);
		expect(addresses.mainnet).toEqual(wallet.addresses.mainnet.spend);
	});

	it.skip(`${wallet.from}'s Public Key`, async () => {
		const publicKey = Buffer.from(wallet.accountPublicKey, "hex");
		let addresses: { [key: string]: { [key: string]: string[] } } = {
			testnet: { spend: [], change: [] },
			mainnet: { spend: [], change: [] },
		};
		for (let i = 0; i < 20; ++i) {
			addresses.testnet.spend.push(await addressFromAccountExtPublicKey(publicKey, false, i, "0"));
			addresses.mainnet.spend.push(await addressFromAccountExtPublicKey(publicKey, false, i, "1"));
			addresses.testnet.change.push(await addressFromAccountExtPublicKey(publicKey, true, i, "0"));
			addresses.mainnet.change.push(await addressFromAccountExtPublicKey(publicKey, true, i, "1"));
		}
		expect(addresses.testnet.spend).toEqual(wallet.addresses.testnet.spend);
		expect(addresses.mainnet.spend).toEqual(wallet.addresses.mainnet.spend);
		expect(addresses.testnet.change).toEqual(wallet.addresses.testnet.change);
		expect(addresses.mainnet.change).toEqual(wallet.addresses.mainnet.change);
	});
});

it.skip(`spend addresses ${data[1].from}'s Wallet`, async () => {
	function checkExpected(
		spendChangeExtPublicKey,
		stakeChainPublicKey,
		addressIndex: number,
		stakeAddressIndex: number,
		expectedSpendAddress: string,
		expectedStakeAddress: string,
	) {
		let stakeAddressPublicKey = lib.derivePublic(stakeChainPublicKey, stakeAddressIndex, SHELLEY_DERIVATION_SCHEME);
		expect(stakeAddressPublicKey.toString("hex")).toBe(expectedStakeAddress);

		let spendAddressExtPublicKey = lib.derivePublic(
			spendChangeExtPublicKey,
			addressIndex,
			SHELLEY_DERIVATION_SCHEME,
		);
		expect(baseAddressFromXpub(spendAddressExtPublicKey, stakeAddressPublicKey, "0")).toBe(expectedSpendAddress);
		console.log(`Change: m/1852"/1815"/0"/0/${addressIndex}`, expectedSpendAddress);
	}

	const wallet = data[1];
	const mnemonic = wallet.mnemonic;

	const walletKeyPair = await lib.mnemonicToRootKeypair(mnemonic, 2);
	expect(walletKeyPair.toString("hex").slice(0, 128)).toBe(wallet.rootPrivateKey);
	expect(walletKeyPair.toString("hex").slice(128, 256)).toBe(wallet.rootPublicKey);
	expect(walletKeyPair.toString("hex")).toBe(wallet.rootPrivateKey + wallet.rootPublicKey);
	// console.log(walletKeyPair.toString("hex"));

	/*
	 * Using private/hardened derivation--sequentially--from rootkeyPair
	 */

	// depth = 1 (0x80000000 + 1852) Purpose: m/1852" (SHELLEY_COIN_PURPOSE)
	const purposeKeyPair = await lib.derivePrivate(
		walletKeyPair,
		HARDENED_THRESHOLD + SHELLEY_COIN_PURPOSE,
		SHELLEY_DERIVATION_SCHEME,
	);
	expect(purposeKeyPair.toString("hex")).toBe(wallet.purposeKey);
	// console.log(purposeKeyPair.toString("hex"));

	// depth = 2 (0x80000000 + 1815) Coin Type ADA: m/1852"/1815" (SHELLEY_COIN_TYPE)
	const coinTypeKeyPair = lib.derivePrivate(
		purposeKeyPair,
		HARDENED_THRESHOLD + SHELLEY_COIN_TYPE,
		SHELLEY_DERIVATION_SCHEME,
	);
	expect(coinTypeKeyPair.toString("hex")).toBe(wallet.coinTypeKey);
	// console.log(coinTypeKeyPair.toString("hex"));

	// depth = 3 (0x80000000 + 0) Account: m/1852"/1815"/0"
	const accountKeyPair = lib.derivePrivate(coinTypeKeyPair, HARDENED_THRESHOLD + 0, SHELLEY_DERIVATION_SCHEME);
	expect(accountKeyPair.toString("hex")).toBe(wallet.accountKeyPair);
	const accountPublicKey = accountKeyPair.slice(64, 128);
	expect(accountPublicKey.toString("hex")).toBe(wallet.accountPublicKey);
	// console.log(accountKeyPair.toString("hex"));

	// depth = 4  Change: m/1852"/1815"/0"/0 -> is not change
	const spendPublicKey: Buffer = lib.derivePublic(accountPublicKey, 0, SHELLEY_DERIVATION_SCHEME);
	expect(spendPublicKey.toString("hex")).toBe(
		"64962ed96961290241bccfaef04099f9d515f5592225db2c82d7ddd810883a024e6ff09bb2a11a4d2be26011fec47c955b44187331429316672568e73d0c46cf",
	);
	console.log(accountKeyPair.toString("hex"));

	// depth = 4  Change: m/1852"/1815"/0"/1 -> is change
	const changeSpendPublicKey: Buffer = lib.derivePublic(accountPublicKey, 1, SHELLEY_DERIVATION_SCHEME);
	expect(changeSpendPublicKey.toString("hex")).toBe(
		"7d1c569689a9941cbf1037dd92b5b5288979f19b99596d3cd20a6457030196c29d4bf45d10d88c9c28d8bbe2d7761d1932ec64642779488289e1822f637e6bfe",
	);

	// depth = 4  Stake: m/1852"/1815"/0"/2
	const stakeChainPublicKey = lib.derivePublic(accountPublicKey, 2, SHELLEY_DERIVATION_SCHEME);
	expect(stakeChainPublicKey.toString("hex")).toBe(wallet.stakeAccountPublicKey);

	const baseAddressForAccount = baseAddressFromXpub(spendPublicKey, stakeChainPublicKey, "0");
	console.log("baseAddressForAccount", baseAddressForAccount);

	// depth = 5  Address: m/1852"/1815"/0"/0/0
	checkExpected(
		spendPublicKey,
		stakeChainPublicKey,
		0,
		0,
		"addr_test1qq254lk4kl4zpfmr7wsz6qapn7qywks2f6spdhlsx2f7azdu9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsq7n2ck",
		"b2243ba449ec290aa578dd3cc8c4a618d6648e69b5c71f7ab6f88dc7e1b0bffb6b661596c8c0413bd202c33dc9bc4fc3ee6e30a4a0f9c7edff638b04ffa228b2",
	);
	// depth = 5  Address: m/1852'/1815'/0'/1/0
	checkExpected(
		changeSpendPublicKey,
		stakeChainPublicKey,
		0,
		0,
		"addr_test1qrnfqqs0hp8wttld5camurccgwgwh4pk4w4lk3aped8spz9u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsg05ap6",
		"b2243ba449ec290aa578dd3cc8c4a618d6648e69b5c71f7ab6f88dc7e1b0bffb6b661596c8c0413bd202c33dc9bc4fc3ee6e30a4a0f9c7edff638b04ffa228b2",
	);

	// depth = 5  Address: m/1852'/1815'/0'/0/1
	checkExpected(
		spendPublicKey,
		stakeChainPublicKey,
		1,
		0,
		"addr_test1qrwrstd7wkn9lmfcru9ckn23f32maja6y4cd4vqrn0qwsyau9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqs64rzts",
		"b2243ba449ec290aa578dd3cc8c4a618d6648e69b5c71f7ab6f88dc7e1b0bffb6b661596c8c0413bd202c33dc9bc4fc3ee6e30a4a0f9c7edff638b04ffa228b2",
	);
	// depth = 5  Address: m/1852'/1815'/0'/1/1
	checkExpected(
		changeSpendPublicKey,
		stakeChainPublicKey,
		1,
		0,
		"addr_test1qz39tdwlmz3zu9pe7xzpnac98u95e6un24qyardmrm6qnk4u9m4778wzj4rhddna0s2tszgz9neja69f4q6xwp2w6wqsgtex72",
		"b2243ba449ec290aa578dd3cc8c4a618d6648e69b5c71f7ab6f88dc7e1b0bffb6b661596c8c0413bd202c33dc9bc4fc3ee6e30a4a0f9c7edff638b04ffa228b2",
	);
});
