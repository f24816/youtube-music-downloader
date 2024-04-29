import { Downloader } from "ytdl-mp3";
import type { APIRoute } from "astro";
// import fileDownload from 'js-file-download';
import fs from 'fs';

export const POST: APIRoute = async ({ request }) => {

    // get the body of the request
    const body = await request.json();
    const url = "https://www.youtube.com/watch?v=" + body.id;

    console.log("URL: " + url);

    const output = import.meta.env.MUSIC_FOLDER;
    console.log(output);

    const downloader = new Downloader({
        getTags: false,
        outputDir: output
    });

    // Check if the file already exists first
    const file_location = await downloader.downloadSong(url);

    console.log("Results: " + file_location);

    // Read the file data to a variable using the fs module
    const data = fs.readFileSync(file_location);

    // Remove the file after reading it
    fs.unlinkSync(file_location);

    // Return the music file data from the API route
    return new Response(data, {
        headers: {
            'Content-Type': 'audio/mpeg',
        },
    });
};

