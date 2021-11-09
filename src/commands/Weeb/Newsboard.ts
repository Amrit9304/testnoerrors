import malScraper from 'mal-scraper'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'animenewsboard',
            description: `Will send you anime newsboard so that you can be updated for everything about anime.`,
            aliases: ['aninews', 'anews', 'anewsboard', 'aninewsboard'],
            category: 'weeb',
            usage: `${client.config.prefix}animenewsboard`,
            baseXp: 50
        })
    }
    
    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        
        const nbNews = 120
        const news = await malScraper.getNewsNoDetails(nbNews)
        const buffer = await request.buffer(news[0].image).catch((e) => {
            return void M.reply(e.message)
        })
        while (true) {
            try {
                M.reply(
                    buffer || '✖ An error occurred. Please try again later',
                    MessageType.image,
                    undefined,
                    undefined,
                    `*──📰 NEWSBOARD 📰──*\n*──────JUST IN──────*\n🎀 *Title:* ${news[0].title}\n❄ *Description:* ${news[0].text}\n\n🌐 *URL:* ${news[0].link}\n\n*────PREVIOUS ONES────*\n🎀 *Title:* ${news[1].title}\n❄ *Description:* ${news[1].text}\n\n🌐 *URL:* ${news[1].link}\n\n🎀 *Title:* ${news[2].title}\n❄ *Description:* ${news[2].text}\n\n🌐 *URL:* ${news[2].link}\n\n🎀 *Title:* ${news[3].title}\n❄ *Description:* ${news[3].text}\n\n🌐 *URL:* ${news[3].link}\n\n🎀 *Title:* ${news[4].title}\n❄ *Description:* ${news[4].text}\n\n🌐 *URL:* ${news[4].link}\n\n🎀 *Title:* ${news[5].title}\n❄ *Description:* ${news[5].text}\n\n🌐 *URL:* ${news[5].link}\n\n🎀 *Title:* ${news[6].title}\n❄ *Description:* ${news[6].text}\n\n🌐 *URL:* ${news[6].link}\n\n🎀 *Title:* ${news[7].title}\n❄ *Description:* ${news[7].text}\n\n🌐 *URL:* ${news[7].link}\n\n🎀 *Title:* ${news[8].title}\n❄ *Description:* ${news[8].text}\n\n🌐 *URL:* ${news[8].link}\n\n🎀 *Title:* ${news[9].title}\n❄ *Description:* ${news[9].text}\n\n🌐 *URL:* ${news[9].link}`,
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
      
       
  
