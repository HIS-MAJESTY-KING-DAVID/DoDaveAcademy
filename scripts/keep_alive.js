const https = require('https');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_KEY environment variables must be set.');
  process.exit(1);
}

// Query the 'Category' table (limit 1) to trigger database activity
// This prevents Supabase from pausing the project due to inactivity
const tableName = 'category';
const url = `${supabaseUrl}/rest/v1/${tableName}?select=id&limit=1`;

console.log(`Pinging Supabase at: ${supabaseUrl}...`);

const options = {
  headers: {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json'
  }
};

const req = https.get(url, options, (res) => {
  console.log(`Response Status Code: ${res.statusCode}`);

  if (res.statusCode >= 200 && res.statusCode < 300) {
    console.log('✅ Keep-alive ping successful. Database is active.');
    process.exit(0);
  } else {
    console.error(`❌ Keep-alive ping failed with status code: ${res.statusCode}`);
    res.on('data', (d) => {
      console.error('Response body:', d.toString());
    });
    // Don't fail the build if the table doesn't exist (404), but warn
    if (res.statusCode === 404) {
        console.warn(`⚠️ Table '${tableName}' not found. Verify the table name. The request might still have counted as activity.`);
        process.exit(0); 
    }
    process.exit(1);
  }
});

req.on('error', (error) => {
  console.error('❌ Error making request:', error.message);
  process.exit(1);
});

req.end();
