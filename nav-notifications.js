<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <!-- Disable Cloudflare email obfuscation -->
  <meta name="cf-2fa-verify" content="no">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Messages – PointSwap</title>
 <link rel="stylesheet" href="styles.css">
 <style>
 .msgs-wrap {
 max-width: 1160px; margin: 0 auto; padding: 1.5rem;
 height: calc(100vh - 98px);
 display: grid; grid-template-columns: 300px 1fr; gap: 1.25rem;
 }
 .convo-sidebar {
 background: #fff; border: 1px solid var(--border); border-radius: var(--r-lg);
 display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--shadow);
 border-top: 3px solid var(--umb-blue);
 }
 .sidebar-head {
 padding: .9rem 1.2rem; border-bottom: 1px solid var(--border);
 font-family: 'Source Serif 4', Georgia, serif;
 font-size: 1rem; color: var(--umb-blue-dark); font-weight: 700; flex-shrink: 0;
 background: var(--bg-alt);
 }
 .convo-list { flex: 1; overflow-y: auto; }
 .convo-item {
 padding: .85rem 1.1rem; cursor: pointer;
 border-bottom: 1px solid var(--border); transition: background .12s;
 }
 .convo-item:hover { background: var(--bg-alt); }
 .convo-item.active { background: var(--umb-blue-lt); border-left: 3px solid var(--umb-blue); }
 .convo-item.unread { background: #f8fbff; }
 .convo-item.unread .ci-name { font-weight: 800; color: var(--text); }
 .convo-item.unread .ci-preview { color: var(--text); font-weight: 700; }
 .ci-top { display:flex; align-items:center; gap:.45rem; }
 .ci-name { font-size: .875rem; font-weight: 700; }
 .ci-unread-dot { width:9px; height:9px; border-radius:999px; background:#e53e3e; flex:0 0 auto; box-shadow:0 0 0 2px #fff; }
 .ci-preview { font-size: .75rem; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: .15rem; }
 .ci-time { font-size: .68rem; color: var(--muted); float: right; }

 .chat-pane {
 background: #fff; border: 1px solid var(--border); border-radius: var(--r-lg);
 display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--shadow);
 border-top: 3px solid var(--umb-gold);
 }
 .chat-head {
 padding: .85rem 1.4rem; border-bottom: 1px solid var(--border);
 display: flex; align-items: center; gap: .85rem; flex-shrink: 0;
 background: var(--bg-alt);
 }
 .chat-head-avatar {
 width: 38px; height: 38px; border-radius: 50%;
 background: var(--umb-blue); color: #fff;
 display: flex; align-items: center; justify-content: center;
 font-family: 'Source Serif 4', Georgia, serif; font-size: 1.1rem; font-weight: 700;
 }
 .chat-head h3 { font-family:'Source Serif 4',Georgia,serif; font-size:.95rem; color:var(--umb-blue-dark); font-weight:700; }
 .chat-head p { font-size:.72rem; color:var(--muted); }
 .chat-messages {
 flex: 1; overflow-y: auto; padding: 1.1rem 1.25rem;
 display: flex; flex-direction: column; gap: .5rem;
 }
 .msg-group { display: flex; flex-direction: column; }
 .msg-group.me { align-items: flex-end; }
 .msg-group.them { align-items: flex-start; }
 .bubble {
 max-width: 68%; padding: .6rem .95rem;
 border-radius: 12px; font-size: .875rem; line-height: 1.5;
 }
 .bubble.me { background: var(--umb-blue); color: #fff; border-bottom-right-radius: 3px; }
 .bubble.them { background: var(--bg-alt); border: 1px solid var(--border); border-bottom-left-radius: 3px; }
 .bubble-time { font-size: .67rem; color: var(--muted); margin-top: .2rem; }
 .chat-input-bar {
 padding: .9rem 1.1rem; border-top: 1px solid var(--border);
 display: flex; gap: .65rem; align-items: flex-end; flex-shrink: 0;
 }
 .chat-textarea {
 flex: 1; resize: none; padding: .6rem 1rem;
 border: 2px solid var(--border); border-radius: 20px;
 font-family: inherit; font-size: .875rem; outline: none;
 max-height: 110px; min-height: 42px; line-height: 1.5;
 transition: border-color .15s; background: var(--bg-alt);
 }
 .chat-textarea:focus { border-color: var(--umb-blue); background: #fff; }
.listing-bar { padding:.75rem 1.25rem; border-bottom:1px solid var(--border); background:var(--umb-blue-lt); display:flex; align-items:center; gap:.85rem; flex-shrink:0; }
 .listing-bar-img { width:40px; height:40px; border-radius:var(--r); background:var(--umb-blue); color:#fff; display:flex; align-items:center; justify-content:center; font-family:'Source Serif 4',Georgia,serif; font-size:1rem; font-weight:700; flex-shrink:0; }
 .listing-bar-title { font-size:.875rem; font-weight:700; color:var(--umb-blue-dark); }
 .listing-bar-meta  { font-size:.72rem; color:var(--muted); margin-top:.1rem; }
 .listing-bar-price { margin-left:auto; flex-shrink:0; text-align:right; }
 .listing-bar-price-main { font-family:'Source Serif 4',Georgia,serif; font-size:1.05rem; font-weight:700; color:var(--umb-blue-dark); }
 .listing-bar-price-orig { font-size:.7rem; color:var(--muted); text-decoration:line-through; }
  .no-chat {
 flex: 1; display: flex; flex-direction: column;
 align-items: center; justify-content: center;
 color: var(--muted); text-align: center; gap: .5rem;
 }
 .no-chat span { font-size: 2.5rem; }
 .no-chat h3 { font-family:'Source Serif 4',Georgia,serif; font-size:1.1rem; color:var(--text); }
 @media (max-width: 700px) {
 .msgs-wrap { grid-template-columns: 1fr; }
 .convo-sidebar { display: none; }
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
<div id="auth-loading" style="position:fixed;top:66px;left:0;right:0;bottom:0;background:var(--bg);display:flex;align-items:center;justify-content:center;z-index:98;">
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
 <a href="messages.html" class="nav-link active">Messages</a>
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
  <a href="messages.html" class="mobile-nav-link active">
    Messages <span class="mobile-nav-badge" id="mob-msg-badge" style="display:none;"></span>
  </a>
  <a href="profile.html" class="mobile-nav-link ">Profile</a>
</div>

<div class="msgs-wrap">

 <!-- Sidebar -->
 <div class="convo-sidebar">
 <div class="sidebar-head"> Conversations</div>
 <div class="convo-list" id="convo-list">
 <div style="padding:2rem;text-align:center;color:var(--muted);font-size:.875rem;">Loading…</div>
 </div>
 </div>

 <!-- Chat pane -->
 <div class="chat-pane" id="chat-pane">
 <div class="no-chat" id="no-chat">
 <span></span>
 <h3>Select a conversation</h3>
 <p>Your messages with buyers and sellers appear here.</p>
 </div>
 </div>

</div>

<script type="module">
 import { auth, db } from './firebase-config.js';
 import { initNotifications, markConvRead } from './nav-notifications.js';
 import { notifyNewMessage } from './email-notifications.js';
 import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
 import {
 collection, query, where, orderBy, onSnapshot,
 addDoc, doc, getDoc, getDocs, updateDoc, serverTimestamp, limit
 } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

 let me = null, meData = null;
 let activeCid = null;
 let activeOtherUid = null;
 let activeOtherName = null;
 let activeDiningHall = null;
 let unsubMsgs = null;
 let unsubListing = null; // live listener for listing status bar
 const urlParams = new URLSearchParams(window.location.search);
 const requestedCid = urlParams.get('cid');

 // Auth 
 onAuthStateChanged(auth, async u => {
 if (!u) return (window.location.href = 'index.html');

 me = u;
 const snap = await getDoc(doc(db, 'users', u.uid));
 meData = snap.exists() ? snap.data() : { name: u.displayName || u.email?.split('@')[0] || 'User', email: u.email || '' };
 applyAvatar('nav-avatar', meData);
 initNotifications(u.uid);
 listenConversations();
 });

 // Conversations list 
 function listenConversations() {
 const q = query(
 collection(db, 'conversations'),
 where('participants', 'array-contains', me.uid),
 orderBy('lastMessageAt', 'desc')
 );
 onSnapshot(q, snap => {
 const convos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
 renderConvos(convos);
 maybeOpenRequestedConversation();
 });
 }

 function getConvReadAt(convId) {
 const v = localStorage.getItem(`ps_read_${convId}`);
 return parseInt(v || '0', 10);
 }

 function isConversationUnread(c) {
 if (!me?.uid || !c?.lastMessageAt) return false;
 if (c.lastSenderId === me.uid) return false;
 const lastMs = c.lastMessageAt?.toMillis ? c.lastMessageAt.toMillis() : 0;
 const readMs = getConvReadAt(c.id);
 return lastMs > readMs;
 }

  function clearUnreadUI(cid) {
    const item = document.querySelector('.convo-item[data-cid="' + CSS.escape(cid) + '"]');
    if (!item) return;
    item.classList.remove('unread');
    const dot = item.querySelector('.ci-unread-dot');
    const badge = item.querySelector('.ci-unread-badge');
    if (dot) dot.remove();
    if (badge) badge.remove();
  }

  function renderConvos(convos) {
 const el = document.getElementById('convo-list');
 if (!convos.length) {
 el.innerHTML = `
 <div style="padding:2rem;text-align:center;color:var(--muted);font-size:.875rem;line-height:1.6;">
 No conversations yet.<br>Request a meal to start chatting!
 </div>`;
 return;
 }
 el.innerHTML = convos.map(c => {
 const otherId = c.participants.find(p => p !== me.uid) || '';
 const otherName = c.participantNames?.[otherId] || 'User';
 const ts = c.lastMessageAt?.toDate ? c.lastMessageAt.toDate() : null;
 const timeStr = ts ? ts.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) : '';
 const unread = isConversationUnread(c);
 return `
 <div class="convo-item ${activeCid === c.id ? 'active' : ''} ${unread ? 'unread' : ''}"
 data-cid="${escAttr(c.id)}"
 data-name="${escAttr(otherName)}"
 data-other="${escAttr(otherId)}"
 data-listing-id="${escAttr(c.listingId || '')}"
 data-hint="${escAttr(c.diningHall || '')}"> 
 <div class="ci-time">${escHtml(timeStr)}</div>
 <div class="ci-top">
 <div class="ci-name">${escHtml(otherName)}</div>
 ${unread ? '<span class="ci-unread-dot" aria-hidden="true"></span><span class="ci-unread-badge" aria-label="Unread message">New</span>' : ''}
 </div>
 <div class="ci-preview">${escHtml(c.lastMessage || '')}</div>
 </div>`;
 }).join('');

 el.querySelectorAll('.convo-item').forEach(item => {
 item.addEventListener('click', () => {
 window.openChat(
 item.dataset.cid,
 item.dataset.name || 'User',
 item.dataset.other || '',
 item.dataset.listingId || '',
 item.dataset.hint || ''
 );
 });
 });

 }

 function maybeOpenRequestedConversation() {
 if (!requestedCid) return;
 const item = document.querySelector(`.convo-item[data-cid="${CSS.escape(requestedCid)}"]`);
 if (!item) return;
 window.openChat(
 item.dataset.cid,
 item.dataset.name || 'User',
 item.dataset.other || '',
 item.dataset.listingId || '',
 item.dataset.hint || ''
 );
 const notice = sessionStorage.getItem('openChatNotice');
 if (notice) {
 toast(notice, 'success');
 sessionStorage.removeItem('openChatNotice');
 }
 history.replaceState({}, document.title, 'messages.html');
 }

 // Open chat 
 window.openChat = async (cid, otherName, otherId, listingId, hintText) => {
 activeCid = cid;
 activeOtherUid = otherId;
 activeOtherName = otherName;
 activeDiningHall = hintText || '';
 markConvRead(cid);
    clearUnreadUI(cid); // immediately remove dot/badge from sidebar

 // Highlight active convo
 document.querySelectorAll('.convo-item').forEach(el =>
 el.classList.toggle('active', el.dataset.cid === cid));

 // Unsubscribe previous messages listener
 if (unsubMsgs) unsubMsgs();

 // Build chat pane
 const pane = document.getElementById('chat-pane');
 const profileUrl = otherId ? `user-profile.html?uid=${encodeURIComponent(otherId)}` : '#';
 pane.innerHTML = `
 <div class="chat-head">
 <a href="${profileUrl}" class="chat-head-avatar" title="View profile" style="text-decoration:none;display:flex;align-items:center;justify-content:center;">${escHtml((otherName || 'U')[0].toUpperCase())}</a>
 <div>
 <h3><a href="${profileUrl}" title="View profile" style="color:inherit;text-decoration:none;">${escHtml(otherName || 'User')}</a></h3>
 <p>Meal exchange chat</p>
 </div>
 </div>
 <div class="chat-messages" id="msgs"></div>
 <div class="chat-input-bar">
 <textarea class="chat-textarea" id="msg-input" placeholder="Type a message…" rows="1" maxlength="500"
 onkeydown="handleKey(event)" oninput="autoResize(this)"></textarea>
 <button class="btn btn-primary" onclick="sendMsg('${cid}')">Send</button>
 </div>`;


    // Live listing status bar — updates instantly when seller accepts/completes
    if (listingId) {
      try {
        // Insert a placeholder bar first so layout doesn't jump
        const barPlaceholder = document.createElement('div');
        barPlaceholder.className = 'listing-bar';
        barPlaceholder.id = 'listing-status-bar';
        barPlaceholder.innerHTML = '<div class="listing-bar-img">…</div>' +
          '<div style="flex:1;"><div class="listing-bar-title" style="color:var(--muted)">Loading…</div></div>';
        const head = pane.querySelector('.chat-head');
        if (head) head.after(barPlaceholder);

        // Live listener — fires immediately and on every status change
        unsubListing = onSnapshot(doc(db, 'listings', listingId), async (lSnap) => {
          const bar = document.getElementById('listing-status-bar');
          if (!bar || !lSnap.exists()) return;
          const l = lSnap.data();
          const savings = Math.round(((l.mealValue - l.price) / l.mealValue) * 100);
          const reqState = await getConversationRequestState(listingId, otherId);
          const displayStatus = getListingStatusLabelForConversation(l.status, reqState);
          const statusColor = getListingStatusColor(displayStatus);
          bar.innerHTML =
            '<div class="listing-bar-img">' + (l.diningHall ? l.diningHall[0].toUpperCase() : 'D') + '</div>' +
            '<div style="flex:1;min-width:0;">' +
              '<div class="listing-bar-title">' + escHtml(l.diningHall) + '</div>' +
              '<div class="listing-bar-meta">' +
                '<span id="listing-bar-status" style="color:' + statusColor + ';font-weight:700;text-transform:uppercase;font-size:.65rem;">' + escHtml(displayStatus) + '</span>' +
                ' &nbsp;·&nbsp; $' + l.price.toFixed(2) + ' &nbsp;·&nbsp; Save ' + savings + '%' +
              '</div>' +
            '</div>' +
            '<div class="listing-bar-price">' +
              '<div class="listing-bar-price-main">$' + l.price.toFixed(2) + '</div>' +
              '<div class="listing-bar-price-orig">$' + l.mealValue.toFixed(2) + '</div>' +
            '</div>';
        });
      } catch(e) { console.warn('listing bar:', e); }
    }
 // Listen for messages
 const q = query(
 collection(db, 'conversations', cid, 'messages'),
 orderBy('createdAt', 'asc')
 );
 unsubMsgs = onSnapshot(q, snap => {
 renderMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
 });
 };


 async function getConversationRequestState(listingId, otherId) {
   try {
     if (!listingId || !me?.uid || !otherId) return null;
     const buyerId = me.uid < otherId ? null : null;
     const reqQ = query(
       collection(db, 'requests'),
       where('listingId', '==', listingId),
       where('buyerId', '==', me.uid),
       where('sellerId', '==', otherId),
       limit(1)
     );
     let snap = await getDocs(reqQ);
     if (snap.empty) {
       const reqQ2 = query(
         collection(db, 'requests'),
         where('listingId', '==', listingId),
         where('buyerId', '==', otherId),
         where('sellerId', '==', me.uid),
         limit(1)
       );
       snap = await getDocs(reqQ2);
     }
     if (snap.empty) return null;
     const d = snap.docs[0].data();
     return { id: snap.docs[0].id, ...d };
   } catch (e) {
     console.warn('request state:', e);
     return null;
   }
 }

 function getListingStatusLabelForConversation(listingStatus, reqState) {
   if (reqState?.status === 'accepted') return 'in progress';
   if (reqState?.status === 'completed') return 'completed';
   if (reqState?.status === 'declined') return 'declined';
   if (reqState?.status === 'closed') return 'unavailable';
   if (listingStatus === 'in_progress') return 'unavailable';
   if (listingStatus === 'cancelled') return 'cancelled';
   if (listingStatus === 'completed') return 'completed';
   return 'active';
 }

 function getListingStatusColor(label) {
   if (label === 'active') return '#065f46';
   if (label === 'in progress') return '#b45309';
   return '#6b7280';
 }

 function renderMessages(msgs) {
 const el = document.getElementById('msgs');
 if (!el) return;
 if (!msgs.length) {
 el.innerHTML = `<div style="text-align:center;color:var(--muted);font-size:.82rem;margin-top:2rem;">No messages yet. Say hi! </div>`;
 return;
 }
 if (activeCid) { markConvRead(activeCid); clearUnreadUI(activeCid); }
 el.innerHTML = msgs.map(m => {
 const isMe = m.senderId === me.uid;
 const ts = m.createdAt?.toDate ? m.createdAt.toDate() : null;
 const tStr = ts ? ts.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) : '';
 return `
 <div class="msg-group ${isMe ? 'me' : 'them'}">
 <div class="bubble ${isMe ? 'me' : 'them'}">${escHtml(m.text)}</div>
 <div class="bubble-time">${tStr}</div>
 </div>`;
 }).join('');
 el.scrollTop = el.scrollHeight;
 }

 const MAX_CHAT_MSG_LEN = 500;
 function cleanText(v) { return (v || '').replace(/\s+/g, ' ').trim(); }

 // Send message 
 window.sendMsg = async (cid) => {
 const input = document.getElementById('msg-input');
 const text = cleanText(input?.value);
 if (!text) return;
 if (text.length > MAX_CHAT_MSG_LEN) {
   alert(`Messages must be ${MAX_CHAT_MSG_LEN} characters or fewer.`);
   return;
 }
 input.value = '';
 input.style.height = '';

 try {
 await addDoc(collection(db, 'conversations', cid, 'messages'), {
 senderId: me.uid,
 senderName: meData.name,
 text,
 createdAt: serverTimestamp()
 });
 await updateDoc(doc(db, 'conversations', cid), {
 lastMessage: text,
 lastMessageAt: serverTimestamp(),
 lastSenderId: me.uid
 });

 // Email the other participant
 if (activeOtherUid) {
 try {
 const otherSnap = await getDoc(doc(db, 'users', activeOtherUid));
 if (otherSnap.exists()) {
 const other = otherSnap.data();
 await notifyNewMessage({
 toEmail: other.email,
 toName: other.name,
 fromName: meData.name,
 diningHall: activeDiningHall || 'a dining hall',
 messagePreview: text.length > 120 ? text.slice(0, 120) + '…' : text
 });
 }
 } catch(e) { console.warn('Email notify failed:', e); }
 }
 } catch(e) { console.error('Send failed:', e); }
 };

 window.handleKey = (e) => {
 if (e.key === 'Enter' && !e.shiftKey) {
 e.preventDefault();
 window.sendMsg(activeCid);
 }
 };

 window.autoResize = (el) => {
 el.style.height = 'auto';
 el.style.height = Math.min(el.scrollHeight, 110) + 'px';
 };

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

 function toast(msg, type='') {
 const t = document.createElement('div');
 t.className = `toast ${type}`;
 t.textContent = msg;
 document.getElementById('toasts').appendChild(t);
 setTimeout(() => t.remove(), 4500);
 }

 function escHtml(s) {
 return String(s ?? '')
 .replace(/&/g,'&amp;')
 .replace(/</g,'&lt;')
 .replace(/>/g,'&gt;')
 .replace(/"/g,'&quot;')
 .replace(/'/g,'&#39;');
 }

 function escAttr(s) {
 return escHtml(s).replace(/`/g, '&#96;');
 }
</script>

<script>
function mobileBack() {
  document.querySelector('.msgs-wrap').classList.remove('chat-open');
}
function toggleNav() {
  var btn    = document.getElementById('hamburger');
  var drawer = document.getElementById('mobile-drawer');
  var open   = drawer.classList.toggle('open');
  btn.classList.toggle('open', open);
}
document.addEventListener('click', function(e) {
  var drawer = document.getElementById('mobile-drawer');
  var btn    = document.getElementById('hamburger');
  if (drawer && !drawer.contains(e.target) && !btn.contains(e.target)) {
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
