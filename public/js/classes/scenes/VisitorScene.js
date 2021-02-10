let resizeBug = true;
let letter;
let woordje;
//let backgroundimage;
let spawnWordInterval;
let lowercase;
let readWord = 'abcde';
let split = [];
let letters = [];
let feelings = [];
let hartjes = [];
let highfiveCount = 0;
let heartCount = 0;
let widthDivScreen;
if(document.querySelector(`.bottomblock`)){
   widthDivScreen = document.querySelector(`.bottomblock`).style.width;
}
let spacebetween = 60;
let isLive = false;
let $liveTitle = document.querySelector(`.live__footage__indication`);
let $liveSub = document.querySelector(`.live__footage__subindication`);
let $liveDot = document.querySelector(`.bol`);
const $btnHand = document.querySelector(`.groen`);
const $btnSchud = document.querySelector(`.blauw`);
const $btnHartje = document.querySelector(`.orangje`);
let selectedFeeling;
let memootjesEmotion = [];
let lostLetters = [];
let foundLetters = [];
let isClickable = false;
let isHandClickable = true;
let isHeartClickable = true;
let isShakeClickable = true;
let isClearing = false;

const forbiddenWordsEn = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];
const forbiddenWordsNl = ["abortus", "anaal", "anus", "ezel", "ass-neuker", "ezels", "lul","klootzakken","ballbag","ballen","bastaard-","bellend","beestachtig","beestachtigheid","teef","teven","zeuren","bloedig","pijpbeurt","bollok","lobbes","tieten","borsten","buceta","kont","mikpunt","tapijt muncher","spleet","cipa","clitoris","pik","cock-sucker","hanen","coon","onzin","cum","klaarkomen","cunillingus","kut","vloek","dick","dildo","dildo's","dink","dog-neuker","duche","dijk","ejaculaat","ejaculatie","ejaculeert","zaadlozing","flikker","fagging","takkenbossen","fanny","felching","fellatio","flens","neuken","fucked","neuker","fuckers","fuckings","neukt","fudge packer","god-damned","godverdomme","hel","hore","geile","jerk-off","kock","schaamlippen","lust","begeren","masochist","masturberen","moeder klootzak","nazi","neger","negers","orgasim","orgasme","orgasmes","snavel","penis","pissen","dronken","pisser","pissend","pissing","donder op","achterschip","porno","pornografie","prik","prikt","pube","kutjes","kutje","verkrachting","rapist","rectum","vertragen","rimmen","sadist","schroeven","scrotum","sperma","seks","shag","shagging","shemale","stront","shite","diarree","schijten","shitty","slet","sletten","smegma","roetvlek","rukken","son-of-a-teef","spac","fut","zaadbal","mees","titt","drol","vagina","viagra","vulva","wang","wank","hoer","x beoordeeld","xxx"];
const forbiddenWordsFr = [ "avortement", "anal", "anus", "cul", "enculer", "culs", "connard", "connards", "sac de billes", "des balles", "bellend", "bestial", "bestialité", "chienne", "chiennes", "salope", "sanglant", "pipe", "bollok", "boob", "seins", "les seins", "buceta", "clochard", "bout", "tapis muncher", "fente", "cipa", "clitoris", "coq", "suceuse", "coqs", "nègre", "merde", "sperme", "éjaculation", "cunillingus", "chatte", "zut", "queue", "godemiché", "godes", "tremper", "baiseur de chien", "duché", "digue", "éjaculer", "éjaculé", "éjacule", "éjaculant", "pédé", "fagging", "fagot", "fagots", "penchant", "fellation", "bride", "baisée", "enfoiré", "baiseurs", "putain de", "fuckings", "baise", "emballeur de fudge", "damné", "putain", "enfer", "hore", "corné", "se branler", "kock", "les lèvres", "luxure", "convoitise", "masochiste", "masturber", "mère enculée", "nazi", "nègres", "orgasim", "orgasme", "orgasmes", "quéquette", "pénis", "pisse", "bourré", "pisser", "faire chier", "caca", "porno", "pornographie", "piquer", "piqûres", "pube", "chattes", "râpé", "violeur", "rectum", "retard", "rimming", "sadique", "scrotum", "sexe", "baiser", "transexuelle", "chier", "chié", "merdique", "skank", "salopes", "smegma", "cochonneries", "arracher", "fils de pute", "espacer", "cran", "testicule", "mésange", "titt", "vagin", "viagra", "vulve", "wang", "branler", "x évalué", "xxx"];
const forbiddenWordsDe = [ "abtreibung", "anal", "anus", "arsch", "arschficker", "esel", "arschloch", "arschlöcher", "balltasche", "bälle", "bastard", "bellend", "bestial", "bestialität", "hündin", "hündinnen", "schluchzen", "blutig", "blasen", "bollok", "boob", "brüste", "buceta", "gammler", "hintern", "teppichmuncher", "spalt", "cipa", "klitoris", "schwanz", "schwanzlutscher", "schwänze", "waschbär", "mist", "sperma", "abspritzen", "cunillingus", "fotze", "verdammt", "dildo", "dildos", "dink", "hundeficker", "duche", "deich", "ejakulieren", "ejakuliert", "ejakulation", "kippe", "fagging", "schwuchtel", "schwuchteln", "fanny", "felching", "fellatio", "flansch", "scheiße", "gefickt", "ficker", "ficken", "fickt", "fudge packer", "gott verdammt", "gottverdammt", "hölle", "hore", "geil", "wichsen", "kock", "schamlippen", "lust", "lüstern", "masochist", "masturbieren", "mutter ficker", "nazi", "nigger", "orgasim", "orgasmus", "orgasmen", "pecker", "penis", "piss", "besoffen", "pisser", "pisst", "pissen", "pissoff", "poop", "porno", "pornographie", "stechen", "stiche", "pube", "fotzen", "muschi", "vergewaltigen", "vergewaltiger", "rektum", "verzögern", "rimming", "sadist", "schrauben", "hodensack", "samen", "sex", "shag", "shagging", "transen", "scheisse", "geschissen", "scheißen", "beschissen", "prostituierte", "schlampe", "schlampen", "smegma", "schmutz", "schnappen", "hurensohn", "abstand", "hoden", "tit", "titten", "titt", "turd", "vagina", "viagra", "vulva", "wang", "hure", "x bewertet", "xxx"];
const memootjes = [
  {
  text: "Spoel je rimpels weg, kam het verdriet uit je haren. Ze zijn geen deel van jou, ze reizen alleen maar even mee.",
  author: "Alice Boudrey",
  linkText: "@hihelloalice",
  link: "https://www.instagram.com/hihelloalice/",
  forEmotions: ["somber", "blij"],
  keyword: "rimpels"
},
{
  text: "En het voelt als thuiskomen.",
  author: "Loncke Oona",
  linkText: "@oonaloncke",
  link: "https://www.instagram.com/oonaloncke/",
  forEmotions: ["somber", "afgemat"],
  keyword: "thuis"
},
{
  text: "Een dreigende wolk zweeft boven mijn hoofd en lijkt me te willen opslokken.",
  author: "Loncke Oona",
  linkText: "@oonaloncke",
  link: "https://www.instagram.com/oonaloncke/",
  forEmotions: "blij",
  keyword: "wolk"
},
{
  text: "Het enige dat mij soelaas brengt is hetgeen ik niet kan grijpen.",
  author: "Loncke Oona",
  linkText: "@oonaloncke",
  link: "https://www.instagram.com/oonaloncke/",
  forEmotions: ["blij", "giechelig"],
  keyword: "soelaas"
},
{
  text: "Vandaag zette jij voor ons het podium op - leende je ons je oren en je ogen - we buigen diep voor jou, publiek - sluit je zelf even de gordijnen?",
  author: "Louise Maddens",
  linkText: "Meer over Louise en het Collectief",
  link: "https://letterzetterkortrijk.be/collectief",
  forEmotions: ["blij", "somber", "afgemat"],
  keyword: "podium"
},
{
  text: "Ik gebruikte het internet al toen er nog Ethiopische prinsen geld aanboden via mail, ik weet wat ik doe.",
  author: "Martijn Verhelst",
  linkText: "@verhelstmartijn",
  link: "https://www.instagram.com/verhelstmartijn/",
  forEmotions: ["blij", "giechelig", "somber", "afgemat"],
  keyword: "mail"
},
{
  text: "In de zomer hebben we ook problemen, hetzij van een ander kaliber. Wie gaat de flamingo opblazen bijvoorbeeld?",
  author: "Martijn Verhelst",
  linkText: "@verhelstmartijn",
  link: "https://www.instagram.com/verhelstmartijn/",
  forEmotions: ["blij", "giechelig", "somber", "afgemat"],
  keyword: "flamingo"
},
{
  text: "Dit zou een heel diepe boodschap kunnen zijn, over het leven de liefde en God. Maar dat is dit niet, dit zijn woorden die een boodschap willen zijn maar de woorden niet vinden.",
  author: "Martijn Verhelst",
  linkText: "@verhelstmartijn",
  link: "https://www.instagram.com/verhelstmartijn/",
  forEmotions: ["blij", "afgemat"],
  keyword: "woord"
},
{
  text: "Dat wij daar toen - en dat jij dacht - dat ook dit -ooit verloren - Dat ik dan daar - en jij ik wij - samen -als nooit tevoren.",
  author: "Joke De Kerpel",
  linkText: "@darteledichter",
  link: "https://www.instagram.com/darteledichter/",
  forEmotions: ["blij", "giechelig", "somber", "afgemat"],
  keyword: "verloren"
},
{
  text: "Jij piekt, ik daal. Jij daalt, ik piek. We zijn vier handen- trekken elkaar op- liften ons hoger dan onze volle hoofden - geluk hoeft niet gesynchroniseerd",
  author: "Joke De Kerpel",
  linkText: "@darteledichter",
  link: "https://www.instagram.com/darteledichter/",
  forEmotions: ["blij", "giechelig", "somber", "afgemat"],
  keyword: "piek"
},
{
  text: "Hoe je je gevoelens dissecteerde - en het toch hoop bleek te zijn.",
  author: "Joke De Kerpel",
  linkText: "@darteledichter",
  link: "https://www.instagram.com/darteledichter/",
  forEmotions: ["blij", "giechelig", "somber", "afgemat"],
  keyword: "hoop"
},
{
  text: "Kies je voor een wijk als elleboog om in te nestelen of liever de lange laan een uitgestrekte arm.",
  author: "Sien Demuynck",
  linkText: "Meer over Sien en het collectief",
  link: "https://letterzetterkortrijk.be/collectief",
  forEmotions: ["blij", "giechelig", "somber", "afgemat"],
  keyword: "wijk"
},
{
  text: "Verloren hinkel ik over de sproeten op mijn vingers.",
  author: "Sien Demuynck",
  linkText: "Meer over Sien en het collectief",
  link: "https://letterzetterkortrijk.be/collectief",
  forEmotions: ["blij", "giechelig", "somber", "afgemat"],
  keyword: "sproeten"
},
{
  text: "Smartphone (zn; de): dikke middelvinger naar die leerkracht die je maaltafels liet leren omdat je ‘nooit een rekenmachine in je achterzak zou hebben’.",
  author: "Tine Lefebvre",
  linkText: "@tinelefebvre",
  link: "https://www.instagram.com/tinelefebvre/",
  forEmotions: ["blij", "giechelig", "somber", "afgemat"],
  keyword: "maaltafels"
},
{
  text: "Ik wens je veel specialiteiten en een Miranda die trots op ze is.",
  author: "Tine Lefebvre",
  linkText: "@tinelefebvre",
  link: "https://www.instagram.com/tinelefebvre/",
  forEmotions: ["blij", "giechelig", "somber"],
  keyword: "trots"
},
{
  text: "Misschien is naïviteit het nog-niet-weten-dat en de stille hoop koesteren dat het ook nooit hoeft.",
  author: "Tine Lefebvre",
  linkText: "@tinelefebvre",
  link: "https://www.instagram.com/tinelefebvre/",
  forEmotions: ["blij", "giechelig", "somber", "afgemat"],
  keyword: "hoop"
}


]


let jointPositionsGebruikers = {
  nosePos: {x:0, y:0},
  leftEyePos: {x:0, y:0},
  leftWristPos: {x:0, y:0},
  rightWristPos: {x:0, y:0},
  leftShoulderPos: {x:0, y:0},
  rightShoulderPos: {x:0, y:0},
  leftElbowPos: {x:0, y:0},
  rightElbowPos: {x:0, y:0},
  leftKneePos: {x:0, y:0},
  rightKneePos: {x:0, y:0},
  leftHipPos: {x:0, y:0},
  rightHipPos: {x:0, y:0},
  leftAnklePos: {x:0, y:0},
  rightAnklePos: {x:0, y:0}
}
let jointPositionsGebruikersTarget = {
  nosePosTarget: {x:0, y:0},
  leftEyePosTarget: {x:0, y:0},
  leftWristPosTarget: {x:0, y:0},
  rightWristPosTarget: {x:0, y:0},
  leftShoulderPosTarget: {x:0, y:0},
  rightShoulderPosTarget: {x:0, y:0},
  leftElbowPosTarget: {x:0, y:0},
  rightElbowPosTarget: {x:0, y:0},
  leftKneePosTarget: {x:0, y:0},
  rightKneePosTarget: {x:0, y:0},
  leftHipPosTarget: {x:0, y:0},
  rightHipPosTarget: {x:0, y:0},
  leftAnklePosTarget: {x:0, y:0},
  rightAnklePosTarget: {x:0, y:0}
}

/*
let auteurInput = ['Verloren','hinkel ik','over de sproeten op mijn vingers',
'Afgeslagen','langzaam ademend','langs mijn armen dwalend','Mijn rug','terug – gezucht –',
'geen bescherming op de vlucht','Veilig','aan mijn zij','de afgrond daar als lijn',
'Onontdekt','en zorgeloos','dolend door mijn eigen hoofd'];*/

let auteurInput = ['verloren','hinkelik','overdesproeten','opmijnvingers'];
let $timer;
if($btnHand){
  $timer = $btnHand.querySelector(`.timer--hand`);
}

const $btnOntdek = document.querySelector(`.btn-ontdek`);
const $introForm = document.querySelector(`.introForm`);
const $wordForm = document.querySelector(`.wordForm`);
const $feelingsForm = document.querySelector(`.feelingsForm`);
const $challengeForm = document.querySelector(`.challengeForm`);
const $haikuForm = document.querySelector(`.haikuForm`);
if($wordForm){
  $wordForm.style.display = `none`;
  $feelingsForm.style.display = `none`;
  $challengeForm.style.display = `none`;
  $haikuForm.style.display = `none`;
}

const $msgInput = document.getElementById('enteredWord');
const $feelingOptions = document.querySelectorAll(`.feelingOption`);

const $haiku = document.querySelector(`.wordForm__haiku`);
const $auteurName = document.querySelector(`.wordForm__auteur__name`);
const $auteurSocials = document.querySelector(`.wordForm__auteur__socials`);



let socket; // will be assigned a value later
export default class VisitorScene extends Phaser.Scene {

  constructor(config){
    super(config);
  }

  preload(){
    console.log(`PRELOAD visitor`);
    //Preloading sprites

    this.load.image('head', 'assets/img/avatar/avatarGreen/x1/headGreen.png');
    this.load.image('footLeft', 'assets/img/avatar/avatarGreen/x1/footLeftGreen.png');
    this.load.image('footRight', 'assets/img/avatar/avatarGreen/x1/footRightGreen.png');
    this.load.image('handLeft', 'assets/img/avatar/avatarGreen/x1/handLeftGreen.png');
    this.load.image('handRight', 'assets/img/avatar/avatarGreen/x1/handRightGreen.png');
    this.load.image('body', 'assets/img/avatar/avatarGreen/x1/bodyGreen.png');
    this.load.image('knee', 'assets/img/avatar/avatarGreen/x1/kneeGreen.png');
    this.load.image('joint', 'assets/img/avatar/avatarGreen/x1/schijfGroen.png');

    this.load.image('a', 'assets/img/alphabet/x0.5/a.png');
    this.load.image('b', 'assets/img/alphabet/x0.5/b.png');
    this.load.image('c', 'assets/img/alphabet/x0.5/c.png');
    this.load.image('d', 'assets/img/alphabet/x0.5/d.png');
    this.load.image('e', 'assets/img/alphabet/x0.5/e.png');
    this.load.image('f', 'assets/img/alphabet/x0.5/f.png');
    this.load.image('g', 'assets/img/alphabet/x0.5/g.png');
    this.load.image('h', 'assets/img/alphabet/x0.5/h.png');
    this.load.image('i', 'assets/img/alphabet/x0.5/i.png');
    this.load.image('j', 'assets/img/alphabet/x0.5/j.png');
    this.load.image('k', 'assets/img/alphabet/x0.5/k.png');
    this.load.image('l', 'assets/img/alphabet/x0.5/l.png');
    this.load.image('m', 'assets/img/alphabet/x0.5/m.png');
    this.load.image('n', 'assets/img/alphabet/x0.5/n.png');
    this.load.image('o', 'assets/img/alphabet/x0.5/o.png');
    this.load.image('p', 'assets/img/alphabet/x0.5/p.png');
    this.load.image('q', 'assets/img/alphabet/x0.5/q.png');
    this.load.image('r', 'assets/img/alphabet/x0.5/r.png');
    this.load.image('s', 'assets/img/alphabet/x0.5/s.png');
    this.load.image('t', 'assets/img/alphabet/x0.5/t.png');
    this.load.image('u', 'assets/img/alphabet/x0.5/u.png');
    this.load.image('v', 'assets/img/alphabet/x0.5/v.png');
    this.load.image('w', 'assets/img/alphabet/x0.5/w.png');
    this.load.image('x', 'assets/img/alphabet/x0.5/x.png');
    this.load.image('y', 'assets/img/alphabet/x0.5/y.png');
    this.load.image('z', 'assets/img/alphabet/x0.5/z.png');

    this.load.image('somber0', 'assets/img/letterdoos/grumpySmiley/x1/grumpyBlue.png');
    this.load.image('somber1', 'assets/img/letterdoos/grumpySmiley/x1/grumpyDark.png');
    this.load.image('somber2', 'assets/img/letterdoos/grumpySmiley/x1/grumpyGreen.png');
    this.load.image('somber3', 'assets/img/letterdoos/grumpySmiley/x1/grumpyOrange.png');
    this.load.image('somber4', 'assets/img/letterdoos/grumpySmiley/x1/grumpyYellow.png');

    this.load.image('happy0', 'assets/img/letterdoos/smilingSmiley/x1/smilingBlue.png');
    this.load.image('happy1', 'assets/img/letterdoos/smilingSmiley/x1/smilingDark.png');
    this.load.image('happy2', 'assets/img/letterdoos/smilingSmiley/x1/smilingGreen.png');
    this.load.image('happy3', 'assets/img/letterdoos/smilingSmiley/x1/smilingOrange.png');
    this.load.image('happy4', 'assets/img/letterdoos/smilingSmiley/x1/smilingYellow.png');

    this.load.image('quirky0', 'assets/img/letterdoos/smirkingSmiley/x1/smirkingBlue.png');
    this.load.image('quirky1', 'assets/img/letterdoos/smirkingSmiley/x1/smirkingDark.png');
    this.load.image('quirky2', 'assets/img/letterdoos/smirkingSmiley/x1/smirkingGreen.png');
    this.load.image('quirky3', 'assets/img/letterdoos/smirkingSmiley/x1/smirkingOrange.png');
    this.load.image('quirky4', 'assets/img/letterdoos/smirkingSmiley/x1/smirkingYellow.png');

    this.load.image('tired0', 'assets/img/letterdoos/snoringSmiley/x1/snoringBlue.png');
    this.load.image('tired1', 'assets/img/letterdoos/snoringSmiley/x1/snoringDark.png');
    this.load.image('tired2', 'assets/img/letterdoos/snoringSmiley/x1/snoringGreen.png');
    this.load.image('tired3', 'assets/img/letterdoos/snoringSmiley/x1/snoringOrange.png');
    this.load.image('tired4', 'assets/img/letterdoos/snoringSmiley/x1/snoringYellow.png');

    this.load.image('heart', 'assets/img/letterdoos/heart/hart.png');
    this.load.image('hand', 'assets/img/letterdoos/hand/x1/handDark.png');




  }

  create(){
    console.log(`CREATE`);

    //this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');
    this.makeConnection();

    //this.initMap();
    //backgroundimage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundimage');

    //this.noseAvatar = this.matter.add.image(jointPositionsGebruikers.nosePos.x, jointPositionsGebruikers.nosePos.y, 'head', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    //this.bodyAvater = this.matter.add.image(jointPositionsGebruikers.nosePos.x, jointPositionsGebruikers.nosePos.y, 'body', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1}).setScale(.8);

    this.leftEyeAvatar = this.matter.add.image(jointPositionsGebruikers.leftEyePos.x, jointPositionsGebruikers.leftEyePos.y, 'head', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftWristAvatar = this.matter.add.image(jointPositionsGebruikers.leftWristPos.x, jointPositionsGebruikers.leftWristPos.y, 'handLeft', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.rightWristAvatar = this.matter.add.image(jointPositionsGebruikers.rightWristPos.x, jointPositionsGebruikers.rightWristPos.y, 'handRight', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftShoulderAvatar = this.matter.add.image(jointPositionsGebruikers.leftShoulderPos.x, jointPositionsGebruikers.leftShoulderPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.rightShoulderAvatar = this.matter.add.image(jointPositionsGebruikers.rightShoulderPos.x, jointPositionsGebruikers.rightShoulderPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftElbowAvatar = this.matter.add.image(jointPositionsGebruikers.leftElbowPos.x, jointPositionsGebruikers.leftElbowPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.rightElbowAvatar = this.matter.add.image(jointPositionsGebruikers.rightElbowPos.x, jointPositionsGebruikers.rightElbowPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftHipAvatar = this.matter.add.image(jointPositionsGebruikers.leftHipPos.x, jointPositionsGebruikers.leftHipPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.rightHipAvatar = this.matter.add.image(jointPositionsGebruikers.rightHipPos.x, jointPositionsGebruikers.rightHipPos.y, 'joint', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftKneeAvatar = this.matter.add.image(jointPositionsGebruikers.leftKneePos.x, jointPositionsGebruikers.leftKneePos.y, 'knee', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.rightKneeAvatar = this.matter.add.image(jointPositionsGebruikers.rightKneePos.x, jointPositionsGebruikers.rightKneePos.y, 'knee', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.leftAnkleAvatar = this.matter.add.image(jointPositionsGebruikers.leftAnklePos.x, jointPositionsGebruikers.leftAnklePos.y, 'footLeft', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.rightAnkleAvatar = this.matter.add.image(jointPositionsGebruikers.rightAnklePos.x, jointPositionsGebruikers.rightAnklePos.y, 'footRight', 0, {mass: 1000, inverseMass: 1000, isStatic: true, ignoreGravity: false, density: 1});
    this.polygon = new Phaser.Geom.Polygon([{x:100, y:100}, {x: 200, y: 200}, {x: 200, y: 400}, {x: 100, y: 500}]);
    this.graphics = this.add.graphics({ fillStyle: { color: 0x32b099 } });


    this.pointer = this.input.activePointer;
    //this.input.mouse.onMouseWheel.preventDefault = false


    this.time.addEvent({
      delay: 300,
      callback: this.clearLetters,
      callbackScope : this,
      args: [letters],
      loop: true
  });





    this.group1 = this.matter.world.nextGroup();
    this.group2 = this.matter.world.nextGroup(true);

   /* this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      //console.log(bodyA.texture.key);

      if (event.pairs[0].bodyA.gameObject){
        if(bodyA.gameObject.texture.key === "handLeft"){
          if(bodyB.gameObject.texture.key === "hand"){
            console.log(bodyA.gameObject.texture.key);
            //bodyB.gameObject.visible = false;
            //bodyB.gameObject.opacity = 0;
            bodyB.gameObject.destroy();
            this.matter.world.remove(bodyB);
            console.log(bodyB)

          }

        }
        if(bodyA.gameObject.texture.key === "hand"){
          if(bodyB.gameObject.texture.key === "handLeft"){
            console.log(bodyA.gameObject.texture.key);
            this.matter.world.remove(bodyA);

          }

        }
      //console.log(bodyA.gameObject.texture.key);
      //console.log(bodyB.gameObject.texture.key);

      }

  }, this);
*/
//this.scale.resize(999, 999);

    this.spawnLetters();
   // this.scale.setGameSize(800, 800);
    //this.scale.updateBounds();
    //this.scale.on('resize', this.resize, this);

    //this.scale.on('resize', function(gameSize, baseSize, displaySize, previousWidth, previousHeight) {
    //  this.scale.setGameSize(gameSize.width, gameSize.height);
    //}, this);



    //timer = setTimeout(this.readInAuteurInput(), 50000);
  }

     //bij een bepaald aantal letters op het scherm - zullen er een hoeveelheid verdwijnen,
    //random gekozen om zo nieuwe woorden en mysterie te creëren
  clearLetters(){

      if(letters.length > 80 && isClearing === false){
        isClearing = true;
        let letterWaitingToBeDestroyed = [];
        for (let index = 0; index < 4; index++) {




        const rand = Math.floor(Math.random()*letters.length);

        console.log(rand);
        this.tweens.add({
          targets: letters[rand],
          scale: 0,
          duration: 100,
          ease: 'Linear'
      });

      letterWaitingToBeDestroyed.push(letters[rand]);
     // letters[rand].destroy();
      letters.splice(rand, 1);
      console.log('Dit is de index:' + index);
      if(index === 3){
        setTimeout(function(){
          letterWaitingToBeDestroyed.forEach(letter => {
            letter.destroy();
          });
        }, 300);

        isClearing = false;
      }

      }
    }
  }



  resize(){
    console.log("is resized")
  }

  update(){

  this.scale.resize(1000, 1000); // fixes the bug: setInteractive oonly works when windows is resized once, putting this in create() was advised from forums but didn't work, used update() instead
  // https://phaser.discourse.group/t/problem-with-setinteractive-function/3261
  // https://stackoverflow.com/questions/57247491/problem-with-setinteractive-function-in-phaser-3


    jointPositionsGebruikers.leftEyePos.x += ( jointPositionsGebruikersTarget.leftEyePosTarget.x - jointPositionsGebruikers.leftEyePos.x ) / 10;
    jointPositionsGebruikers.leftEyePos.y += ( jointPositionsGebruikersTarget.leftEyePosTarget.y - jointPositionsGebruikers.leftEyePos.y ) / 10;
    this.leftEyeAvatar.x = jointPositionsGebruikers.leftEyePos.x + 10;
    this.leftEyeAvatar.y = jointPositionsGebruikers.leftEyePos.y;

    jointPositionsGebruikers.leftWristPos.x += ( jointPositionsGebruikersTarget.leftWristPosTarget.x - jointPositionsGebruikers.leftWristPos.x ) / 10;
    jointPositionsGebruikers.leftWristPos.y += ( jointPositionsGebruikersTarget.leftWristPosTarget.y - jointPositionsGebruikers.leftWristPos.y ) / 10;
    this.leftWristAvatar.x = jointPositionsGebruikers.leftWristPos.x;
    this.leftWristAvatar.y = jointPositionsGebruikers.leftWristPos.y;

    jointPositionsGebruikers.leftShoulderPos.x += ( jointPositionsGebruikersTarget.leftShoulderPosTarget.x - jointPositionsGebruikers.leftShoulderPos.x ) / 10;
    jointPositionsGebruikers.leftShoulderPos.y += ( jointPositionsGebruikersTarget.leftShoulderPosTarget.y - jointPositionsGebruikers.leftShoulderPos.y ) / 10;
    this.leftShoulderAvatar.x = jointPositionsGebruikers.leftShoulderPos.x;
    this.leftShoulderAvatar.y = jointPositionsGebruikers.leftShoulderPos.y;

    jointPositionsGebruikers.leftElbowPos.x += ( jointPositionsGebruikersTarget.leftElbowPosTarget.x - jointPositionsGebruikers.leftElbowPos.x ) / 10;
    jointPositionsGebruikers.leftElbowPos.y += ( jointPositionsGebruikersTarget.leftElbowPosTarget.y - jointPositionsGebruikers.leftElbowPos.y ) / 10;
    this.leftElbowAvatar.x = jointPositionsGebruikers.leftElbowPos.x;
    this.leftElbowAvatar.y = jointPositionsGebruikers.leftElbowPos.y;

    jointPositionsGebruikers.leftHipPos.x += ( jointPositionsGebruikersTarget.leftHipPosTarget.x - jointPositionsGebruikers.leftHipPos.x ) / 10;
    jointPositionsGebruikers.leftHipPos.y += ( jointPositionsGebruikersTarget.leftHipPosTarget.y - jointPositionsGebruikers.leftHipPos.y ) / 10;
    this.leftHipAvatar.x = jointPositionsGebruikers.leftHipPos.x;
    this.leftHipAvatar.y = jointPositionsGebruikers.leftHipPos.y;

    jointPositionsGebruikers.leftKneePos.x += ( jointPositionsGebruikersTarget.leftKneePosTarget.x - jointPositionsGebruikers.leftKneePos.x ) / 10;
    jointPositionsGebruikers.leftKneePos.y += ( jointPositionsGebruikersTarget.leftKneePosTarget.y - jointPositionsGebruikers.leftKneePos.y ) / 10;
    this.leftKneeAvatar.x = jointPositionsGebruikers.leftKneePos.x;
    this.leftKneeAvatar.y = jointPositionsGebruikers.leftKneePos.y;

    jointPositionsGebruikers.leftAnklePos.x += ( jointPositionsGebruikersTarget.leftAnklePosTarget.x - jointPositionsGebruikers.leftAnklePos.x ) / 10;
    jointPositionsGebruikers.leftAnklePos.y += ( jointPositionsGebruikersTarget.leftAnklePosTarget.y - jointPositionsGebruikers.leftAnklePos.y ) / 10;
    this.leftAnkleAvatar.x = jointPositionsGebruikers.leftAnklePos.x;
    this.leftAnkleAvatar.y = jointPositionsGebruikers.leftAnklePos.y;



    jointPositionsGebruikers.rightWristPos.x += ( jointPositionsGebruikersTarget.rightWristPosTarget.x - jointPositionsGebruikers.rightWristPos.x ) / 10;
    jointPositionsGebruikers.rightWristPos.y += ( jointPositionsGebruikersTarget.rightWristPosTarget.y - jointPositionsGebruikers.rightWristPos.y ) / 10;
    this.rightWristAvatar.x = jointPositionsGebruikers.rightWristPos.x;
    this.rightWristAvatar.y = jointPositionsGebruikers.rightWristPos.y;

    jointPositionsGebruikers.rightShoulderPos.x += ( jointPositionsGebruikersTarget.rightShoulderPosTarget.x - jointPositionsGebruikers.rightShoulderPos.x ) / 10;
    jointPositionsGebruikers.rightShoulderPos.y += ( jointPositionsGebruikersTarget.rightShoulderPosTarget.y - jointPositionsGebruikers.rightShoulderPos.y ) / 10;
    this.rightShoulderAvatar.x = jointPositionsGebruikers.rightShoulderPos.x;
    this.rightShoulderAvatar.y = jointPositionsGebruikers.rightShoulderPos.y;

    jointPositionsGebruikers.rightElbowPos.x += ( jointPositionsGebruikersTarget.rightElbowPosTarget.x - jointPositionsGebruikers.rightElbowPos.x ) / 10;
    jointPositionsGebruikers.rightElbowPos.y += ( jointPositionsGebruikersTarget.rightElbowPosTarget.y - jointPositionsGebruikers.rightElbowPos.y ) / 10;
    this.rightElbowAvatar.x = jointPositionsGebruikers.rightElbowPos.x;
    this.rightElbowAvatar.y = jointPositionsGebruikers.rightElbowPos.y;

    jointPositionsGebruikers.rightHipPos.x += ( jointPositionsGebruikersTarget.rightHipPosTarget.x - jointPositionsGebruikers.rightHipPos.x ) / 10;
    jointPositionsGebruikers.rightHipPos.y += ( jointPositionsGebruikersTarget.rightHipPosTarget.y - jointPositionsGebruikers.rightHipPos.y ) / 10;
    this.rightHipAvatar.x = jointPositionsGebruikers.rightHipPos.x;
    this.rightHipAvatar.y = jointPositionsGebruikers.rightHipPos.y;

    jointPositionsGebruikers.rightKneePos.x += ( jointPositionsGebruikersTarget.rightKneePosTarget.x - jointPositionsGebruikers.rightKneePos.x ) / 10;
    jointPositionsGebruikers.rightKneePos.y += ( jointPositionsGebruikersTarget.rightKneePosTarget.y - jointPositionsGebruikers.rightKneePos.y ) / 10;
    this.rightKneeAvatar.x = jointPositionsGebruikers.rightKneePos.x;
    this.rightKneeAvatar.y = jointPositionsGebruikers.rightKneePos.y;

    jointPositionsGebruikers.rightAnklePos.x += ( jointPositionsGebruikersTarget.rightAnklePosTarget.x - jointPositionsGebruikers.rightAnklePos.x ) / 10;
    jointPositionsGebruikers.rightAnklePos.y += ( jointPositionsGebruikersTarget.rightAnklePosTarget.y - jointPositionsGebruikers.rightAnklePos.y ) / 10;
    this.rightAnkleAvatar.x = jointPositionsGebruikers.rightAnklePos.x;
    this.rightAnkleAvatar.y = jointPositionsGebruikers.rightAnklePos.y;
    this.graphics.clear();
    this.graphics.fillPoints([
      {
        x: jointPositionsGebruikers.leftShoulderPos.x,
        y: jointPositionsGebruikers.leftShoulderPos.y
      },
      {
      x: jointPositionsGebruikers.rightShoulderPos.x,
      y: jointPositionsGebruikers.rightShoulderPos.y
      },
      {
        x: jointPositionsGebruikers.rightHipPos.x,
        y: jointPositionsGebruikers.rightHipPos.y
      },
      {
        x: jointPositionsGebruikers.leftHipPos.x,
        y: jointPositionsGebruikers.leftHipPos.y
      }], true);

    if(isLive){
      if($liveTitle.textContent === 'live'){

      }else{
        $liveTitle.textContent = 'live';
        $liveSub.textContent = 'op het festival';
        $liveDot.style.display = 'block';
      }

    }else{
       $liveTitle.textContent = 'offline';
       $liveSub.textContent = 'tot later';
       $liveDot.style.display = 'none';
    }
  };


  //woord word gespawned op scherm
  spawnWord() {

    let fallPosition = Phaser.Math.Between(60, widthDivScreen / 4);
    this.splitWord();

    for (letter = 0; letter < split.length; letter++)
    {


      console.log('spawnWord: ' + split[letter]);
      const l = this.matter.add.sprite(fallPosition, 0,  split[letter], 0, {restitution: .5, slop: 1});

      l.setInteractive({useHandCursor: true}).on('pointerdown', () => this.onClickLetter(l));

      console.log(l);
      l.setCollisionGroup(this.group1)
     // l.setCollidesWith(0)

      fallPosition = fallPosition + spacebetween;

      letters.push(l);

    }

  };

  onClickLetter(l){
 if(isClickable){
   console.log(l);
  this.handleLetterArrays(l)
    }
  }

handleLetterArrays(l){
  let foundALetter = false;
  if(lostLetters.includes(l.texture.key)){

    lostLetters.forEach(lostLetter => {
      const index = lostLetters.indexOf(lostLetter);
      if (lostLetter == l.texture.key && foundALetter === false){
        lostLetters.splice(index, 1);
        console.log(lostLetters);
        foundALetter = true;
      }
    });
    foundLetters.push(l.texture.key);
    let foundLetter = document.querySelector(`.challengeLetter--${l.texture.key}`);
    console.log(foundLetter);
    foundLetter.src = `assets/img/alphabet/x0.5/${l.texture.key}.png`;
    foundLetter.classList.add(`letter`)
    foundLetter.classList.add(`foundLetter--${l.texture.key}`)
    foundLetter.classList.remove(`challengeLetter--${l.texture.key}`)
    foundALetter = false;
    //console.log(lostLetters.length);
    //console.log(foundLetters.length);

    if(lostLetters.length <= 0){
      this.handleLetterArrays(l);
      $challengeForm.style.display = "none";
      $haikuForm.style.display = "block";

    }
  };
}

    //de timer is nul dus word een auteurinput gedropt en daarna de timer gereset
    readInAuteurInput() {
      console.log('auteurinput');
      readWord = auteurInput[Math.floor(Math.random() * auteurInput.length)];
      if (readWord!= '') {
        console.log(readWord);
        this.splitWord(readWord);
        this.spawnWord();
        //timer = setInterval(this.readInAuteurInput(), 50000); //timer resetten
        return false;
      }
      else {
        console.log('error auteurinput');
      }
    };

    splitWord (){
      lowercase = readWord.toLowerCase();
      lowercase = lowercase.replace(/\s/g, '');
      split = lowercase.split('');
      console.log('splitWord: ' + split);
    //  letters.push(split);
    };



    makeConnection() {
      socket = io.connect('/');
      socket.on('connect', () => {
        console.log(`Connected: ${socket.id}`);
        socket.emit('requestWords');
        socket.emit('requestFeelings');
        socket.emit('requestHearts');
        socket.emit('requestHighfives');
      });
      socket.on('synchronize', () => {
        letters.forEach(letter => {
            letter.destroy();
            this.matter.world.remove(letter);

        });
        letters = [];
        feelings.forEach(feeling => {
          feeling.destroy();
          this.matter.world.remove(feeling);

      });
      feelings = [];
      });
      socket.on('getWords', words => {
        words.forEach(word => {
          woordje = word;
          this.readInWord();
        })
      });
      socket.on('getFeelings', feelings => {
        feelings.forEach(feeling => {
          this.createFeeling(feeling);
          feelings.push(feeling);
        })
      });
      socket.on('getHeartCount', hearts => {
        heartCount = hearts;
        console.log(heartCount);
        // use in DOM
      });

      socket.on('getHighfiveCount', highfives => {
        highfiveCount = highfives;
        console.log(highfiveCount);
        // use in DOM
      });

      socket.on('message', message => {
        console.log(`Received message: ${message}`);
        console.log(message);
        woordje = message;
        this.readInWord();

      });
      socket.on('live', () => {

        isLive = true;

      });
      socket.on('notLive', () => {

        isLive = false;

      });
      socket.on('shakeAll', () => {

        letters.forEach(letter => {
          letter.setVelocity(20, -30)
        });
        feelings.forEach(feeling => {
          feeling.setVelocity(20, -30)
        });

      });
      socket.on('handShaken', highfives => {
        highfiveCount = highfives;
        console.log(highfiveCount);
        // use in DOM

        const $popupHighfive = document.querySelector(`.popup--highfive`);
        const $highFiveText = $popupHighfive.querySelector(`p`);
        const $highFiveImg = $popupHighfive.querySelector(`img`);
        $highFiveText.textContent = "Je hebt een highfive terug van uit Kortrijk!";
        $popupHighfive.style.animation = "appearAndDisappear 4s ease";
        $popupHighfive.style.opacity = "0";
        $highFiveImg.style.animation = "highFive 4s ease";
        setTimeout(function(){
          $popupHighfive.style.animation = "none";
          $popupHighfive.style.opacity = "0";
          $highFiveImg.style.animation = "none";
         }, 4000);


      });
      socket.on('heartAll', hearts => {
        heartCount = hearts;
        console.log(heartCount);
        // use in DOM

        const hartje = this.matter.add.sprite(200, this.cameras.main.height, 'heart', 0, {restitution: .5, ignoreGravity: true});
        hartje.setCollisionGroup(this.group2);
        hartje.setCollidesWith(0);
        hartje.setVelocityY(-20);
        hartjes.push(hartje);
        console.log(this.group1);
        console.log(this.group2);



      });
      socket.on('handAll', () => {



      });

      socket.on('selectedFeeling', selectedFeeling => {
        this.createFeeling(selectedFeeling);

      });
      socket.on('points', jointPositions => {

        jointPositionsGebruikersTarget.nosePosTarget.x = this.cameras.main.width * jointPositions.nosePos.x;
        jointPositionsGebruikersTarget.nosePosTarget.y = this.cameras.main.height * jointPositions.nosePos.y;

        jointPositionsGebruikersTarget.leftEyePosTarget.x = this.cameras.main.width * jointPositions.leftEyePos.x;
        jointPositionsGebruikersTarget.leftEyePosTarget.y = this.cameras.main.height * jointPositions.leftEyePos.y;

        jointPositionsGebruikersTarget.leftWristPosTarget.x = this.cameras.main.width * jointPositions.leftWristPos.x;
        jointPositionsGebruikersTarget.leftWristPosTarget.y = this.cameras.main.height * jointPositions.leftWristPos.y;

        jointPositionsGebruikersTarget.rightWristPosTarget.x =  this.cameras.main.width * jointPositions.rightWristPos.x;
        jointPositionsGebruikersTarget.rightWristPosTarget.y = this.cameras.main.height * jointPositions.rightWristPos.y;


        jointPositionsGebruikersTarget.leftShoulderPosTarget.x = this.cameras.main.width * jointPositions.leftShoulderPos.x;
        jointPositionsGebruikersTarget.leftShoulderPosTarget.y = this.cameras.main.height * jointPositions.leftShoulderPos.y;

        jointPositionsGebruikersTarget.rightShoulderPosTarget.x =  this.cameras.main.width * jointPositions.rightShoulderPos.x;
        jointPositionsGebruikersTarget.rightShoulderPosTarget.y = this.cameras.main.height * jointPositions.rightShoulderPos.y;


        jointPositionsGebruikersTarget.leftElbowPosTarget.x = this.cameras.main.width * jointPositions.leftElbowPos.x;
        jointPositionsGebruikersTarget.leftElbowPosTarget.y = this.cameras.main.height * jointPositions.leftElbowPos.y;

        jointPositionsGebruikersTarget.rightElbowPosTarget.x =  this.cameras.main.width * jointPositions.rightElbowPos.x;
        jointPositionsGebruikersTarget.rightElbowPosTarget.y = this.cameras.main.height * jointPositions.rightElbowPos.y;


        jointPositionsGebruikersTarget.leftHipPosTarget.x = this.cameras.main.width * jointPositions.leftHipPos.x;
        jointPositionsGebruikersTarget.leftHipPosTarget.y = this.cameras.main.height * jointPositions.leftHipPos.y;

        jointPositionsGebruikersTarget.rightHipPosTarget.x =  this.cameras.main.width * jointPositions.rightHipPos.x;
        jointPositionsGebruikersTarget.rightHipPosTarget.y = this.cameras.main.height * jointPositions.rightHipPos.y;


        jointPositionsGebruikersTarget.leftKneePosTarget.x = this.cameras.main.width * jointPositions.leftKneePos.x;
        jointPositionsGebruikersTarget.leftKneePosTarget.y = this.cameras.main.height * jointPositions.leftKneePos.y;

        jointPositionsGebruikersTarget.rightKneePosTarget.x =  this.cameras.main.width * jointPositions.rightKneePos.x;
        jointPositionsGebruikersTarget.rightKneePosTarget.y = this.cameras.main.height * jointPositions.rightKneePos.y;


        jointPositionsGebruikersTarget.leftAnklePosTarget.x = this.cameras.main.width * jointPositions.leftAnklePos.x;
        jointPositionsGebruikersTarget.leftAnklePosTarget.y = this.cameras.main.height * jointPositions.leftAnklePos.y;

        jointPositionsGebruikersTarget.rightAnklePosTarget.x =  this.cameras.main.width * jointPositions.rightAnklePos.x;
        jointPositionsGebruikersTarget.rightAnklePosTarget.y = this.cameras.main.height * jointPositions.rightAnklePos.y;
      });

      if($introForm){
        $btnOntdek.addEventListener('click', e => this.handleClickOntdek(e));

        if (window.innerWidth <= 1000 && window.innerWidth >= 500) {
          $introForm.style.display = `none`;
          $wordForm.style.display = `block`;
        }
        else {
          $wordForm.style.display = `none`;
        }
        //$btnOntdek.addEventListener('touch', e => this.handleClickOntdek(e));
        //document.querySelector(`canvas`).style.height = "100vh";
      }

      if($wordForm){
        $wordForm.noValidate = true;
        console.log("wordform")
        const $enteredWord = $wordForm.querySelector(`.enteredWord`);
        $wordForm.addEventListener('submit', e => this.handleSubmitMessage(e, $wordForm));
        $enteredWord.addEventListener('input', e => this.handeInputField(e, $wordForm))
      }
      if($feelingsForm){
        $feelingsForm.noValidate = true;
        $feelingsForm.addEventListener('submit', e => this.handleSubmitFeeling(e));
        $feelingOptions.forEach(field => {
          field.addEventListener('input', e => this.handeInputField(e, $feelingsForm))
        });
        //document.querySelector(`.btn-next--emotion`).addEventListener('click', e => this.handleClickNextEmotion(e))
      }
      if($btnSchud){
        $btnSchud.addEventListener('click', e => this.handleClickSchud(e));
        //$btnSchud.addEventListener('touch', e => this.handleClickSchud(e));
      }
      if($btnHartje){
        $btnHartje.addEventListener('click', e => this.handleClickHartje(e));
        //$btnHartje.addEventListener('touch', e => this.handleClickHartje(e));
      }
      if($btnHand){
        $btnHand.addEventListener('click', e => this.handleClickHand(e));
        //$btnHand.addEventListener('touch', e => this.handleClickHand(e));
      }

    };

    createFeeling(feeling){
      let fallPosition = Phaser.Math.Between(60, this.cameras.main.width);
      let rand = Math.floor(Math.random()*4);
      switch(feeling){
        case "somber": this.feeling = this.matter.add.sprite(fallPosition, 0, `somber${rand.toString()}`, 0, {restitution: .5});break;
        case "giechelig": this.feeling = this.matter.add.sprite(fallPosition, 0, `quirky${rand.toString()}`, 0, {restitution: .5});break;
        case "blij": this.feeling = this.matter.add.sprite(fallPosition, 0, `happy${rand.toString()}`, 0, {restitution: .5});break;
        case "afgemat": this.feeling = this.matter.add.sprite(fallPosition, 0, `tired${rand.toString()}`, 0, {restitution: .5});break;

      }
      feelings.push(this.feeling);
      console.log(feelings)
    }

    handleClickOntdek(e){
      $introForm.style.display = "none";
      $wordForm.style.display = "block";
    }

    showValidationInfo($field) {
      let message;
      if ($field.validity.valueMissing) {
        message = `Je moet een woord ingeven om door te gaan`;
      }
      if ($field.validity.typeMismatch) {
        message = `Type not right`;
      }
      if ($field.validity.rangeOverflow) {
        const max = $field.getAttribute(`max`);
        message = `Too big, max ${max}`;
      }
      if ($field.validity.rangeUnderflow) {
        const min = $field.getAttribute(`min`);
        message = `Too small, min ${min}`;
      }
      if ($field.validity.tooShort) {
        message = `Het woord moet minimum 2 characters bevatten`;
      }
      if ($field.validity.tooLong) {
        message = `Het woord mag maximaal 20 characters bevatten`;
      }
      if ($field.validity.patternMismatch) {
        message = `Gebruik enkel letters van het alfabet (a-z)`;
      }
      if (message) {
        $field.parentElement.parentElement.querySelector(`.error`).textContent = message;
      }
      console.log(message)
    };

    handleClickNextEmotion(e){
      isClickable = true;
    }

    handeInputField(e, form){
      const field = e.currentTarget;

      console.log(field.value);

      if (!form.checkValidity()) {
        this.showValidationInfo(field);
       } else {
         form.querySelector(`.error`).textContent = "";
       // field.parentElement.querySelector(`.error`).textContent = ""
       }
       if(forbiddenWordsEn.includes(field.value) || forbiddenWordsNl.includes(field.value) || forbiddenWordsFr.includes(field.value) || forbiddenWordsDe.includes(field.value)) {
        form.querySelector(`.error`).textContent = "Deze woorden worden niet toegelaten";
      }
        /*
       if(form === $feelingsForm){
         const pic = field.parentElement.querySelector(`.${field.value}`)
         pic.style.backgroundImage = 'url(../assets/img/emotics/happyco.png)';
         pic.style. backgroundPosition = 'bottom right';
       }
       */

    }

    handleSubmitMessage = (e, form) => {
       e.preventDefault();
       const field = $wordForm.querySelector(`.enteredWord`);
       if (!$wordForm.checkValidity()) {


       this.showValidationInfo(field)

       // $wordForm.querySelector(`.error`).innerHTML = `Some errors occured`;
      }
      else {

        if(forbiddenWordsEn.includes(field.value) || forbiddenWordsNl.includes(field.value) || forbiddenWordsFr.includes(field.value) || forbiddenWordsDe.includes(field.value)) {
          form.querySelector(`.error`).textContent = "Deze woorden worden niet toegelaten";
        }
        else {
          if (window.innerWidth <= 1000 && window.innerWidth >= 500) {
            $introForm.style.display = `none`;
            $wordForm.style.display = `block`;
            $feelingsForm.style.display = "none";
          }
          else {
            $wordForm.style.display = "none";
            $feelingsForm.style.display = "block";
          }
        console.log(field.value)
        socket.emit('message', field.value);
        //socket.emit('messages', messages);
        //socket.emit('points', points);
        field.value = '';
        console.log(`Form is valid => submit form`);
        }
      }


    }
    handleSubmitFeeling = e => {
      e.preventDefault();
      if (!$feelingsForm.checkValidity()) {
        $feelingsForm.querySelector(`.error`).innerHTML = `Selecteer één emotie om verder te gaan`;

       } else {
        isClickable = true;
        console.log(isClickable);
        $feelingsForm.style.display = "none";
        $challengeForm.style.display = "block";
        $feelingOptions.forEach(option => {
          if(option.checked){
            selectedFeeling = option.value;
          }
        });
        memootjes.forEach(memootje => {

          if(Array.isArray(memootje.forEmotions)){
            memootje.forEmotions.forEach(forEmotion => {

               if(forEmotion === selectedFeeling){

                 memootjesEmotion.push(memootje);
               }
            });
          }else{

            if(memootje.forEmotions === selectedFeeling){
              memootjesEmotion.push(memootje);
            }
          }


         });
         console.log(memootjesEmotion);
         let rand;
         if(memootjesEmotion.length === 1){
          rand = 0;
         }else{
          //rand = Math.floor(Math.random(memootjesEmotion.length - 1)*2);
          rand = Math.floor(Math.random()* (memootjesEmotion.length - 1));
         }


         console.log(rand);

         // call facebook share with data
         /*this.shareOverrideOGMeta({
          link: 'https://www.google.com',
          image: 'https://www.google.com',
          caption: 'Reference info',
          description: memootjesEmotion[rand].text
          });*/

         $haiku.textContent = memootjesEmotion[rand].text;
         $auteurName.textContent = memootjesEmotion[rand].author;
         $auteurSocials.innerHTML = memootjesEmotion[rand].linkText;
         $auteurSocials.href = memootjesEmotion[rand].link;

         const $challengeWord = document.querySelector(`.wordForm__challenge`);

          let challengeword = memootjesEmotion[rand].keyword.toLowerCase();

          challengeword = challengeword.split('');
          challengeword.forEach(letter => {
            lostLetters.push(letter);
            const letterImg = document.createElement('img');
            letterImg.classList.add(`letter`);
            letterImg.classList.add(`challengeLetter--${letter}`)
            letterImg.src = `assets/img/alphabet/x0.5/noFill/${letter}.png`;
            $challengeWord.appendChild(letterImg);
          });
          socket.emit('feeling', selectedFeeling);
          console.log(`Form is valid => submit form`);
       }
   }


 shareOverrideOGMeta(data)
{
	FB.ui({
		method: 'share_open_graph',
		action_type: 'og.likes',
		action_properties: JSON.stringify({
			object: {
				'og:url': data.overrideLink,
				'og:title': data.overrideTitle,
				'og:description': data.overrideDescription,
				'og:image': data.overrideImage
			}
		})
	},
	function (response) {
	// Action after response
	});
}

   handleClickHand = e => {

    if(isHandClickable === false){

    }
    else{
      const $popupHighfive = document.querySelector(`.popup--highfive`);
      const $highFiveText = $popupHighfive.querySelector(`p`);
      const $highFiveImg = $popupHighfive.querySelector(`img`);

      $highFiveText.textContent = "Je high five is verstuurd!";
      $popupHighfive.style.animation = "appearAndDisappear 4s ease";
      $popupHighfive.style.opacity = "0";
      $highFiveImg.style.animation = "highFive 4s ease";
      setTimeout(function(){
        $popupHighfive.style.animation = "none";
        $popupHighfive.style.opacity = "0";
        $highFiveImg.style.animation = "none";
       }, 4000);

      $timer.classList.add('timer');
      socket.emit('hand');
     // const fallPositionX = Phaser.Math.Between(60, this.cameras.main.height - 60);
    //  const fallPositionY = Phaser.Math.Between(60, this.cameras.main.width - 60);
    //  const hand = this.matter.add.sprite(fallPositionX, fallPositionY, 'hand', 0, {restitution: .5, ignoreGravity: true});
      isHandClickable = false;
      if(isHandClickable === false){
        setTimeout(function(){
          $timer.classList.remove('timer');
          isHandClickable = true;
         }, 5000);
      }
    }
   }

   handleClickSchud = e => {


    if(isShakeClickable === false){

    }else{
      const $timer = $btnSchud.querySelector(`.timer--schud`);
      $timer.classList.add('timer');
      socket.emit('schud');
      console.log('schud')
      console.log(letters)
      isShakeClickable = false;
      if(isShakeClickable === false){
        setTimeout(function(){
          $timer.classList.remove('timer');
          isShakeClickable = true;
         }, 5000);
      }
    }



   }

   handleClickHartje = e => {
    if(isHeartClickable === false){

    }else{
      const $timer = $btnHartje.querySelector(`.timer--hart`);
      $timer.classList.add('timer');
      socket.emit('hartje');
      console.log('hartje')
      isHeartClickable = false;
      if(isHeartClickable === false){
        setTimeout(function(){
          $timer.classList.remove('timer');
          isHeartClickable = true;
         }, 5000);
      }

    }
   }


  spawnLetters() {

    let fallPosition = Phaser.Math.Between(20, widthDivScreen / 2);

    for (let startOffLetters = 0; startOffLetters < letters.length; startOffLetters++)
    {
      console.log('spawnLetters: ' + letters[startOffLetters]);
      letters[startOffLetters] = this.matter.add.sprite(fallPosition, 0, letters[startOffLetters], 0, {restitution: .5});



      fallPosition = fallPosition + spacebetween;
      console.log(fallPosition);
    }
    console.log('start letters are dropped');
  };

       //indien een woord werd ingegeven word het woord ingelezen gesplits en erna gespawend
   readInWord (){
    readWord = woordje;
    if (readWord!= '') {
      console.log(readWord);
      //this.splitWord(readWord);
      this.spawnWord();
      console.log(letters);
      //timer = setInterval(this.readInAuteurInput(), 50000); //timer resetten
    }
    else {
      console.log('niks ingegeven');

    }
  };
/*
   // Initialize and add the map
   initMap() {
    // The location of Uluru
    const uluru = { lat: 50.829, lng: 3.271 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }
*/

}
