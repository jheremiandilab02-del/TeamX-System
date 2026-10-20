<?php
$showcaseProjects = [
    [
        'title' => 'Networking & CCTV Installation',
        'category' => 'Hardware',
        'image' => 'networking-cctv.jpg',
        'icon' => 'fa-network-wired',
    ],
    [
        'title' => 'Website & App Development',
        'category' => 'Software',
        'image' => 'website-app.jpg',
        'icon' => 'fa-code',
    ],
    [
        'title' => 'PC Maintenance & IT Support',
        'category' => 'Hardware & Support',
        'image' => 'pc-maintenance.jpg',
        'icon' => 'fa-screwdriver-wrench',
    ],
    [
        'title' => 'Graphic Design',
        'category' => 'Creative',
        'image' => 'graphic-design.jpg',
        'icon' => 'fa-pen-nib',
    ],
];
?>
<section id="projects" class="py-20 border-t border-slate-900 bg-slate-950">
    <div class="max-w-7xl mx-auto px-6">
        <div class="section-heading">
            <div>
                <p class="service-kicker">CAPABILITY PREVIEWS · 01—04</p>
                <h2>Technology,<br>put to work.</h2>
            </div>
            <p>Illustrative previews of the hardware, support, and digital solutions we can deliver. Real project photos can replace these as your work is completed.</p>
        </div>

        <div class="project-grid">
            <?php foreach ($showcaseProjects as $project): ?>
                <?php
                $projectImagePath = __DIR__ . '/../images/projects/' . $project['image'];
                $projectImageUrl = 'images/projects/' . rawurlencode($project['image']);
                ?>
                <article class="project-card premium-card rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800">
                    <div class="project-image">
                        <?php if (is_file($projectImagePath)): ?>
                            <img
                                src="<?php echo htmlspecialchars($projectImageUrl, ENT_QUOTES, 'UTF-8'); ?>"
                                alt="<?php echo htmlspecialchars($project['title'], ENT_QUOTES, 'UTF-8'); ?>"
                                loading="lazy"
                            >
                        <?php else: ?>
                            <div class="project-placeholder project-placeholder--<?php echo htmlspecialchars(strtok($project['image'], '-.'), ENT_QUOTES, 'UTF-8'); ?>">
                                <span class="project-window">
                                    <span class="window-bar"><i></i><i></i><i></i><b>CAPABILITY PREVIEW</b></span>
                                    <span class="window-content">
                                        <i class="fa-solid <?php echo htmlspecialchars($project['icon'], ENT_QUOTES, 'UTF-8'); ?>" aria-hidden="true"></i>
                                        <span class="window-title"><?php echo htmlspecialchars($project['category'], ENT_QUOTES, 'UTF-8'); ?></span>
                                        <span class="window-lines"><i></i><i></i><i></i></span>
                                    </span>
                                </span>
                                <span class="project-image-label"><?php echo htmlspecialchars($project['category'], ENT_QUOTES, 'UTF-8'); ?> / ILLUSTRATIVE</span>
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="project-caption">
                        <p class="service-kicker"><?php echo htmlspecialchars($project['category'], ENT_QUOTES, 'UTF-8'); ?></p>
                        <h3><?php echo htmlspecialchars($project['title'], ENT_QUOTES, 'UTF-8'); ?></h3>
                        <span class="project-arrow" aria-hidden="true">↗</span>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>

    </div>
</section>
