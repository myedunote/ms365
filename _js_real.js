
const i18n={
  zh:{login_desc:'输入管理员密码以继续',login_btn:'登录',placeholder:'API Key / 密码',login_failed:'登录失败',network_error:'网络错误',wrong_password:'密码错误'},
  en:{login_desc:'Enter admin password to continue',login_btn:'Login',placeholder:'API Key / Password',login_failed:'Login failed',network_error:'Network error',wrong_password:'Wrong password'}
};
let lang=localStorage.getItem('lang')||'zh';
function t(k){return i18n[lang][k]||k}
function applyLang(){
  const btn=document.getElementById('lang-toggle');
  btn.innerHTML=lang==='zh'?'&#127760; EN':'&#127760; 中文';
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(i18n[lang][k])el.textContent=i18n[lang][k]});
  document.getElementById('pw').placeholder=t('placeholder');
}
function toggleLang(){lang=lang==='zh'?'en':'zh';localStorage.setItem('lang',lang);applyLang()}
applyLang();
async function doLogin(){
  const pw=document.getElementById('pw').value;
  const btn=document.getElementById('btn');
  const msg=document.getElementById('msg');
  btn.disabled=true;msg.className='msg';msg.textContent='';
  try{
    const r=await fetch('/admin/login',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})});
    const d=await r.json();
    if(r.ok){location.reload()}else{msg.className='msg err';msg.textContent=d.error?.message||t('login_failed')}
  }catch(e){msg.className='msg err';msg.textContent=t('network_error')}
  finally{btn.disabled=false}
}

;

const i18n={
  zh:{
    title_update_token:'更新 Token',btn_update:'更新 Token',btn_check_login:'检查登录',btn_auto_capture:'自动刷新',
    title_status:'Token 与 登录状态',loading:'加载中...',
    title_quick_start:'快速开始',qs_recommended:'推荐：',qs_install_script:'安装油猴脚本（',qs_script_name:'一键脚本',
    qs_open_copilot:'打开',qs_type_trigger:'输入内容触发 WebSocket，然后在脚本面板点击',qs_push_token:'推送 Token',
    qs_alternative:'备选：',qs_manual_copy:'在 DevTools（Network → WS → wss://substrate.office.com/...）中手动复制 ',
    qs_paste_above:'然后粘贴到上方。',title_api_endpoints:'API 端点',
    desc_paste_token:'粘贴 access_token 值或完整的 wss:// URL',
    valid:'有效',invalid:'无效',expires:'过期时间',remaining:'剩余',error:'错误',
    login:'登录',logged_in:'已登录',not_logged_in:'未登录（仅手动推送 Token）',
    btn_logout:'登出用户',logging_out:'登出中...',logout_ok:'已登出',logout_failed:'登出失败',
    page:'页面',title:'标题',chromium_not_running:'Chromium 未运行',
    capturing:'捕获中...',auto_captured:'自动刷新成功！剩余：',auto_capture_failed:'自动刷新失败',
    check_login:'检查登录中...',login_ok:'Chromium 已登录！自动刷新已启用。',
    login_not_ok:'未登录。请先使用油猴脚本推送 Cookie。',check_failed:'检查失败：',
    capturing_btn:'捕获中...',check_btn:'检查中...',
    status_yes:'是',status_no:'否',
    auto_refresh_on:'自动刷新：开',auto_refresh_off:'自动刷新：关',
    btn_stop_refresh:'停止自动刷新',btn_start_refresh:'启动自动刷新',
    auto_refresh_stopped:'自动刷新已停止',auto_refresh_started:'自动刷新已启动',
    auto_refresh_label:'自动刷新',
    username_label:'用户名',
    title_call_log:'API 调用记录',
    click_expand:'点击展开',
    no_calls_yet:'暂无调用记录',
    tool_calls_parsed:'解析出工具调用',
    view_raw:'查看原文',
    copy:'复制',copied:'已复制',copy_record:'复制整条',
    title_capture:'模式抓包对比',
    capture_hint:'在 M365 Copilot 切换不同模式（快速答复/深度思考、GPT 5.5/5.2）各发一条消息，用油猴脚本推送抓包，下方对比哪些字段控制模式。',
    no_capture_yet:'暂无抓包数据',
    title_tone:'对话模式',
    tone_hint:'选择 M365 Copilot 的对话模式（模型），立即生效并持久保存。',
    tone_saved:'已保存',
    title_tool_prompt:'工具调用附加指令',
    tool_prompt_hint:'追加到工具调用提示词后的自定义指令，用于调教模型的 tool_call 行为。立即生效并持久保存，留空则不追加。',
    tool_prompt_save:'保存',
    tool_prompt_saved:'已保存',
    prompt_reset:'恢复默认',
    title_system_prompt:'系统级提示词（高级）',
    system_prompt_hint:'覆盖工具调用的基础系统提示词（定义 tool_call 格式与规则）。改错会导致工具调用失效，仅供高级用户调试。动态工具列表始终自动追加，不可编辑。留空则使用内置默认。',
    system_prompt_unlock:'解锁编辑（高级）',
    system_prompt_save:'保存',
    system_prompt_warn:'警告：系统级提示词定义了工具调用（tool_call）的格式与核心规则。修改不当会直接导致工具调用失效、模型无法读写文件。仅在你清楚自己在做什么时继续。\n\n确定要解锁编辑吗？',
    system_prompt_reset_confirm:'确定要将系统级提示词恢复为内置默认吗？当前自定义内容将被清空。',
  },
  en:{
    title_update_token:'Update Token',btn_update:'Update Token',btn_check_login:'Check Login',btn_auto_capture:'Auto Capture',
    title_status:'Token & Login Status',loading:'Loading...',
    title_quick_start:'Quick Start',qs_recommended:'Recommended:',qs_install_script:'Install the Tampermonkey script (',qs_script_name:'one-click script',
    qs_open_copilot:'open',qs_type_trigger:'type something to trigger WebSocket, then click',qs_push_token:'Push Token',
    qs_alternative:'Alternative:',qs_manual_copy:'Manually copy the ',
    qs_paste_above:'from DevTools (Network → WS → wss://substrate.office.com/...), then paste above.',title_api_endpoints:'API Endpoints',
    desc_paste_token:'Paste the access_token value or the full wss:// URL',
    valid:'Valid',invalid:'Invalid',expires:'Expires',remaining:'Remaining',error:'Error',
    login:'Login',logged_in:'Logged In',not_logged_in:'Not Logged In (auto-refresh only)',
    btn_logout:'Logout',logging_out:'Logging out...',logout_ok:'Logged out',logout_failed:'Logout failed',
    page:'Page',title:'Title',chromium_not_running:'Chromium Not Running',
    capturing:'Capturing...',auto_captured:'Auto-captured! Remaining: ',auto_capture_failed:'Auto-capture failed',
    check_login:'Checking...',login_ok:'Chromium is logged in! Auto-refresh is active.',
    login_not_ok:'Not logged in. Use Tampermonkey script to push cookies first.',check_failed:'Check failed: ',
    capturing_btn:'Capturing...',check_btn:'Checking...',
    status_yes:'Yes',status_no:'No',
    auto_refresh_on:'Auto Refresh: On',auto_refresh_off:'Auto Refresh: Off',
    btn_stop_refresh:'Stop Auto Refresh',btn_start_refresh:'Start Auto Refresh',
    auto_refresh_stopped:'Auto refresh stopped',auto_refresh_started:'Auto refresh started',
    auto_refresh_label:'Auto Refresh',
    username_label:'Username',
    title_call_log:'API Call Log',
    click_expand:'Click to expand',
    no_calls_yet:'No calls yet',
    tool_calls_parsed:'Parsed tool calls',
    view_raw:'View raw',
    copy:'Copy',copied:'Copied',copy_record:'Copy record',
    title_capture:'Mode Capture Compare',
    capture_hint:'In M365 Copilot switch between modes (Fast/Think, GPT 5.5/5.2) and send one message each, then push the captures via the Tampermonkey script. Compare which fields control the mode below.',
    no_capture_yet:'No captures yet',
    title_tone:'Conversation Mode',
    tone_hint:'Select the M365 Copilot conversation mode (model). Applies immediately and persists across restarts.',
    tone_saved:'Saved',
    title_tool_prompt:'Extra Tool-Call Instruction',
    tool_prompt_hint:'Custom instruction appended after the tool-call prompt to tune the tool_call behavior of the model. Applies immediately and persists across restarts; leave empty to append nothing.',
    tool_prompt_save:'Save',
    tool_prompt_saved:'Saved',
    prompt_reset:'Restore default',
    title_system_prompt:'System Prompt (Advanced)',
    system_prompt_hint:'Overrides the base system prompt for tool calls (defines the tool_call format and rules). A wrong edit will break tool calling. For advanced debugging only. The dynamic tool list is always appended and is not editable. Leave empty to use the built-in default.',
    system_prompt_unlock:'Unlock editing (Advanced)',
    system_prompt_save:'Save',
    system_prompt_warn:'WARNING: the system prompt defines the format and core rules of tool calls (tool_call). An incorrect edit will break tool calling and the model will be unable to read/write files. Continue only if you know what you are doing.\\n\\nUnlock editing?',
    system_prompt_reset_confirm:'Restore the system prompt to the built-in default? Your current custom content will be cleared.',
  }
};
let lang=localStorage.getItem('lang')||'zh';
function t(key){return i18n[lang][key]||key}
function toggleLang(){
  lang=lang==='zh'?'en':'zh';
  localStorage.setItem('lang',lang);
  applyLang();
}
function applyLang(){
  const btn=document.getElementById('lang-toggle');
  btn.innerHTML=lang==='zh'?'&#127760; EN':'&#127760; 中文';
  btn.style.color='transparent';
  btn.style.background='linear-gradient(135deg,rgba(6,182,212,0.18),rgba(139,92,246,0.18))';
  btn.style.webkitBackgroundClip='padding-box';
  // Apply gradient text color matching h1
  const txt=btn.childNodes[btn.childNodes.length-1];
  if(txt&&txt.nodeType===3){
    const span=document.createElement('span');
    span.textContent=txt.textContent;
    span.style.background='linear-gradient(135deg,#06b6d4,#8b5cf6)';
    span.style.webkitBackgroundClip='text';
    span.style.webkitTextFillColor='transparent';
    txt.replaceWith(span);
  }
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(i18n[lang][key])el.textContent=i18n[lang][key];
  });
  loadStatus();loadChromiumStatus();
}
applyLang();

function showInlineLogin(){
  const curLang=localStorage.getItem('lang')||'zh';
  const li18n={zh:{desc:'输入管理员密码以继续',btn:'登录',ph:'API Key / 密码'},en:{desc:'Enter admin password to continue',btn:'Login',ph:'API Key / Password'}};
  const lt=k=>li18n[curLang][k]||k;
  document.body.innerHTML='<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0f172a;color:#e2e8f0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif"><div style="background:#1e293b;border-radius:14px;padding:2.5rem 2.5rem 2.5rem 2.5rem;width:360px;border:1px solid #334155;text-align:center;position:relative"><button onclick="toggleInlineLang()" style="position:absolute;top:12px;right:12px;background:linear-gradient(135deg,rgba(6,182,212,0.18),rgba(139,92,246,0.18));border:1px solid rgba(139,92,246,0.5);color:#e2e8f0;font-size:12px;padding:4px 12px;border-radius:16px;cursor:pointer;font-weight:600;width:auto">'+(curLang==='zh'?'&#127760; EN':'&#127760; 中文')+'</button><h1 style="font-size:1.3rem;margin-bottom:.5rem;background:linear-gradient(135deg,#06b6d4,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Ciallo Ms-365 OpenAI Proxy</h1><p style="color:#64748b;font-size:.85rem;margin-bottom:1.5rem">'+lt('desc')+'</p><input id="pw" type="password" placeholder="'+lt('ph')+'" autofocus style="width:100%;padding:.75rem 1rem;background:#0f172a;border:1px solid #475569;border-radius:8px;color:#e2e8f0;font-size:.9rem;outline:none;margin-bottom:1rem"><button onclick="doInlineLogin()" style="width:100%;background:linear-gradient(135deg,#06b6d4,#8b5cf6);color:#fff;border:none;border-radius:8px;padding:.75rem;font-size:.95rem;font-weight:600;cursor:pointer">'+lt('btn')+'</button><div id="ilm" style="padding:.5rem .75rem;border-radius:6px;font-size:.8rem;margin-top:.75rem;display:none"></div></div></div>';
  document.getElementById('pw').addEventListener('keydown',function(e){if(e.key==='Enter')doInlineLogin()});
}
function toggleInlineLang(){localStorage.setItem('lang',localStorage.getItem('lang')==='zh'?'en':'zh');showInlineLogin()}

async function doInlineLogin(){
  const pw=document.getElementById('pw').value;
  const btns=document.querySelectorAll('button');
  const btn=btns.length>1?btns[btns.length-1]:btns[0];
  const msg=document.getElementById('ilm');
  const curLang=localStorage.getItem('lang')||'zh';
  const li18n={zh:{fail:'登录失败',neterr:'网络错误'},en:{fail:'Login failed',neterr:'Network error'}};
  const lt=k=>li18n[curLang][k]||k;
  btn.disabled=true;msg.style.display='none';
  try{
    const r=await fetch('/admin/login',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})});
    if(r.ok){location.reload();return}
    const d=await r.json();
    msg.style.display='block';msg.style.background='#450a0a';msg.style.color='#ef4444';msg.style.border='1px solid #991b1b';
    msg.textContent=d.error?.message||lt('fail');
  }catch(e){msg.style.display='block';msg.style.background='#450a0a';msg.style.color='#ef4444';msg.style.border='1px solid #991b1b';msg.textContent=lt('neterr')}
  finally{btn.disabled=false}
}

// Merged status: fetch token status + chromium login status, render in fixed order:
// 用户名 > 登录 > 有效 > 过期时间 > 剩余 > 自动刷新 > 标题 > 页面 > 错误
async function loadStatus(){
  try{
    const [tr,cr]=await Promise.all([
      fetch('/admin/token/status',{credentials:'include'}),
      fetch('/admin/chromium/login-status',{credentials:'include'}).catch(()=>null),
    ]);
    if(tr.status===401){showInlineLogin();return}
    const d=await tr.json();
    let c={};
    if(cr&&cr.ok){try{c=await cr.json()}catch(e){c={}}}
    const v=d.valid;
    const cls=v?'valid':'invalid';
    const exp=d.expires_at?new Date(d.expires_at).toLocaleString():'N/A';
    if(d.username)window.__m365_username=d.username;
    const row=(label,val,vcls)=>'<div class="status-row"><span class="status-label">'+label+'</span><span class="status-value '+(vcls||'')+'">'+val+'</span></div>';
    const warnCls=(v&&d.seconds_remaining<600)?'warn':'';
    let html='';
    // 1. 用户名
    if(d.username)html+=row(t('username_label'),d.username,'valid');
    // 2. 登录 (chromium)
    if(c.chromium_running===false){
      html+=row(t('login'),t('chromium_not_running'),'invalid');
    }else if(c.chromium_running){
      html+=row(t('login'),c.logged_in?t('logged_in'):t('not_logged_in'),c.logged_in?'valid':'warn');
    }
    const logoutBtn=document.getElementById('btn-logout');
    if(logoutBtn)logoutBtn.style.display=c.logged_in?'inline-block':'none';
    // 3. 有效
    html+=row(t('valid'),v?t('status_yes'):t('status_no'),cls);
    // 4. 过期时间
    html+=row(t('expires'),exp,warnCls);
    // 5. 剩余
    html+=row(t('remaining'),'<span id="remaining-sec">'+fmtSec(d.seconds_remaining)+'</span>',warnCls);
    // 6. 自动刷新
    html+=row(t('auto_refresh_label'),d.auto_refresh?t('status_yes'):t('status_no'),d.auto_refresh?'valid':'warn');
    // 7. 标题 (chromium)
    if(c.title)html+='<div class="status-row"><span class="status-label">'+t('title')+'</span><span class="status-value" style="font-size:.75rem">'+c.title+'</span></div>';
    // 8. 页面 (chromium)
    if(c.url)html+='<div class="status-row"><span class="status-label">'+t('page')+'</span><span class="status-value" style="font-size:.75rem;word-break:break-all">'+c.url+'</span></div>';
    // 9. 错误
    if(d.error)html+=row(t('error'),d.error,'invalid');
    document.getElementById('status-content').innerHTML=html;
    startCountdown(d.seconds_remaining||0);
    updateRefreshBtn(d.auto_refresh);
  }catch(e){
    document.getElementById('status-content').innerHTML='<span class="invalid">Failed to load</span>';
  }
}

// Kept as a thin alias so existing init/interval calls still work; loadStatus now
// renders both token and chromium status together in the required order.
async function loadChromiumStatus(){return loadStatus()}

function fmtSec(s){
  if(!s&&s!==0)return'N/A';
  const h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;
  return(h?h+'h ':'')+(m?m+'m ':'')+sec+'s';
}

function updateRefreshBtn(enabled){
  const btn=document.getElementById('btn-stop-refresh');
  if(enabled){
    btn.style.display='inline-block';
    btn.style.background='linear-gradient(135deg,#ef4444,#dc2626)';
    btn.textContent=t('btn_stop_refresh');
  }else{
    btn.style.display='inline-block';
    btn.style.background='linear-gradient(135deg,#22c55e,#059669)';
    btn.textContent=t('btn_start_refresh');
  }
}

async function toggleAutoRefresh(){
  const msg=document.getElementById('update-msg');
  const btn=document.getElementById('btn-stop-refresh');
  btn.disabled=true;msg.className='msg';msg.textContent='';
  try{
    const r=await fetch('/admin/token/auto-refresh-toggle',{method:'POST',credentials:'include'});
    const d=await r.json();
    if(r.ok){
      msg.className='msg ok';msg.textContent=d.auto_refresh?t('auto_refresh_started'):t('auto_refresh_stopped');
      updateRefreshBtn(d.auto_refresh);
      loadStatus();
    }else{
      msg.className='msg err';msg.textContent=d.error?.message||d.error||'Toggle failed';
    }
  }catch(e){msg.className='msg err';msg.textContent=(lang==='zh'?'网络错误：':'Network error: ')+e}
  finally{btn.disabled=false}
}

async function updateToken(){
  const input=document.getElementById('token-input').value.trim();
  const msg=document.getElementById('update-msg');
  const btn=document.getElementById('btn-update');
  if(!input){msg.className='msg err';msg.textContent=lang==='zh'?'请粘贴 Token':'Please paste a token';return}
  btn.disabled=true;msg.className='msg';msg.textContent='';
  try{
    const r=await fetch('/admin/token/update',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:input})});
    const d=await r.json();
    if(r.ok){
      msg.className='msg ok';msg.textContent=(lang==='zh'?'Token 已更新！剩余：':'Token updated! Remaining: ')+fmtSec(d.token_status?.seconds_remaining);
      document.getElementById('token-input').value='';
      loadStatus();
    }else{
      msg.className='msg err';msg.textContent=d.error?.message||d.error||(lang==='zh'?'更新失败':'Update failed');
    }
  }catch(e){msg.className='msg err';msg.textContent=(lang==='zh'?'网络错误：':'Network error: ')+e}
  finally{btn.disabled=false}
}

async function autoCapture(){
  const msg=document.getElementById('update-msg');
  const btn=document.getElementById('btn-auto');
  const upd=document.getElementById('btn-update');
  btn.disabled=true;upd.disabled=true;
  msg.className='msg';msg.textContent='';
  btn.textContent=t('capturing_btn');
  try{
    const r=await fetch('/admin/token/auto-capture',{method:'POST'});
    const d=await r.json();
    if(r.ok){
      msg.className='msg ok';msg.textContent=t('auto_captured')+fmtSec(d.token_status?.seconds_remaining);
      loadStatus();
    }else{
      msg.className='msg err';msg.textContent=d.error?.message||d.error||t('auto_capture_failed');
    }
  }catch(e){msg.className='msg err';msg.textContent=(lang==='zh'?'网络错误：':'Network error: ')+e}
  finally{btn.disabled=false;upd.disabled=false;btn.textContent=t('btn_auto_capture')}
}

async function checkLogin(){
  loadChromiumStatus();
  const msg=document.getElementById('update-msg');
  msg.className='msg';msg.textContent=t('check_login');
  await new Promise(r=>setTimeout(r,1500));
  try{
    const r=await fetch('/admin/chromium/login-status',{credentials:'include'});
    const d=await r.json();
    msg.className=d.logged_in?'msg ok':'msg err';
    msg.textContent=d.logged_in?t('login_ok'):t('login_not_ok');
  }catch(e){msg.className='msg err';msg.textContent=t('check_failed')+e}
}

async function logoutUser(){
  const msg=document.getElementById('update-msg');
  const btn=document.getElementById('btn-logout');
  btn.disabled=true;msg.className='msg';msg.textContent=t('logging_out');
  try{
    const r=await fetch('/admin/chromium/logout',{method:'POST',credentials:'include'});
    const d=await r.json();
    if(r.ok){
      msg.className='msg ok';msg.textContent=t('logout_ok')+(d.message?' — '+d.message:'');
      loadChromiumStatus();loadStatus();
    }else{
      msg.className='msg err';msg.textContent=d.error?.message||d.error||t('logout_failed');
    }
  }catch(e){msg.className='msg err';msg.textContent=(lang==='zh'?'网络错误：':'Network error: ')+e}
  finally{btn.disabled=false}
}

loadStatus();
loadChromiumStatus();
loadCallLog();
loadCapture();
loadTone();
loadToolPrompt();
loadSystemPrompt();
setInterval(loadStatus,60000);
setInterval(loadChromiumStatus,60000);
setInterval(loadCallLog,5000);
setInterval(loadCapture,5000);

// Client-side countdown timer
let _countdownSec=0;
let _countdownTick=0;
function startCountdown(sec){_countdownSec=sec;_countdownTick=0}
function tickCountdown(){
  if(_countdownSec<=0)return;
  _countdownSec--;_countdownTick++;
  const el=document.getElementById('remaining-sec');
  if(el)el.textContent=fmtSec(_countdownSec);
}
setInterval(tickCountdown,1000);

window.__callTexts={};
function copyCallText(key){
  const txt=window.__callTexts[key];
  if(txt==null)return;
  navigator.clipboard.writeText(txt).then(()=>{
    const b=document.getElementById('copybtn-'+key);
    if(b){const o=b.textContent;b.textContent=t('copied');setTimeout(()=>{b.textContent=o},1200)}
  }).catch(()=>{});
}
async function loadCallLog(){
  try{
    const r=await fetch('/admin/call-log',{credentials:'include'});
    if(r.status===401){showInlineLogin();return}
    const d=await r.json();
    const logs=d.logs||[];
    document.getElementById('call-log-count').textContent=logs.length;
    const el=document.getElementById('call-log-content');
    if(!logs.length){el.innerHTML='<span style="color:#64748b">'+t('no_calls_yet')+'</span>';window.__callLogSig='';return}
    // Skip re-render if nothing changed — prevents open <details> from collapsing every 5s
    const sig=JSON.stringify(logs);
    if(sig===window.__callLogSig)return;
    window.__callLogSig=sig;
    window.__callTexts={};
    let html='';
    for(let i=logs.length-1;i>=0;i--){
      const l=logs[i];
      const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const tc=l.tools&&l.tools.length?l.tools.join(', '):'—';
      const tr=l.tool_calls_result&&l.tool_calls_result.length?
        '<span style="color:#22c55e">'+t('tool_calls_parsed')+': '+l.tool_calls_result.join(', ')+'</span>':'';
      const reprKey='r'+i, textKey='x'+i, fullKey='f'+i;
      if(l.response_repr!=null)window.__callTexts[reprKey]=l.response_repr;
      if(l.response_text!=null)window.__callTexts[textKey]=l.response_text;
      // Full single-record text: call info + repr + text
      const fullParts=[];
      fullParts.push('time: '+l.time);
      fullParts.push('mode: '+(l.stream?'stream':'sync'));
      fullParts.push('tools: '+tc);
      if(l.tool_calls_result&&l.tool_calls_result.length)fullParts.push('tool_calls_result: '+l.tool_calls_result.join(', '));
      if(l.response_len!=null)fullParts.push('resp: '+l.response_len+' chars');
      if(l.response_repr!=null)fullParts.push('repr:\\n'+l.response_repr);
      if(l.response_text!=null)fullParts.push('text:\\n'+l.response_text);
      window.__callTexts[fullKey]=fullParts.join('\\n');
      const copyBtn=(key)=>'<button class="copybtn" id="copybtn-'+key+'" data-key="'+key+'" style="padding:2px 8px;font-size:.65rem;margin-left:6px">'+t('copy')+'</button>';
      const copyFullBtn='<button class="copybtn" id="copybtn-'+fullKey+'" data-key="'+fullKey+'" style="padding:2px 8px;font-size:.65rem">'+t('copy_record')+'</button>';
      const respView=(l.response_repr||l.response_text)?
        '<details style="margin-top:4px"><summary style="cursor:pointer;color:#64748b;font-size:.75rem;list-style:none">'+t('view_raw')+'</summary>'+
        (l.response_repr?'<div style="display:flex;align-items:center;color:#475569;margin-top:4px;font-size:.7rem">repr:'+copyBtn(reprKey)+'</div><pre style="white-space:pre-wrap;word-break:break-all;background:#0f172a;padding:6px;border-radius:6px;color:#94a3b8;margin-top:2px;font-size:.7rem;max-height:200px;overflow:auto">'+esc(l.response_repr)+'</pre>':'')+
        (l.response_text?'<div style="display:flex;align-items:center;color:#475569;margin-top:4px;font-size:.7rem">text:'+copyBtn(textKey)+'</div><pre style="white-space:pre-wrap;word-break:break-all;background:#0f172a;padding:6px;border-radius:6px;color:#e2e8f0;margin-top:2px;font-size:.7rem;max-height:300px;overflow:auto">'+esc(l.response_text)+'</pre>':'')+
        '</details>':'';
      html+='<div style="border-bottom:1px solid #1e293b;padding:6px 0">'+
        '<div style="display:flex;justify-content:space-between;align-items:center;color:#94a3b8">'+
        '<span>'+l.time+'</span><span style="display:flex;align-items:center;gap:6px"><span style="color:#475569">'+(l.stream?'stream':'sync')+'</span>'+copyFullBtn+'</span></div>'+
        '<div style="color:#e2e8f0;margin-top:2px">tools: <span style="color:#38bdf8">'+tc+'</span></div>'+
        (l.incremental!=null?'<div style="color:#475569;margin-top:2px">incremental: <span style="color:'+(l.incremental?'#22c55e':'#f59e0b')+'">'+(l.incremental?'yes':'no')+'</span> &nbsp; turn: '+(l.turn_count==null?'-':l.turn_count)+'</div>':'')+
        (tr?'<div style="margin-top:2px">'+tr+'</div>':'')+
        (l.response_len?'<div style="color:#475569;margin-top:2px">resp: '+l.response_len+' chars</div>':'')+
        respView+
        '</div>';
    }
    el.innerHTML=html;
    el.querySelectorAll('.copybtn').forEach(function(b){
      b.addEventListener('click',function(){copyCallText(b.getAttribute('data-key'))});
    });
  }catch(e){}
}
async function loadCapture(){
  try{
    const r=await fetch('/admin/capture-payload',{credentials:'include'});
    if(r.status===401){return}
    const d=await r.json();
    const ps=d.payloads||[];
    document.getElementById('capture-count').textContent=ps.length;
    const el=document.getElementById('capture-content');
    if(!ps.length){el.innerHTML='<span style="color:#64748b">'+t('no_capture_yet')+'</span>';window.__capSig='';return}
    const sig=JSON.stringify(ps);
    if(sig===window.__capSig)return;
    window.__capSig=sig;
    const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    let html='';
    for(let i=0;i<ps.length;i++){
      const p=ps[i];
      const opts=(p.optionsSets||[]).join(', ');
      const gpt=p.gptId&&Object.keys(p.gptId).length?JSON.stringify(p.gptId):'-';
      html+='<div style="border-bottom:1px solid #1e293b;padding:6px 0;line-height:1.5">'+
        '<div style="color:#38bdf8">'+esc(p.time)+' &nbsp; tone: <b>'+esc(p.tone||'-')+'</b> &nbsp; model: <b>'+esc(p.modelId||'-')+'</b></div>'+
        '<div style="color:#94a3b8">gptId: '+esc(gpt)+'</div>'+
        '<div style="color:#64748b;word-break:break-all">optionsSets: '+esc(opts)+'</div>'+
        '<details style="margin-top:4px"><summary style="cursor:pointer;color:#64748b;font-size:.72rem;list-style:none">'+t('view_raw')+'</summary>'+
        '<pre style="white-space:pre-wrap;word-break:break-all;background:#0f172a;padding:6px;border-radius:6px;color:#94a3b8;margin-top:2px;font-size:.7rem;max-height:240px;overflow:auto">'+esc(JSON.stringify(p.raw,null,2))+'</pre></details>'+
        '</div>';
    }
    el.innerHTML=html;
  }catch(e){}
}
async function loadTone(){
  try{
    const r=await fetch('/admin/tone',{credentials:'include'});
    if(r.status===401){return}
    const d=await r.json();
    const sel=document.getElementById('tone-select');
    if(!sel)return;
    const cur=d.tone||'Magic';
    const opts=d.options||[];
    // Skip re-render if unchanged (avoids resetting an open dropdown)
    const sig=JSON.stringify(opts)+'|'+cur;
    if(sig===window.__toneSig)return;
    window.__toneSig=sig;
    sel.innerHTML=opts.map(o=>'<option value="'+o.value+'"'+(o.value===cur?' selected':'')+'>'+o.label+'</option>').join('');
    sel.onchange=()=>saveTone(sel.value);
  }catch(e){}
}
async function saveTone(tone){
  try{
    const r=await fetch('/admin/tone',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({tone})});
    if(!r.ok)return;
    window.__toneSig='';
    const s=document.getElementById('tone-saved');
    if(s){s.textContent=t('tone_saved');s.style.opacity='1';setTimeout(()=>{s.style.opacity='0'},1500)}
  }catch(e){}
}
async function loadToolPrompt(){
  try{
    const r=await fetch('/admin/tool-prompt',{credentials:'include'});
    if(r.status===401){return}
    const d=await r.json();
    const ta=document.getElementById('tool-prompt-input');
    if(!ta)return;
    if(document.activeElement!==ta)ta.value=d.tool_prompt||'';
  }catch(e){}
}
async function saveToolPrompt(){
  try{
    const ta=document.getElementById('tool-prompt-input');
    if(!ta)return;
    const r=await fetch('/admin/tool-prompt',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({tool_prompt:ta.value})});
    if(!r.ok)return;
    const s=document.getElementById('tool-prompt-saved');
    if(s){s.textContent=t('tool_prompt_saved');s.style.opacity='1';setTimeout(()=>{s.style.opacity='0'},1500)}
  }catch(e){}
}
async function resetToolPrompt(){
  // Extra instruction default is empty.
  const ta=document.getElementById('tool-prompt-input');
  if(ta)ta.value='';
  await saveToolPrompt();
}

let __systemPromptDefault='';
async function loadSystemPrompt(){
  try{
    const r=await fetch('/admin/system-prompt',{credentials:'include'});
    if(r.status===401){return}
    const d=await r.json();
    __systemPromptDefault=d.default||'';
    const ta=document.getElementById('system-prompt-input');
    if(!ta)return;
    // Show the saved override, or fall back to the default text for reference.
    if(document.activeElement!==ta)ta.value=(d.system_prompt&&d.system_prompt.length)?d.system_prompt:__systemPromptDefault;
  }catch(e){}
}
function unlockSystemPrompt(){
  if(!confirm(t('system_prompt_warn')))return;
  const locked=document.getElementById('system-prompt-locked');
  const editor=document.getElementById('system-prompt-editor');
  if(locked)locked.style.display='none';
  if(editor)editor.style.display='block';
}
async function saveSystemPrompt(){
  try{
    const ta=document.getElementById('system-prompt-input');
    if(!ta)return;
    const r=await fetch('/admin/system-prompt',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({system_prompt:ta.value})});
    if(!r.ok)return;
    const s=document.getElementById('system-prompt-saved');
    if(s){s.textContent=t('tool_prompt_saved');s.style.opacity='1';setTimeout(()=>{s.style.opacity='0'},1500)}
  }catch(e){}
}
async function resetSystemPrompt(){
  if(!confirm(t('system_prompt_reset_confirm')))return;
  const ta=document.getElementById('system-prompt-input');
  // Saving an empty override makes the backend fall back to the built-in default.
  if(ta)ta.value=__systemPromptDefault;
  try{
    const r=await fetch('/admin/system-prompt',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({system_prompt:''})});
    if(!r.ok)return;
    const s=document.getElementById('system-prompt-saved');
    if(s){s.textContent=t('tool_prompt_saved');s.style.opacity='1';setTimeout(()=>{s.style.opacity='0'},1500)}
  }catch(e){}
}

