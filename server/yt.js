function getvideodata(req, res) {
    let url = req.body?.url;
    if (!url) {
        res.json({ error: true, message: "No URL Provided" });
        return;
    }
    if (!url.startsWith("https://you") && !url.startsWith("https://www.you")) {
        res.json({ error: true, message: "Invalid URL" });
        return;
    }
    url = url.replaceAll("/", "%2F");
    fetch("https://ytdl.socialplug.io/api/video-info?url=" + url, {
        headers: {
            "if-none-match": 'W/"b9-p25sIP90/JNqBygRCpU2i6EwumA"',
            origin: "https://www.socialplug.io",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.title === url) {
                res.json({ error: true, message: "No Video Found" });
                return;
            }
            res.json({
                formats: data.format_options.video.mp4,
                title: data.title,
                thumbnail: data.image,
            });
        });
}

function createjob(req, res) {
    let url = req.body?.url;
    let quality = req.body?.quality;
    if (!url) {
        res.json({ error: true, message: "No URL Provided" });
        return;
    }
    if (!quality) {
        res.json({ error: true, message: "No Quality Provided" });
        return;
    }
    let qualities = [
        "144p",
        "240p",
        "360p",
        "480p",
        "720p",
        "1080p",
        "1440p",
        "2160p",
    ];
    if (qualities.indexOf(quality) == -1) {
        res.json({ error: true, message: "Invalid Quality" });
        return;
    }
    if (!url.startsWith("https://you") && !url.startsWith("https://www.you")) {
        res.json({ error: true, message: "Invalid URL" });
        return;
    }
    url = url.replaceAll("/", "%2F");
    fetch(
        "https://ytdl.socialplug.io/api/start-download?url=" +
        url +
        "&quality=" +
        quality,
        {
            headers: {
                "if-none-match": 'W/"b9-p25sIP90/JNqBygRCpU2i6EwumA"',
                origin: "https://www.socialplug.io",
            },
        }
    )
        .then((res) => res.json())
        .then((data) => {
            res.json(data);
        });
}

function getjobstatus(req, res) {
    let jobid = req.body?.jobid;
    if (!jobid) {
        res.json({ error: true, message: "No Job ID Provided" });
        return;
    }
    fetch("https://ytdl.socialplug.io/api/get-download?download_id=" + jobid, {
        headers: {
            "if-none-match": 'W/"b9-p25sIP90/JNqBygRCpU2i6EwumA"',
            origin: "https://www.socialplug.io",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            res.json(data);
        });
}

module.exports = function (app) {
    app.post("/youtube/getvideodata", getvideodata);
    app.post("/youtube/createjob", createjob);
    app.post("/youtube/getjobstatus", getjobstatus);
};
