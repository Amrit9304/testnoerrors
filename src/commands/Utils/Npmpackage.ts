import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'npmpackage',
            aliases: ['npm'],
            description: 'Gives you the info of the given npm package. ',
            category: 'coding',
            usage: `${client.config.prefix}npm [package-name]`,
            baseXp: 50
        })
    }
    
    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('Give me a package name, Baka!')
        const chitoge = joined.trim()
        await axios.get(`https://api.popcat.xyz/npm?q=${chitoge}`)
        .then((response) => {
                // console.log(response);
                const text = `š *Name:* ${response.data.name}\nš *Author:* ${response.data.author}\nš§ *Author Email:* ${response.data.author_email}\nš® *Last Published on:* ${response.data.last_published}\nšØāš» *Maintainers:* ${response.data.maintainers}\nš *GitHub Repository:* ${response.data.repository}\nć½ļø *Downloads This Year:* ${response.data.downloads_this_year}\nš *Keywords:* ${response.data.keywords}\nš *Description:* ${response.data.description}\n\nš *URL: https://www.npmjs.com/package/${response.data.name}*\n `
                M.reply(text);
            }).catch(err => {
                M.reply(`Couldn't find package name *${chitoge}*`)
            }
            )
    };
}
