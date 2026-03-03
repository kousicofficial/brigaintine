$navHtml = @'
<ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li class="nav-dropdown">
        <a href="about.html">About Us <span class="dropdown-arrow">▾</span></a>
        <ul class="dropdown-menu">
            <li><a href="about-company.html">About Company</a></li>
            <li><a href="values.html">Values</a></li>
            <li><a href="focussed-industry.html">Focussed Industry</a></li>
            <li><a href="what-we-do.html">What We Do</a></li>
        </ul>
    </li>
    <li class="nav-dropdown">
        <a href="#">Products <span class="dropdown-arrow">▾</span></a>
        <ul class="dropdown-menu">
            <li>
                <a href="#">Plate Heat Exchangers <span class="submenu-arrow">▶</span></a>
                <ul class="dropdown-submenu">
                    <li><a href="industrial-line.html">Industrial Line</a></li>
                    <li><a href="industrial-semi-welded-line.html">Industrial Semi Welded Line</a></li>
                    <li><a href="m-line.html">M Line</a></li>
                    <li><a href="wide-gap.html">Wide Gap</a></li>
                    <li><a href="brazed-plate-heat-exchangers.html">Brazed PHE</a></li>
                    <li><a href="fusion-bonded-plate-heat-exchangers.html">Fusion Bonded PHE</a></li>
                    <li><a href="alfacond.html">Alfacond</a></li>
                    <li><a href="alfavap.html">Alfavap</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Welded Heat Exchangers <span class="submenu-arrow">▶</span></a>
                <ul class="dropdown-submenu">
                    <li><a href="welded-plate-and-block-heat-exchanger.html">Welded Plate & Block</a></li>
                    <li><a href="welded-plate-and-shell-heat-exchanger.html">Packinox</a></li>
                    <li><a href="duroshell.html">Duroshell</a></li>
                    <li><a href="ziepack.html">Ziepack</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Disk Stack Separators <span class="submenu-arrow">▶</span></a>
                <ul class="dropdown-submenu">
                    <li><a href="mab-separator.html">MAB Separators</a></li>
                    <li><a href="mmb.html">MMB</a></li>
                    <li><a href="mopx.html">MOPX</a></li>
                    <li><a href="alfie-500.html">Alfie 500</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Decanters <span class="submenu-arrow">▶</span></a>
                <ul class="dropdown-submenu">
                    <li><a href="aldec.html">Aldec</a></li>
                    <li><a href="lynx.html">Lynx</a></li>
                    <li><a href="p1.html">P1</a></li>
                    <li><a href="p2.html">P2</a></li>
                    <li><a href="p3.html">P3</a></li>
                </ul>
            </li>
        </ul>
    </li>
    <li class="nav-dropdown">
        <a href="services.html">Services & Support <span class="dropdown-arrow">▾</span></a>
        <ul class="dropdown-menu">
            <li><a href="gasketed-plate-heat-exchanger-services.html">Gasketed PHE Services</a></li>
            <li><a href="compabloc-welded-phe-services.html">Compabloc Welded PHE</a></li>
            <li><a href="decanter-centrifuge-service.html">Decanter Centrifuge Service</a></li>
            <li><a href="electrical-troubleshooting-repair.html">Electrical Troubleshooting & Repair</a></li>
            <li><a href="reconditioning-of-decanters.html">Reconditioning of Decanters</a></li>
            <li><a href="high-speed-separators.html">High-Speed Separators</a></li>
        </ul>
    </li>
    <li><a href="applications.html">Applications</a></li>
    <li><a href="energy-hunter.html">Energy Hunter</a></li>
    <li><a href="contact.html">Contact Us</a></li>
</ul>
'@

$files = Get-ChildItem "d:\Brigaintine\*.html"
foreach ($f in $files) {
    if ($f.Name -match '\.html$') {
        $content = Get-Content $f.FullName -Raw
        
        # Replace nav block
        $content = $content -replace '(?s)<ul class="nav-links">.*?</ul>', $navHtml
        
        # Remove canvas hero
        $content = $content -replace '(?s)<canvas id="hero-canvas".*?</canvas>', ''
        
        Set-Content -Path $f.FullName -Value $content
        Write-Host "Updated $($f.Name)"
    }
}
