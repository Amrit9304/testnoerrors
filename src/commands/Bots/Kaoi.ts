import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'kaoi',
            description: 'Displays the info of Kaoi',
            category: 'bots',
            usage: `${client.config.prefix}kaoi`,
            baseXp: 200
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void M.reply(
            `š¾ *kaoi* š¾\n\nš *Description:* Maintained Fork of WhatsApp Botto Void\n\nš *URL:* https://github.com/PrajjwalDatir/Kaoi \n`
        ).catch((reason: Error) => M.reply(`an error occurred, Reason: ${reason}`))
    }
}
