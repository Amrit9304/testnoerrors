import AnimeFact from 'anime-facts'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'animefact',
            aliases: ['anifact', 'afact'],
            description: 'Will send you random anime fact. ',
            category: 'weeb',
            usage: `${client.config.prefix}animefact`,
            baseXp: 20
        })
    }
       
    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        const api = new AnimeFact("ff683309b91cf91c2a3d627aef288163c4758e20634a")
        const i = await api.getFact()
              const text = `*📛 Fact:* ${i.fact}`
        M.reply(text)
        }
}
