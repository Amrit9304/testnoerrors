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
                    buffer || 'β An error occurred. Please try again later',
                    MessageType.image,
                    undefined,
                    undefined,
                    `*ββπ° NEWSBOARD π°ββ*\n*ββββββJUST INββββββ*\nπ *Title:* ${news[0].title}\nβ *Description:* ${news[0].text}\n\nπ *URL:* ${news[0].link}\n\n*ββββPREVIOUS ONESββββ*\nπ *Title:* ${news[1].title}\nβ *Description:* ${news[1].text}\n\nπ *URL:* ${news[1].link}\n\nπ *Title:* ${news[2].title}\nβ *Description:* ${news[2].text}\n\nπ *URL:* ${news[2].link}\n\nπ *Title:* ${news[3].title}\nβ *Description:* ${news[3].text}\n\nπ *URL:* ${news[3].link}\n\nπ *Title:* ${news[4].title}\nβ *Description:* ${news[4].text}\n\nπ *URL:* ${news[4].link}\n\nπ *Title:* ${news[5].title}\nβ *Description:* ${news[5].text}\n\nπ *URL:* ${news[5].link}\n\nπ *Title:* ${news[6].title}\nβ *Description:* ${news[6].text}\n\nπ *URL:* ${news[6].link}\n\nπ *Title:* ${news[7].title}\nβ *Description:* ${news[7].text}\n\nπ *URL:* ${news[7].link}\n\nπ *Title:* ${news[8].title}\nβ *Description:* ${news[8].text}\n\nπ *URL:* ${news[8].link}\n\nπ *Title:* ${news[9].title}\nβ *Description:* ${news[9].text}\n\nπ *URL:* ${news[9].link}`,
                    undefined
                ).catch((e) => {
                    console.log(`This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`)
                    // console.log('Failed')
                    M.reply(`β An error occurred. Please try again later.`)
                })
                break
            } catch (e) {
                // console.log('Failed2')
                M.reply(`β An error occurred. Please try again later.`)
                console.log(`This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`)
            }
        }
        return void null
    }
}
      
       
  
