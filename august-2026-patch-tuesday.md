# August 2026 Patch Tuesday: 400 Fixes, 3 Zero-Days, and What It Means for Your Business

**By Ulises Paiz, ulises@ghosxt.com**
*August 11, 2026 · Cybersecurity*

> **TL;DR**
>
> - Microsoft released its August 2026 security updates today: 400 fixes by BleepingComputer's count, 42 of them rated Critical, including three zero-days, one of which is already being used in real attacks.
> - The flaw being exploited affects every supported version of Windows, and this month also closes out a SharePoint attack chain and the publicly known LegacyHive bug. All of it is fixed by installing this month's updates and rebooting.
> - If you are a Ghosxt client, you do not need to do anything except leave your PC on Thursday night and reboot when prompted. We handle the rest.

Microsoft shipped its monthly security updates today at 10 AM Pacific. This one is big, though not July big, and one of the flaws it fixes is already being used by attackers. Here is what dropped, what actually matters for a small business in Monterey County, and what happens next on our end.

## What Patch Tuesday is and how it works

On the second Tuesday of every month, Microsoft releases fixes for security flaws found in Windows, Office, and its server products. A security flaw, also called a vulnerability, is a mistake in software that an attacker can use to do something the software never intended, like reading your files or taking control of the machine. The fix for a flaw is called a patch, and the industry has called this monthly event Patch Tuesday for over twenty years.

Why batch them into one day a month instead of releasing each fix immediately? Predictability. IT teams can plan testing and deployment around a known date, and businesses are not rebooting machines at random all month. Microsoft holds everything except emergency fixes for the monthly release, then publishes the details of what was fixed the same day.

How a patch reaches your PC depends on who manages it. A home computer gets updates directly from Microsoft through Windows Update, whenever Windows decides to install them. A managed business computer gets them through an RMM, short for remote monitoring and management, which is the software an IT provider uses to watch, update, and support every machine in your fleet from one place. That central control is what lets updates happen on a schedule, with verification that every machine actually took the patch, instead of hoping each PC got around to it.

## Why 2026 broke the model

Until this year, Microsoft had never fixed more than about 200 flaws in a single month. Then AI-assisted tools for finding software bugs came of age, and researchers on every side started using them. June 2026 set a record near 200, July shattered it with 570, the largest Patch Tuesday ever, and August lands at 400. Microsoft has responded by rewriting its own deployment guidance: businesses should now aim to have monthly updates installed within about three days of release, because the same AI tooling helps attackers build working exploits faster than ever.

## August 2026 by the numbers

This month's release fixes 400 vulnerabilities by BleepingComputer's count, which we use because they count only the CVEs Microsoft published on release day. Other outlets report anywhere from 394 to 669 because Microsoft's Security Update Guide changed format in July and no longer publishes one simple list, so each outlet counts differently; Lansweeper's 669, for example, includes flaws in bundled third-party components. A CVE, for reference, is the industry's tracking number for a single vulnerability.

Of the 400, 42 are rated Critical, and 37 of those are remote code execution flaws, meaning an attacker could run their own programs on your machine from afar. The release also includes three zero-days. A zero-day is a flaw that attackers or the public knew about before the fix existed, so defenders start the race from behind. One is being actively exploited, and two were publicly disclosed. The notable items:

- **CVE-2026-68820, actively exploited.** A flaw in a deep Windows networking component that lets an attacker who already has a foothold on a machine promote themselves to full system control. Security firm Check Point reports it is being used in attacks by the Lazarus group, a North Korean state hacking operation. Every supported Windows PC and server is affected, which is why this is the headline fix of the month.
- **CVE-2026-62832, the LegacyHive flaw, publicly disclosed.** This is the Windows User Profile Service bug that made news in July, when a researcher published details before a fix existed. It let a regular user on a shared computer open another user's registry hive, which is the database where Windows stores that person's settings and saved secrets. ACROS Security shipped free unofficial patches in the interim; Microsoft's official fix is confirmed in this release.
- **CVE-2026-63520, the second half of the SharePoint attack chain.** In July, researchers at Rapid7 disclosed a SharePoint sign-in bypass (CVE-2026-55040), and Microsoft said the companion flaw would be fixed in August. It shipped as promised: this fix closes the remote code execution half, and together the two flaws let an attacker with no password at all run code on a self-hosted SharePoint server. This only affects businesses running their own SharePoint server; if you use SharePoint through Microsoft 365, Microsoft patches that for you.
- **CVE-2026-62878, a Windows DNS Server flaw rated 9.8 out of 10.** Researchers describe it as wormable, meaning malware could use it to spread from server to server with no human involvement. It matters to any business whose Windows server also acts as its DNS server, which describes most small networks with a domain controller.
- **CVE-2026-62911, for on-premises Exchange email servers.** One sentence of acknowledgment for the businesses still running their own Exchange: this flaw could let an attacker reach every mailbox in the company, so that server patches first. The third zero-day, CVE-2026-72971, is a publicly disclosed flaw in a Windows container component that Microsoft rates unlikely to be exploited.

For those tracking specific updates: Windows 11 24H2 and 25H2 get KB5121003, which brings machines to builds 26100.9168 and 26200.9168. Windows 10 22H2 gets KB5120249 (build 19045.7663), and only if the machine is enrolled in Extended Security Updates, the paid program that is now the only way a Windows 10 machine gets patched at all. Windows Server 2025 gets KB5120233 and Windows Server 2022 gets KB5120242, per Microsoft's update history. As of release day, Microsoft lists no known issues with any of these updates, which is not something every month can say.

## How a managed deployment actually works

We do not push this to client machines on Tuesday afternoon, and that is deliberate. Patches occasionally break things, and when they do, the industry finds out within the first day or two as millions of machines install them and telemetry rolls in. Waiting roughly 48 hours costs little and has saved our clients from more than one bad patch that Microsoft had to pull and reissue.

So the updates go out in rings, which just means groups in a planned order. Our own machines and a small test group go first. Client workstations get the update Thursday evening, after business hours, so nobody's workday is interrupted by an installing-updates screen. Servers wait for the weekend maintenance window, when a reboot cannot take down file shares or a line-of-business app in the middle of an invoice run.

Reboots are the unglamorous half of patching, and they matter more than people think. A patch that has been downloaded but not rebooted into place is not protecting anything. We schedule reboots for early morning hours and verify afterward, through the RMM, that every machine actually took the update and came back healthy. That verification step is the difference between patching as a policy and patching as a hope.

## What to do this week

If you are a Ghosxt client: leave your PC powered on Thursday night, save your work before you leave, and if your machine asks to reboot, let it. That is the whole list. The zero-days above, the SharePoint chain, the DNS flaw: all of it is covered by the deployment already scheduled.

If you are not a Ghosxt client: install this month's updates now rather than later. Open Settings, go to Windows Update, check for updates, and reboot when asked. Make sure automatic updates are on. If you still have Windows 10 machines, confirm they are enrolled in Extended Security Updates, because otherwise they received nothing today, this month's exploited zero-day included. And if nobody at your company knows whether any of this happened, that is exactly the conversation we are here for.

This is the kind of thing we watch so you do not have to.

## Sources

- https://www.bleepingcomputer.com/news/microsoft/microsoft-august-2026-patch-tuesday-fixes-400-flaws-3-zero-days/
- https://www.thezdi.com/blog/2026/8/11/the-august-2026-security-update-review
- https://www.rapid7.com/blog/post/etr-cve-2026-63520-microsoft-sharepoint-remote-code-execution-fixed/
- https://www.rapid7.com/blog/post/ve-cve-2026-55040-microsoft-sharepoint-jwt-token-authentication-bypass-fixed/
- https://www.bleepingcomputer.com/news/security/windows-legacyhive-zero-day-flaw-gets-free-unofficial-patches/
- https://www.lansweeper.com/blog/patch-tuesday/microsoft-patch-tuesday-august-2026/
- https://support.microsoft.com/en-US/servicing/os/windows-11/2026/08/kb5121003-windows-11-24h2-25h2-security-update
- https://support.microsoft.com/en-US/servicing/os/windows-10/2026/08/kb5120249-windows-10-21h2-22h2-security-update
- https://support.microsoft.com/en-us/topic/windows-server-2025-update-history-10f58da7-e57b-4a9d-9c16-9f1dcd72d7d7
- https://www.helpnetsecurity.com/2026/07/10/microsoft-windows-update-deployment-timelines/
