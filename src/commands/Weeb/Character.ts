import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import waifulist from 'public-waifulist'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'character',
            description: `Will give you the data of the given character id.`,
            aliases: ['chara'],
            category: 'weeb',
            usage: `${client.config.prefix}character [id]`,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void (await M.reply(`Give me a character id, Baka!`))
        const chitoge = joined.trim()
        console.log(chitoge)
        const client = new waifulist()
        const chara = await client.getCharacter(chitoge)
        let text = ''
            text += `💙 *Name:* ${chara.data.name}\n`
            text += `💚 *Original Name:* ${chara.data.original_name}\n`
            if (chara.data.weight !== null) text += `⚖ *Weight:* ${chara.data.weight}\n`
            if (chara.data.height !== null) text += `📍 *Height:* ${chara.data.height}\n`
            if (chara.data.bust !== null) text += `💠 *Bust:* ${chara.data.bust}\n`
            if (chara.data.hip !== null) text += `🎗 *Hip:* ${chara.data.hip}\n`
            if (chara.data.waist !== null) text += `🎀 *Waist:* ${chara.data.waist}\n`
            if (chara.data.blood_type !== null) text += `🩸 *Blood Type:* ${chara.data.blood_type}\n`
            if (chara.data.origin !== null) text += `🎐 *Origin:* ${chara.data.origin}\n`
            if (chara.data.age !== null) text += `🎂 *Age:* ${chara.data.age}\n`
            if (chara.data.likes !== null) text += `🖤 *Likes:* ${chara.data.likes}\n`
            text += `❤ *Description:* ${chara.data.description}\n`
            text += `💛 *Source:* ${chara.data.series.name}\n\n`
            text += `🌐 *URL:* ${chara.data.url}\n`
        const buffer = await request.buffer(chara.data.display_picture).catch((e) => {
            return void M.reply(e.message)
        })
        while (true) {
            try {
                M.reply(
                    buffer || '✖ An error occurred. Please try again later.',
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
