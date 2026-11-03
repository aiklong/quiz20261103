
import * as readline from 'readline';

/**
 * Calculates the minimum total cost to merge all servers into one.
 * Uses the optimal Two-Queue merging strategy for efficiency
 */
function minTotalCost(servers: number[]): number {
    // check for servers array validity
    if (!servers || servers.length < 2) {
        return 0;
    }

    // sort the initial server loads in asc
    servers.sort((a, b) => a - b);
    
    // Two-queue strategy 
    const q1 = servers;
    const q2: number[] = [];
    
    let head1 = 0;
    let head2 = 0;
    let totalCost = 0;
    
    // Helper to get the current smallest load
    const getMin = (): number => {
        if (head1 >= q1.length) {
            return q2[head2++];
        }
        if (head2 >= q2.length) {
            return q1[head1++];
        }
        
        if (q1[head1] <= q2[head2]) {
            return q1[head1++];
        } else {
            return q2[head2++];
        }
    };
    
    // merges until one server
    while ((q1.length - head1) + (q2.length - head2) > 1) {
        const a = getMin();
        const b = getMin();
        
        const mergeCost = a + b;
        totalCost += mergeCost;
        
        q2.push(mergeCost);
    }
    
    return totalCost;
}


function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let n: number | null = null;
    const servers: number[] = [];

    rl.on('line', (line) => {
        const trimmed = line.trim();
        if (trimmed === '') return; 
        
        if (!/^[0-9]+$/.test(trimmed)) {
            console.error(`Invalid Input Error: "${trimmed}" is not a valid integer.`);
            rl.close();
            process.exit(1);
        }

        const value = parseInt(trimmed, 10);

        if (n === null) {
            // Validate for n
            if (value < 2 || value > 100000) {
                console.error(`Constraint Error: n (${value}) must be between 2 and 100,000.`);
                rl.close();
                process.exit(1);
            }
            n = value;
        } else {
            // Validate for servers[i]
            if (value < 1 || value > 100000) {
                console.error(`Constraint Error: Server load (${value}) must be between 1 and 100,000.`);
                rl.close();
                process.exit(1);
            }
            
            servers.push(value);
            
            // Execute as soon as the expected count matches
            if (servers.length === n) {
                const result = minTotalCost(servers);
                console.log(result); 
                rl.close();
            }
        }
    });
}

main();
