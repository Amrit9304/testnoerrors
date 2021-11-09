import wiki from 'wikipedia'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'wikipedia',
            aliases: ['wiki'],
            description: 'Will fetch the result of the given query from wikipedia. ',
            category: 'utils',
            usage: `${client.config.prefix}wiki [query]`,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('Give me a value to calculate, Baka!')
        const chitoge = joined.trim()
        let i = await wiki.summary(chitoge)
        const text = `*🌐 URL: ${i.content_urls.mobile.page}*\n\n*🎀 Title:* ${i.title}\n *📜 Description:* ${i.description}\n\n*❄ Summary:* ${i.extract}`
        M.reply(text)
        }
}
