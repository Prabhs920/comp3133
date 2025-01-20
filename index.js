const fs = require('fs');
const csv = require('csv-parser');

// Paths for output files
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';
const inputFile = 'input_countries.csv';

// Delete files if they already exist
if (fs.existsSync(canadaFile)) {
    fs.unlinkSync(canadaFile);
    console.log(`${canadaFile} deleted.`);
}

if (fs.existsSync(usaFile)) {
    fs.unlinkSync(usaFile);
    console.log(`${usaFile} deleted.`);
}

// Read and process the CSV file
fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        const { country, year, population } = row;

        // Write data to canada.txt if the country is Canada
        if (country.toLowerCase() === 'canada') {
            const line = `${country},${year},${population}\n`;
            fs.appendFileSync(canadaFile, line);
        }

        // Write data to usa.txt if the country is United States
        if (country.toLowerCase() === 'united states') {
            const line = `${country},${year},${population}\n`;
            fs.appendFileSync(usaFile, line);
        }
    })
    .on('end', () => {
        console.log('CSV file processed successfully.');
    })
    .on('error', (error) => {
        console.error('Error reading CSV file:', error);
    });
