# q1.ts - Server Load Merging
You are given an array servers of length n, where servers[i] is the load on the i server.
In one merge operation:
- Choose any two servers with loads a and b
- Remove both servers and replace them with a single server of load a + b
- The cost of this merge is a + b
Repeat merges until only one server remains.
Determine the minimum total cost required to merge all servers into one.

# q2.ts - Prepocess Dates
Users enter dates as text in a web form, and these dates must be converted into a consistent format before being saved.
You are given date strings in the format:
"Day Month Year"
where:
Day is written with an ordinal suffix, such as "1st", "2nd", "3rd", "4th", "12th", "21st", "31st", etc.
Month is the three-letter abbreviation of the English month name ("Jan" to "Dec").
Year is a 4-digit number between 1900 and 2100.
Your task is to convert each date into the standard format:
"YYYY-MM-DD"
(4-digit year, 2-digit month, 2-digit day)
You must write a function that takes an array of such date strings and returns an array of the converted formats.

# q3.ts - TTL Cache
Implement a prototype of a time-to-live (TTL) cache.
You are given a 2D integer array data of size n x 2.
Each data[i] represents one item inserted into the cache:
- data[i][0] = insertion time
- data[i][1] = time-to-live (TTL) duration
So, the item is present in the cache from time data[i][0] up to and including time data[i][0] + data[i][1].
You are also given an array queries, where each queries[j] is a query time.
For each query time, determine how many items are in the cache at that exact time.