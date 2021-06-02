import "jest-extended";
import { createConfig } from "./helpers";
import { ClientService } from "../src/services";
import { TransactionService } from "../src/services/transaction";
import { Signatories } from "@arkecosystem/platform-sdk";

let subject: TransactionService;

beforeEach(async () => {
	subject = await TransactionService.__construct(createConfig());
});

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
		//     m/1852"/1815"/0"
		accountKeyPair:
			"40f6e71f05225766ea7fdf2fe71026ae9bcb9fa2f40c441ce91d6d1007118f4563a3149afff5f06616734449426d1a4a9d2fcdc3af838db399dc1a42988f27ecaec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
		accountPublicKey:
			"aec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
		stakeAccountPublicKey:
			"4e1f5bc155bca6b5a3968ffab702c9222d059483a17897ec5de38d61d83b2ce0ab80a173135ceb14b1535bf60bda490e0efad5ce222348cfa9b0f8fcfb55c66a",
		addresses: {
			spend: [
				// m/1852"/1815"/0"/0
				"addr_test1qqy6nhfyks7wdu3dudslys37v252w2nwhv0fw2nfawemmn8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sw96paj", //  m/1852"/1815"/0"/0/0
				"addr_test1qrhvwtn8sa3duzkm93v5kjjxlv5lvg67j530wyeumngu23lk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s4s8xvh", //  m/1852"/1815"/0"/0/1
				"addr_test1qrtlcnmfdyarpscqxa6nthjz0na7xyz3fa8vt3yjw2y5gs8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33saf6px4", //  m/1852"/1815"/0"/0/2
				"addr_test1qzawae46edstqpdy84hhymuldnflyup0kjrp9ss5mgzvgplk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sfwe8sv", //  m/1852"/1815"/0"/0/3
				"addr_test1qr37u32sathht33rxpfk80yrexxkypqyl9hg5c77lw5n58lk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sy2mmsd", //  m/1852"/1815"/0"/0/4
				"addr_test1qz6uqrj8jqtylttlrtn0wsh084jp58z8r2fkfhuun5nasw8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s06dfg3", //  m/1852"/1815"/0"/0/5
				"addr_test1qzvq73tc9m40m0jnmttkmf74p2lx5thuhsclu03chd0xkshk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sqqr8zu", //  m/1852"/1815"/0"/0/6
				"addr_test1qqq2jxjrrq8apv4u3gy9mjrufvs42myzasd65crwuhyvlp0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s883mq6", //  m/1852"/1815"/0"/0/7
				"addr_test1qrlge3t2tmlh7t2mmaas5gy7a82q5cdsuddhlff949xntmlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sncpvd9", //  m/1852"/1815"/0"/0/8
				"addr_test1qpf2jx3ndwqmldj89e9vpqcwmsw6h4wejp4gywz40wckmzlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33suyy5ja", //  m/1852"/1815"/0"/0/9
				"addr_test1qq9nms699rfkkmrs9m4kml466kk034uvhz48p0plq2lld00k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33snh2d4v", //  m/1852"/1815"/0"/0/10
				"addr_test1qpkm28ylwmxrh73mv040c0x6jqkh2mcrwx4a47yv80aq3vlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s7ula50", //  m/1852"/1815"/0"/0/11
				"addr_test1qpdc0wjy4jw296ky85fw8jf2c8d4x7fm2qxvdrlfq4jyvlhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s4y4raa", //  m/1852"/1815"/0"/0/12
				"addr_test1qqycmygp5pv2hn9kk8vljt98gpjpg3ywzd8ysdynwpa78llk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s7n2y6a", //  m/1852"/1815"/0"/0/13
				"addr_test1qqszcuht5uxtectkcpurxszpj7jt8uywynf6gde37ea6w40k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33st8yn6n", //  m/1852"/1815"/0"/0/14
				"addr_test1qrmxlw04xwvyrpt2n6q36f4m0xu4lwnted6y9q5v7uldp78k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sul03vu", //  m/1852"/1815"/0"/0/15
				"addr_test1qzxzfv4c7n30np5yv34sywv6vz095r3sd98a4f7nkfqqrk0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s30txsp", //  m/1852"/1815"/0"/0/16
				"addr_test1qrta0j6hx8ajchhzje9qg033940llyku5h83k5ttckar3jhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sym3tvw", //  m/1852"/1815"/0"/0/17
				"addr_test1qqchxm32j5pr7a758kzv462tuvdx8nxlwas7wzt83u7gt9hk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33suvg52n", //  m/1852"/1815"/0"/0/18
				"addr_test1qqxgjqsmcgc8h47pk63u33976pdsgdcej0eeyztkn6ygve8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s9dqqr4", //  m/1852"/1815"/0"/0/19
			],
			change: [
				// m/1852"/1815"/0"/1
				"addr_test1qzfjfm724nv9qz6nfyagmj0j2uppr35gzv5qee8s7489wxlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33scc4thv", //  m/1852"/1815"/0"/1/0
				"addr_test1qzdcehzqelgwyzdzswc8f7743xvr3sywjq63s0auft8g0d8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sjv0ust", //  m/1852"/1815"/0"/1/1
				"addr_test1qz2t57ujlkxdtv86pwehqq74a4t93xz60vvesnvgt3qz6g0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sp6hm22", //  m/1852"/1815"/0"/1/2
				"addr_test1qrgpsfs4dpnzxksd9de06hetvgje7c0nganpeff7ja9wctlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s4y89zq", //  m/1852"/1815"/0"/1/3
				"addr_test1qqkuyrhjxa4zwtdrm2a7asueyghu5c9y54fugp5r9cyk3p0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33shmyva7", //  m/1852"/1815"/0"/1/4
				"addr_test1qqngtymqpmhsk4fsys722uthmdnf8a3ag0q4cy9qlq0vzy8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sdr5v70", //  m/1852"/1815"/0"/1/5
				"addr_test1qq2vqlqrln0uu7rw87kexcd2pr63jy8g5ymf2kukv3phqw0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s7jtsz8", //  m/1852"/1815"/0"/1/6
				"addr_test1qpsvmsvfy5xcm958mpyxq4tl94jv335z0qscrz20hud3rqlk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33savcd3z", //  m/1852"/1815"/0"/1/7
				"addr_test1qrv5xqcdudp0tcsxu56ys6ytwl7vl3sfhnss5ualnzghpvhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33slyedse", //  m/1852"/1815"/0"/1/8
				"addr_test1qq94krqrkxd9j8vzpnq937heprm37hlktjezfh5sn63us30k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s8feequ", //  m/1852"/1815"/0"/1/9
				"addr_test1qztgk69s33xmmn6u68k60fm94dvxgj6qxxq82gqwn2t5xh8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33scqy2t5", //  m/1852"/1815"/0"/1/10
				"addr_test1qrux7uxa9k5jrrxzqs2qn6ap4u88xswefzl3v83zslwjl0hk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s5kxdpx", //  m/1852"/1815"/0"/1/11
				"addr_test1qz7jrlx9ptrwf6jtyksyfk5zqlp20y87lqvtytcsnyrmma0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sqccac0", //  m/1852"/1815"/0"/1/12
				"addr_test1qr75rhcc6qt7ecu3v8fcautu43facv85g3ckhgcym5tvgl8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33skcqy5k", //  m/1852"/1815"/0"/1/13
				"addr_test1qrelq0ht86rsvul5c3udeeplvcp8l9w67y2guru8qt52k3hk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33schfcfr", //  m/1852"/1815"/0"/1/14
				"addr_test1qrc9tpfyk9d4ywn8ezr45jqrvlx9qplt22qk3dz6am2dxclk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33suny99x", //  m/1852"/1815"/0"/1/15
				"addr_test1qqguca5n5u9vc8lqk8utketux84q7hlrecnj9s9c04246y0k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sgwdwxs", //  m/1852"/1815"/0"/1/16
				"addr_test1qrn2qj4wu67csfmfzfkk2kawql42qsgz4kzsfr8hqdtvtg8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33s2k7z3s", //  m/1852"/1815"/0"/1/17
				"addr_test1qq7ua3j55nzsz5wvhhga77nkcxx2x93rztlcehzdq9ssqshk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sq7qer4", //  m/1852"/1815"/0"/1/18
				"addr_test1qr5yfvk0wf3ccfwld3psnaxht9lyne6wdv3r92cxd8tx8rhk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33syxyqc9", //  m/1852"/1815"/0"/1/19
			],
		},
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
	},
];

it.skip(`can send a transfer`, async function () {
	const config = createConfig();
	const client = await ClientService.__construct(config);

	const wallet = data[0]; // Simon's
	const mnemonic = wallet.mnemonic;
	const from: string = wallet.accountPublicKey;

	const wallet2 = data[1]; // Mariano's
	const to: string = wallet2.addresses.spend[2];
	const amount: number = 1.2;

	const tx = await subject.transfer({
		signatory: new Signatories.Signatory(
			new Signatories.MnemonicSignatory({
				signingKey: mnemonic,
				address: from,
				publicKey: from,
				privateKey: from,
			}),
		),
		data: {
			amount,
			to,
		},
	});

	const result = await client.broadcast([tx]);
	console.log(result);
	expect(result.accepted).toBeArrayOfSize(1);
	expect(result.rejected).toBeEmpty();
	expect(result.errors).toBeEmpty();
});
