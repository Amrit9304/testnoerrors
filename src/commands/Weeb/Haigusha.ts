import waifulist from "public-waifulist"
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'haigusha',
            description: `Will send you random anime character with info.`,
            aliases: ['hg'],
            category: 'weeb',
            usage: `${client.config.prefix}haigusha`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const waifuclient = new waifulist()
        const haigusha = await waifuclient.getRandom()
        let text = ''
            text += `💙 *Name:* ${haigusha.data.name}\n`
            text += `💚 *Original Name:* ${haigusha.data.original_name}\n`
            if (haigusha.data.weight !== null) text += `⚖ *Weight:* ${haigusha.data.weight}\n`
            if (haigusha.data.height !== null) text += `📍 *Height:* ${haigusha.data.height}\n`
            if (haigusha.data.bust !== null) text += `💠 *Bust:* ${haigusha.data.bust}`
            if (haigusha.data.hip !== null) text += `🎗 *Hip:* ${haigusha.data.hip}\n`
            if (haigusha.data.waist !== null) text += `🎀 *Waist:* ${haigusha.data.waist}\n`
            if (haigusha.data.blood_type !== null) text += `🩸 *Blood Type:* ${haigusha.data.blood_type}\n`
            if (haigusha.data.origin !== null) text += `🎐 *Origin:* ${haigusha.data.origin}\n`
            if (haigusha.data.age !== null) text += `🎂 *Age:* ${haigusha.data.age}\n`
            if (haigusha.data.likes !== null) text += `🖤 *Likes:* ${haigusha.data.likes}\n`
            text += `❤ *Description:* ${haigusha.data.description}\n`
            text += `💛 *Source:* ${haigusha.data.series.name}\n\n`
            text += `🌐 *URL:* ${haigusha.data.url}\n`
        const buffer = await request.buffer(haigusha.data.display_picture).catch((e) => {
            return void M.reply(e.message)
        })
        while (true) {
            try {
                M.reply(
                    buffer || '✖ An error occurred. Please try again later',
                    MessageType.image,
                    undefined,
                    undefined,
                    `${text}`,
                    undefined
                ).catch((e) => {
                    console.log(`This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`)
                    // console.log('Failed')
                    M.reply(`✖ An error occurred. Please try again later.`)
                })
                break
            } catch (e) {
                // console.log('Failed2')
                M.reply(`✖ An error occurred. Please try again later.`)
                console.log(`This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`)
            }
        }
        return void null
    }
}
