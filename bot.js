const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200); 
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://animeqq.glitch.me/`);
}, 280000);

//======================================[Const]======================================
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client();
const ms = require("ms"); 
const fs = require("fs");
const moment = require("moment");
const request = require("request");
const cmd = require("node-cmd");
const devs = "713429811434881093";
const prefix = "q"; // البرافيكس
const GUILDID = "754658775251812512"; // اي دي السيرفر
const CHANNELID = "754658775251812518"; // اي دي الروم
//======================================[Client]======================================


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("ِAPG مصمم خصيصا لسرفر ", { type: "WATCHING" });
});
const { Client } = require("discord.js");
const ytdl = require("ytdl-core");  
const url = "https://www.youtube.com/watch?v=M6z0Qql4-qo"; //  فديو الخاص ب القرأن الكريم كامل 

client.on("ready", async () => {
  console.log("تـم تشغيل القرأن الكريم");
  
  voiceStay(GUILDID, CHANNELID);
  function voiceStay(guildid, channelid) {
    if (!guildid) throw new Error("ـاكد انك حطط ايدي السيرفر");
    if (!channelid) throw new Error("تـاكد انك حطط ايدي الروم");

    let guild = client.guilds.get(guildid);
    const voiceChannel = guild.channels.get(channelid);
    if (!voiceChannel) {
      return;
    } 
    voiceChannel.join().then(connection => {
      const stream = ytdl(url, { filter: "audioonly" }); 
      const dispatcher = connection.playStream(stream);
      dispatcher.on("end", () => {
        voiceChannel.leave();
        cmd.run("refresh");
      });
    });
  }
});

//======================================[Commands]======================================

client.on("message", message => {
  if (message.content === prefix + "server") {
    const millis =
      new Date().getTime() - message.member.user.createdAt.getTime();
    const now = new Date();
    const createdAt = millis / 1000 / 60 / 60 / 24;
    var heg = message.guild;
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .addField("GuidlOwner", message.guild.owner, true) 
      .addField("Guild ID", message.guild.id, true)
      .addField(
        "Guild MemberCount",
        `${message.guild.memberCount}` +
          ` [Online : ${
            message.guild.members.filter(m => m.presence.status == "online")
              .size
          }]`
      )
      .addField(
        "Guild Channels",
        `\`🔊\` ${
          message.guild.channels.filter(m => m.type === "text").size
        } | ` +
          `\`#\`${message.guild.channels.filter(m => m.type === "voice").size} `
      )
      .addField("Guild RolesCount", ` ${message.guild.roles.size} `, true)
      .addField(
        "Created",
        `\`${moment(heg.createdTimestamp).fromNow()}\``,
        true
      )
      .addField("Guild Region", message.guild.region, true);

    message.channel.send(embed);
  } 
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "stats")) {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply(" Error : ` Guild Command `");
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setColor("BLACK") 
        .addField(
          "Ping",
          [`${Date.now() - message.createdTimestamp}` + "MS"],
          true
        )
        .addField(
          "RAM Usage",
          `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`,
          true
        )
        .addField("ID", `[ ${client.user.id} ]`, true)
        .addField("Prefix", `[ ${prefix} ]`, true)
    });
  }
});
//////////////////////////////////////
const category = "category-id";
let tickets = true;
let tchannels = [];
let current = 0;

client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  let author = message.author.id;
  if (args[0].toLowerCase() === prefix + "helpt") {
    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setThumbnail(message.author.avatarURL)
      .setColor("#36393e")
      .addField(`⇏ -new                     → open Ticket`)
      .addField(`⇏ -close                   → close Ticket`)
      .addField(`⇏ -tickets                  → open/close system `)
      .addField(`⇏ cleartickets             →  clear all tickets channels`)
      .addField(``);
    await message.channel.send(
      `:white_check_mark: , **hellp tickets commands.**`
    );
    await message.channel.send(embed);
  } else if (args[0].toLowerCase() === `${prefix}new`) {
    if (tickets === false)
      return message.channel.send(
        `Tickets Is Closed By Admin :police_officer: **`
      );
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        `I Don't Have Permissions To Edit Room :confounded: **`
      );
    console.log(current);
    let openReason = "";
    current++;
    message.guild.createChannel(`ticket-${current}`, "text").then(c => {
      tchannels.push(c.id);
      c.setParent(category);
      message.channel.send(`**Done opend Your Ticket :red_envelope: **`);
      c.overwritePermissions(message.guild.id, {
        READ_MESSAGES: false,
        SEND_MESSAGES: false
      });
      c.overwritePermissions(message.author.id, {
        READ_MESSAGES: true,
        SEND_MESSAGES: true
      });

      if (args[1])
        openReason = `\nReason: [ **__${args.slice(1).join(" ")}__** ]`;
      let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("#36393e")
        .setDescription(`**Wait Admin Please try explain why you opened this ticket with as much
detail as possible. Our **Support Staff** will be here soon to help.To Answer You**${openReason}`);
      c.send(`${message.author}`);
      c.send(embed);
    });
  } else if (args[0].toLowerCase() === `${prefix}tickets`) {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        ` **You Can't Use This Command :rolling_eyes: **`
      );
    if (args[1] && args[1].toLowerCase() === "enable") {
      tickets = true;
      message.channel.send(
        `**Ticket System Is Open Now :envelope_with_arrow:  **`
      );
    } else if (args[1] && args[1].toLowerCase() === "disable") {
      tickets = false;
      message.channel.send(
        `**Ticket System Is Closed Now :closed_lock_with_key:**`
      );
    } else if (!args[1]) {
      if (tickets === true) {
        tickets = false;
        message.channel.send(
          `**Ticket System Is Closed Now :closed_lock_with_key:**`
        );
      } else if (tickets === false) {
        tickets = true;
        message.channel.send(
          `**Ticket System Is Open Now :envelope_with_arrow:  **`
        );
      }
    }
  } else if (args[0].toLowerCase() === `${prefix}close`) {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        `**You Can't Use This Command :rolling_eyes: **`
      );
    if (
      !message.channel.name.startsWith("ticket-") &&
      !tchannels.includes(message.channel.id)
    )
      return message.channel.send(`** Thats Not Ticket Room :yawning_face: **`);

    message.channel.send(`**Room will Closed Auto After 5  second :timer: **`);
    tchannels.splice(tchannels.indexOf(message.channel.id), 1);
    setTimeout(() => message.channel.delete(), 5000); //لحد هنا
  } else if (message.content == prefix + `remove`) {
    if (!message.channel.name.startsWith("ticket-")) {
      return message.channel.send(
        `**This command only for the tickets :neutral_face: **`
      );
    }
    let member = message.mentions.members.first();
    if (!member || member.id === client.user.id) {
      return message.channel.send(` **Please mention the user**:unamused:  `);
    }
    if (
      !message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    ) {
      return message.channel.send(
        ` **${member.user.tag}** is not in this ticket to remove them :frowning2: `
      );
    }
    message.channel.overwritePermissions(member.id, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
      READ_MESSAGE_HISTORY: false
    });
    message.channel.send(
      `**Done \nSuccessfully removed \`${member.user.tag}\` from the ticket**`
    );
  } else if (message.content == prefix + `add`) {
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        `**Error** \n I Don't have MANAGE_CHANNELS Permission to do this`
      );
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send(
        `**This command only for the tickets**neutral_face:`
      );
    let member = message.mentions.members.first();
    if (!member)
      return message.channel.send(` **Please mention the user**:unamused: `);
    if (
      message.channel.permissions
        .For(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    )
      return message.channel.send(
        `this member already in this ticket :rolling_eyes:`
      );
    message.channel.overwritePermissions(member.id, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
      READ_MESSAGE_HISTORY: true
    });
    message.channel.send(
      `**Done\nSuccessfully added <@${member.user.id}> to the ticket**`
    );
  } else if (args[0].toLowerCase() === `${prefix}restart`) {
    if (!devs.includes(message.author.id))
      return message.channel.send(`:tools:, **You Can't Use This command.**`);
    message.channel.send(`:arrows_counterclockwise:, **restarting.The bot**`);
    client.destroy();
  } else if (args[0].toLowerCase() === `${prefix}cleartickets`) {
    let iq = 0;
    for (let q = 0; q < tchannels.length; q++) {
      let c = message.guild.channels.get(tchannels[q]);
      if (c) {
        c.delete();
        tchannels.splice(tchannels[q], 1);
        iq++;
      }
      if (q === tchannels.length - 1 || q === tchannels.lengh + 1) {
        message.channel.send(
          `**Done Deleted\`${iq}\` From Tickets.**:closed_lock_with_key: `
        );
      }
    }
  }
});





///////////////////////////////////////






client.login(process.env.BOT_TOKEN);
