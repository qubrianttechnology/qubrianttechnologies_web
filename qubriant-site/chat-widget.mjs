export const chatWidget = `<button type="button" class="ai-chat-launcher" aria-label="Open Qubriant AI assistant" aria-expanded="false" aria-controls="ai-chat-panel"><span aria-hidden="true">✦</span><span>Ask Qubriant</span></button>
<section id="ai-chat-panel" class="ai-chat-panel" role="dialog" aria-label="Qubriant AI assistant" hidden>
<header class="ai-chat-header"><span class="ai-chat-avatar" aria-hidden="true">&#129302;</span><div><strong>Qubriant assistant</strong><small>AI help for your next idea</small></div><button type="button" class="ai-chat-close" aria-label="Close assistant">×</button></header>
<div class="ai-chat-messages" role="log" aria-live="polite" aria-label="Chat messages"><div class="ai-message assistant">Hi! I’m Qubriant’s AI assistant. Ask me about our services, projects, or your next idea. සිංහලෙන් කතා කරන්නත් පුළුවන්!</div></div>
<div class="ai-chat-prompts"><button type="button">What can you build?</button><button type="button">Help me plan a website</button><button type="button">Show me your projects</button></div>
<p class="ai-chat-status" role="status"></p><button class="ai-chat-retry" type="button" hidden>Retry message</button>
<form class="ai-chat-form"><label class="sr-only" for="ai-chat-input">Your message</label><textarea id="ai-chat-input" name="message" rows="2" maxlength="2000" placeholder="Tell us about your idea…" required></textarea><button type="submit" aria-label="Send message">↑</button></form>
<p class="ai-chat-disclosure">AI can make mistakes. Messages are sent to our AI provider to answer you. Please don’t share sensitive information. <a href="privacy.html">Privacy</a></p>
<footer class="ai-chat-footer"><button type="button" class="ai-chat-clear">New chat</button><a href="https://wa.me/94722616616" target="_blank" rel="noopener">Talk to our team ↗</a></footer>
</section>`;
