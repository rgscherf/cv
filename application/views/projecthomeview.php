<html>
    <head>
        <title>rgscherf-cv</title>
        <link rel="stylesheet" href="../css/style.css">
        <script type="text/javascript" src="../bower_components/jquery/dist/jquery.min.js"></script>
        <script src="https://use.fontawesome.com/3214b7792e.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Arvo|Bungee+Shade|Lobster+Two|VT323|Open+Sans|Roboto+Mono" rel="stylesheet">
        <link rel="icon" type="image/png" href="../images/favicon-bw.png">
    </head>
    <body>
        <div id="contentWrapper">
            <div id="headerWrapper">
                <div id="headline">
                    <?php echo $name; ?>
                </div>
                <div id="subline">
                    <?php echo $blurb; ?>
                </div>
            </div>
            <div id="experience">
                <div class="sectionHeader">
                    Education & Experience
                </div>
                <div class="sectionBody basicFlex" id="experienceCards">
                    <?php foreach($experience as $e) { ?>
                    <div class="experienceCard">
                        <div class="fontAwesomeStack" style="width:52px;text-align:center;">
                            <i class="fa fa-<?php echo $e['fontawesome_pointer'] ?> fa-2x experienceIcon" aria-hidden="true"></i>
                        </div>
                        <div class="experienceDescription">
                            <div>
                                <?php echo $e["time"]; ?>
                            </div>
                            <div>
                                <?php echo $e["title"]; ?>
                            </div>
                            <div>
                                <?php echo $e["description"]; ?>
                            </div>
                        </div>
                    </div>
                    <?php } ?>
                </div>
                <div id=skills>
                    <div class="sectionHeader">
                        <div id="skillsHeaderWrapper">
                            <div style="padding-right: 30px;">
                                Skills
                            </div>
                            <div>
                                <div id="skillsLegend">
                                    <div>
                                        <div>
                                            <?php for($i=0; $i<4; $i++) { ?>
                                            <i class="fa fa-cube fa" aria-hidden="true"></i>
                                            <?php } ?>
                                        </div>
                                        <div class="arvo">Expert</div>
                                    </div>
                                    <div>
                                        <div>
                                            <?php for($i=0; $i<3; $i++) { ?>
                                            <i class="fa fa-cube fa" aria-hidden="true"></i>
                                            <?php } ?>
                                        </div>
                                        <div class="arvo">Advanced</div>
                                    </div>
                                    <div>
                                        <div>
                                            <?php for($i=0; $i<2; $i++) { ?>
                                            <i class="fa fa-cube fa" aria-hidden="true"></i>
                                            <?php } ?>
                                        </div>
                                        <div class="arvo">Experienced</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sectionBody">
                        <div class="skillWrapper" style="margin-left:50px;">
                            <div>
                                <?php foreach($skillsLeft as $sl) { ?>
                                <div class="skillSide">
                                    <div class="skillName" style="width:250px;"><?php echo $sl["name"]; ?></div>
                                    <div class="skillLevel">
                                        <?php for($i=0; $i < $sl["level"]; $i++) { ?>
                                        <i class="experienceIcon fa fa-cube fa-2x" aria-hidden="true"></i>
                                        <?php } ?>
                                    </div>
                                </div>
                                <?php } ?>
                            </div>
                            <div>
                                <?php foreach($skillsRight as $sl) { ?>
                                <div class="skillSide">
                                    <div class="skillName" style="width:150px;"><?php echo $sl["name"]; ?></div>
                                    <div class="skillLevel">
                                        <?php for($i=0; $i < $sl["level"]; $i++) { ?>
                                        <i class="experienceIcon fa fa-cube fa-2x" aria-hidden="true"></i>
                                        <?php } ?>
                                    </div>
                                </div>
                                <?php } ?>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="projects">
                    <div class="sectionHeader" style="margin-bottom:20px;">
                        Selected Projects
                    </div>
                    <div class="sectionBody">
                        <table id="projectTable">
                            <tr>
                                <td>
                                    <a href="http://gainful.work">
                                        <div id="projectLogoGainful" class="projectLogoContainer">
                                            <span id="projectSpanGainful" class="projectSpan">Gainful</span>
                                        </div>
                                    </a>
                                </td>
                                <td class="projectTableSpacer"></td>
                                <td>
                                    <div>
                                        Simple, sane aggregation for public service job postings. <br />
                                        Django / BeautifulSoup / Elm
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="http://phptwit.herokuapp.com">
                                        <div id="projectLogoTwit" class="projectLogoContainer" style="position:relative;">
                                            <div id="projectSpanTwit" class="projectSpan">TWIT</div>
                                        </div>
                                    </a>
                                </td>
                                <td class="projectTableSpacer"></td>
                                <td>
                                    <div>
                                        Github commit timeline and explorer. <br />
                                        CodeIgniter / React
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="https://rgscherf.itch.io/potion-lord">
                                        <div id="projectLogoLord" class="projectLogoContainer">
                                            <span id="projectSpanLord" class="projectSpan">POTION LORD</span>
                                        </div>
                                    </a>
                                </td>
                                <td class="projectTableSpacer"></td>
                                <td>
                                    <div>
                                        Award-winning retro action game made in one weekend. <br />
                                        Unity / C#
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="commits">
                    <div class="sectionHeader">
                        Latest Commits
                    </div>
                    <div class="sectionBody basicFlex" style="align-items:flex-end;">
                        <?php foreach($commits as $c) { ?>
                        <div class="commitCard">
                            <div class="commitMessage">
                                <?php echo $c["message"]; ?>
                            </div>
                            <div class="commitInfoBlock">
                                <div>
                                    <a href="<?php echo $c['commit_url']; ?>">
                                        <?php echo $c["sha"]; ?>
                                    </a>
                                    to <a class="commitLink" href="<?php echo $c['repo_url']; ?>">
                                        <?php echo $c["repo_name"]; ?>
                                    </a>
                                </div>
                                <div>
                                    <?php echo $c["timestamp_pretty"]; ?>
                                </div>
                            </div>
                        </div>
                        <?php } ?>
                    </div>
                </div>
                <div id="contact">
                    <div class="sectionHeader">
                        Contact
                    </div>
                    <div class="sectionBody basicFlex" id="contactCards">
                        <?php foreach($contact as $c) { ?>
                        <div>
                            <a href="<?php echo $c['link'] ?>">
                                <i class="fa fa-<?php echo $c['fontawesome_pointer'] ?> fa-3x experienceIcon" aria-hidden="true"></i>
                            </a>
                        </div>
                        <?php } ?>
                    </div>
                </div>
            </body>
        </html>