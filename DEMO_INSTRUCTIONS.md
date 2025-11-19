# 🛠️ Running the Strudel Snippet Library Demo

You have two versions of the demo:

## ✅ Standalone Version (No Server Required)
**File:** `strudel-snippet-demo-standalone.html`

**How to use:**
1. Simply double-click the file to open it in your browser
2. Works offline - no internet or server required
3. All snippet data is embedded directly in the HTML

## 🌐 Server Version (For Development)
**Files:** `strudel-snippet-demo.html` + `strudel-snippets.json` + `strudel-snippet-library.js`

**The CORS Error:**
When you open HTML files directly (file:// URLs), browsers block `fetch()` requests for security reasons. This causes the error you saw.

**Solution - Run a Local Server:**

### Option 1: Python (if you have Python installed)
```bash
# In the folder with your files:
python -m http.server 8000
# Then visit: http://localhost:8000/strudel-snippet-demo.html
```

### Option 2: Node.js (if you have Node.js installed)
```bash
# Install a simple server globally:
npm install -g http-server

# In the folder with your files:
http-server
# Then visit: http://localhost:8080/strudel-snippet-demo.html
```

### Option 3: Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `strudel-snippet-demo.html`
3. Select "Open with Live Server"

### Option 4: Browser Extensions
Some browser extensions like "Web Server for Chrome" can serve local files.

## 🎯 Recommendation

For quick testing and demos: **Use the standalone version** (`strudel-snippet-demo-standalone.html`)

For development and integration: **Use the server version** with the separate JSON file

## 📁 File Structure
```
your-folder/
├── strudel-snippets.json              # Main snippet library
├── strudel-snippet-library.js         # Parser and utilities
├── strudel-snippet-demo.html          # Original demo (needs server)
├── strudel-snippet-demo-standalone.html # Works without server
└── README.md                          # Documentation
```

## 🔧 Integration Tips

When integrating into your own web app:

1. **For local development:** Use the server version with separate JSON
2. **For production:** You can either:
   - Serve the JSON file from your server
   - Embed it in JavaScript like the standalone version
   - Load it dynamically via your app's API

## 🎵 Next Steps

1. Try the standalone demo to see how it works
2. Browse the snippet categories and test the search
3. Click snippets to see them inserted into the editor
4. Use the JavaScript library in your own projects!

Happy coding! 🎶