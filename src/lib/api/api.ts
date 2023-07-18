import {API_DOT_BIBLE_KEY, API_DOT_BIBLE_URL} from '@/lib/utils/constants';
import {Passage} from '@/lib/types';
import {parseSearchQuery} from '@/lib/utils/parseSearchQuery';
import {transformPassage} from '@/lib/utils/transformPassage';

class ApiService {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor() {
        this.baseUrl = API_DOT_BIBLE_URL;
        this.apiKey = API_DOT_BIBLE_KEY;
    }

    /**
     * Make a GET request to the api.
     */
    private async get(route: string): Promise<Response> {
        return await fetch(`${this.baseUrl}${route}`, {
            headers: {
                'api-key': this.apiKey,
            },
        });
    }

    /**
     * Get passages by search query.
     *
     * Translation defaults to KJV.
     *
     * Query example: `John 1:1, ASV`
     */
    public async getPassages(query: string): Promise<Passage[] | null> {
        const {encodedQuery, bibleId} = parseSearchQuery(query);

        // Fail silently
        if (!encodedQuery || !bibleId) return null;

        const res = await this.get(`/v1/bibles/${bibleId}/search?query=${encodedQuery}`);

        // Fail silently
        if (!res.ok) return null;

        const json = await res.json();

        // Fail silently
        if (!json.data.passages) return null;

        return json.data.passages.map((passage: Passage) => {
            return {
                ...passage,
                content: transformPassage(passage.chapterIds, passage.content),
            };
        });
    }
}

export const api = new ApiService();
