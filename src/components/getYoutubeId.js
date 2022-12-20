export class Until{
     tryYouTube(link){
        let id = null;
        // RegExps for YouTube link forms
        const youtubeStandardExpr = /^https?:\/\/(www\.)?youtube.com\/watch\?v=([^?&]+)/i; // Group 2 is video ID
        const youtubeAlternateExpr = /^https?:\/\/(www\.)?youtube.com\/v\/([^\/\?]+)/i; // Group 2 is video ID
        const youtubeShortExpr = /^https?:\/\/youtu.be\/([^\/]+)/i; // Group 1 is video ID
        const youtubeEmbedExpr = /^https?:\/\/(www\.)?youtube.com\/embed\/([^\/]+)/i; // Group 2 is video ID

        let match = link.match(youtubeStandardExpr);

        if (match != null) {
            id = match[2];
        } else {
            match = link.match(youtubeAlternateExpr);

            if (match != null) {
                id = match[2];
            } else {
                match = link.match(youtubeShortExpr);

                if (match != null) {
                    id = match[1];
                } else {
                    match = link.match(youtubeEmbedExpr);

                    if (match != null) {
                        id = match[2];
                    }
                }
            }
        }
        return id;
    };

}
