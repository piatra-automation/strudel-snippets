/**
 * Strudel Snippet Library Parser
 * A JavaScript class for working with hierarchical Strudel code snippet libraries
 */

class StrudelSnippetLibrary {
  constructor(jsonData) {
    this.data = jsonData;
    this.flatSnippets = this.flattenSnippets();
  }

  /**
   * Parse the hierarchical structure into a flat map for quick access
   * @param {Object} obj - The snippets object to flatten
   * @param {Array} path - Current path in the hierarchy
   * @param {Object} result - Accumulated result object
   * @returns {Object} Flattened snippets with paths as keys
   */
  flattenSnippets(obj = this.data.snippets, path = [], result = {}) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];
      
      if (value.type === 'snippet') {
        result[currentPath.join('/')] = {
          name: value.name,
          text: value.text,
          path: currentPath,
          category: path[0] || 'Root',
          subcategory: path[1] || null
        };
      } else if (value.type === 'folder' && value.children) {
        this.flattenSnippets(value.children, currentPath, result);
      }
    }
    return result;
  }

  /**
   * Generate menu structure for rendering UI components
   * @param {Object} obj - Object to process
   * @param {Array} path - Current path
   * @returns {Array} Menu structure array
   */
  generateMenuStructure(obj = this.data.snippets, path = []) {
    const menu = [];
    
    for (const [key, value] of Object.entries(obj)) {
      if (value.type === 'folder') {
        menu.push({
          type: 'folder',
          label: key,
          path: [...path, key],
          children: this.generateMenuStructure(value.children, [...path, key])
        });
      } else if (value.type === 'snippet') {
        menu.push({
          type: 'snippet',
          label: value.name,
          path: [...path, key],
          text: value.text,
          category: path[0] || 'Root'
        });
      }
    }
    
    return menu;
  }

  /**
   * Search snippets by name, text content, or path
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Array} Array of matching snippets
   */
  searchSnippets(query, options = {}) {
    const { 
      searchInText = false, 
      category = null,
      maxResults = 20 
    } = options;
    
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    for (const [path, snippet] of Object.entries(this.flatSnippets)) {
      let matches = false;
      
      // Search in name
      if (snippet.name.toLowerCase().includes(lowerQuery)) {
        matches = true;
      }
      
      // Search in path
      if (path.toLowerCase().includes(lowerQuery)) {
        matches = true;
      }
      
      // Search in text content if enabled
      if (searchInText && snippet.text.toLowerCase().includes(lowerQuery)) {
        matches = true;
      }
      
      // Filter by category if specified
      if (category && snippet.category.toLowerCase() !== category.toLowerCase()) {
        matches = false;
      }
      
      if (matches) {
        results.push({
          ...snippet,
          fullPath: path,
          score: this.calculateRelevanceScore(snippet, lowerQuery, path)
        });
      }
      
      if (results.length >= maxResults) break;
    }
    
    // Sort by relevance score
    return results.sort((a, b) => b.score - a.score);
  }

  /**
   * Calculate relevance score for search results
   * @param {Object} snippet - Snippet object
   * @param {string} query - Search query (lowercase)
   * @param {string} path - Full path
   * @returns {number} Relevance score
   */
  calculateRelevanceScore(snippet, query, path) {
    let score = 0;
    
    // Exact name match gets highest score
    if (snippet.name.toLowerCase() === query) score += 100;
    else if (snippet.name.toLowerCase().includes(query)) score += 50;
    
    // Path matches
    if (path.toLowerCase().includes(query)) score += 25;
    
    // Shorter paths are more relevant
    score -= path.split('/').length;
    
    return score;
  }

  /**
   * Get snippet by exact path
   * @param {string} path - Path to snippet (e.g., "Beginner/First Patterns/Hello Drums")
   * @returns {Object|null} Snippet object or null if not found
   */
  getSnippet(path) {
    return this.flatSnippets[path] || null;
  }

  /**
   * Get all snippets in a specific category
   * @param {string} category - Category name
   * @returns {Array} Array of snippets in the category
   */
  getSnippetsByCategory(category) {
    const results = [];
    
    for (const [path, snippet] of Object.entries(this.flatSnippets)) {
      if (snippet.category.toLowerCase() === category.toLowerCase()) {
        results.push({
          ...snippet,
          fullPath: path
        });
      }
    }
    
    return results;
  }

  /**
   * Get all snippets in a folder
   * @param {string} folderPath - Path to folder (e.g., "Beginner/First Patterns")
   * @returns {Array} Array of snippets in the folder
   */
  getSnippetsInFolder(folderPath) {
    const results = [];
    const folderPrefix = folderPath + '/';
    
    for (const [path, snippet] of Object.entries(this.flatSnippets)) {
      if (path.startsWith(folderPrefix)) {
        results.push({
          ...snippet,
          fullPath: path
        });
      }
    }
    
    return results;
  }

  /**
   * Get all available categories
   * @returns {Array} Array of category names
   */
  getCategories() {
    const categories = new Set();
    
    for (const snippet of Object.values(this.flatSnippets)) {
      categories.add(snippet.category);
    }
    
    return Array.from(categories);
  }

  /**
   * Get random snippet, optionally from a specific category
   * @param {string} category - Optional category filter
   * @returns {Object|null} Random snippet or null
   */
  getRandomSnippet(category = null) {
    let snippets = Object.entries(this.flatSnippets);
    
    if (category) {
      snippets = snippets.filter(([path, snippet]) => 
        snippet.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (snippets.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * snippets.length);
    const [path, snippet] = snippets[randomIndex];
    
    return {
      ...snippet,
      fullPath: path
    };
  }

  /**
   * Get snippets statistics
   * @returns {Object} Statistics object
   */
  getStats() {
    const categories = {};
    let totalSnippets = 0;
    
    for (const snippet of Object.values(this.flatSnippets)) {
      totalSnippets++;
      const category = snippet.category;
      
      if (!categories[category]) {
        categories[category] = {
          count: 0,
          subcategories: new Set()
        };
      }
      
      categories[category].count++;
      if (snippet.subcategory) {
        categories[category].subcategories.add(snippet.subcategory);
      }
    }
    
    // Convert sets to arrays
    for (const category of Object.values(categories)) {
      category.subcategories = Array.from(category.subcategories);
    }
    
    return {
      totalSnippets,
      categories: Object.keys(categories).length,
      categoriesDetail: categories
    };
  }
}

// Usage examples and helper functions

/**
 * Load snippet library from JSON file
 * @param {string} url - URL to JSON file
 * @returns {Promise<StrudelSnippetLibrary>} Promise resolving to library instance
 */
async function loadStrudelSnippetLibrary(url = './strudel-snippets.json') {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load snippets: ${response.status}`);
    }
    const jsonData = await response.json();
    return new StrudelSnippetLibrary(jsonData);
  } catch (error) {
    console.error('Error loading snippet library:', error);
    throw error;
  }
}

/**
 * Render a hierarchical menu for snippet selection
 * @param {Array} menuItems - Menu items from generateMenuStructure()
 * @param {HTMLElement} parentElement - Parent DOM element
 * @param {Function} onSnippetClick - Callback for snippet selection
 * @returns {HTMLElement} The created menu element
 */
function renderStrudelSnippetMenu(menuItems, parentElement, onSnippetClick) {
  const ul = document.createElement('ul');
  ul.className = 'strudel-snippet-menu';
  
  menuItems.forEach(item => {
    const li = document.createElement('li');
    li.className = `menu-item ${item.type}`;
    
    if (item.type === 'folder') {
      li.innerHTML = `
        <span class="folder-label">
          <i class="folder-icon">📁</i>
          ${item.label}
          <i class="arrow">▶</i>
        </span>
      `;
      
      const submenuContainer = document.createElement('div');
      submenuContainer.className = 'submenu-container';
      submenuContainer.style.display = 'none';
      
      const submenu = renderStrudelSnippetMenu(item.children, submenuContainer, onSnippetClick);
      submenuContainer.appendChild(submenu);
      li.appendChild(submenuContainer);
      
      // Toggle submenu on click
      const folderLabel = li.querySelector('.folder-label');
      folderLabel.addEventListener('click', () => {
        const isVisible = submenuContainer.style.display !== 'none';
        submenuContainer.style.display = isVisible ? 'none' : 'block';
        const arrow = folderLabel.querySelector('.arrow');
        arrow.textContent = isVisible ? '▶' : '▼';
      });
      
    } else if (item.type === 'snippet') {
      li.innerHTML = `
        <span class="snippet-label">
          <i class="snippet-icon">📄</i>
          ${item.label}
          <span class="category-badge">${item.category}</span>
        </span>
      `;
      
      li.addEventListener('click', () => {
        if (onSnippetClick) {
          onSnippetClick(item);
        }
      });
      
      // Add tooltip with code preview
      li.title = item.text.substring(0, 100) + (item.text.length > 100 ? '...' : '');
    }
    
    ul.appendChild(li);
  });
  
  parentElement.appendChild(ul);
  return ul;
}

/**
 * Insert snippet into a code editor (like CodeMirror)
 * @param {Object} snippet - Snippet object
 * @param {Object} editor - Code editor instance
 * @param {Object} options - Insert options
 */
function insertStrudelSnippet(snippet, editor, options = {}) {
  const { 
    replaceSelection = true,
    addNewLine = true,
    focus = true 
  } = options;
  
  let textToInsert = snippet.text;
  
  if (addNewLine && !textToInsert.endsWith('\n')) {
    textToInsert += '\n';
  }
  
  if (editor.replaceSelection && replaceSelection) {
    // CodeMirror-style editor
    editor.replaceSelection(textToInsert);
  } else if (editor.setValue) {
    // Simple editor with setValue
    const currentValue = editor.getValue();
    editor.setValue(currentValue + textToInsert);
  } else {
    // Fallback for textarea or other elements
    const cursorPos = editor.selectionStart;
    const textBefore = editor.value.substring(0, cursorPos);
    const textAfter = editor.value.substring(editor.selectionEnd);
    
    editor.value = textBefore + textToInsert + textAfter;
    
    if (focus) {
      editor.focus();
      const newCursorPos = cursorPos + textToInsert.length;
      editor.setSelectionRange(newCursorPos, newCursorPos);
    }
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    StrudelSnippetLibrary,
    loadStrudelSnippetLibrary,
    renderStrudelSnippetMenu,
    insertStrudelSnippet
  };
}

// Example usage:
/*
// Load the library
const library = await loadStrudelSnippetLibrary('./strudel-snippets.json');

// Search for patterns
const drumPatterns = library.searchSnippets('drum');
console.log('Drum patterns:', drumPatterns);

// Get a specific snippet
const helloPattern = library.getSnippet('Beginner/First Patterns/Hello Drums');
console.log('Hello pattern:', helloPattern.text);

// Get all beginner snippets
const beginnerSnippets = library.getSnippetsByCategory('Beginner');

// Get statistics
const stats = library.getStats();
console.log('Library stats:', stats);

// Generate menu for UI
const menuStructure = library.generateMenuStructure();
const menuContainer = document.getElementById('snippet-menu');
renderStrudelSnippetMenu(menuStructure, menuContainer, (snippet) => {
  console.log('Selected snippet:', snippet);
  // Insert into editor, copy to clipboard, etc.
});

// Get random inspiration
const randomSnippet = library.getRandomSnippet('Effects & Processing');
console.log('Random effect snippet:', randomSnippet);
*/