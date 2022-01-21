import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@material-ui/core';
import TextField from '@mui/material/TextField';

interface LoveInterface {
    fname: string;
    sname: string;
    percentage: string;
    result: string;
}

const LoveCalculator = () => {

    const [name, setName] = useState<string|undefined>();
    const [crushName, setCrushName] = useState<string|undefined>();
    const [calculation, setCalculation] = useState<LoveInterface>();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
      };
    
    const handleCrushNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCrushName(e.currentTarget.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(name && crushName) {
            await axios.get(`https://love-calculator.p.rapidapi.com/getPercentage?sname=${name}&fname=${crushName}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "love-calculator.p.rapidapi.com",
                    "x-rapidapi-key": "6100ce2b27msh1cea9d0a969d434p14e564jsncf7e4c546b73"
                }
            }).then(response => {setCalculation(response.data)})
        }
  };

    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Love Calculator &#128525;
                    </Typography>
                    <Box onSubmit={handleSubmit} component="form" style={{display: 'flex', flexDirection: 'row'}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Enter your name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={handleNameChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Enter crush name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={handleCrushNameChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Calculate love compatibility &#129505;
                        </Button>
                    </Box>
                    {calculation && (
                        <div>
                        <Typography variant="body2" style={{fontFamily: "'Special Elite', cursive", fontSize: "15px"}}>
                            Name: {calculation.sname}
                        </Typography>
                        <Typography variant="body2" style={{fontFamily: "'Special Elite', cursive", fontSize: "15px"}}>
                            Crushname: {calculation.fname}
                        </Typography>
                        <Typography variant="body2" style={{fontFamily: "'Special Elite', cursive", fontSize: "15px"}}>
                            Percentage match: {calculation.percentage}
                        </Typography>
                        <Typography variant="body2" style={{fontFamily: "'Special Elite', cursive", fontSize: "15px"}}>
                            Result: {calculation.result}
                        </Typography>
                        <CardActions>
                            <Button 
                                size="small" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                href="https://rapidapi.com/ajith/api/love-calculator">
                                    Learn More
                            </Button>
                        </CardActions>
                    </div>
                    )}
                    
                    
                </CardContent>
            </Card>
        </div>
    );
};

export default LoveCalculator;