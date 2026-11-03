import * as readline from 'readline';


function preprocessDate(dates: string[]): string[] {    
    const monthMap: Record<string, string> = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };

    return dates.map(dateStr => {      
        const [dayStr, monthStr, yearStr] = dateStr.split(' ');
        
        const dayNum = dayStr.replace(/\D/g, '');

        // Pad the day with a leading zero 
        const formattedDay = dayNum.padStart(2, '0');
        
        const formattedMonth = monthMap[monthStr];

        return `${yearStr}-${formattedMonth}-${formattedDay}`;
    });
}

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let n: number | null = null;
    const dates: string[] = [];

    rl.on('line', (line) => {
        const trimmed = line.trim();
        if (trimmed === '') return;

        if (n === null) {
            // First line specify the total number of lines to process
            n = parseInt(trimmed, 10);
        } else {
            dates.push(trimmed);
            
            if (dates.length === n) {
                const results = preprocessDate(dates);
                results.forEach(res => console.log(res));
                rl.close();
            }
        }
    });
}

main();