/**
 * 每天一言
 * @returns {Promise<Response>}
 */
export function getYyWord() {
    return fetch('https://v1.hitokoto.cn?c=d&c=h&c=k&c=j')
}
