/* Email 訂閱格：填好 ACTION 先會出現。
   ACTION = Kit 表單嘅提交網址，喺 Kit 表單 → Embed → HTML 入面 <form action="..."> 嗰條。 */
(function () {
  var ACTION = '';
  var FIELD = 'email_address';
  var spots = document.querySelectorAll('[data-fpw-sub]');
  if (!ACTION || !spots.length) return;

  var css =
    '.fpw-sub{box-sizing:border-box;width:calc(100% - 32px);max-width:720px;margin:48px auto;padding:18px 20px;border:1px solid rgba(128,128,128,.35);border-radius:12px;color:inherit}' +
    '.fpw-sub.in{width:auto;max-width:none;margin:0;background:var(--panel,transparent)}' +
    '.fpw-sub .fpw-h{display:block;font-size:17px;font-weight:600;margin:0 0 4px}' +
    '.fpw-sub .fpw-d{margin:0 0 12px;font-size:14px;opacity:.75}' +
    '.fpw-sub form{display:flex;flex-wrap:wrap;gap:8px;margin:0}' +
    '.fpw-sub input{flex:1 1 200px;min-width:0;padding:11px 12px;border:1px solid rgba(128,128,128,.5);border-radius:8px;background:transparent;color:inherit;font:inherit;font-size:16px}' +
    '.fpw-sub button{padding:11px 18px;border:0;border-radius:8px;background:#1f9e8f;color:#fff;font:inherit;font-size:15px;font-weight:600;cursor:pointer}' +
    '.fpw-sub button:hover{background:#17877a}' +
    '.fpw-sub .fpw-msg{margin:10px 0 0;font-size:14px;min-height:1.2em}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  spots.forEach(function (el, n) {
    var frame = 'fpw-frame-' + n;
    el.className = 'fpw-sub' + (el.hasAttribute('data-inline') ? ' in' : '');
    el.innerHTML =
      '<span class="fpw-h">出新嘢 email 你</span>' +
      '<p class="fpw-d">新筆記、新一集出咗先會寄。隨時退訂。</p>' +
      '<form method="post" target="' + frame + '" action="' + ACTION + '" novalidate>' +
      '<input type="email" name="' + FIELD + '" placeholder="你嘅 email" autocomplete="email" aria-label="你嘅 email" required>' +
      '<button type="submit">訂閱</button></form>' +
      '<p class="fpw-msg" role="status" aria-live="polite"></p>' +
      '<iframe name="' + frame + '" title="訂閱" hidden></iframe>';
    var f = el.querySelector('form'), em = f.querySelector('input'), msg = el.querySelector('.fpw-msg');
    f.addEventListener('submit', function (e) {
      if (!em.value || !em.checkValidity()) { e.preventDefault(); msg.textContent = '個 email 好似唔啱，再試吓'; return; }
      msg.textContent = '寄緊…';
      setTimeout(function () { msg.textContent = '多謝！去你個 email 撳確認，先算訂閱咗'; f.reset(); }, 800);
    });
    em.addEventListener('input', function () { msg.textContent = ''; });
  });
})();
