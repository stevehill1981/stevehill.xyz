export function enhanceCodeBlocks() {
  // Support both astro-code (standard Shiki) and shiki (CSS Highlights API)
  const codeBlocks = document.querySelectorAll('pre.astro-code, pre.shiki');

  codeBlocks.forEach((block) => {
    // Check if already enhanced
    if (block.parentElement?.classList.contains('enhanced-code-block')) return;

    // Create toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';

    // Get language from class or data attribute
    const langMatch = block.className.match(/language-(\w+)/);
    const dataLang = block.dataset.language;
    const lang = langMatch ? langMatch[1] : (dataLang || 'code');
    
    // Create language label
    const langLabel = document.createElement('span');
    langLabel.className = 'code-lang-label';
    langLabel.textContent = lang;
    toolbar.appendChild(langLabel);
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span>Copy</span>
    `;
    
    copyButton.addEventListener('click', async () => {
      // Get code content - handle both regular code elements and shiki structure
      const codeElement = block.querySelector('code');
      const code = codeElement?.textContent || block.textContent || '';
      
      try {
        await navigator.clipboard.writeText(code);
        const span = copyButton.querySelector('span');
        span.textContent = 'Copied!';
        copyButton.classList.add('copied');
        
        setTimeout(() => {
          span.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    });
    
    toolbar.appendChild(copyButton);
    
    // Wrap the pre in a container
    const container = document.createElement('div');
    container.className = 'enhanced-code-block';
    block.parentNode.insertBefore(container, block);
    container.appendChild(toolbar);
    container.appendChild(block);
  });
}