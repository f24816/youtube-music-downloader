import { Scraper } from "youtube-search-scraper";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();

    if (body) {
        try {
            const youtube = new Scraper();
            const name = body.name;
            // Perform the search and handle the Promise
            const results = await youtube.search(name);

            // console.log(results);

            // Create an object contating that video's title and URL and return it as a JSON response
            const videos = results.videos.map((video) => ({
                title: video.title,
                url: video.url,
                id: video.id,
                thumbnail: video.thumbnail,
                length: video.duration_raw,
            }));

            // Construct and return the successful response within the Promise resolution
            return new Response(
                JSON.stringify(videos),
                { status: 200 }
            );
        } catch (error) {
            console.error("Error searching YouTube:", error);
            // Handle the search error (e.g., return a 500 response with an error message)
            return new Response(
                JSON.stringify({
                    message: "Error searching YouTube",
                }),
                { status: 500 }
            );
        }
    }
    return new Response(
        JSON.stringify({
            message: "No name provided!",
        }),
        { status: 400 }
    );
};

