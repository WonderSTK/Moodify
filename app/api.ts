import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const LASTFM_API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

function parseGeminiResponse(text: string) {
  // Remove any markdown formatting
  text = text.replace(/```json\s*|\s*```/g, '').trim();

  // Custom parsing to handle potential issues with escaped quotes
  const result: { [key: string]: { [key: string]: string }[] } = {};
  let currentKey = '';
  let currentArray: { [key: string]: string }[] = [];
  let currentObject: { [key: string]: string } = {};
  let inObject = false;

  const lines = text.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('"') && trimmedLine.endsWith('": [')) {
      // Start of a new array
      currentKey = trimmedLine.slice(1, -4);
      currentArray = [];
    } else if (trimmedLine === '},') {
      // End of an object in the array
      currentArray.push(currentObject);
      currentObject = {};
      inObject = false;
    } else if (trimmedLine === ']' || trimmedLine === '],') {
      // End of the array
      if (inObject) {
        currentArray.push(currentObject);
      }
      result[currentKey] = currentArray;
      currentArray = [];
      currentObject = {};
      inObject = false;
    } else if (trimmedLine === '{') {
      // Start of a new object
      currentObject = {};
      inObject = true;
    } else if (trimmedLine.includes('": "')) {
      // Key-value pair
      const [key, ...valueParts] = trimmedLine.split('": ');
      const value = valueParts.join('": ').slice(1, -2); // Remove surrounding quotes
      if (inObject) {
        currentObject[key.slice(1)] = value;
      }
    }
  }

  return result;
}

async function getGeminiRecommendations(mood: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Given the mood "${mood}", recommend 5 movies, 5 books, and 5 songs that match this mood. Format the response as a JSON object with three arrays: "movies", "books", and "songs". Each item in these arrays should be an object with a "title" field and any other relevant fields. For songs, include separate "title" and "artist" fields.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();
    
    console.log("Raw Gemini response:", text);

    try {
      const parsedResponse = parseGeminiResponse(text);
      console.log("Parsed Gemini response:", parsedResponse);
      return parsedResponse;
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text);
      console.error("Parse error:", parseError);
      throw new Error("Failed to parse Gemini response");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

export async function getMovieRecommendations(mood: string) {
  try {
    const geminiRecommendations = await getGeminiRecommendations(mood);
    if (!geminiRecommendations.movies || !Array.isArray(geminiRecommendations.movies)) {
      throw new Error("Invalid movie recommendations format");
    }
    const moviePromises = geminiRecommendations.movies.map(async (movie: { [key: string]: string }) => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie.title)}&language=en-US&page=1&include_adult=false`, {
          headers: {
            'Authorization': `Bearer ${TMDB_API_KEY}`,
            'accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results && data.results.length > 0 ? data.results[0] : movie;
      } catch (error) {
        console.error("Error fetching movie details:", error);
        return movie;
      }
    });
    return Promise.all(moviePromises);
  } catch (error) {
    console.error("Error in getMovieRecommendations:", error);
    throw error;
  }
}

export async function getBookRecommendations(mood: string) {
  try {
    const geminiRecommendations = await getGeminiRecommendations(mood);
    if (!geminiRecommendations.books || !Array.isArray(geminiRecommendations.books)) {
      throw new Error("Invalid book recommendations format");
    }
    const bookPromises = geminiRecommendations.books.map(async (book: { [key: string]: string }) => {
      try {
        const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}&limit=1`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
          const bookInfo = data.docs[0];
          return {
            title: bookInfo.title,
            authors: bookInfo.author_name || ['Unknown Author'],
            coverUrl: bookInfo.cover_i ? `https://covers.openlibrary.org/b/id/${bookInfo.cover_i}-M.jpg` : undefined,
          };
        }
        return {
          title: book.title,
          authors: ['Unknown Author'],
          coverUrl: undefined,
        };
      } catch (error) {
        console.error("Error fetching book details:", error);
        return {
          title: book.title,
          authors: ['Unknown Author'],
          coverUrl: undefined,
        };
      }
    });
    return Promise.all(bookPromises);
  } catch (error) {
    console.error("Error in getBookRecommendations:", error);
    return [];
  }
}

export async function getSongRecommendations(mood: string) {
  try {
    const geminiRecommendations = await getGeminiRecommendations(mood);
    if (!geminiRecommendations.songs || !Array.isArray(geminiRecommendations.songs)) {
      throw new Error("Invalid song recommendations format");
    }
    const songPromises = (geminiRecommendations.songs as { title: string, artist: string }[]).map(async (song: { title: string, artist: string }) => {
      try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}&api_key=${LASTFM_API_KEY}&format=json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.track) {
          return {
            name: data.track.name,
            artist: data.track.artist.name,
            image: data.track.album ? data.track.album.image : undefined
          };
        }
        return song;
      } catch (error) {
        console.error("Error fetching song details:", error);
        return song;
      }
    });
    return Promise.all(songPromises);
  } catch (error) {
    console.error("Error in getSongRecommendations:", error);
    throw error;
  }
}