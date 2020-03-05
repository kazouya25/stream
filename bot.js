const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://hypegroup.glitch.me/`);
}, 280000);

//======================================[Const]======================================
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client();
const ms = require("ms");
const fs = require('fs');
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');
const r1 = require('snekfetch');
const Canvas = require("canvas");
const jimp = require('jimp')
const weather = require('weather-js');
const pretty = require("pretty-ms");

const prefix = "*";

  
//======================================[Client]======================================


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
   client.user.setActivity("Hype Group 🔰",{type: 'WATCHING'})
});

client.on('guildMemberAdd', member=> {
  var guild = '471426842667253761';
    member.addRole(member.guild.roles.find("name","Os ,"));
    });
    
    client.on('message', function(message) {
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        var iiMo = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('``` New Dm Mesage ```')
            .setThumbnail(`${message.author.avatarURL}`)
            .setDescription(`\n\n\`\`\`${message.content}\`\`\``)
            .setFooter(`From : (@${message.author.tag})  |  (${message.author.id})`)
        client.channels.get("683188057721012226").send({ embed: iiMo });
    }
});
    
//======================================[Owners]======================================


const developers = ["470712192329711628","516364281990611006","538429283157409803"]
const admin = "#";

client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
      
  if (message.content.startsWith(admin + 'ply')) {
    client.user.setGame(argresult);
      message.channel.send(`**✅   ${argresult}**`)
  }  else  
  if (message.content.startsWith(admin + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith(admin + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith(admin + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/HypeGroup");
      message.channel.send(`**✅**`)
  }
  if (message.content.startsWith(admin + 'setname')) {
      client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
      return message.reply("**لا تستطيع تغير الأسم الا بعد ساعتين**");
} else
if (message.content.startsWith(admin + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});  


//======================================[ Log ]======================================

  client.on('messageUpdate', (message, newMessage) => {
    if (message.content === newMessage.content) return;
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'log');
    if (!channel) return;
 
    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('BLACK')
       .setDescription(`✏ **Message Editing
Sent By : <@${message.author.id}>                                                                                                                         Edit In :** <#${message.channel.id}>\n\nOld :\n \`${message.cleanContent}\`\n\nNew :\n \`${newMessage.cleanContent}\``)
       .setTimestamp();
     channel.send({embed:embed});
 
 
});
 
client.on('guildMemberAdd', member => {
    if (!member || !member.id || !member.guild) return;
    const guild = member.guild;
   
    const channel = member.guild.channels.find('name', 'log');
    if (!channel) return;
    let memberavatar = member.user.avatarURL
    const fromNow = moment(member.user.createdTimestamp).fromNow();
    const isNew = (new Date() - member.user.createdTimestamp) < 900000 ? '🆕' : '';
   
    let embed = new Discord.RichEmbed()
       .setAuthor(`${member.user.tag}`, member.user.avatarURL)
       .setThumbnail(memberavatar)
       .setColor('GREEN')
       .setDescription(`📥 <@${member.user.id}> **Joined To The Server**\n\n`)
       .setTimestamp();
     channel.send({embed:embed});
});
 
client.on('guildMemberRemove', member => {
    if (!member || !member.id || !member.guild) return;
    const guild = member.guild;
   
    const channel = member.guild.channels.find('name', 'log');
    if (!channel) return;
    let memberavatar = member.user.avatarURL
    const fromNow = moment(member.joinedTimestamp).fromNow();
   
    let embed = new Discord.RichEmbed()
       .setAuthor(`${member.user.tag}`, member.user.avatarURL)
       .setThumbnail(memberavatar)
       .setColor('RED')
       .setDescription(`📤 <@${member.user.id}> **Leave From Server**\n\n`)
       .setTimestamp();
     channel.send({embed:embed});
});
 
client.on('messageDelete', message => {
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'log');
    if (!channel) return;
   
    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('BLACK')
       .setDescription(`🗑️ **Deleted Message**
**Sent By : <@${message.author.id}>                                                                                                                        Deleted in :** <#${message.channel.id}>\n\n \`${message.cleanContent}\``)
       .setTimestamp();
     channel.send({embed:embed});
 
});

     
      client.on("roleDelete", role => {
  client.setTimeout(() => {
    role.guild.fetchAuditLogs({
        limit: 1,
        type: 30
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username)
        try {

          let log = role.guild.channels.find('name', 'log');
          if (!log) return;
          let embed = new Discord.RichEmbed()
            .setColor('#fd0101')            
            .setTitle('❌ RoleDeleted')
            .addField('Role Name', role.name, true)
            .addField('Role ID', role.id, true)
            .addField('By', exec, true)
            .setTimestamp()
          log.send(embed).catch(e => {
            console.log(e);
          });
        } catch (e) {
          console.log(e);
        }
      })
  }, 1000)
})


client.on('roleCreate', role => {
  client.setTimeout(() => {
    role.guild.fetchAuditLogs({
        limit: 1,
        type: 30
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username)
        try {

          let log = role.guild.channels.find('name', 'log');
          if (!log) return;
          let embed = new Discord.RichEmbed()
            .setTitle('➕ RoleCreated')
            .addField('Role Name', role.name, true)
            .addField('Role ID', role.id, true)
            .addField('By', exec, true)
            .setTimestamp()
          log.send(embed).catch(e => {
            console.log(e);
          });
        } catch (e) {
          console.log(e);
        }
      })
  }, 1000)
})




  client.on("guildBanAdd", (guild, member) => {
  client.setTimeout(() => {
    guild.fetchAuditLogs({
        limit: 1,
        type: 22
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username);
        try {
          let log = guild.channels.find('name', 'log');
          if (!log) return;
          client.fetchUser(member.id).then(myUser => {
          let embed = new Discord.RichEmbed()
        .setAuthor("Ban Added")
	    .setColor("BLACK")
        .setThumbnail(myUser.avatarURL)
        .addField('# Banned User:',`**${myUser.username}**`,true)
        .addField('# Banned By:',`**${exec}**`,true)
        .setFooter(myUser.username,myUser.avatarURL)
            .setTimestamp();
          log.send(embed).catch(e => {
            console.log(e);
          });
          });
        } catch (e) {
          console.log(e);
        }
      });
  }, 1000);
});



    client.on("guildBanRemove", (guild, member) => {
  client.setTimeout(() => {
    guild.fetchAuditLogs({
        limit: 1,
        type: 22
      })
      .then(audit => {
        let exec = audit.entries.map(a => a.executor.username);
        try {
          let log = guild.channels.find('name', 'log');
          if (!log) return;
          client.fetchUser(member.id).then(myUser => {
          let embed = new Discord.RichEmbed()
        .setAuthor("Ban revoked !")
		.setColor("BLACK")
		 .setThumbnail(myUser.avatarURL)
        .addField('# Banned User',`**${myUser.username}**`,true)
        .addField('# Revoked By',`**${exec}**`,true)
        .setFooter(myUser.username,myUser.avatarURL)
            .setTimestamp();
          log.send(embed).catch(e => {
            console.log(e);
          });
          });
        } catch (e) {
          console.log(e);
        }
      });
  }, 1000);
});


//======================================[ WelCome ]======================================


client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find('name', 'chatt');
  
    const millis = new Date().getTime() - member.user.createdAt.getTime();
    const now = new Date();
    const createdAt = millis / 1000 / 60 / 60 / 24;




  
    const embed = new Discord.RichEmbed()
    
    .setColor("BLACK")
    .setDescription(`**تاريخ دخولك للدسكورد منذ ${createdAt.toFixed(0)} يوم**`)
    .setAuthor(member.user.tag, member.user.avatarURL);
    channel.sendEmbed(embed);

  
});


const { readFile, readFileSync } = require('fs-nextra');

const cnvs = require("canvas");
const { get } = require('snekfetch');
const inv = JSON.parse(fs.readFileSync("./userD.json", "UTF8"))
const invs = JSON.parse(fs.readFileSync("./invites.json", "UTF8"))
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
    wait(1000);

    client.guilds.forEach(g => {
        if (g.members.get(client.user.id).hasPermission("MANAGE_GUILD"))
            g.fetchInvites().then(guildInvites => {
                invs[g.id] = guildInvites;
            });
    });
});

client.on('guildMemberAdd', member => {
    member.guild.fetchInvites().then(guildInvites => {
        const ei = invs[member.guild.id];
        invs[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        const inviter = client.users.get(invite.inviter.id);
        inv[member.user.id + member.guild.id].inviter = invite.inviter.id;
        fs.writeFile("./invites.json", JSON.stringify(inv), function (err) {
            if (err) throw err;
        });
    });
});

client.on('message', async message => {
    if (message.content.startsWith(prefix + "id")) {
        let mem = message.mentions.members.first() || message.member;
        let auth = message.mentions.users.first() || message.author;
        const imageUrlRegex = /\?size=2048$/g;
        const name = mem.displayName.length > 10 ? mem.displayName.substring(0, 11) + "..." : mem.displayName;

        const {
            body: ava
        } = await get(auth.displayAvatarURL.replace(imageUrlRegex, "?size=128"));

        const img = await readFile("./id_1.png");
        const millis = new Date().getTime() - auth.createdAt.getTime();
        const now = new Date();
        const createdAt = millis / 1000 / 60 / 60 / 24;
        const millisj = new Date().getTime() - mem.joinedAt.getTime();
        const nowj = new Date();
        const joinedAt = millisj / 1000 / 60 / 60 / 24;

        if (!inv[mem.id + message.guild.id]) inv[mem.id + message.guild.id] = {
            inviter: "Not stored in database",
            totalSecs: 0
        }

        fs.writeFile("./userD.json", JSON.stringify(inv), function (err) {
            if (err) throw err;
        });
        // Invites
        const guildInvites = await message.guild.fetchInvites();
        let invites = 0;
        guildInvites.forEach(i => {
            if (i.inviter.id === auth.id) {
                invites += i.uses;
            }
        }) // اصلا البوت معاه انفايتات؟؟؟؟

        let inviter = client.users.get(inv[mem.id + message.guild.id].inviter);

        const {
            body: bot
        } = await get(message.guild.iconURL.replace(imageUrlRegex, "?size=128"));
        let cnvs = require("canvas-constructor");
        let canvas = new cnvs.Canvas(417, 181)
        canvas.addImage(img, 0, 0, 417, 181)
        canvas.addRoundImage(bot, 7, 1, 29, 29, 25)
        canvas.setShadowColor("rgba(22, 22, 22, 1)") // This is a nice colour for a shadow.
        canvas.setShadowOffsetY(3) // Drop the shadow by 5 pixels.
        canvas.setShadowBlur(  3) // Blur the shadow by 10.
        canvas.save()
            .addRoundImage(ava, 320, 55, 78, 78, 39)
            .setTextAlign("center")
            .setTextFont("8pt Cairo")
        canvas.setColor((mem.highestRole.hexColor === "#000000") ? "#ffffff" : mem.highestRole.hexColor)
        canvas.addText(name, 360, 162)
        canvas.setColor("#FFFFFF")
        canvas.addText(createdAt.toFixed(), 192, 77)
        canvas.addText((joinedAt.toFixed().length >= 3) ? joinedAt.toFixed() : joinedAt.toFixed() + " يوم", 257.5, 77)
        canvas.addText("0", 195, 130)
        canvas.addText("0", 258, 130)
        canvas.addText(`${inv[mem.id+message.guild.id].totalSecs} ثانية`, 205, 163)
        canvas.addText((invites === 1 || invites === 0) ? invites + " عضو" : invites + " أعضاء", 120, 128)
        canvas.addText((inviter) ? inviter.username : "لم يتم تحديدة", 110, 77)
        if (inviter) {
            const {
                body: buffer
            } = await get(inviter.avatarURL.replace(imageUrlRegex, "?size=128"))

            canvas.addRoundImage(buffer, 14, 59, 30, 30, 15)

        }

        //.addText("Joined at: ", 120, 100)
        message.channel.send({
            file: canvas.toBuffer()
        })
    }
})




client.on("guildMemberAdd", (member) => {
    let channel = member.guild.channels.get("683188512333234186");
    if (!channel) {
        console.log("!the channel id it's not correct");
        return;
    }
    if (member.id == client.user.id) {
        return;
    }
    console.log('-');
    			 	         var currentTime = new Date(),
		  hours = currentTime.getHours() + 4 ,
          hours2 = currentTime.getHours() + 1 ,             
		   minutes = currentTime.getMinutes(),             
		   seconds = currentTime.getSeconds(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();
             if(hours2 > 12) {
               hours2 -= 12;
            } else if(hours2 == 0) {
                hours2 = "12";
            
            }  
            var suffix = 'AM';
            if (hours >= 12) {
                suffix = 'PM';
                hours = hours - 12;	
            }
            if (hours == 0) {
                hours = 12;
            }
         var ee = member.user;
    var guild;
    while (!guild)
        guild = client.guilds.get("662400157668605953");
    guild.fetchInvites().then((data) => {
        data.forEach((Invite, key, map) => {
            var Inv = Invite.code;
            if (dat[Inv])
                if (dat[Inv] < Invite.uses) {
 channel.send(`- Invited By : ${Invite.inviter} `) ;         
 }
            dat[Inv] = Invite.uses;
       
       });
    });
});


client.on('guildMemberAdd', member => {
var Canvas = require('canvas') //npm i canvas
var jimp = require('jimp') //npm i jimp

        let Image = Canvas.Image,
            canvas = new Canvas(366 , 160),
            
            ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        fs.readFile(`welc.png`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 366 , 160);

})

                let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);

                        

                        //ur name
                        ctx.font = '20px Arial';
                        ctx.fontSize = '20px';
                        ctx.fillStyle = "#ffffff";
                        ctx.textAlign = "center";
                        ctx.fillText(member.user.username, 255, 110); //shows username!

                        
                        
                        //Avatar
                                               //Avatar
                        let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
ctx.arc(98, 85, 70, 0, Math.PI*2);
ctx.closePath();
                                 ctx.clip();
                                 ctx.drawImage(ava, 8, 8, 173, 173);
                                                //wl
                     
member.guild.channels.get('471426842667253763').sendFile(canvas.toBuffer());




})
})

});
  
  
//======================================[Commands]======================================
  
  
  client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

    if(command === "clear") {
        const emoji = client.emojis.find("name", "wastebasket")
    let textxt = args.slice(0).join("");
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    if (textxt == "") {
        msg.delete().then
    msg.channel.send("Error : `` Type a Value To Delete ``").then(m => m.delete(3000));
} else {
    msg.delete().then
    msg.delete().then
    msg.channel.bulkDelete(textxt);
        msg.reply("Cleared : ``" + textxt + "``").then(m => m.delete(3000));
        }    
    }
}
});

client.on('message', message => {
    if (message.content.startsWith( prefix + "avatar")) {
        if(message.author.bot) return;
        if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
        var mentionned = message.mentions.users.first();
    var x5bzm;
      if(mentionned){
          var x5bzm = mentionned;
      
        const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setImage(`${x5bzm.avatarURL}`)
        .addField('Requested By:', message.author.tag)
      message.channel.sendEmbed(embed);
      }
    }
});
client.on('message', message => {
    if (message.content.startsWith( prefix + "avatar")) {
        if(message.author.bot) return;
        if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
        var mentionned = message.mentions.users.first();

 if (mentionned) return;
          var x5bzm = message.author;
      
        const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setImage(`${x5bzm.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});

client.on('message', message => {
    if(message.content === prefix + 'guild'){
            const millis = new Date().getTime() - message.member.user.createdAt.getTime();
    const now = new Date();
    const createdAt = millis / 1000 / 60 / 60 / 24;
    var heg = message.guild;

        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField('GuidlOwner',message.guild.owner,true)
        .addField('Guild ID', message.guild.id,true)
        .addField('Guild MemberCount', `${message.guild.memberCount}`+` [Online : ${message.guild.members.filter(m=>m.presence.status == 'online').size}]`)
        .addField('Guild Channels',`\`🔊\` ${message.guild.channels.filter(m => m.type === 'text').size} | `+`\`#\`${message.guild.channels.filter(m => m.type === 'voice').size} `)
        .addField('Guild RolesCount',` ${message.guild.roles.size} `,true)
        .addField('Created',`\`${moment(heg.createdTimestamp).fromNow()}\`` ,true)
        .addField('Guild Region',message.guild.region,true)
        
        
        message.channel.send(embed)
    }
})

client.on('message', message => {
    if (message.content.startsWith(prefix + "stats")) {
               if(message.author.bot) return;
        if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
    message.channel.send({
        embed: new Discord.RichEmbed()
            .setColor('BLACK')
            .addField('Ping' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
            .addField('RAM Usage', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true)
            .addField('ID' , `[ ${client.user.id} ]` , true)
            .addField('Prefix' , `[ ${prefix} ]` , true)
            
    })
}
});
      
const arraySort = require('array-sort'),
table = require('table');
client.on('message' , async (message) => {

    if(message.content.startsWith(prefix + "invites")) {
                 if(message.author.bot) return;
        if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');

  var invites = await message.guild.fetchInvites();

    invites = invites.array();

    arraySort(invites, 'uses', { reverse: true });

    let possibleInvites = ['User Invited |  Uses '];
    invites.forEach(i => {
        if (i.uses === 0) { 
            return;
            
        }
      possibleInvites.push(['\n\ ' +'<@'+ i.inviter.id +'>' + '  :  ' +   i.uses]);
       
      if (i.uses === 20) {
          message.member.addRole(message.member.guild.roles.find("name","💠 Level 20"));
      }
     
    })
    
    const embed = new Discord.RichEmbed()
    .setColor('BLACK')
    .addField("Top Invites." ,`${(possibleInvites)}`)

    message.channel.send(embed)
    }
});

client.on('message', message => {
         if(message.content === prefix + "قفل") {
                             if(!message.channel.guild) return 
  
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **على كيف امك هي ؟*');
                message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: false
  
                }).then(() => {
                    message.reply("> ** تم قفل الشات :lock: **")
                });
                  }
      if(message.content === prefix + "فتح") {
                          if(!message.channel.guild) return 
  
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**على كيف امك هي ؟**');
                message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: true
  
                }).then(() => {
                    message.reply("> ** تم فتح الشات :unlock:  **")
                });
      }
         
});

const top = JSON.parse(fs.readFileSync("top.json", "UTF8"));
 
function save() {
    fs.writeFileSync("./top.json", JSON.stringify(top, null, 4));
}
client.on("voiceStateUpdate", async function(oldMember, newMember) {
    if (newMember.user.bot) return;
    if (!top[newMember.guild.id]) top[newMember.guild.id] = {};
    if (!top[newMember.guild.id][newMember.user.id]) top[newMember.guild.id][newMember.user.id] = {
        "text": 0,
        "voice": parseInt(Math.random()*10),
        "msgs": 0,
        "id": newMember.user.id
    }
    save();
    if (!oldMember.voiceChannel && newMember.voiceChannel) {
        var addXP = setInterval(async function () {
            top[newMember.guild.id][newMember.user.id].voice+=parseInt(Math.random()*4);
            save();
            if (!newMember.voiceChannel) {
                clearInterval(addXP);
            }
        }, 60000);
    }
});
client.on("message", async function (message) {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!top[message.guild.id]) top[message.guild.id] = {};
    if (!top[message.guild.id][message.author.id]) top[message.guild.id][message.author.id] = {
        "text": parseInt(Math.random()*10),
        "voice": 1,
        "msgs": 0,
        "id": message.author.id
    }
    if (top[message.guild.id][message.author.id].msgs > 10) {
        top[message.guild.id][message.author.id].text += parseInt(Math.random()*4);
        top[message.guild.id][message.author.id].msgs = 0;
    }
    save();
    var args = message.content.split(" ");
    var cmd = args[0].toLowerCase();
    if (!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "top text")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 10).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: ${user.text} **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()
            .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
  .setColor("13B813")
        .addField(`**:speech_balloon: | TEXT LEADERBOARD**`, `${textStr}   \n\n **✨ | For More: ${prefix}top text**`, true)  
        .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            message.channel.send({
                embed: embed
            });
  } else {
    if(message.content.startsWith(prefix + "top voice")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 10).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: ${user.voice}**`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()
            .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
  .setColor("13B813")
        .addField(`**:microphone2: | VOICE LEADERBOARD**`, `${voiceStr}   \n\n **:sparkles: More?** ${prefix}top voice`, true)
 
        .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()  
            message.channel.send({
                embed: embed
            });
  } else {
       if(message.content.startsWith(prefix + "top")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 5).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: ${user.text} **`
                }
            }).join("\n")}`;
            num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 5).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: ${user.voice} **`
                }
            }).join("\n")}`;
            const more1 = "**:sparkles: More? `"+prefix+"top text`**";
            const more2 = "**:sparkles: More? `"+prefix+"top voice`**";
            var embed = new Discord.RichEmbed()  
            .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
            .addField("**TOP 5 TEXT :speech_balloon:**", `${textStr}    \n\n ${more1}`, true)
            .addField("**TOP 5 VOICE :microphone2:**", `${voiceStr}   \n\n ${more2}`, true)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setColor("13B813");
            message.channel.send({
                embed: embed
           
 
            });
        }
  }
  }
});

let newsjson = JSON.parse(fs.readFileSync("./news.json", "utf8"))
client.on('message', message => {
    let news = message.content.split(" ").slice(1).join(" ")
    if(message.content.startsWith(prefix + 'setnews')) {
          if(!news) return message.channel.send(`❌ | Please Write The News For Example: ${prefix}setnews fix bugs`)
           newsjson[client.user.id] = {
            new: news,
           }
           message.channel.send(`✅ | Done The Bot News Has Been Updated !`)
        }
    if(message.content.startsWith( prefix + 'news')) {
        if(!newsjson[client.user.id]) newsjson[client.user.id] = {
            new: 'nothing'
        }
        let embed = new Discord.RichEmbed()
        .setTitle(`📰 | ${message.guild.name} Latest News :`)
        .setDescription(`${newsjson[client.user.id].new}`)
        .setTimestamp()
        .setFooter(`Requested By ${message.author.username}`)
           message.channel.sendEmbed(embed)
        }
        fs.writeFile("./news.json", JSON.stringify(newsjson), (err) => {
        })
})


client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "color")) {
    if (!message.channel.guild)
      return message.channel
        .send("**هذا الأمر فقط للسيرفرات**")
        .then(m => m.delete(5000));
    message.channel.sendFile(`https://cdn.discordapp.com/attachments/647452214776037386/655398668236619777/PicsArt_12-14-04.19.57.jpg`).then(msg => {
      msg.react("⬛").then(r => {
        msg.react("🟥").then(r => {
          msg.react("🟨").then(r => {
            msg.react("🟩").then(r => { 
              msg.react("🟪").then(r => {
              msg.react("⬜").then(r => {
              msg.react("🟧").then(r => {
              msg.react("💠").then(r => {
                msg.react("🍏").then(r => {
                  msg.react("💩").then(r => {
                    msg.react("🧧").then(r => {
                            msg.react("❌").then(r => {
                              let activeFilter = (reaction, user) =>
                                reaction.emoji.name === "⬛" &&
                                user.id === message.author.id;

                              let active = msg.createReactionCollector(
                                activeFilter,
                                { time: 15000 }
                              );

                              //red
                              active.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Black")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#000000")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأسود**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              //لون اسود

                              let y1Filter = (reaction, user) =>
                                reaction.emoji.name === "🟥" &&
                                user.id === message.author.id;

                              let y1 = msg.createReactionCollector(y1Filter, {
                                time: 15000
                              });

                              //t
                              y1.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "D-Red")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#FF0000")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأحمر الغامق**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              //لون احمر
                              let y2Filter = (reaction, user) =>
                                reaction.emoji.name === "🟨" &&
                                user.id === message.author.id;

                              let y2 = msg.createReactionCollector(y2Filter, {
                                time: 15000
                              });

                              y2.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Yellow")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#e7fa02")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الاصفر**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              //الون الاخضر

                              let dgFilter = (reaction, user) =>
                                reaction.emoji.name === "🟩" &&
                                user.id === message.author.id;

                              let dg = msg.createReactionCollector(dgFilter, {
                                time: 15000
                              });

                              dg.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "D-Green")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#09fa2a")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الاخضر**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });
                              //الون اللبني

                              let aqFilter = (reaction, user) =>
                                reaction.emoji.name === "💠" &&
                                user.id === message.author.id;

                              let aq = msg.createReactionCollector(aqFilter, {
                                time: 15000
                              });

                              aq.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Aqua")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#00BFFF")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون اللبني**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });
                              //الون الازرق فاتح

                              let grFilter = (reaction, user) =>
                                reaction.emoji.name === "🍏" &&
                                user.id === message.author.id;

                              let gr = msg.createReactionCollector(grFilter, {
                                time: 15000
                              });

                              gr.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Green")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#00FF00")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأخضر**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let brFilter = (reaction, user) =>
                                reaction.emoji.name === "💩" &&
                                user.id === message.author.id;

                              let br = msg.createReactionCollector(brFilter, {
                                time: 15000
                              });

                              br.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Brown")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#3B170B")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون البني**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let reFilter = (reaction, user) =>
                                reaction.emoji.name === "😡" &&
                                user.id === message.author.id;

                              let re = msg.createReactionCollector(reFilter, {
                                time: 15000
                              });

                              re.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Red")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#FF0000")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأحمر**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let prFilter = (reaction, user) =>
                                reaction.emoji.name === "🟪" &&
                                user.id === message.author.id;

                              let pr = msg.createReactionCollector(prFilter, {
                                time: 15000
                              });

                              pr.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Purple")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#A901DB")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأرجواني**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let whFilter = (reaction, user) =>
                                reaction.emoji.name === "⬜" &&
                                user.id === message.author.id;

                              let wh = msg.createReactionCollector(whFilter, {
                                time: 15000
                              });

                              wh.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "White")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#ffffff")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأبيض**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let orFilter = (reaction, user) =>
                                reaction.emoji.name === "🟧" &&
                                user.id === message.author.id;

                              let or = msg.createReactionCollector(orFilter, {
                                time: 15000
                              });

                              or.on("collect", r => {
                                message.member.addRole(
                                  message.guild.roles.find("name", "Orange")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("#FFBF00")

                                  .setDescription(
                                    "**:art:تم اعطائك اللون الأرجواني**"
                                  )
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });

                              let y6Filter = (reaction, user) =>
                                reaction.emoji.name === "❌" &&
                                user.id === message.author.id;

                              let y6 = msg.createReactionCollector(y6Filter, {
                                time: 15000
                              });

                              y6.on("collect", r => {
                                message.member.removeRole(
                                  message.guild.roles.find("name", "black")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "D-Red")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Yellow")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "D-Green")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Aqua")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Green")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Brown")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Red")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Purple")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "White")
                                );
                                message.member.removeRole(
                                  message.guild.roles.find("name", "Orange")
                                );

                                const embed = new Discord.RichEmbed()
                                  .setColor("RANDOM")

                                  .setDescription("**:art:تم ازالة اللون**")
                                  .setFooter(
                                    message.author.tag,
                                    message.author.avatarURL
                                  );

                                message.channel.sendEmbed(embed).then();
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
});

client.on("message", message => {
  if (message.content === prefix + "createcolors") {
    if (!message.channel.guild)
      return message.channel.send("**This Commnad only For Servers !**");

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel
        .send("**You Dont Have** `ADMINISTRATOR` **premission**")
        .then(msg => msg.delete(6000));
    message.guild.createRole({
      name: "Black",
      color: "#200505",
      permissions: []
    });
    message.guild.createRole({
      name: "D-Red",
      color: "#e64d62",
      permissions: []
    });
    message.guild.createRole({
      name: "Yellow",
      color: "#ffea35",
      permissions: []
    });
    message.guild.createRole({
      name: "D-Green",
      color: "#bce86d",
      permissions: []
    });
    message.guild.createRole({
      name: "Aqua",
      color: "#5dafdf",
      permissions: []
    });
    message.guild.createRole({
      name: "Green",
      color: "#70ca70",
      permissions: []
    });
    message.guild.createRole({
      name: "Brown",
      color: "#9a5746",
      permissions: []
    });
    message.guild.createRole({
      name: "Red",
      color: "#ff0025",
      permissions: []
    });
    message.guild.createRole({
      name: "Purple",
      color: "#aa8fd6",
      permissions: []
    });
    message.guild.createRole({
      name: "White",
      color: "#f9f9f9",
      permissions: []
    });
    message.guild.createRole({
      name: "Orange",
      color: "#ffcc4d",
      permissions: []
    });

    message.channel.sendMessage({
      embed: new Discord.RichEmbed()
        .setColor("#502faf")
        .setAuthor(`${message.author.username}'`, message.author.avatarURL)
        .setDescription("``الالوان قيد الانشاء ....``")
    });
  }
});



      client.on("message", message => {
let KahrbaaID = "470712192329711628";
    if (message.content.toLowerCase() === prefix + "ruels") {
      	  if (!KahrbaaID.includes(message.author.id)) return;
        message.delete(5000)
        if(!message.channel.guild) return;
     const embed = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setThumbnail("https://lawyrsonline.com/wp-content/uploads/2019/04/law-png-90-images-in-collection-page-1-law-png-674_520.png")
         .setDescription(`**
        > قواعد مهمة حول الخادم  :   
         
・ يحظر النشر بجميع أشكاله

・  يُنصح بعدم كتابة أوامر المساعدة باستخدام البادئة

・ طلب المساعدة في الدردشة العامة واستخدام الدردشة المخصصة محظور

・ يحظر طلب دور دعم من التفاعل للحصول على الدور

・ لا تهين الآخرين

 >   قواعد مهمة حول شروط الخدمة :
         
・   يحق لنا إيقاف الخدمات المجانية / المدفوعة في حالة وجود سبب مقنع 
         
・ إذا ثبت أن خدماتنا تُستخدم بطريقة غير مناسبة أو غير قانونية ، يحق لنا تعليقها ومنع خادمك من خدماتنا وإضافة خادمك إلى القائمة السوداء 
         
・   لا يوجد أي ضمان على الحسابات التي يتم حفظها في الروبوت 

・  لا يوجد أي تعويض عن الحسابات المباعة ، ويمكن أن يذكرنا سابقًا أنه لا يوجد لديه ضمان 

・   نحن لا نعمل مع الفتنة بأي شكل من الأشكال ، إذا تم حظر الروبوت الخاص بك ، ليس لدينا أي تدخل 

・   يُحظر استخدام أوامر Bot لأغراض التخريب ، وإذا حدث ذلك ، فسيتم إدراج خادمك في القائمة السوداء ولن تتمكن من استخدام أي روبوتات 

・   إذا تم استغلال ثغرة أمنية ولم يتم الإبلاغ عنها ، فسيتم إدراج الخادم الخاص بك في القائمة السوداء 

・   يتم إعادة تشغيل جميع برامج الروبوت إذا حدث ضغط على الخادم 

・  __ للعلم  قصدي بي ب الروبوت البوتات # __  

**`)
   message.channel.send(embed);
   
   }
   });

      client.on("message", message => {
let KahrbaaID = "470712192329711628";
    if (message.content.toLowerCase() === prefix + "sells-d") {
      	  if (!KahrbaaID.includes(message.author.id)) return;
        message.delete(5000)
        if(!message.channel.guild) return;
     const embed = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setThumbnail("https://mostaql.hsoubcdn.com/uploads/1286-1498673925-11%D8%B4%D8%B9%D8%A7%D8%B1-%D9%85%D9%83%D8%AA%D8%A8%D8%A9-%D8%A7%D9%84%D9%81%D9%88%D8%B2.png")
         .setDescription(`**
> اسـعار التصميم :  
         
・ \`\` اســعار صـور السـيرفرات \`\`

・  صورة ثابتة (25k)

・ صورة مع تحريك بسيط (40k)

・ صورة متحركة احترافية (80k)

・ صورة متحركة مميزة (140k)

・ \`\` اسعار البكجات  \`\`

- البكج العادية
・ 1 صور للبوت من اختيارك + ترحيب + بنر + اثبت نفسك + خط  (120k)
         
- البكج المميزة
・ 5 صور للبوتات من اختيارك + ترحيب + بنر + اثبت نفسك + قوانين + خط + صورة مترحكة (200k)
         
>   شروط الخدمة :

・ الدفع قبل العمل 
・ يحق لك الحصول على تعديل خلال 2 ساعتين
・ لا يمكن استرجاع الأموال بعد العمل والتسليم
・ قد يتأخر تصميمك في حال تراكم الطلبات

طرق الدفع :
<:Probot:684994920645525530> \` Credits Probot \` 

**`)
   message.channel.send(embed);
   
   }
   });
      client.on("message", message => {
let KahrbaaID = "470712192329711628";
    if (message.content.toLowerCase() === prefix + "sells-b") {
      	  if (!KahrbaaID.includes(message.author.id)) return;
        message.delete(5000)
        if(!message.channel.guild) return;
     const embed = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setThumbnail("https://www.fintechfutures.com/files/2016/11/Robot_icon.png")
         .setDescription(`**
> اسـعار البوتات :  
         
・ \`\` بوتات السيرفرات   \`\`

・ برودكست بوت (10k)

・ بوت القيف اواي (14k)

・ تيكت بوت (30k)

・ بوت لفل خاص بسيرفرك (50k)

・ بوت الكلانات تخلي الاعضاء تسوي كلانات وتبعت لبعض وفي لفلات للكلانات (70k)

・ \`\` اسعار البكجات  \`\`

- البكج العادي  (150k)
・ <#684914859812585482> <---

- البكج المميزة (250k)
・ <#684914859812585482> <---
         
>   شروط الخدمة :

<#678388255695306762>

طرق الدفع :
<:Probot:684994920645525530> \` Credits Probot \` 

**`)
   message.channel.send(embed);
   
   }
   });



client.login(process.env.BOT_TOKEN);
