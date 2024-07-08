import { MzPlugin,createPicture } from 'mz-botjs'
import { AppName } from '../../../config'
import path from 'path'
export class help extends MzPlugin {
    constructor() {
        super({
            rule: [
                {
                    reg: /^(#|\/)?test$/,
                    fnc: 'test'
                },
                {
 
                    reg: /^(#|\/)?test2$/,
                    fnc: 'test'
                
                }
            ]
        })
    }
    async test(e) {
        const img = await createPicture(
            {
                AppName:'test',
                DirPath: path.join(process.cwd(), 'plugins', 'test'),
                tplFile: path.join(process.cwd(), 'plugins', 'test', 'public', 'test.html'),
                data:{}
            }
        )
        e.reply('text')
        e.reply(Buffer.from(img))
    }
}
