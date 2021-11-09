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
            command: 'carbon',
            aliases: ['beautify'],
            description: 'Beautifies the given code. ',
            category: 'coding',
            usage: `${client.config.prefix}carbon [code]`,
            baseXp: 10
        })
    }
    
    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void (await M.reply(`Provide me the code, Baka!`))
        const chitoge = joined.trim()
        return void M.reply( await request.buffer(`https://carbonnowsh.herokuapp.com/?code=${chitoge}&theme=darcula&backgroundColor=rgba(144, 19, 254, 100)`),
        MessageType.image,
                    undefined,
                    undefined,
                    `🌟 Here you go.\n`,
                    undefined
                ).catch((reason: any) =>
            M.reply(`✖ An error occurred. Please try again later. ${reason}`))
    }
}
