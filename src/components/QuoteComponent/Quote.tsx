import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface QuoteInterface  {
    author: string;
    content: string;
}

const Quote = () => {
    const [quote, setQuote] = useState<QuoteInterface>();

    useEffect(() => {
        getQuote();
    }, [])

    const getQuote = async () => {
        setQuote(await (await axios.get("https://api.quotable.io/random")).data);
    }
    
    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Quote of the Day
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.primary" style={{fontFamily: "'Permanent Marker', cursive", fontSize: "20px"}}>
                    {quote?.author}
                    </Typography>
                    <Typography variant="body2" style={{fontFamily: "'Special Elite', cursive", fontSize: "15px"}}>
                    {quote?.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        size="small" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        href="https://github.com/lukePeavey/quotable">
                            Learn More
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default Quote;