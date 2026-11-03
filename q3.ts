import * as readline from 'readline';

/**
 * return the count of items alive in the TTL cache for each query time.
 * 
 * @param data 2D array where data[i] = [insertionTime, ttlDuration]
 * @param queries array of query times
 * @returns array containing the count of active items for each query
 */
function getActiveCacheCnts(data: number[][], queries: number[]): number[] {
    const n = data.length;    
    const results: number[] = [];
    
    for (let j=0; j < queries.length; j++) {
        const queryTime = queries[j];
        let count = 0;
        for (let i = 0; i < n; i++) {
            if ((data[i][0] <= queryTime) && (queryTime < (data[i][0] + data[i][1]))) {
                count++;
            }
        }
        results.push(count);
    }

    return results;
}


function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let n: number | null = null;
    let q: number | null = null;
    const data: number[][] = [];
    const queries: number[] = [];
    
    let currentLine = 0;

    rl.on('line', (line) => {
        const trimmed = line.trim();
        if (trimmed === '') return;

        currentLine++;

        if (n === null) {
            n = parseInt(trimmed, 10);
            if (n < 1 || n > 2*1e5) {
                console.error('The number of data entries must satisfy 1 ≤ n ≤ 2*10^5');
                process.exit(1);
            }
            return;
        }

        // Read the next 'n' lines for data array elements
        if (data.length < n) {
            // 1≤ data[i][0], data[i][1] ≤10^9
            const parts = trimmed.split(/\s+/).map(x => parseInt(x, 10));
            if (parts.length !== 2) {
                console.error('Each data line must contain exactly 2 numbers');
                process.exit(1);
            }
            if (parts[0] < 1 || parts[0] > 1e9 || parts[1] < 1 || parts[1] > 1e9) {
                console.error('Each data element must satisfy 1 ≤ data[i][0], data[i][1] ≤ 10^9');
                process.exit(1);
            }
            data.push(parts);
            return;
        }

        if (q === null) {
            q = parseInt(trimmed, 10);
            if (q < 1 || q > 1e5) {
                console.error('The number of queries must satisfy 1 ≤ q ≤ 10^5');
                process.exit(1);
            }
            return;
        }

        // Read the next 'q' lines for individual query records
        if (queries.length < q) {
            queries.push(parseInt(trimmed, 10));
            if (queries[queries.length - 1] < 1 || queries[queries.length - 1] > 1e9) {
                console.error('Each query must satisfy 1 ≤ query ≤ 10^9');
                process.exit(1);
            }
            
            // Execute as soon as the last required query arrives
            if (queries.length === q) {
                const results = getActiveCacheCnts(data, queries);                
                console.log('[' + results.join(',') + ']');
                //results.forEach(res => console.log(res));
                rl.close();
            }
        }
    });
}

main();
