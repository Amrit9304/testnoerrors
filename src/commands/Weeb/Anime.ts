import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import malScraper from 'mal-scraper'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'anime',
            description: `Gives you the data of the given anime from MyAnimeList.`,
            aliases: ['ani', 'a'],
            category: 'weeb',
            usage: `${client.config.prefix}anime [title]`,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void (await M.reply(`Give me an anime title, Baka!`))
        const chitoge = joined.trim()
        console.log(chitoge)
        const anime = await malScraper.getInfoFromName(chitoge)
        const buffer = await request.buffer(anime.picture).catch((e) => {
            return void M.reply(e.message)
        })
        while (true) {
            try {
                M.reply(
                    buffer || '✖ An error occurred. Please try again later.',
                    MessageType.image,
                    undefined,
                    undefined,
                    `🎀 *Title:* ${anime.title}\n🎋 *Type:* ${anime.type}\n🎐 *Aired on:* ${anime.aired}\n🎗 *Premiered on:* ${anime.premiered}\n💠 *Total Episodes:* ${anime.episodes}\n📈 *Status:* ${anime.status}\n💮 *Genre:* ${anime.genres[0]}, ${anime.genres[1]}\n📍 *Studio:* ${anime.studios}\n🌟 *Score:* ${anime.score}\n💎 *Rating:* ${anime.rating}\n🏅 *Ranked:* ${anime.ranked}\n💫 *Popularity:* ${anime.popularity}\n❄ *Description:* ${anime.synopsis}\n\n🌐 *URL:* ${anime.url}\n`,
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
