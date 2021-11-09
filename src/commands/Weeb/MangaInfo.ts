import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'mangainfo',
            description: `Gives you the data of the given manga from MyAnimeList.`,
            aliases: ['minfo'],
            category: 'weeb',
            usage: `${client.config.prefix}mangainfo [title]`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void (await M.reply(`Give me a manga title, Baka!`))
        const chitoge = joined.trim()
        console.log(chitoge)
        const { data } = await axios.get(`https://api.jikan.moe/v3/search/manga?q=${chitoge}`)
        const buffer = await request.buffer(data.results[0].image_url).catch((e) => {
            return void M.reply(e.message)
        })
        while (true) {
            try {
                M.reply(
                    buffer || '✖ An error occurred. Please try again later.',
                    MessageType.image,
                    undefined,
                    undefined,
                    `🎀 *Title:* ${data.results[0].title}\n💮 *Ongoing:* ${data.results[0].publishing}\n🌸 *Total Chapters:* ${data.results[0].chapters}\n🎗 *Total Volumes:* ${data.results[0].volumes}\n✨ *Published on:* ${data.results[0].start_date}\n🍥 *Ended on:* ${data.results[0].end_date}\n🌟 *Score:* ${data.results[0].score}\n❄️ *Description:* ${data.results[0].synopsis}\n\n 🌐 *MyAnimeList URL:* ${data.results[0].url}\n`,
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
