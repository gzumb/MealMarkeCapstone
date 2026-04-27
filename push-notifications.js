<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <!-- Disable Cloudflare email obfuscation -->
  <meta name="cf-2fa-verify" content="no">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Profile – PointSwap</title>
 <link rel="stylesheet" href="styles.css">
 <style>
 .profile-layout {
 display: grid; grid-template-columns: 260px 1fr; gap: 2rem; align-items: start;
 }
 .profile-sidebar { position: sticky; top: 5.5rem; }
 .profile-card { text-align: center; padding: 2rem 1.5rem; border-top: 3px solid var(--umb-blue); }
 .profile-avatar {
 width: 80px; height: 80px; border-radius: 50%;
 background: var(--umb-blue); color: #fff;
 display: flex; align-items: center; justify-content: center;
 font-family: 'Source Serif 4', Georgia, serif;
 font-size: 2rem; font-weight: 700; margin: 0 auto 1rem;
 overflow:hidden; background-size:cover; background-position:center;
 }
 .profile-avatar.has-photo { color: transparent; font-size:0; background-color:#dbeafe; }
 .profile-name { font-family:'Source Serif 4',Georgia,serif; font-size:1.25rem; color:var(--umb-blue-dark); font-weight:700; }
 .profile-uni { font-size:.8rem; color:var(--muted); margin-top:.2rem; margin-bottom:1.25rem; }
 .stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:.6rem; margin-bottom:1.5rem; }
 .stat-cell { background:var(--bg-alt); border-radius:var(--r); padding:.75rem .5rem; border:1px solid var(--border); }
 .stat-cell-val { font-family:'Source Serif 4',Georgia,serif; font-size:1.4rem; color:var(--umb-blue-dark); font-weight:700; }
 .stat-cell-lbl { font-size:.68rem; color:var(--muted); text-transform:uppercase; letter-spacing:.06em; }

 .tabs {
 display: flex; border-bottom: 2px solid var(--border);
 margin-bottom: 1.5rem;
 }
 .tab {
 padding: .6rem 1.1rem; font-size: .875rem; font-weight: 700;
 cursor: pointer; color: var(--muted);
 border-bottom: 3px solid transparent; margin-bottom: -2px; transition: all .15s;
 }
 .tab.active { color: var(--umb-blue); border-bottom-color: var(--umb-blue); }
 .tab-panel { display: none; }
 .tab-panel.active { display: block; }

 .req-item {
 display: flex; gap: 1rem; align-items: flex-start;
 padding: 1rem 1.1rem;
 border: 1px solid var(--border); border-radius: var(--r);
 border-left: 3px solid var(--umb-blue);
 background: #fff; margin-bottom: .65rem;
 }
 .req-item:hover { border-left-color: var(--umb-gold); }
 .req-info { flex: 1; }
 .req-name { font-size: .9rem; font-weight: 700; }
 .req-meta { font-size: .78rem; color: var(--muted); margin-top: .15rem; }
 .req-msg { font-size: .8rem; color: var(--text); margin-top: .35rem; font-style: italic; }
 .req-actions { display: flex; gap: .5rem; flex-shrink: 0; }

 @media (max-width: 768px) {
 .profile-layout { grid-template-columns: 1fr; }
 .profile-sidebar { position: static; }
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
 <a href="dashboard.html" class="nav-link ">Browse Meals</a>
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
  <a href="dashboard.html" class="mobile-nav-link ">Browse Meals</a>
  <a href="create.html" class="mobile-nav-link ">Post a Meal</a>
  <a href="messages.html" class="mobile-nav-link ">
    Messages <span class="mobile-nav-badge" id="mob-msg-badge" style="display:none;"></span>
  </a>
  <a href="profile.html" class="mobile-nav-link active">Profile</a>
</div>

<div class="page">
 <div class="profile-layout">

 <!-- Sidebar -->
 <div class="profile-sidebar">
 <div class="card profile-card">
 <div class="profile-avatar" id="p-avatar">?</div>
 <input type="file" id="photo-input" accept="image/*" style="display:none;">
 <button class="btn btn-outline btn-full" id="btn-photo" style="margin:-.15rem auto 1rem;max-width:170px;padding:.45rem .75rem;font-size:.8rem;" onclick="triggerPhotoUpload()">Add Profile Picture</button>
 <div class="profile-name" id="p-name">Loading…</div>
 <div class="profile-uni" id="p-uni"></div>

 <div class="stat-grid">
 <div class="stat-cell">
 <div class="stat-cell-val" id="s-rating">—</div>
 <div class="stat-cell-lbl">Rating</div>
 </div>
 <div class="stat-cell">
 <div class="stat-cell-val" id="s-reviews">0</div>
 <div class="stat-cell-lbl">Reviews</div>
 </div>
 <div class="stat-cell">
 <div class="stat-cell-val" id="s-sold">0</div>
 <div class="stat-cell-lbl">Sold</div>
 </div>
 <div class="stat-cell">
 <div class="stat-cell-val" id="s-bought">0</div>
 <div class="stat-cell-lbl">Bought</div>
 </div>
 </div>

 <button class="btn btn-outline btn-full" onclick="doSignOut()" style="margin-bottom:.5rem;">Sign Out</button>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdUyonvfvlpv7T6oQ2jBR94P2aSyiAn9H2W5nlcPUN65PwCfQ/viewform?usp=publish-editor" target="_blank" class="btn btn-full" style="background:transparent;border:2px solid var(--umb-blue-lt);color:var(--umb-blue);font-size:.8rem;margin-bottom:.35rem;">Share Feedback</a>
        <button class="btn btn-full" onclick="openDeleteModal()"
          style="background:transparent;border:2px solid #fee2e2;color:#991b1b;font-size:.8rem;padding:.45rem;">
          Delete My Account
        </button>
 </div>
 </div>

 <!-- Main -->
 <div>
 <div class="tabs">
 <div class="tab active" onclick="switchTab('incoming')">
 Incoming Requests <span id="badge-incoming" style="display:none;background:var(--umb-blue);color:#fff;border-radius:99px;font-size:.7rem;padding:.1rem .45rem;margin-left:.3rem;"></span>
 </div>
 <div class="tab" onclick="switchTab('sent')">My Requests</div>
 <div class="tab" onclick="switchTab('history')">History</div>
 <div class="tab" onclick="switchTab('reviews')">My Reviews <span id="badge-reviews" style="display:none;background:var(--umb-gold);color:#fff;border-radius:99px;font-size:.7rem;padding:.1rem .45rem;margin-left:.3rem;"></span></div>
 </div>

 <!-- Incoming (as seller) -->
 <div class="tab-panel active" id="tab-incoming">
 <div id="incoming-list">
 <div style="color:var(--muted);font-size:.875rem;">Loading…</div>
 </div>
 </div>

 <!-- Sent (as buyer) -->
 <div class="tab-panel" id="tab-sent">
 <div id="sent-list">
 <div style="color:var(--muted);font-size:.875rem;">Loading…</div>
 </div>
 </div>

 <!-- History -->
 <div class="tab-panel" id="tab-history">
 <div id="history-list">
 <div style="color:var(--muted);font-size:.875rem;">Loading…</div>
 </div>
 </div>

 <!-- My Reviews -->
 <div class="tab-panel" id="tab-reviews" style="max-height:calc(100vh - 220px);overflow-y:auto;">
  <div id="reviews-list">
   <div style="text-align:center;padding:2.5rem 1rem;color:var(--muted);font-size:.875rem;">Loading reviews…</div>
  </div>
 </div>

 </div>
 </div>
</div>


<!-- Delete Account Modal -->
<div class="modal-overlay" id="delete-modal">
  <div class="modal" style="border-top-color:var(--umb-red);">
    <h3 class="modal-title" style="color:var(--umb-red);">Delete Account</h3>
    <p style="color:var(--muted);font-size:.875rem;margin-bottom:1.25rem;line-height:1.65;">
      This will permanently delete your account, all your listings, and all your data.
      This cannot be undone.
    </p>
    <div class="error-box" id="del-err"></div>
    <!-- Shown for email/password users only -->
    <div class="form-group" id="del-pw-group">
      <label class="form-label">Confirm your password to continue</label>
      <input type="password" class="form-input" id="del-pw" placeholder="Enter your password" />
    </div>
    <!-- Shown for Microsoft SSO users -->
    <div id="del-ms-group" style="display:none;background:var(--umb-blue-lt);border-radius:var(--r);padding:.75rem 1rem;margin-bottom:1rem;font-size:.825rem;color:var(--umb-blue-dark);">
      Your Microsoft account will be disconnected. Type <strong>DELETE</strong> to confirm.
      <input type="text" class="form-input" id="del-confirm-text" placeholder="Type DELETE" style="margin-top:.5rem;" />
    </div>
    <div style="display:flex;gap:.75rem;">
      <button class="btn btn-outline" onclick="closeDeleteModal()" style="flex:1;">Cancel</button>
      <button class="btn btn-red btn-full" id="btn-confirm-delete" onclick="confirmDelete()" style="flex:1;">
        Delete My Account
      </button>
    </div>
  </div>
</div>
<div class="toast-container" id="toasts"></div>

<!-- Rate modal -->
<div class="modal-overlay" id="rate-modal">
 <div class="modal">
 <h3 class="modal-title">Rate This Exchange</h3>
 <p style="color:var(--muted);font-size:.875rem;margin-bottom:1.25rem;">
 How was your experience with this student?
 </p>
 <div style="display:flex;gap:.5rem;justify-content:center;margin-bottom:1rem;" id="star-picker">
 <span class="star-btn" data-v="1" onclick="setStar(1)" style="font-size:2rem;cursor:pointer;color:var(--border);">★</span>
 <span class="star-btn" data-v="2" onclick="setStar(2)" style="font-size:2rem;cursor:pointer;color:var(--border);">★</span>
 <span class="star-btn" data-v="3" onclick="setStar(3)" style="font-size:2rem;cursor:pointer;color:var(--border);">★</span>
 <span class="star-btn" data-v="4" onclick="setStar(4)" style="font-size:2rem;cursor:pointer;color:var(--border);">★</span>
 <span class="star-btn" data-v="5" onclick="setStar(5)" style="font-size:2rem;cursor:pointer;color:var(--border);">★</span>
 </div>
 <div class="form-group" style="margin-bottom:1rem;">
   <label class="form-label" for="review-text">Optional comment</label>
   <textarea class="form-input" id="review-text" rows="3" placeholder="Share a quick note about this exchange" style="resize:vertical;min-height:92px;" maxlength="300"></textarea>
 </div>
 <div style="display:flex;gap:.75rem;">
 <button class="btn btn-outline" onclick="document.getElementById('rate-modal').classList.remove('open')">Skip</button>
 <button class="btn btn-accent" id="btn-rate" onclick="submitRating()" style="flex:1;">Submit Rating</button>
 </div>
 </div>
</div>

<script type="module">
 import { auth, db } from './firebase-config.js';
 import { initNotifications, ackAcceptedRequest } from './nav-notifications.js';
 import { notifyRequestAccepted } from './email-notifications.js';
 import { onAuthStateChanged, signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
 import {
 collection, query, where, orderBy, onSnapshot,
 doc, getDoc, updateDoc, deleteDoc, getDocs, serverTimestamp, increment
 } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

 let me = null, meData = null;
 let rateTarget = null; // { userId, requestId, role }
 const _ratedUsers = new Set(); // userIds already rated by me this session
 let selectedStar = 0;

 // Auth 
 onAuthStateChanged(auth, async u => {
 if (!u) return (window.location.href = 'index.html');

 me = u;
 const snap = await getDoc(doc(db, 'users', u.uid));
 meData = snap.exists() ? snap.data() : { name: u.displayName || u.email?.split('@')[0] || 'User', email: u.email || '' };
 renderProfile(meData);
 initNotifications(u.uid);
 listenIncoming();
 listenSent();
 listenHistory();
 });

 function renderProfile(d) {
 const init = (d.name || '?')[0].toUpperCase();
 applyAvatar('nav-avatar', d, true);
 applyAvatar('p-avatar', d, false);
 document.getElementById('btn-photo').textContent = d.profilePhoto ? 'Change Profile Picture' : 'Add Profile Picture';
 document.getElementById('p-name').textContent = d.name;
 const _domMap = {
      'umb':'UMass Boston','umass':'UMass Amherst','bc':'Boston College',
      'bu':'Boston University','neu':'Northeastern','mit':'MIT',
      'harvard':'Harvard University','tufts':'Tufts University',
    };
    const _uniKey = (d.university || '').toLowerCase();
    document.getElementById('p-uni').textContent = _domMap[_uniKey] || d.university || 'UMass Boston';
 document.getElementById('s-rating').textContent = d.avgRating ? d.avgRating.toFixed(1) + ' ★' : 'Verified';
 document.getElementById('s-reviews').textContent = d.ratingCount || 0;
 document.getElementById('s-sold').textContent = d.totalSold || 0;
 document.getElementById('s-bought').textContent = d.totalBought || 0;
 }

 function applyAvatar(id, user, circleOnly=false) {
   const el = document.getElementById(id);
   if (!el) return;
   const init = ((user?.name || '?')[0] || '?').toUpperCase();
   if (user?.profilePhoto) {
     el.textContent = '';
     el.style.backgroundImage = `url('${user.profilePhoto}')`;
     el.style.backgroundSize = 'cover';
     el.style.backgroundPosition = 'center';
     el.classList.add('has-photo');
   } else {
     el.textContent = init;
     el.style.backgroundImage = '';
     el.classList.remove('has-photo');
   }
 }

 // Incoming requests (I am seller) 
 function listenIncoming() {
 const q = query(
 collection(db, 'requests'),
 where('sellerId', '==', me.uid),
 where('status', '==', 'pending')
 );
 onSnapshot(q, async snap => {
 const reqs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
 // Badge count
 const badge = document.getElementById('badge-incoming');
 badge.textContent = reqs.length || '';
 badge.style.display = reqs.length ? 'inline' : 'none';

 const items = await Promise.all(reqs.map(r => buildReqCard(r, 'incoming')));
 document.getElementById('incoming-list').innerHTML =
 items.join('') ||
 `<div class="empty-state" style="padding:2.5rem;">
 
 <h3>No pending requests</h3>
 <p>Post a meal listing to start getting requests.</p>
 </div>`;
 });
 }

 // Sent requests (I am buyer) 
 function listenSent() {
 const q = query(
 collection(db, 'requests'),
 where('buyerId', '==', me.uid),
 orderBy('createdAt', 'desc')
 );
 onSnapshot(q, async snap => {
 const reqs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
 // Ack accepted requests so the profile badge clears when buyer views this tab
 // Track already-rated users to prevent duplicate reviews
 reqs.forEach(r => {
   if (r.status === 'completed') {
     if (r.sellerRated) _ratedUsers.add(r.buyerId);
     if (r.buyerRated)  _ratedUsers.add(r.sellerId);
   }
 });
 reqs.filter(r => r.status === 'accepted').forEach(r => ackAcceptedRequest(r.id));
 const items = await Promise.all(reqs.map(r => buildReqCard(r, 'sent')));
 document.getElementById('sent-list').innerHTML =
 items.join('') ||
 `<div class="empty-state" style="padding:2.5rem;">
 
 <h3>No requests sent yet</h3>
 <p>Browse available meals and request one!</p>
 <a href="dashboard.html" class="btn btn-accent" style="margin-top:1rem;">Browse Meals</a>
 </div>`;
 });
 }

 // History 
 function listenHistory() {
 const qSell = query(
 collection(db, 'requests'),
 where('sellerId', '==', me.uid),
 where('status', 'in', ['accepted','completed','declined','closed'])
 );
 onSnapshot(qSell, async snap => {
 const reqs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a,b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
 const items = await Promise.all(reqs.map(r => buildReqCard(r, 'history')));
 document.getElementById('history-list').innerHTML =
 items.join('') ||
 `<div class="empty-state" style="padding:2.5rem;">
 
 <h3>No history yet</h3>
 </div>`;
 });
 }

 
 // Build request card HTML 
 async function buildReqCard(r, view) {
 const COLORS = { pending:'badge-amber', accepted:'badge-green', declined:'badge-red', completed:'badge-blue', closed:'badge-blue' };
 let info = '';
 try {
 const lSnap = await getDoc(doc(db, 'listings', r.listingId));
 if (lSnap.exists()) {
 const l = lSnap.data();
 info = `${l.diningHall} · $${l.price?.toFixed(2)}`;
 }
 } catch {}

 const who = view === 'sent' ? `Seller: ${escHtml(r.sellerName || 'Seller')}` : `From: ${escHtml(r.buyerName || 'Buyer')}`;
 const ts = r.createdAt?.toDate ? r.createdAt.toDate() : null;
 const tsStr = ts ? ts.toLocaleDateString('en-US', { month:'short', day:'numeric' }) + ' · ' +
   ts.toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' }) : '';
 const prettyStatus = r.status === 'accepted' ? 'in progress' : (r.status === 'closed' ? 'not selected' : r.status);
 const badge = `<span class="badge ${COLORS[r.status] || 'badge-blue'}">${prettyStatus}</span>`;

 let actions = '';
 if (view === 'incoming') {
 actions = `
 <div class="req-actions">
 <button class="btn btn-danger btn-sm" onclick="declineReq('${r.id}','${r.listingId}')">Decline</button>
 <button class="btn btn-accent btn-sm" onclick="acceptReq('${r.id}','${r.listingId}')">Accept</button>
 </div>`;
 } else if (view === 'history' && r.status === 'accepted') {
 actions = `
 <div class="req-actions">
 <button class="btn btn-outline btn-sm" onclick="markComplete('${r.id}','${r.listingId}','${r.buyerId}')">Mark Complete</button>
 </div>`;
 } else if (view === 'history' && r.status === 'completed' && !r.sellerRated && !_ratedUsers.has(r.buyerId)) {
 actions = `
 <div class="req-actions">
 <button class="btn btn-outline btn-sm" onclick="openRatingModal('${r.buyerId}','${r.id}','seller')">Rate Buyer</button>
 </div>`;
 } else if (view === 'sent' && r.status === 'completed' && !r.buyerRated && !_ratedUsers.has(r.sellerId)) {
 actions = `
 <div class="req-actions">
 <button class="btn btn-outline btn-sm" onclick="openRatingModal('${r.sellerId}','${r.id}','buyer')">Rate Seller</button>
 </div>`;
 }

 return `
 <div class="req-item">
 <div class="req-info">
 <div class="req-name">${info || 'Meal Request'}</div>
 <div class="req-meta">${who}</div>
 ${r.message ? `<div class="req-msg">"${escHtml(r.message)}"</div>` : ''}
  ${tsStr ? `<div style="font-size:.72rem;color:var(--muted);margin-top:.25rem;display:flex;align-items:center;gap:.3rem;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${tsStr}</div>` : ''}
 </div>
 ${view === 'incoming' ? '' : badge}
 ${actions}
 </div>`;
 }


 const MAX_PHOTO_BYTES = 900000;
 function triggerPhotoUpload() {
   document.getElementById('photo-input').click();
 }
 window.triggerPhotoUpload = triggerPhotoUpload;

 document.getElementById('photo-input').addEventListener('change', async (e) => {
   const file = e.target.files && e.target.files[0];
   if (!file) return;
   if (!file.type.startsWith('image/')) { toast('Please choose an image file.', 'error'); e.target.value=''; return; }
   try {
     document.getElementById('btn-photo').disabled = true;
     document.getElementById('btn-photo').textContent = 'Uploading…';
     const dataUrl = await fileToDataUrl(file);
     const resized = await resizeImage(dataUrl, 256, 256, 0.82);
     if (resized.length > MAX_PHOTO_BYTES) { toast('Please use a smaller image.', 'error'); throw new Error('too_large'); }
     await updateDoc(doc(db, 'users', me.uid), { profilePhoto: resized, updatedAt: serverTimestamp() });
     meData.profilePhoto = resized;
     renderProfile(meData);
     applyAvatar('nav-avatar', meData, true);
     toast('Profile picture updated.', 'success');
   } catch (err) {
     if (err.message !== 'too_large') { console.error(err); toast('Could not update profile picture.', 'error'); }
   } finally {
     document.getElementById('btn-photo').disabled = false;
     document.getElementById('btn-photo').textContent = meData?.profilePhoto ? 'Change Profile Picture' : 'Add Profile Picture';
     e.target.value = '';
   }
 });

 function fileToDataUrl(file) {
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.onload = () => resolve(reader.result);
     reader.onerror = reject;
     reader.readAsDataURL(file);
   });
 }

 function resizeImage(dataUrl, maxW, maxH, quality=0.85) {
   return new Promise((resolve, reject) => {
     const img = new Image();
     img.onload = () => {
       const ratio = Math.min(maxW / img.width, maxH / img.height);
       const w = Math.max(1, Math.round(img.width * ratio));
       const h = Math.max(1, Math.round(img.height * ratio));
       const canvas = document.createElement('canvas');
       canvas.width = w; canvas.height = h;
       const ctx = canvas.getContext('2d');
       ctx.drawImage(img, 0, 0, w, h);
       resolve(canvas.toDataURL('image/jpeg', quality));
     };
     img.onerror = reject;
     img.src = dataUrl;
   });
 }

 function escHtml(s) {
 return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 }

 async function closeOtherRequests(listingId, acceptedReqId) {
 const snap = await getDocs(query(
 collection(db, 'requests'),
 where('listingId', '==', listingId),
 where('status', '==', 'pending')
 ));
 const jobs = [];
 snap.forEach(d => {
 if (d.id !== acceptedReqId) {
 jobs.push(updateDoc(doc(db, 'requests', d.id), {
 status: 'closed',
 closedReason: 'another_buyer_selected',
 updatedAt: serverTimestamp()
 }));
 }
 });
 await Promise.all(jobs);
 }

 function openRatingModal(userId, requestId, role) {
 rateTarget = { userId, requestId, role };
 selectedStar = 0;
 document.querySelectorAll('.star-btn').forEach(s => {
 s.style.color = 'var(--border)';
 });
 document.getElementById('review-text').value = '';
 document.getElementById('rate-modal').classList.add('open');
 }
 window.openRatingModal = openRatingModal;

 // Accept / Decline 
 window.acceptReq = async (reqId, listingId) => {
 try {
 const [reqSnap, lstSnap] = await Promise.all([
 getDoc(doc(db, 'requests', reqId)),
 getDoc(doc(db, 'listings', listingId))
 ]);
 if (!reqSnap.exists() || !lstSnap.exists()) throw new Error('Missing request or listing');
 const reqData = reqSnap.data();

 await Promise.all([
 updateDoc(doc(db, 'requests', reqId), {
 status: 'accepted',
 acceptedAt: serverTimestamp(),
 updatedAt: serverTimestamp()
 }),
 updateDoc(doc(db, 'listings', listingId), {
 status: 'active',
 acceptedBuyerId: reqData.buyerId,
 acceptedRequestId: reqId,
 acceptedAt: serverTimestamp(),
 updatedAt: serverTimestamp()
 })
 ]);
 await closeOtherRequests(listingId, reqId);

 try {
 const r = reqData, l = lstSnap.data();
 const buyerSnap = await getDoc(doc(db, 'users', r.buyerId));
 if (buyerSnap.exists()) {
 const buyer = buyerSnap.data();
 await notifyRequestAccepted({
 toEmail: buyer.email,
 toName: buyer.name,
 sellerName: meData.name,
 diningHall: l.diningHall,
 price: l.price
 });
 }
 } catch(e) { console.warn(e); }

 toast('Request accepted. This listing is now in progress.', 'success');
 switchTab('history');
 } catch(e) { console.error(e); toast('Failed. Try again.', 'error'); }
 };

 window.declineReq = async (reqId, listingId) => {
 if (!confirm('Decline this request? The listing will stay available to other buyers.')) return;
 try {
 await updateDoc(doc(db, 'requests', reqId), {
 status: 'declined',
 updatedAt: serverTimestamp()
 });
 toast('Request declined. Your listing is still active for other buyers.', '');
 } catch(e) { toast('Failed. Try again.', 'error'); }
 };

 window.markComplete = async (reqId, listingId, buyerId) => {
 try {
 await Promise.all([
 updateDoc(doc(db, 'requests', reqId), { status: 'completed', completedAt: serverTimestamp(), updatedAt: serverTimestamp() }),
 updateDoc(doc(db, 'listings', listingId), { status: 'completed', completedAt: serverTimestamp(), updatedAt: serverTimestamp() }),
 updateDoc(doc(db, 'users', me.uid), { totalSold: increment(1) }),
 updateDoc(doc(db, 'users', buyerId), { totalBought: increment(1) })
 ]);
 toast('Exchange marked complete! You can rate the buyer now.', 'success');
 openRatingModal(buyerId, reqId, 'seller');
 switchTab('history');
 } catch(e) { toast('Failed. Try again.', 'error'); }
 };

 const MAX_REVIEW_LEN = 300;
 function cleanText(v) { return (v || '').replace(/\s+/g, ' ').trim(); }

 // Rating 
 window.setStar = (n) => {
 selectedStar = n;
 document.querySelectorAll('.star-btn').forEach(s => {
 s.style.color = parseInt(s.dataset.v) <= n ? 'var(--accent)' : 'var(--border)';
 });
 };

 window.submitRating = async () => {
 if (!rateTarget) return;
 if (!selectedStar) { toast('Please choose a star rating first.', ''); return; }
 try {
 const reviewText = cleanText(document.getElementById('review-text').value);
 if (reviewText.length > MAX_REVIEW_LEN) { toast(`Comments must be ${MAX_REVIEW_LEN} characters or fewer.`, 'error'); return; }
 document.getElementById('review-text').value = reviewText;
 const reqSnap = await getDoc(doc(db, 'requests', rateTarget.requestId));
 if (!reqSnap.exists()) throw new Error('Missing request');
 const req = reqSnap.data();

 if (rateTarget.role === 'buyer' && req.buyerRated) {
 toast('You already rated this seller.', '');
 return;
 }
 if (rateTarget.role === 'seller' && req.sellerRated) {
 toast('You already rated this buyer.', '');
 return;
 }


 // ── Hard dupe check: one review per person across ALL requests ──
 const _dupeField   = rateTarget.role === 'buyer'  ? 'buyerRated'  : 'sellerRated';
 const _myField     = rateTarget.role === 'buyer'  ? 'buyerId'     : 'sellerId';
 const _theirField  = rateTarget.role === 'buyer'  ? 'sellerId'    : 'buyerId';
 const _allReqs = await getDocs(query(
   collection(db, 'requests'),
   where(_myField, '==', me.uid)
 ));
 const _alreadyRated = _allReqs.docs.some(d => {
   const r = d.data();
   return r[_theirField] === rateTarget.userId && r[_dupeField] === true;
 });
 if (_alreadyRated) {
   toast('You have already reviewed this person.', '');
   _ratedUsers.add(rateTarget.userId);
   document.getElementById('rate-modal').classList.remove('open');
   return;
 }

 const uSnap = await getDoc(doc(db, 'users', rateTarget.userId));
 const u = uSnap.exists() ? uSnap.data() : {};
 const newCount = (u.ratingCount || 0) + 1;
 const newAvg = ((u.avgRating || 0) * (newCount - 1) + selectedStar) / newCount;

 const requestPatch = rateTarget.role === 'buyer'
 ? {
 buyerRated: true,
 buyerRating: selectedStar,
 buyerReviewText: reviewText,
 buyerReviewerName: meData.name,
 buyerRatedAt: serverTimestamp()
 }
 : {
 sellerRated: true,
 sellerRating: selectedStar,
 sellerReviewText: reviewText,
 sellerReviewerName: meData.name,
 sellerRatedAt: serverTimestamp()
 };

 await Promise.all([
 updateDoc(doc(db, 'users', rateTarget.userId), {
 avgRating: Math.round(newAvg * 10) / 10,
 ratingCount: newCount
 }),
 updateDoc(doc(db, 'requests', rateTarget.requestId), {
 ...requestPatch,
 updatedAt: serverTimestamp()
 })
 ]);
 if (rateTarget) _ratedUsers.add(rateTarget.userId);
 document.getElementById('rate-modal').classList.remove('open');
 rateTarget = null;
 selectedStar = 0;
 switchTab('history');
 toast('Rating submitted — thanks!', 'success');
 } catch(e) { console.error(e); toast('Failed to submit rating.', 'error'); }
 };

 // Tabs 


 // ── My Reviews tab ────────────────────────────────────
 let _reviewsLoaded = false;
 async function loadMyReviews() {
   if (_reviewsLoaded) return;
   const el = document.getElementById('reviews-list');
   if (!el) return;
   try {
     const [asSellerSnap, asBuyerSnap] = await Promise.all([
       getDocs(query(collection(db, 'requests'), where('sellerId', '==', me.uid))),
       getDocs(query(collection(db, 'requests'), where('buyerId',  '==', me.uid)))
     ]);
     const reviews = [];
     asSellerSnap.docs.forEach(d => {
       const r = d.data();
       if (r.status === 'completed') {
         const rating = r.buyerRating || r.rating;
         if (rating) reviews.push({ rating, reviewText: r.buyerReviewText || r.reviewText || '', reviewerName: r.buyerReviewerName || r.buyerName || 'Anonymous', role: 'As Seller', hall: r.diningHall || '' });
       }
     });
     asBuyerSnap.docs.forEach(d => {
       const r = d.data();
       if (r.status === 'completed' && r.sellerRating)
         reviews.push({ rating: r.sellerRating, reviewText: r.sellerReviewText || '', reviewerName: r.sellerReviewerName || r.sellerName || 'Anonymous', role: 'As Buyer', hall: r.diningHall || '' });
     });

     _reviewsLoaded = true; // mark as loaded only on success
     const badge = document.getElementById('badge-reviews');
     // Don't show badge here - we clear it on tab open instead

     if (!reviews.length) {
       el.innerHTML = '<div style="text-align:center;padding:3rem 1rem;"><div style="font-size:2rem;color:var(--border);">★</div><div style="font-weight:700;color:var(--text-md);margin:.5rem 0 .3rem;">No reviews yet</div><div style="font-size:.825rem;color:var(--muted);">Complete exchanges to start receiving reviews.</div></div>';
       return;
     }
     el.innerHTML = reviews.map(r => `
       <div style="background:#fff;border:1px solid var(--border);border-radius:var(--r);border-left:3px solid var(--umb-gold);padding:1rem 1.1rem;margin-bottom:.75rem;">
         <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.35rem;">
           <span style="color:var(--umb-gold);font-size:.95rem;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
           <span style="font-size:.7rem;background:var(--bg-alt);color:var(--muted);padding:.15rem .5rem;border-radius:99px;">${r.role}${r.hall ? ' · ' + r.hall : ''}</span>
         </div>
         ${r.reviewText ? `<div style="font-size:.875rem;color:var(--text-md);font-style:italic;line-height:1.6;margin-bottom:.35rem;">"${r.reviewText}"</div>` : ''}
         <div style="font-size:.72rem;color:var(--muted);">— ${r.reviewerName}</div>
       </div>`).join('');
   } catch(e) {
     console.error(e);
     el.innerHTML = '<p style="color:var(--muted);padding:1rem;font-size:.875rem;">Could not load reviews.</p>';
     _reviewsLoaded = false;
   }
 }

 window.switchTab = (name) => {
 const names = ['incoming','sent','history','reviews'];
 document.querySelectorAll('.tab').forEach((t,i) =>
 t.classList.toggle('active', names[i] === name));
 names.forEach(n => {
 document.getElementById(`tab-${n}`).classList.toggle('active', n === name);
 });
 if (name === 'reviews') {
   loadMyReviews();
   // Clear the badge when tab is opened
   const b = document.getElementById('badge-reviews');
   if (b) { b.textContent = ''; b.style.display = 'none'; }
 }
 };

 // Sign out 
 window.doSignOut = async () => {
 await signOut(auth);
 window.location.href = 'index.html';
 };


  window.openDeleteModal = () => {
    document.getElementById('del-pw').value = '';
    document.getElementById('del-err').style.display = 'none';
    // Show password or Microsoft confirmation based on provider
    const isMsUser = me?.providerData?.some(p => p.providerId === 'microsoft.com');
    document.getElementById('del-pw-group').style.display  = isMsUser ? 'none' : 'block';
    document.getElementById('del-ms-group').style.display  = isMsUser ? 'block' : 'none';
    if (document.getElementById('del-confirm-text')) document.getElementById('del-confirm-text').value = '';
    document.getElementById('delete-modal').classList.add('open');
  };
  window.closeDeleteModal = () => {
    document.getElementById('delete-modal').classList.remove('open');
  };
  document.getElementById('delete-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) window.closeDeleteModal();
  });
  window.confirmDelete = async () => {
    const errEl = document.getElementById('del-err');
    errEl.style.display = 'none';
    const isMsUser = me?.providerData?.some(p => p.providerId === 'microsoft.com');
    const btn = document.getElementById('btn-confirm-delete');
    btn.disabled = true; btn.innerHTML = '<div class="spinner"></div>';
    try {
      if (isMsUser) {
        // Microsoft users: verify they typed DELETE
        const confirmText = document.getElementById('del-confirm-text')?.value?.trim();
        if (confirmText !== 'DELETE') {
          errEl.textContent = 'Please type DELETE to confirm.';
          errEl.style.display = 'block';
          btn.disabled = false; btn.textContent = 'Delete My Account';
          return;
        }
        // Re-authenticate with Microsoft popup
        const { OAuthProvider, reauthenticateWithPopup } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js");
        const msProvider = new OAuthProvider('microsoft.com');
        await reauthenticateWithPopup(me, msProvider);
      } else {
        const pw = document.getElementById('del-pw').value;
        if (!pw) {
          errEl.textContent = 'Please enter your password to confirm.';
          errEl.style.display = 'block';
          btn.disabled = false; btn.textContent = 'Delete My Account';
          return;
        }
        const credential = EmailAuthProvider.credential(me.email, pw);
        await reauthenticateWithCredential(me, credential);
      }
      await deleteDoc(doc(db, 'users', me.uid));
      const lstSnap = await getDocs(query(collection(db, 'listings'), where('sellerId', '==', me.uid)));
      for (const d of lstSnap.docs) {
        await updateDoc(doc(db, 'listings', d.id), { status: 'cancelled' });
      }
      await deleteUser(me);
      window.location.href = 'index.html';
    } catch(e) {
      btn.disabled = false; btn.textContent = 'Delete My Account';
      if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
        errEl.textContent = 'Incorrect password. Please try again.';
      } else if (e.code === 'auth/requires-recent-login') {
        errEl.textContent = 'Please sign out and sign back in, then try again.';
      } else {
        errEl.textContent = 'Failed to delete account. Please try again.';
        console.error(e);
      }
      errEl.style.display = 'block';
    }
  };

 function toast(msg, type='') {
 const t = document.createElement('div');
 t.className = `toast ${type}`; t.textContent = msg;
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
