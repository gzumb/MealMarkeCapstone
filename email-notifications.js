<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <!-- Disable Cloudflare email obfuscation -->
  <meta name="cf-2fa-verify" content="no">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Browse Meals – PointSwap</title>
 <link rel="stylesheet" href="styles.css">
 <style>
 .filter-bar {
 background: #fff;
 border: 1px solid var(--border);
 border-radius: var(--r-lg);
 padding: 1rem 1.5rem;
 display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap;
 margin-bottom: 2rem;
 box-shadow: var(--shadow);
 border-top: 3px solid var(--umb-blue);
 }
 .filter-bar .form-group { margin-bottom: 0; min-width: 140px; flex: 1; }

 .listings-grid {
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
 gap: 1.5rem;
 }

 .listing-card {
 background: #fff;
 border-radius: var(--r-lg);
 border: 1px solid var(--border);
 border-top: 3px solid var(--umb-blue);
 overflow: hidden;
 transition: all .2s;
 box-shadow: var(--shadow);
 animation: fadeUp .3s ease both;
 }
 @keyframes fadeUp {
 from { opacity:0; transform:translateY(8px); }
 to { opacity:1; transform:translateY(0); }
 }
 .listing-card:hover {
 transform: translateY(-3px);
 box-shadow: var(--shadow-lg);
 border-top-color: var(--umb-gold);
 }
 .listing-card-header {
 background: var(--bg-alt);
 border-bottom: 1px solid var(--border);
 padding: .9rem 1.2rem;
 display: flex; justify-content: space-between; align-items: flex-start;
 }
 .listing-hall { font-family:'Source Serif 4',Georgia,serif; font-size:1rem; color:var(--umb-blue-dark); font-weight:700; }
 .listing-time { font-size:.72rem; color:var(--muted); margin-top:.15rem; }
 .listing-body { padding: 1.2rem; }

 .listing-prices {
 display: flex; align-items: baseline; gap: .65rem; margin-bottom: .9rem;
 }
 .price-offer { font-family:'Source Serif 4',Georgia,serif; font-size:2rem; color:var(--umb-blue-dark); font-weight:700; }
 .price-original { font-size:.9rem; color:var(--muted); text-decoration:line-through; }
 .price-savings {
 font-size:.68rem; font-weight:700; color:#065f46;
 background:#d1fae5; padding:.18rem .5rem; border-radius:3px;
 text-transform:uppercase; letter-spacing:.04em;
 }

 .seller-row {
 display:flex; align-items:center; gap:.6rem; margin-bottom:.8rem;
 }
 .seller-avatar {
 overflow:hidden; text-decoration:none;
 }
 .seller-avatar-img { width:100%; height:100%; object-fit:cover; display:block; }
 .seller-avatar {
 width:32px; height:32px; border-radius:50%;
 background:var(--umb-blue); color:#fff;
 display:flex; align-items:center; justify-content:center;
 font-weight:700; font-size:.75rem; flex-shrink:0;
 }
 .seller-name { font-size:.875rem; font-weight:700; }
 .seller-rating { font-size:.72rem; color:var(--muted); }

 .listing-notes {
 font-size:.8rem; color:var(--muted);
 margin-bottom:.85rem; line-height:1.5; font-style:italic;
 display: -webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
 }
 .modal-overlay { display:none; align-items:center; justify-content:center; }
 .modal-overlay.open { display:flex; }
 
    /* Semester countdown widget */
    .semester-widget {
      background: var(--umb-blue-dark);
      border-radius: var(--r-lg);
      padding: 1.25rem 1.5rem;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
      position: relative;
      overflow: hidden;
    }
    .semester-widget::before {
      content: '';
      position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, var(--umb-blue), var(--umb-gold), var(--umb-red));
    }
    .semester-widget-label {
      font-size: .7rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: .1em; color: rgba(255,255,255,.5);
      margin-bottom: .2rem;
    }
    .semester-widget-title {
      font-family: 'Source Serif 4', Georgia, serif;
      font-size: 1rem; color: #fff; font-weight: 700;
    }
    .semester-widget-sub {
      font-size: .75rem; color: rgba(255,255,255,.55); margin-top: .15rem;
    }
    .countdown-tiles {
      display: flex; gap: .65rem; align-items: center;
    }
    .countdown-tile {
      background: rgba(255,255,255,.1);
      border-radius: var(--r);
      padding: .5rem .75rem;
      text-align: center; min-width: 52px;
    }
    .countdown-tile-num {
      font-family: 'Source Serif 4', Georgia, serif;
      font-size: 1.5rem; font-weight: 700; color: var(--umb-gold);
      line-height: 1;
    }
    .countdown-tile-lbl {
      font-size: .6rem; color: rgba(255,255,255,.5);
      text-transform: uppercase; letter-spacing: .08em;
      margin-top: .2rem;
    }
    .countdown-sep {
      font-size: 1.2rem; color: rgba(255,255,255,.3); font-weight: 700;
    }
    .urgency-bar-wrap {
      flex: 1; min-width: 140px;
    }
    .urgency-bar-track {
      height: 6px; background: rgba(255,255,255,.12);
      border-radius: 3px; overflow: hidden; margin-top: .5rem;
    }
    .urgency-bar-fill {
      height: 100%; border-radius: 3px;
      transition: width .5s ease;
    }
    .urgency-bar-label {
      font-size: .72rem; color: rgba(255,255,255,.55); margin-top: .35rem;
    }
    .semester-link {
      font-size: .72rem; color: rgba(255,255,255,.45);
      text-decoration: none; white-space: nowrap;
      transition: color .15s;
    }
    .semester-link:hover { color: var(--umb-gold); }
    @media (max-width: 600px) {
      .semester-widget { flex-direction: column; align-items: flex-start; }
      .countdown-tiles { flex-wrap: wrap; }
    }

    @media (max-width: 600px) {
      .filter-bar { flex-direction: column; }
      .filter-bar .form-group { min-width: 100%; }
      .listings-grid { grid-template-columns: 1fr; }
      .page-header { flex-direction: column; align-items: flex-start; }
    }
  </style>
</head>
<body>

<script>
// Safety fallback — hide loading overlay after 5s no matter what
setTimeout(function() {
  var el = document.getElementById('auth-loading');
  if (el) el.style.display = 'none';
}, 2000);
</script>
<div id="auth-loading"  style="position:fixed;inset:0;background:var(--bg);display:flex;align-items:center;justify-content:center;z-index:999;">
  <div class="spinner" style="width:28px;height:28px;border-width:3px;border-color:rgba(0,90,139,.2);border-top-color:var(--umb-blue);"></div>
</div>
<div class="accent-bar"></div>
<nav class="nav">
 <a href="dashboard.html" class="nav-logo">
 <div class="nav-logo-icon" style="font-family:'Source Serif 4',Georgia,serif;font-size:.85rem;font-weight:700;letter-spacing:-.5px;">PS</div>
 <div>
 <div class="nav-logo-title">PointSwap</div>
 <div class="nav-logo-sub">UMass Boston Dining Exchange</div>
 </div>
 </a>
 <div class="nav-links">
 <a href="dashboard.html" class="nav-link active">Browse Meals</a>
 <a href="create.html" class="nav-link ">Post a Meal</a>
 <a href="messages.html" class="nav-link ">Messages</a>
 <a href="profile.html" class="nav-avatar" id="nav-avatar">?</a>
 </div>
  <button class="hamburger" id="hamburger" onclick="toggleNav()" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- Mobile nav drawer -->
<div class="mobile-nav-drawer" id="mobile-drawer">
  <a href="dashboard.html" class="mobile-nav-link active">Browse Meals</a>
  <a href="create.html" class="mobile-nav-link ">Post a Meal</a>
  <a href="messages.html" class="mobile-nav-link ">
    Messages <span class="mobile-nav-badge" id="mob-msg-badge" style="display:none;"></span>
  </a>
  <a href="profile.html" class="mobile-nav-link ">Profile</a>
</div>

<div class="page">
 <div class="page-header" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;">
 <div>
 <h1 class="page-title">Available Meals</h1>
 <p class="page-subtitle" id="count-label">Loading listings…</p>
 </div>
 <a href="create.html" class="btn btn-accent">+ Post a Meal</a>
 </div>

 <!-- Filters -->
 <div class="filter-bar">
 <div class="form-group">
 <label class="form-label">Dining Hall</label>
 <select class="form-select" id="f-hall">
 <option value="">All Locations</option>
 <option>Late Night Bites</option>
 <option>Dining Commons</option>
 <option>UMarket</option>
 <option>Beacon Café</option>
 <option>Campus Center Food Court</option>
 <option>Dunkin'</option>
        <option>Recreo Brew &amp; Bagel</option>
 </select>
 </div>
 <div class="form-group">
 <label class="form-label">Max Price</label>
 <select class="form-select" id="f-price">
 <option value="">Any Price</option>
 <option value="5">Under $5</option>
 <option value="7">Under $7</option>
 <option value="10">Under $10</option>
 </select>
 </div>
 <div class="form-group">
 <label class="form-label">Meal Period</label>
 <select class="form-select" id="f-time">
 <option value="">Any Time</option>
 <option value="breakfast">Breakfast (6–11am)</option>
 <option value="lunch">Lunch (11am–3pm)</option>
 <option value="dinner">Dinner (5–10pm)</option>
 </select>
 </div>
 <button class="btn btn-primary" onclick="applyFilters()">Filter</button>
 <button class="btn btn-outline" onclick="clearFilters()">Clear</button>
 </div>

 <div class="listings-grid" id="listings-grid"></div>

  <!-- Feedback banner -->
  <div style="margin-top:2.5rem;background:var(--umb-blue-lt);border:1px solid var(--umb-blue);border-radius:var(--r-lg);padding:1.25rem 1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
    <div>
      <div style="font-family:'Source Serif 4',Georgia,serif;font-size:1rem;font-weight:700;color:var(--umb-blue-dark);">Help us improve PointSwap</div>
      <div style="font-size:.825rem;color:var(--muted);margin-top:.2rem;">Share your experience — takes less than 2 minutes.</div>
    </div>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdUyonvfvlpv7T6oQ2jBR94P2aSyiAn9H2W5nlcPUN65PwCfQ/viewform?usp=publish-editor" target="_blank" class="btn btn-primary" style="flex-shrink:0;">Give Feedback</a>
  </div>

</div>

<!-- Request Modal -->
<div class="modal-overlay" id="req-modal">
 <div class="modal">
 <h3 class="modal-title">Request This Meal</h3>
 <p style="color:var(--muted);font-size:.875rem;margin-bottom:1.25rem;">
 The seller will review your request and reach out to arrange a meetup at the dining hall.
 </p>
 <div class="form-group">
 <label class="form-label">Note to Seller (optional)</label>
 <textarea class="form-textarea" id="req-msg" placeholder="Hey! I'm free around noon — does that work?" maxlength="280"></textarea>
 </div>
 <div style="display:flex;gap:.75rem;">
 <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
 <button class="btn btn-accent" id="btn-req" onclick="submitRequest()" style="flex:1;">Send Request →</button>
 </div>
 </div>
</div>

<div class="toast-container" id="toasts"></div>

<script type="module">
 import { auth, db } from './firebase-config.js';
 import { initNotifications } from './nav-notifications.js';
 import { notifyNewRequest } from './email-notifications.js';
 import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
 import {
 collection, query, orderBy, onSnapshot,
 addDoc, doc, getDoc, setDoc, serverTimestamp
 } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

 let me = null, meData = null;
 let allListings = [];
 let selListing = null; // selected listing object for modal

 // Auth guard 
 onAuthStateChanged(auth, async u => {
 if (!u) return (window.location.href = 'index.html');

 me = u;
 const snap = await getDoc(doc(db, 'users', u.uid));
 meData = snap.exists() ? snap.data() : { name: u.displayName || u.email?.split('@')[0] || 'User' };
 // If no Firestore doc yet (e.g. new Microsoft user), create one
 if (!snap.exists()) {
   const domain = u.email?.split('@')[1] || '';
   const domainMap = { 'umb.edu':'UMass Boston','umass.edu':'UMass Amherst','bu.edu':'Boston University','neu.edu':'Northeastern' };
   await setDoc(doc(db, 'users', u.uid), {
     name: u.displayName || u.email?.split('@')[0] || 'User',
     email: u.email || '',
     university: domainMap[domain] || 'UMass Boston',
     avgRating: 0, ratingCount: 0, totalSold: 0, totalBought: 0,
     createdAt: serverTimestamp()
   });
   meData = (await getDoc(doc(db, 'users', u.uid))).data();
 }
 applyAvatar('nav-avatar', meData);
 initNotifications(u.uid);
 subscribeListings();
 });

 // Real-time listings 
 function subscribeListings() {
 const q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'));
 onSnapshot(q, snap => {
 allListings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
 applyFilters();
 });
 }



 async function getExistingConversationIdForListing(listing) {
 if (!me?.uid || !listing?.sellerId || !listing?.id) return null;
 const convId = [me.uid, listing.sellerId].sort().join('_') + '_' + listing.id;
 try {
 const convSnap = await getDoc(doc(db, 'conversations', convId));
 return convSnap.exists() ? convId : null;
 } catch (e) {
 console.warn('conversation check failed', e);
 return null;
 }
 }

 function goToExistingConversation(convId) {
 if (!convId) return;
 sessionStorage.setItem('openChatNotice', 'You already contacted this seller for this listing.');
 window.location.href = 'messages.html?cid=' + encodeURIComponent(convId);
 }

 // Render 
 function renderListings(list) {
 // Exclude own listings and non-active
 const visible = list.filter(l => l.sellerId !== me.uid && l.status === 'active');
 const grid = document.getElementById('listings-grid');
 document.getElementById('count-label').textContent =
 `${visible.length} meal${visible.length !== 1 ? 's' : ''} available right now`;

 if (!visible.length) {
 grid.innerHTML = `
 <div class="empty-state" style="grid-column:1/-1">
 
 <h3>No meals available right now</h3>
 <p>Check back soon, or be the first to post a meal!</p>
 <a href="create.html" class="btn btn-accent" style="margin-top:1rem;">Post a Meal</a>
 </div>`;
 return;
 }

 grid.innerHTML = visible.map((l, i) => {
 const savings = Math.round(((l.mealValue - l.price) / l.mealValue) * 100);
 const d = l.availableAt?.toDate ? l.availableAt.toDate() : new Date();
 const dateStr = d.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });
 const timeStr = d.toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });
 const stars = '★'.repeat(Math.round(l.sellerRating || 0)) + '☆'.repeat(5 - Math.round(l.sellerRating || 0));
 const initial = (l.sellerName || '?')[0].toUpperCase();
 const avatarHtml = l.sellerPhoto
   ? `<img src="${escAttr(l.sellerPhoto)}" alt="${escAttr(l.sellerName)}" class="seller-avatar-img">`
   : escHtml(initial);

 return `
 <div class="listing-card" style="animation-delay:${i * 0.05}s">
 <div class="listing-card-header">
 <div>
 <div class="listing-hall">${l.diningHall}</div>
 <div class="listing-time">${dateStr} · ${timeStr}</div>
 </div>
 <span class="badge badge-green">Active</span>
 </div>
 <div class="listing-body">
 <div class="listing-prices">
 <span class="price-offer">$${l.price.toFixed(2)}</span>
 <span class="price-original">$${l.mealValue.toFixed(2)}</span>
 <span class="price-savings">Save ${savings}%</span>
 </div>
 <div class="seller-row">
 <a href="user-profile.html?uid=${l.sellerId}" class="seller-avatar" title="View seller profile">${avatarHtml}</a>
 <div>
 <div class="seller-name"><a href="user-profile.html?uid=${l.sellerId}" style="color:inherit;text-decoration:none;">${escHtml(l.sellerName)}</a> <span style="display:inline-block;margin-left:.35rem;padding:.15rem .45rem;border-radius:999px;background:#eff6ff;color:#1d4ed8;font-size:.65rem;font-weight:800;vertical-align:middle;">Verified</span></div>
 <div class="seller-rating">
 <span style="color:var(--accent)">${stars}</span>
 ${l.sellerRating ? ` ${l.sellerRating.toFixed(1)} (${l.sellerRatingCount} reviews)` : ' Verified student'}
 </div>
 <div class="seller-rating">${l.sellerRatingCount || 0} review${(l.sellerRatingCount || 0) === 1 ? '' : 's'}</div>
 </div>
 </div>
 ${l.notes ? `<p class="listing-notes">"${l.notes}"</p>` : ''}
 <button class="btn btn-primary btn-full req-btn"
 data-listing-id="${l.id}"
 onclick='openModal(${JSON.stringify({ id: l.id, sellerId: l.sellerId, sellerName: l.sellerName, diningHall: l.diningHall, price: l.price })})'>
 Request This Meal →
 </button>
 </div>
 </div>`;
 }).join('');
 }


 async function hydrateExistingContactButtons(list) {
 const visible = list.filter(l => l.sellerId !== me.uid && l.status === 'active');
 for (const l of visible) {
 const btn = document.querySelector(`.req-btn[data-listing-id="${CSS.escape(l.id)}"]`);
 if (!btn) continue;
 const existingConvId = await getExistingConversationIdForListing(l);
 if (existingConvId) {
 btn.textContent = 'Open Chat →';
 btn.classList.remove('btn-primary');
 btn.classList.add('btn-outline');
 btn.dataset.existingConvId = existingConvId;
 btn.title = 'You already contacted this seller for this listing';
 } else {
 btn.textContent = 'Request This Meal →';
 btn.classList.remove('btn-outline');
 btn.classList.add('btn-primary');
 btn.removeAttribute('data-existing-conv-id');
 btn.title = '';
 }
 }
 }

 // Filters 
 window.applyFilters = () => {
 let list = [...allListings];
 const hall = document.getElementById('f-hall').value;
 const price = document.getElementById('f-price').value;
 const time = document.getElementById('f-time').value;
 if (hall) list = list.filter(l => l.diningHall === hall);
 if (price) list = list.filter(l => l.price <= parseFloat(price));
 if (time) list = list.filter(l => {
 const h = l.availableAt?.toDate ? l.availableAt.toDate().getHours() : 12;
 if (time === 'breakfast') return h >= 6 && h < 11;
 if (time === 'lunch') return h >= 11 && h < 15;
 if (time === 'dinner') return h >= 17 && h < 22;
 });
 renderListings(list);
 hydrateExistingContactButtons(list);
 };
 window.clearFilters = () => {
 ['f-hall','f-price','f-time'].forEach(id => document.getElementById(id).value = '');
 renderListings(allListings);
 };

 // Modal 
 window.openModal = async (listing) => {
 selListing = listing;
 const existingConvId = await getExistingConversationIdForListing(listing);
 if (existingConvId) {
 goToExistingConversation(existingConvId);
 return;
 }
 document.getElementById('req-msg').value = '';
 document.getElementById('req-modal').classList.add('open');
 };
 window.closeModal = () => {
 document.getElementById('req-modal').classList.remove('open');
 selListing = null;
 };
 document.getElementById('req-modal').addEventListener('click', e => {
 if (e.target === e.currentTarget) window.closeModal();
 });

 const MAX_REQUEST_MSG_LEN = 280;
 function cleanText(v) { return (v || '').replace(/\s+/g, ' ').trim(); }

 // Submit request 
 window.submitRequest = async () => {
 if (!selListing) return;
 const btn = document.getElementById('btn-req');
 const msg = cleanText(document.getElementById('req-msg').value);
 if (msg.length > MAX_REQUEST_MSG_LEN) {
   toast(`Message must be ${MAX_REQUEST_MSG_LEN} characters or fewer.`, 'error');
   return;
 }
 document.getElementById('req-msg').value = msg;
 btn.disabled = true;
 btn.innerHTML = '<div class="spinner"></div>';

 try {
 const existingConvId = await getExistingConversationIdForListing(selListing);
 if (existingConvId) {
 window.closeModal();
 goToExistingConversation(existingConvId);
 return;
 }

 // 1. Write request document
 const reqRef = await addDoc(collection(db, 'requests'), {
 listingId: selListing.id,
 buyerId: me.uid,
 buyerName: meData.name,
 sellerId: selListing.sellerId,
 sellerName: selListing.sellerName,
 message: msg,
 status: 'pending',
 createdAt: serverTimestamp()
 });

 // 1b. Notify seller by email
 try {
 const sellerSnap = await getDoc(doc(db, 'users', selListing.sellerId));
 if (sellerSnap.exists()) {
 const seller = sellerSnap.data();
 await notifyNewRequest({
 toEmail: seller.email,
 toName: seller.name,
 buyerName: meData.name,
 diningHall: selListing.diningHall,
 price: selListing.price,
 message: msg
 });
 }
 } catch(e) { console.warn('Email notify failed:', e); }

 // 2. Create / upsert conversation
 const convId = [me.uid, selListing.sellerId].sort().join('_') + '_' + selListing.id;
 await setDoc(doc(db, 'conversations', convId), {
 participants: [me.uid, selListing.sellerId],
 listingId: selListing.id,
 lastMessage: msg || `Meal request for ${selListing.diningHall}`,
 lastMessageAt: serverTimestamp(),
 lastSenderId: me.uid,
 participantNames: {
 [me.uid]: meData.name,
 [selListing.sellerId]: selListing.sellerName
 }
 }, { merge: true });

 // 3. Send first message if there's a note
 if (msg) {
 await addDoc(collection(db, 'conversations', convId, 'messages'), {
 senderId: me.uid,
 senderName: meData.name,
 text: msg,
 createdAt: serverTimestamp()
 });
 }

 window.closeModal();
 toast('Request sent! Check Messages for updates.', 'success');
 } catch(e) {
 console.error(e);
 toast('Failed to send request. Try again.', 'error');
 }
 btn.disabled = false;
 btn.textContent = 'Send Request →';
 };

 // Toast 
 
  function escHtml(s) {
    if (!s) return '';
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function escAttr(s) {
    if (!s) return '';
    return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

 function applyAvatar(id, user) {
    const el = document.getElementById(id);
    if (!el) return;
    const init = ((user?.name || '?')[0] || '?').toUpperCase();
    if (user?.profilePhoto) {
      el.textContent = '';
      el.style.backgroundImage = "url('" + user.profilePhoto + "')";
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.classList.add('has-photo');
    } else {
      el.textContent = init;
      el.style.backgroundImage = '';
      el.classList.remove('has-photo');
    }
  }

 
  // ── UMB Semester Countdown (data from umb-calendar.json) ───
  (function initCountdown() {

    function pad(n) { return String(n).padStart(2, '0'); }

    function getColor(pct) {
      if (pct >= 85) return '#ef4444';
      if (pct >= 65) return '#f59e0b';
      return 'var(--umb-gold)';
    }

    function getMessage(days) {
      if (days <= 7)  return 'Semester ending soon — use your dining points now!';
      if (days <= 14) return 'Under 2 weeks left — great time to list or buy!';
      if (days <= 30) return 'About a month left in the semester.';
      return 'Semester in progress — browse available meals below.';
    }

    function runCountdown(semesters) {
      const now = new Date();

      // Find active or next upcoming semester
      let current = null, phase = '';
      for (const s of semesters) {
        const start     = new Date(s.start);
        const finalsEnd = new Date(s.finalsEnd);
        if (now >= start && now <= finalsEnd) { current = s; phase = 'active'; break; }
      }
      if (!current) {
        for (const s of semesters) {
          if (now < new Date(s.start)) { current = s; phase = 'upcoming'; break; }
        }
      }

      const titleEl = document.getElementById('sw-title');
      const subEl   = document.getElementById('sw-sub');
      const barEl   = document.getElementById('sw-bar');
      const pctEl   = document.getElementById('sw-pct-label');
      if (!titleEl) return;

      if (!current) {
        titleEl.textContent = 'Between semesters';
        subEl.textContent   = 'Check back when the next semester begins.';
        return;
      }

      const target = phase === 'active' ? new Date(current.finalsEnd) : new Date(current.start);
      const diff   = target - now;
      if (diff <= 0) { titleEl.textContent = current.name + ' has ended'; return; }

      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000)  / 60000);

      document.getElementById('sw-days').textContent  = pad(days);
      document.getElementById('sw-hours').textContent = pad(hours);
      document.getElementById('sw-mins').textContent  = pad(mins);

      if (phase === 'active') {
        const total   = new Date(current.finalsEnd) - new Date(current.start);
        const elapsed = now - new Date(current.start);
        const pct     = Math.min(100, Math.round((elapsed / total) * 100));
        titleEl.textContent    = current.name + ' — ' + days + ' day' + (days !== 1 ? 's' : '') + ' left';
        subEl.textContent      = getMessage(days);
        pctEl.textContent      = pct + '% of semester completed · Source: umb.edu/registrar';
        barEl.style.width      = pct + '%';
        barEl.style.background = getColor(pct);
      } else {
        const daysUntil = Math.ceil((new Date(current.start) - now) / 86400000);
        titleEl.textContent = current.name + ' starts in ' + daysUntil + ' day' + (daysUntil !== 1 ? 's' : '');
        subEl.textContent   = 'Begins ' + new Date(current.start).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
        pctEl.textContent   = 'Get ready — post your listings early!';
        barEl.style.width   = '5%';
        barEl.style.background = 'var(--umb-gold)';
      }
    }

    // Fetch dates from umb-calendar.json (easy to update each year)
    fetch('umb-calendar.json?v=' + Date.now())
      .then(r => r.json())
      .then(data => {
        const semesters = data.semesters;
        runCountdown(semesters);
        setInterval(() => runCountdown(semesters), 60000);
      })
      .catch(() => {
        // Fallback if fetch fails
        document.getElementById('sw-title').textContent = 'UMass Boston Semester';
        document.getElementById('sw-sub').textContent   = 'Visit umb.edu/registrar for dates';
      });
  })();

function toast(msg, type = '') {
 const t = document.createElement('div');
 t.className = `toast ${type}`;
 t.textContent = msg;
 document.getElementById('toasts').appendChild(t);
 setTimeout(() => t.remove(), 4500);
 }


window.toggleNav = function() {
  var btn    = document.getElementById('hamburger');
  var drawer = document.getElementById('mobile-drawer');
  if (!btn || !drawer) return;
  var open   = drawer.classList.toggle('open');
  btn.classList.toggle('open', open);
}
document.addEventListener('click', function(e) {
  var drawer = document.getElementById('mobile-drawer');
  var btn    = document.getElementById('hamburger');
  if (!drawer || !btn) return;
  if (!drawer.contains(e.target) && !btn.contains(e.target)) {
    drawer.classList.remove('open');
    btn.classList.remove('open');
  }
});
setInterval(function() {
  var desktop = document.querySelector('#nav-notif-msgs');
  var mob = document.getElementById('mob-msg-badge');
  if (!desktop || !mob) return;
  var count = desktop.textContent;
  if (count && desktop.style.display !== 'none') {
    mob.textContent = count; mob.style.display = 'inline';
  } else { mob.style.display = 'none'; }
}, 1000);

</script>

<!-- Floating feedback button -->
<a href="https://docs.google.com/forms/d/e/1FAIpQLSdUyonvfvlpv7T6oQ2jBR94P2aSyiAn9H2W5nlcPUN65PwCfQ/viewform?usp=publish-editor" target="_blank"
  style="position:fixed;bottom:1.5rem;left:1.5rem;z-index:200;
    background:var(--umb-blue);color:#fff;
    padding:.5rem 1rem;border-radius:99px;
    font-size:.75rem;font-weight:700;text-decoration:none;
    box-shadow:0 2px 12px rgba(0,50,90,.25);
    display:flex;align-items:center;gap:.4rem;
    transition:all .15s;"
  onmouseover="this.style.background='var(--umb-blue-dark)';this.style.transform='translateY(-2px)'"
  onmouseout="this.style.background='var(--umb-blue)';this.style.transform=''"
  title="Share your feedback about PointSwap">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
  Feedback
</a>

<!-- Site Footer -->
<footer style="margin-top:3rem;background:var(--umb-blue-dark);padding:1.75rem 2rem;border-top:3px solid var(--umb-gold);">
  <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">

    <!-- Left: brand -->
    <div style="display:flex;align-items:center;gap:.75rem;">
      <div style="width:32px;height:32px;background:var(--umb-gold);border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'Source Serif 4',Georgia,serif;font-size:.8rem;font-weight:700;color:var(--umb-blue-dark);flex-shrink:0;">PS</div>
      <div>
        <div style="font-family:'Source Serif 4',Georgia,serif;font-weight:700;color:#fff;font-size:.9rem;line-height:1.2;">PointSwap</div>
        <div style="font-size:.68rem;color:rgba(255,255,255,.45);letter-spacing:.05em;text-transform:uppercase;">UMass Boston Dining Exchange</div>
      </div>
    </div>

    <!-- Center: links -->
    <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
      <a href="tos.html" style="color:rgba(255,255,255,.55);font-size:.78rem;text-decoration:none;transition:color .15s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.55)'">Terms of Service</a>
      <a href="https://www.umb.edu/registrar/academic-calendar/" target="_blank" style="color:rgba(255,255,255,.55);font-size:.78rem;text-decoration:none;transition:color .15s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.55)'">UMB Calendar</a>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSdUyonvfvlpv7T6oQ2jBR94P2aSyiAn9H2W5nlcPUN65PwCfQ/viewform?usp=publish-editor" target="_blank" style="color:rgba(255,255,255,.55);font-size:.78rem;text-decoration:none;transition:color .15s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.55)'">Give Feedback</a>
    </div>

    <!-- Right: Instagram -->
    <a href="https://www.instagram.com/pointswap.umb/" target="_blank" rel="noopener"
      style="display:flex;align-items:center;gap:.6rem;text-decoration:none;
        background:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);
        padding:.55rem 1rem;border-radius:99px;
        color:#fff;font-size:.8rem;font-weight:700;
        box-shadow:0 2px 12px rgba(0,0,0,.25);
        transition:all .15s;flex-shrink:0;"
      onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 18px rgba(0,0,0,.35)'"
      onmouseout="this.style.transform='';this.style.boxShadow='0 2px 12px rgba(0,0,0,.25)'">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
      @pointswap.umb
    </a>

  </div>

  <div style="max-width:1200px;margin:.75rem auto 0;padding-top:.75rem;border-top:1px solid rgba(255,255,255,.08);text-align:center;">
    <span style="font-size:.68rem;color:rgba(255,255,255,.3);">© 2025 PointSwap · A UMass Boston student project · Not affiliated with UMass Boston Dining Services</span>
  </div>
</footer>

</body>
</html>
