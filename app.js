// APT DOSSIER CONTROLLER // SAMEER SHAH
// Pure vanilla JS - High-performance tactical UI engine

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initEmblemGlitch();
    initTelemetryConsole();
    initArticleModal();
    initCopyButtons();
    initTerminalInput();
});

// 0. Operative Sigil — signal-disruption burst every 10s (error + re-acquire)
function initEmblemGlitch() {
    const wrap = document.getElementById('emblem-glitch');
    const errText = document.getElementById('emblem-error-text');
    const feed = document.getElementById('emblem-feed');
    if (!wrap) return;

    const errorSequence = [
        () => 'SIGNAL LOST',
        () => 'SIG CORRUPTED 0x' + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0'),
        () => 'RE-ACQUIRING TARGET',
        () => 'RECONSTRUCTING ' + (Math.floor(Math.random() * 40) + 60) + '%'
    ];

    function burst() {
        wrap.classList.add('glitching');
        if (feed) { feed.textContent = 'FEED: LOST // RESYNC'; feed.classList.add('down'); }

        let step = 0;
        if (errText) errText.textContent = errorSequence[0]();
        const seq = setInterval(() => {
            step++;
            if (errText && errorSequence[step]) errText.textContent = errorSequence[step]();
            if (step >= errorSequence.length - 1) clearInterval(seq);
        }, 270);

        setTimeout(() => {
            wrap.classList.remove('glitching');
            if (feed) { feed.textContent = 'FEED: LIVE // SYNC OK'; feed.classList.remove('down'); }
        }, 1150);
    }

    setTimeout(burst, 1600);   // first disruption shortly after load
    setInterval(burst, 10000); // then every 10 seconds
}

// 1. Real-time UTC Operational Clock
function initClock() {
    const clockEl = document.getElementById('tactical-clock');
    if (!clockEl) return;

    function update() {
        const now = new Date();
        const utcStr = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
        clockEl.textContent = utcStr;
    }
    update();
    setInterval(update, 1000);
}

// 2. Interactive Telemetry Console
let currentTelemetryTab = 'meedr';

function initTelemetryConsole() {
    const tabs = document.querySelectorAll('.telemetry-tab');
    const titleEl = document.getElementById('telemetry-title');
    const codeEl = document.getElementById('telemetry-code');
    const commandEl = document.getElementById('telemetry-cmd');

    if (!codeEl || !window.telemetryLogs) return;

    function renderLog(key) {
        const log = window.telemetryLogs[key];
        if (!log) return;
        currentTelemetryTab = key;

        tabs.forEach(t => {
            if (t.dataset.tab === key) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        if (titleEl) titleEl.textContent = log.title;
        if (commandEl) commandEl.textContent = log.command;
        if (codeEl) {
            codeEl.textContent = log.output;
            codeEl.parentElement.scrollTop = 0;
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            renderLog(tab.dataset.tab);
        });
    });

    // Default load
    renderLog('meedr');
}

// 3. Interactive Terminal CLI
function initTerminalInput() {
    const cliInput = document.getElementById('terminal-cli-input');
    const codeEl = document.getElementById('telemetry-code');
    const commandEl = document.getElementById('telemetry-cmd');

    if (!cliInput || !codeEl) return;

    cliInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawVal = cliInput.value.trim();
            if (!rawVal) return;
            cliInput.value = '';
            executeCliCommand(rawVal, codeEl, commandEl);
        }
    });
}

function executeCliCommand(cmd, codeEl, commandEl) {
    const lower = cmd.toLowerCase();
    commandEl.textContent = cmd;

    if (lower === 'clear') {
        codeEl.textContent = '';
        return;
    }

    if (lower === 'help') {
        codeEl.textContent = `=== APT OPERATIONAL CLI COMMANDS ===
  help              : Show available tactical commands
  cat meedr         : Inspect Ring-0 MEARWFltDriver.sys minifilter defect trace
  cat burning-sun   : Inspect Defender LPE race condition execution log
  cat cold-relay    : Inspect Active Directory offline attack graph telemetry
  cat butcher       : Inspect Autonomous Red Team agent reasoning stream
  cve               : List tracked zero-days, vulnerabilities, and advisories
  ioc               : Print tactical indicators of compromise
  status            : Print operative clearance, threat tier, and verification posture
  clear             : Clear terminal screen`;
        return;
    }

    if (lower.startsWith('cat meedr')) {
        const log = window.telemetryLogs['meedr'];
        codeEl.textContent = log ? log.output : 'Log not found';
        setActiveTab('meedr');
        return;
    }

    if (lower.startsWith('cat burning') || lower.startsWith('cat defender')) {
        const log = window.telemetryLogs['burning-sun'];
        codeEl.textContent = log ? log.output : 'Log not found';
        setActiveTab('burning-sun');
        return;
    }

    if (lower.startsWith('cat cold') || lower.startsWith('cat ad')) {
        const log = window.telemetryLogs['cold-relay'];
        codeEl.textContent = log ? log.output : 'Log not found';
        setActiveTab('cold-relay');
        return;
    }

    if (lower.startsWith('cat butcher')) {
        const log = window.telemetryLogs['software-butcher'];
        codeEl.textContent = log ? log.output : 'Log not found';
        setActiveTab('software-butcher');
        return;
    }

    if (lower === 'cve') {
        codeEl.textContent = `=== TRACKED CVEs & VULNERABILITY ADVISORIES ===
[CVE-2023-52271]
  Component: wsftprm.sys (Signed Driver)
  Classification: Bring Your Own Vulnerable Driver (BYOVD)
  Impact: Arbitrary Kernel Write / ZwTerminateProcess EDR Severance

[ZOHO-2026-VSS]
  Component: MEARWFltDriver.sys (ManageEngine Anti-Ransomware Minifilter)
  Classification: Semantic Logic Defect (wcsstr Path Mismatch)
  Impact: Unrestricted Volume Shadow Copy Deletion (STATUS: ACKNOWLEDGED)

[DEFENDER-LPE-2026]
  Component: Windows Defender MsMpEng.exe Signature Pipeline
  Classification: TOCTOU Oplock + Cloud Files Placeholder + COM Junction
  Impact: Local Privilege Escalation to NT AUTHORITY\\SYSTEM (STATUS: UNPATCHED)`;
        return;
    }

    if (lower === 'ioc') {
        codeEl.textContent = `=== TACTICAL INDICATORS OF COMPROMISE (IOCs) ===
[KERNEL / EDR EVASION]
  Driver Name     : wsftprm.sys (SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855)
  IOCTL Monitored : 0x534038 (IOCTL_VOLSNAP_DELETE_SNAPSHOT)
  Process Targets : cmdAgent.exe, udrAgent.exe, fwsys.exe

[DEFENDER RACE ENGINE]
  Staging Path    : \\RPC Control\\TargetDll
  Reparse Target  : C:\\Windows\\System32\\storagewmi.dll
  Oplock Level    : OPLOCK_LEVEL_CACHE_READ | OPLOCK_LEVEL_CACHE_HANDLE

[ACTIVE DIRECTORY EVIDENCE]
  Coercion Vector : PetitPotam / MS-EFSR -> DC$ Machine TGT
  Certificate ESC : Template 'WebServer-Corp' (CT_FLAG_ENROLLEE_SUPPLIES_SUBJECT)`;
        return;
    }

    if (lower === 'status') {
        codeEl.textContent = `=== OPERATIVE POSTURE DOSSIER ===
OPERATIVE      : Sameer Shah
HANDLE         : @thechosenone-shall-prevail
SECURITY CLEAR : BLACK-BAG // RING-0
THREAT TIER    : ADVANCED THREAT RESEARCHER
SPECIALTY      : Windows Kernel Internals · AD Attack Graphs · Adversarial AI
CREDENTIALS    : Zoho Acknowledged Research · Top 0.5% Hack The Box
DISCLOSURE     : Strictly vendor coordinated and defensive posture verification`;
        return;
    }

    // Default unknown command
    codeEl.textContent = `[COMMAND UNRECOGNIZED: "${cmd}"]
Type "help" to list available telemetry primitives or inspect tabs above.`;
}

function setActiveTab(key) {
    const tabs = document.querySelectorAll('.telemetry-tab');
    tabs.forEach(t => {
        if (t.dataset.tab === key) t.classList.add('active');
        else t.classList.remove('active');
    });
}

// 4. Classified Article Modal
function initArticleModal() {
    const modal = document.getElementById('classified-modal');
    const modalBody = document.getElementById('modal-dossier-body');
    const modalClose = document.getElementById('modal-close-btn');

    if (!modal || !modalBody) return;

    window.openDossier = function (articleId) {
        if (!window.technicalArticles || !window.technicalArticles[articleId]) {
            console.error('Dossier not found: ' + articleId);
            return;
        }
        const article = window.technicalArticles[articleId];
        modalBody.innerHTML = article.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeDossier = function () {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalBody.innerHTML = '';
    };

    if (modalClose) {
        modalClose.addEventListener('click', window.closeDossier);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            window.closeDossier();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            window.closeDossier();
        }
    });
}

// 5. Tactical Clipboard Copy
function initCopyButtons() {
    document.querySelectorAll('.copy-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const textToCopy = btn.dataset.copy || btn.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btn.innerHTML;
                btn.innerHTML = `<span style="color:#00ff88;">[COPIED TO BUFFER]</span>`;
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 1800);
            });
        });
    });
}
