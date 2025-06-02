const API_URL = 'https://api.deepai.org/api/text2img';
const API_KEY = '4e875ad8-76b7-403a-8d28-5e1ebb881249';

const promptEl = document.getElementById('prompt');
const genBtn = document.getElementById('generate');
const gallery = document.getElementById('gallery');

genBtn.addEventListener('click', async () => {
  const txt = promptEl.value.trim();
  if (!txt) return;
  genBtn.disabled = true;
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = 'Generating...';
  gallery.prepend(card);
  promptEl.value = '';
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Api-Key': API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: txt })
    });
    const data = await res.json();
    const url = data.output_url;
    card.innerHTML = `<img src="${url}" alt="AI Image" class="full-size" onclick="showFullscreen(this.src)" /><br/><a class="download" href="${url}" download="generated.png">Download Full</a>`;
  } catch (e) {
    card.textContent = 'Error generating image';
  } finally {
    genBtn.disabled = false;
  }
});



function showFullscreen(src) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 9999;

  const img = document.createElement('img');
  img.src = src;
  img.style.maxWidth = '90vw';
  img.style.maxHeight = '90vh';
  img.style.borderRadius = '16px';
  img.style.boxShadow = '0 0 30px rgba(255,255,255,0.2)';
  img.onclick = () => document.body.removeChild(overlay);

  overlay.appendChild(img);
  document.body.appendChild(overlay);
}
