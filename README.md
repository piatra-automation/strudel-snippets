# 🎵 Strudel Snippet Library

A comprehensive collection of Strudel live coding patterns and examples, organized in a hierarchical structure for easy browsing and integration into web applications.

## What's Included

### 📁 Files

- **`strudel-snippets.json`** - The main snippet library containing 80+ Strudel patterns organized by category
- **`strudel-snippet-library.js`** - JavaScript parser and utilities for working with the snippet library
- **`strudel-snippet-demo.html`** - Interactive demo showing how to use the library in a web app

### 🗂️ Snippet Categories

The library is organized into 7 main categories:

1. **Beginner** - Simple patterns for getting started
   - First Patterns (basic drums, kicks, beats)
   - Simple Notes (melodies, basic synthesis)
   - Basic Chaining (volume control, simple effects)

2. **Rhythm & Drums** - Percussion and rhythmic patterns
   - Drum Patterns (house, techno, TR-909 style)
   - Polyrhythms (3-over-4, complex patterns)
   - Euclidean Rhythms (algorithmic distributions)
   - Polymeter (rotating patterns)

3. **Synthesis** - Sound generation and synthesis
   - Oscillators (waveforms, bass, leads, pads)
   - Noise Sources (white, pink, brown, crackle)
   - FM Synthesis (basic FM, metallic sounds, envelopes)
   - Wavetables (scanning, evolving timbres)

4. **Scales & Harmony** - Musical theory and harmony
   - Basic Scales (major, minor, modes)
   - Chord Progressions (jazz, pop, minor)
   - Arpeggios (broken chords, ascending patterns)

5. **Effects & Processing** - Audio effects and processing
   - Filters (lowpass, highpass, resonant, sweeps)
   - Reverb & Delay (room sizes, echo effects)
   - Distortion (bit crushing, wave distortion)
   - Dynamics & Pan (stereo placement, auto-pan)

6. **Pattern Transformations** - Manipulating patterns in time
   - Speed Changes (fast/slow, tempo modulation)
   - Reversing & Chopping (reverse patterns, sample chopping)
   - Randomization (sometimes, often, rarely)
   - Offset & Jux (stereo effects, timing offsets)

7. **Samples & Sampling** - Working with audio samples
   - Loading Samples (GitHub, URLs, Shabda)
   - Sample Manipulation (begin/end, speed, looping)
   - Granular (chopping, striate effects)

8. **Advanced Techniques** - Complex synthesis and composition
   - Layering (multi-oscillator, chorus effects)
   - Modulation (LFOs, sine waves, Perlin noise)
   - Complex Patterns (phasing, breakbeats, Euclidean melodies)
   - ADSR Envelopes (attack/decay/sustain/release)

9. **Compositions** - Complete musical examples
   - Full Tracks (ambient, house, breakbeat, jazz)
   - Song Structures (verse, chorus, bridge)
   - Genre Templates (techno, drum & bass, dubstep)

## 🚀 Quick Start

### Using the Demo

1. Open `strudel-snippet-demo.html` in your web browser
2. Browse the categorized snippets in the sidebar
3. Click any snippet to insert it into the code editor
4. Use the search box to find specific patterns
5. Click "Random" for inspiration!

### Integrating into Your Project

```javascript
// Load the snippet library
const library = await loadStrudelSnippetLibrary('./strudel-snippets.json');

// Search for patterns
const drumPatterns = library.searchSnippets('drum');
console.log('Found', drumPatterns.length, 'drum patterns');

// Get a specific snippet
const helloPattern = library.getSnippet('Beginner/First Patterns/Hello Drums');
console.log('Pattern code:', helloPattern.text); // "s(\"bd sd cp hh\")"

// Get all snippets from a category
const beginnerSnippets = library.getSnippetsByCategory('Beginner');

// Generate menu structure for UI
const menuStructure = library.generateMenuStructure();
```

### JSON Schema Structure

Each snippet follows this structure:

```javascript
{
  "type": "snippet",
  "name": "Human-readable name",
  "text": "s(\"bd sd cp hh\") // Strudel code here"
}
```

Folders are organized like this:

```javascript
{
  "type": "folder",
  "children": {
    "Subfolder": { /* nested structure */ },
    "Snippet Name": { /* snippet object */ }
  }
}
```

## 📚 API Reference

### StrudelSnippetLibrary Class

#### Constructor
- `new StrudelSnippetLibrary(jsonData)` - Create a new library instance

#### Search & Retrieval
- `searchSnippets(query, options)` - Search by name, path, or content
- `getSnippet(path)` - Get snippet by exact path
- `getSnippetsByCategory(category)` - Get all snippets in a category
- `getSnippetsInFolder(folderPath)` - Get all snippets in a folder
- `getRandomSnippet(category)` - Get random snippet (optionally filtered)

#### Utility Methods
- `generateMenuStructure()` - Generate hierarchical menu data
- `getCategories()` - Get list of all categories
- `getStats()` - Get library statistics

### Helper Functions

- `loadStrudelSnippetLibrary(url)` - Load library from JSON URL
- `renderStrudelSnippetMenu(menuItems, parentElement, onSnippetClick)` - Render interactive menu
- `insertStrudelSnippet(snippet, editor, options)` - Insert snippet into code editor

## 🎯 Example Snippets

### Beginner
```javascript
// Hello Drums
s("bd sd cp hh")

// Basic Kick
s("bd*4")

// First Notes
note("c d e f")
```

### Intermediate
```javascript
// House Beat with Effects
stack(
  s("bd*4"),
  s("hh*8").gain(0.7),
  s("~ sd").nudge(0.05)
).cpm(130)

// FM Bass
note("c2*8").s("sine")
.fm(2).fmh(1.5).gain(0.8)
```

### Advanced
```javascript
// Layered Synthesis
note("<g1 bb1 d2 f1>").layer(
  x=>x.s("sawtooth").vib(4),
  x=>x.s("square").add(note(12))
)

// Breakbeat Manipulation
samples('github:yaxu/clean-breaks')
s("amen").splice(8, "<0 1 2 3 4*2 5 6 [6 7]>*2")
.cut(1).rarely(ply("2"))
```

## 🛠️ Customization

### Adding Your Own Snippets

To add snippets to the library, edit the JSON file following the schema:

```json
{
  "snippets": {
    "Your Category": {
      "type": "folder",
      "children": {
        "Your Snippet": {
          "type": "snippet",
          "name": "Your Snippet Name",
          "text": "s(\"your strudel code here\")"
        }
      }
    }
  }
}
```

### Styling the Menu

The demo includes CSS classes you can customize:

- `.strudel-snippet-menu` - Main menu container
- `.menu-item.folder` - Folder items
- `.menu-item.snippet` - Snippet items
- `.category-badge` - Category labels
- `.search-result` - Search result items

## 🎵 About Strudel

Strudel is a web-based live coding environment that brings TidalCycles to the browser. It allows you to create algorithmic patterns and music using code. Learn more at [strudel.cc](https://strudel.cc).

### Key Concepts in the Snippets

- **Mini-notation**: `"bd sd cp hh"` - Compact rhythm notation
- **Pattern stacking**: `stack()` - Layer multiple patterns
- **Chaining**: `.gain().cutoff()` - Chain effects and parameters
- **Alternation**: `"<bd sd>"` - Alternate between values
- **Repetition**: `"bd*4"` - Repeat patterns
- **Subdivision**: `"[bd sd]"` - Group events
- **Euclidean rhythms**: `"bd(3,8)"` - Algorithmic distribution
- **Randomization**: `"bd?"` - Probabilistic events

## 🤝 Contributing

Want to add more snippets? The library is designed to be easily extensible. Consider adding:

- Genre-specific patterns (trap, breakcore, ambient)
- Educational examples (music theory demonstrations)
- Advanced synthesis techniques
- Complex polyrhythmic patterns
- Sample manipulation recipes

## 📄 License

This snippet library is provided as a reference and educational resource. The Strudel patterns are based on examples from the Strudel documentation and community. Individual snippets may be used freely in your own Strudel compositions.

---

Happy live coding! 🎶✨