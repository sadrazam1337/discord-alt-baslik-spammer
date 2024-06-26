const Request = require("request")
const Self_Args = process.argv.slice(2)

if (!Self_Args.length) {
    console.log("node index.js <discord_token> <channel_id> <max> <thread_name>")
    process.exit()
}

if (!Self_Args[0]) {
    console.log("Geçersiz discord_token.")
    process.exit()
}

if (!Self_Args[1]) {
    console.log("Geçersiz channel_id.")
    process.exit()
}

if (!Self_Args[2]) {
    console.log("Geçersiz max.")
    process.exit()
}

if (!Self_Args[3]) {
    console.log("Geçersiz thread_name.")
    process.exit()
}

if (isNaN(Self_Args[2])) {
    console.log("Max Geçersiz sayı.")
    process.exit()
}

var in_index = 0

Yap()

function Yap() {
    if (in_index == Self_Args[2]) {
        console.log("thread'ler oluşturulma tamamlandı.")
        process.exit()
    }

    Request.post(`https://discord.com/api/v9/channels/${Self_Args[1]}/threads`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": Self_Args[0]
        },
        body: JSON.stringify({ "name": Self_Args.slice(3).join(" "), "type": 11, "auto_archive_duration": 1440, "location": "Thread Browser Toolbar" })
    }, async function (err, res, body) {
        if (body.indexOf('"archived": false,') != -1) {
            console.log("Bir thread oluşturuldu.")
            in_index += 1
            Yap()
            return
        } else {
            console.log("thread oluşturulamadı, yeniden deneniyor...")

            await import("delay").then(({ default: Delay }) => Delay(1000));
            Yap()
            return
        }
    })
}
