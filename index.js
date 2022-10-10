const { Client, GatewayIntentBits } = require("discord.js");
const jimp = require("jimp");
const request = require('request');
const fs = require('fs');

const webp = require('webp-converter');

webp.grant_permission();

const download = function (uri, filename, callback) {
  request.head(uri, async function (err, res, body) {
    await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.on("ready", () => {
  console.log(`${client.user.tag} está no ar!`)
});

client.on("guildMemberAdd", async (member) => {
  const url = await member.displayAvatarURL();
  
  download(url, 'avatar.png', async () => {
    await webp.dwebp("avatar.png", "avatar.jpg", "-o", logging = "-v");

    let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    let mask = await jimp.read('mascara.png');
    let fundo = await jimp.read('fundo.png');
    let avatar = await jimp.read('avatar.jpg');

    avatar.resize(130, 130)
    mask.resize(130, 130)
    avatar.mask(mask)

    fundo.print(fonte, 170, 175, member.user.username)
    fundo.composite(avatar, 40, 90).write('bemvindo.png')

    member.guild.channels.cache.get('1014354557008093296').send({ content: `teste <br> teste`, files: ["bemvindo.png"] });

  });

})

client.login("ODg2NDg0MjI2MzMyMDMzMDg0.GXAJBn.Hq2-IICEDvue0pynjSiYw0r50uGew_oRJRDYbw");