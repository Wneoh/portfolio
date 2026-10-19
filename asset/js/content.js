document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
toggle.hidden = false;
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();

for(const project of ['relaydesk','bancom','lits']){
const gallery=document.getElementById(project+'-gallery'),slides=[...gallery.querySelectorAll('[data-gallery-slide]')],tabs=[...gallery.querySelectorAll('[data-gallery-index]')];let slideIndex=0,opener;
function showSlide(index){slideIndex=(index+slides.length)%slides.length;slides.forEach((slide,i)=>slide.hidden=i!==slideIndex);tabs.forEach((tab,i)=>tab.setAttribute('aria-pressed',String(i===slideIndex)));gallery.querySelector('[data-gallery-count]').textContent=(slideIndex+1)+' / '+slides.length;}
document.querySelectorAll('[data-'+project+'-gallery]').forEach(trigger=>trigger.addEventListener('click',event=>{event.preventDefault();opener=event.currentTarget;showSlide(Number(event.currentTarget.dataset.galleryStart || 0));gallery.showModal();document.body.classList.add('gallery-open');gallery.querySelector('[data-gallery-close]').focus();}));
gallery.querySelector('[data-gallery-close]').onclick=()=>gallery.close();gallery.querySelector('[data-gallery-prev]').onclick=()=>showSlide(slideIndex-1);gallery.querySelector('[data-gallery-next]').onclick=()=>showSlide(slideIndex+1);tabs.forEach((tab,i)=>tab.onclick=()=>showSlide(i));gallery.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();showSlide(slideIndex+1);}if(event.key==='ArrowLeft'){event.preventDefault();showSlide(slideIndex-1);}});gallery.addEventListener('close',()=>{document.body.classList.remove('gallery-open');opener?.focus();});gallery.addEventListener('click',event=>{if(event.target===gallery){const r=gallery.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)gallery.close();}});

}
