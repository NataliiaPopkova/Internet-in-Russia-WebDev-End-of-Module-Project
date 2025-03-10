import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;

// paths to both JSON files
const eventsFilePath = path.join(__dirname, 'data.json');
const newsFilePath = path.join(__dirname, 'news.json');

app.use(express.json());

// CORS methods
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Content-Security-Policy', "default-src *; font-src 'self' data:;");
  next();
});

// function to read data from json
function readFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return [];
    }
}

// function to write data to json
function writeFile(filePath, data, callback) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (error) => {
        if (error) {
            console.error(`Error writing to file ${filePath}:`, error);
            callback(error);
        } else {
            callback(null);
        }
    });
}

// reading events
app.get('/api/events', (_, res) => {
    res.json(readFile(eventsFilePath));
});

// adding a new event
app.post('/api/events', (req, res) => {
    const newEvent = req.body;
    const data = readFile(eventsFilePath);

    // checking if the data is valid
    if (newEvent && newEvent.year && newEvent.title && newEvent.description && newEvent.detailed_description) {
        data.push(newEvent);
        writeFile(eventsFilePath, data, (error) => {
            if (error) {
                res.status(500).json({ error: 'Failed to save event' });
            } else {
                res.status(201).json(newEvent);
            }
        });
    } else {
        res.status(400).json({ error: 'Invalid event data' });
    }
});

// getting news
app.get('/api/news', (_, res) => {
    res.json(readFile(newsFilePath));
});

// adding a new news event
app.post('/api/news', (req, res) => {
    const newNews = req.body;
    const newsData = readFile(newsFilePath);

    if (newNews && newNews.year && newNews.title && newNews.description) {
        if (newNews.url && !isValidURL(newNews.url)) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }
        newsData.push(newNews);
        writeFile(newsFilePath, newsData, (error) => {
            if (error) {
                res.status(500).json({ error: 'Failed to save news' });
            } else {
                res.status(201).json(newNews);
            }
        });
    } else {
        res.status(400).json({ error: 'Invalid news data' });
    }
});

// launching the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export { app };
