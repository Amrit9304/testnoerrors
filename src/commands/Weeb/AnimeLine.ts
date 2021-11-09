import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'animeline',
            description: 'Will give you random anime line.',
            aliases: ['ani-line'],
            category: 'weeb',
            usage: `${client.config.prefix}animeline`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://animechan.vercel.app/api/random`)
            .then((response) => {
                // console.log(response);
                const text = `*🎀 Line: ${response.data.quote}*\n*🎗 Said by: ${response.data.character}*\n*📛 Source: ${response.data.anime}*`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`✖️ An error occurred.`)
            })
    }
}