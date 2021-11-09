import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'entropy',
            description: 'Displays the info of Whatsapp-Botto-Entropy',
            category: 'bots',
            usage: `${client.config.prefix}entropy`,
            baseXp: 100
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void M.reply(
            `🌟 *Entropy* 🌟\n\n🍀 *Description:* The Only WhatsApp Bot With Multi-Device Support\n\n🌐 *URL:* https://github.com/Synthesized-Infinity/Whatsapp-Botto-Entropy\n`
        ).catch((reason: Error) => M.reply(`✖ An error occurred, Reason: ${reason}`))
    }
}
