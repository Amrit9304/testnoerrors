import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'chitoge',
            description: 'Displays the info',
            category: 'bots',
            usage: `${client.config.prefix}chitoge`,
            baseXp: 200
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void M.reply(
            `š *Star* š\n\nš *Description: Maintained Fork of WhatsApp Botto Void*\n\nš *URL:* \n\n š *Guide:* \n\n\nš *Note: This repo is the open source version of Void.*`
        ).catch((reason: Error) => M.reply(`ā An error occurred, Reason: ${reason}`))
    }
}
