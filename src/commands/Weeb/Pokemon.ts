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
            command: 'pokemon',
            description: `Gives you the data of the given pokemon.`,
            aliases: ['pkmn'],
            category: 'weeb',
            usage: `${client.config.prefix}pokemon [name/id]`,
            baseXp: 50
        })
    }
    
    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        
        if (!joined) return void M.reply('Do you want me to give you the data of an unknown pokemon, Baka!')
        const chitoge = joined.trim()
        console.log(chitoge)
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${chitoge}`)
        const buffer = await request.buffer(data.sprites.front_default).catch((e) => {
        //if ((data as { error: string }).error) return void M.reply('No such Pokemon, Baka!'))
            //return void M.reply(e.message)
        })
        while (true) {
            try {
                M.reply(
                    buffer || '✖ An error occurred. Please try again later',
                    MessageType.image,
                    undefined,
                    undefined,
                    `💫 *Name: ${data.name}*\n〽️ *Pokedex ID: ${data.id}*\n⚖ *Weight: ${data.weight}*\n🔆 *Height: ${data.height}*\n🌟 *Base Experience: ${data.base_experience}*\n📛 *Abilities: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}*\n🎀 *Type: ${data.types[0].type.name}*\n✳ *HP: ${data.stats[0].base_stat}*\n⚔ *Attack: ${data.stats[1].base_stat}*\n🔰 *Defense: ${data.stats[2].base_stat}*\n☄ *Special Attack: ${data.stats[3].base_stat}*\n🛡 *Special Defense:${data.stats[4].base_stat}*\n🎐 *Speed: ${data.stats[5].base_stat}*\n`,
                    undefined
                ).catch((err) => {
                    console.log(`${err}`)
                    M.reply(`✖ An error occurred. Please try again later.`)
                })
                break
            } catch (err) {
                M.reply(`✖ An error occurred. Please try again later.`)
                console.log(`${err}`)
            }
        }
        return void null
    }
}
