import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'genshincharacter',
            description: `Gives you the data of the given genshin character.`,
            aliases: ['gchara', 'genshinchara'],
            category: 'weeb',
            usage: `${client.config.prefix}genshincharacter [name]`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        const chara = await axios.get(`https://api.genshin.dev/characters`)
        if (!joined) return void (await M.reply(`š *The searchable characters are:* ${chara.data}`))
        const chitoge1 = joined.trim()
        await axios.get(`https://api.genshin.dev/characters/${chitoge1}`)
        .then((response) => {
                // console.log(response);
        const n = [
            `./assets/videos/genshinchara/${response.data.name}.mp4`
        ]
        let chitoge = n[Math.floor(Math.random() * n.length)]
                let text = `š *Name: ${response.data.name}*\nš  *Vision: ${response.data.vision}*\nš *Weapon: ${response.data.weapon}*\nā© *Nation: ${response.data.nation}*\nš® *Affiliation: ${response.data.affiliation}*\nā *Constellation: ${response.data.constellation}*\nš *Rarity: ${response.data.rarity} stars*\nš *Birthday: ${response.data.birthday}*\nš *Description: ${response.data.description}* `
                return void this.client.sendMessage(M.from, { url: chitoge }, MessageType.video, {quoted:M.WAMessage, mimetype: Mimetype.gif, caption: `${text} ` } )
            }).catch(err => {
                M.reply(`Sorry, couldn't find character *${chitoge1}*\nš *Note:* Nicknames does not work here.`)
            }
            )
    };
}
