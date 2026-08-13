/**
 * Pentru a adăuga o mașină nouă în galerie, pur și simplu adaugă un nou obiect în acest array.
 * 
 * Specificații foto recomandate:
 * - Format: landscape (raport 4:3)
 * - Lățime maximă: 1600px
 * - Tip fișier: JPG sau WebP, cu mărime sub 300 KB per imagine
 * 
 * Structură obiect:
 * {
 *   id: 'id-unic', // ex: 1 sau 'ford-focus-2016'
 *   title: 'Numele mașinii',
 *   kit: 'Nume instalație',
 *   power: '150 CP', // (Opțional)
 *   description: 'Scurt text...',
 *   images: [
 *     '/masini/img1.jpg',
 *     '/masini/img2.jpg'
 *   ]
 * }
 */
const masiniLucrate = [
    {
        id: 'toyota-c-hr-2026',
        title: 'Toyota C-HR 2026',
        kit: 'GPL Landirenzo Omegas EVO',
        description: 'Toyota C-HR 2026 de la 0 Km montaj GPL Landirenzo Omegas EVO cu un rezervor toroidal de 52L. Economie maximă în vremuri în care prețul benzinei ne dă fiori',
        images: [
            'masini/toyota-c-hr-2026-1.jpg',
            'masini/toyota-c-hr-2026-2.jpg',
            'masini/toyota-c-hr-2026-3.jpg',
            'masini/toyota-c-hr-2026-4.jpg',
            'masini/toyota-c-hr-2026-5.jpg'
        ]
    },
    {
        id: 'kgm-actyon',
        title: 'KGM Actyon',
        kit: 'sistem Valvecare',
        power: '',
        description: 'KGM Actyon montaj GPL de la 0 Km instalatie Prins cu sistem Valvecare si rezervor toroidal de 54L.',
        images: [
            'masini/kgm-actyon-1.jpg',
            'masini/kgm-actyon-2.jpg',
            'masini/kgm-actyon-3.jpg',
            'masini/kgm-actyon-4.jpg',
            'masini/kgm-actyon-5.jpg'
        ]
    },
    {
        id: 'ford-ranger-raptor',
        title: 'Ford Ranger Raptor 3.0L',
        kit: 'GPL Prins',
        power: '300 Hp',
        description: 'Ford Ranger Raptor 3.0L 300 Hp de acum cu instalatie GPL Prins si un rezervor de 110L. Economie garantata!',
        images: [
            'masini/ford-ranger-raptor-1.jpg',
            'masini/ford-ranger-raptor-2.jpg',
            'masini/ford-ranger-raptor-3.jpg',
            'masini/ford-ranger-raptor-4.jpg',
            'masini/ford-ranger-raptor-5.jpg'
        ]
    },
    {
        id: 'toyota-rav-4-hybrid-2018',
        title: 'Toyota RAV 4  2,5 Hybrid 2018',
        kit: 'GPL Prins',
        power: '',
        description: 'Toyota RAV 4  2,5 Hybrid 2018 cu sistem GPL Prins. Economie garantata.',
        images: [
            'masini/toyota-rav4-hybrid-2018-1.jpg',
            'masini/toyota-rav4-hybrid-2018-2.jpg',
            'masini/toyota-rav4-hybrid-2018-3.jpg'
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('masini-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');

    // Function to render the grid
    function renderGrid() {
        if (!gridContainer) return;

        gridContainer.innerHTML = masiniLucrate.map(car => `
            <article 
                class="bg-surface-container-lowest rounded-xl border border-outline-variant/30 ambient-shadow hover-ambient-shadow transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group h-full"
                onclick="openLightbox('${car.id}')"
                tabindex="0"
                role="button"
                aria-label="Vezi detalii ${car.title}"
            >
                <div class="relative w-full overflow-hidden bg-surface-container" style="aspect-ratio: 4/3;">
                    <img 
                        src="${car.images[0]}" 
                        alt="Instalație GPL pe ${car.title}" 
                        loading="lazy"
                        width="400"
                        height="300"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    >
                    ${car.power ? `<span class="absolute top-4 right-4 bg-error text-on-error font-label-sm text-xs px-2 py-1 rounded-full shadow-md z-10">${car.power}</span>` : ''}
                    ${car.images.length > 1 ? `<span class="absolute top-4 left-4 bg-surface-container-highest/90 text-on-surface font-label-sm text-xs px-2 py-1 rounded-full shadow-md z-10 flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">photo_library</span>${car.images.length} foto</span>` : ''}
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <div class="flex items-center justify-between mb-3 gap-2">
                        <h3 class="font-headline-md text-body-lg font-bold text-on-surface line-clamp-1 truncate">${car.title}</h3>
                        <span class="inline-flex items-center gap-1 bg-secondary/10 text-secondary font-label-sm text-xs px-2 py-1 rounded-md whitespace-nowrap">
                            <span class="material-symbols-outlined text-[14px]">settings</span>
                            ${car.kit}
                        </span>
                    </div>
                    <p class="font-body-md text-label-sm text-on-surface-variant line-clamp-2 mt-auto">${car.description}</p>
                </div>
            </article>
        `).join('');
    }

    // Lightbox state
    let currentCarouselIndex = 0;
    let currentCar = null;
    let touchStartX = 0;
    let touchEndX = 0;

    // Carousel Functions
    window.updateCarouselUI = () => {
        if (!currentCar) return;
        const total = currentCar.images.length;
        
        // Update main image
        const imgEl = document.getElementById('lightbox-main-img');
        if (imgEl) {
            imgEl.src = currentCar.images[currentCarouselIndex];
        }

        // Update counter
        const counterEl = document.getElementById('lightbox-counter');
        if (counterEl) {
            counterEl.textContent = `${currentCarouselIndex + 1} / ${total}`;
        }

        // Update indicators
        if (total > 1) {
            if (total <= 6) {
                const dots = document.querySelectorAll('.lightbox-dot');
                dots.forEach((dot, index) => {
                    if (index === currentCarouselIndex) {
                        dot.classList.add('bg-primary', 'w-4');
                        dot.classList.remove('bg-surface-variant/50', 'w-2');
                    } else {
                        dot.classList.add('bg-surface-variant/50', 'w-2');
                        dot.classList.remove('bg-primary', 'w-4');
                    }
                });
            } else {
                const thumbs = document.querySelectorAll('.lightbox-thumb');
                thumbs.forEach((thumb, index) => {
                    if (index === currentCarouselIndex) {
                        thumb.classList.add('ring-2', 'ring-primary', 'opacity-100');
                        thumb.classList.remove('opacity-50', 'ring-transparent');
                        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    } else {
                        thumb.classList.add('opacity-50', 'ring-transparent');
                        thumb.classList.remove('ring-2', 'ring-primary', 'opacity-100');
                    }
                });
            }
        }

        // Preload next image (silent)
        if (total > 1) {
            const nextIndex = (currentCarouselIndex + 1) % total;
            const preloadImg = new Image();
            preloadImg.src = currentCar.images[nextIndex];
        }
    };

    window.nextImage = () => {
        if (!currentCar || currentCar.images.length <= 1) return;
        currentCarouselIndex = (currentCarouselIndex + 1) % currentCar.images.length;
        updateCarouselUI();
    };

    window.prevImage = () => {
        if (!currentCar || currentCar.images.length <= 1) return;
        currentCarouselIndex = (currentCarouselIndex - 1 + currentCar.images.length) % currentCar.images.length;
        updateCarouselUI();
    };

    window.goToImage = (index) => {
        if (!currentCar || index < 0 || index >= currentCar.images.length) return;
        currentCarouselIndex = index;
        updateCarouselUI();
    };

    // Touch logic
    const handleTouchStart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const threshold = window.innerWidth * 0.15; // 15% of screen width
        if (touchEndX < touchStartX - threshold) {
            nextImage(); // Swiped left
        }
        if (touchEndX > touchStartX + threshold) {
            prevImage(); // Swiped right
        }
    };

    window.openLightbox = (id) => {
        currentCar = masiniLucrate.find(c => c.id === id);
        if (!currentCar) return;
        currentCarouselIndex = 0;

        const total = currentCar.images.length;
        const hasMultiple = total > 1;

        let indicatorsHtml = '';
        if (hasMultiple) {
            if (total <= 6) {
                indicatorsHtml = `
                    <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                        ${currentCar.images.map((_, i) => `<button onclick="goToImage(${i})" class="lightbox-dot h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-primary w-4' : 'bg-surface-variant/50 w-2'}" aria-label="Imaginea ${i+1}"></button>`).join('')}
                    </div>
                `;
            } else {
                indicatorsHtml = `
                    <div class="absolute bottom-4 left-0 right-0 px-4 z-20">
                        <div class="flex gap-2 overflow-x-auto snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2">
                            ${currentCar.images.map((src, i) => `
                                <button onclick="goToImage(${i})" class="lightbox-thumb snap-center flex-shrink-0 w-16 h-12 rounded-md overflow-hidden transition-all duration-300 ${i === 0 ? 'ring-2 ring-primary opacity-100' : 'ring-transparent opacity-50 ring-2'}">
                                    <img src="${src}" class="w-full h-full object-cover" loading="lazy" alt="Miniatură ${i+1}">
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        }

        lightboxContent.innerHTML = `
            <div class="w-full md:w-1/2 relative bg-surface-container-lowest flex flex-col">
                <div class="relative w-full aspect-[4/3] bg-surface-variant overflow-hidden" 
                     ontouchstart="handleTouchStart(event)" 
                     ontouchend="handleTouchEnd(event)">
                    <img 
                        id="lightbox-main-img"
                        src="${currentCar.images[0]}" 
                        alt="${currentCar.title}" 
                        class="w-full h-full object-cover"
                    >
                    
                    <!-- Close button (Mobile) -->
                    <button 
                        onclick="closeLightbox()"
                        class="absolute top-4 left-4 w-10 h-10 rounded-full bg-surface-container-lowest/80 text-on-surface flex items-center justify-center shadow-lg hover:bg-surface transition-colors md:hidden z-30"
                        aria-label="Închide"
                    >
                        <span class="material-symbols-outlined">close</span>
                    </button>

                    ${hasMultiple ? `
                        <!-- Desktop Arrows -->
                        <button onclick="prevImage()" class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-container-lowest/80 text-on-surface items-center justify-center shadow-lg hover:bg-surface transition-colors z-20" aria-label="Imaginea anterioară">
                            <span class="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button onclick="nextImage()" class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-container-lowest/80 text-on-surface items-center justify-center shadow-lg hover:bg-surface transition-colors z-20" aria-label="Imaginea următoare">
                            <span class="material-symbols-outlined">chevron_right</span>
                        </button>

                        <!-- Counter -->
                        <div id="lightbox-counter" class="absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface font-label-sm text-xs px-3 py-1.5 rounded-full shadow-md z-20">
                            1 / ${total}
                        </div>
                    ` : ''}

                    ${indicatorsHtml}
                </div>
            </div>
            <div class="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto" style="max-height: 100%;">
                <div class="flex justify-between items-start mb-6 gap-4">
                    <div>
                        <div class="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 class="font-headline-md text-headline-md font-bold text-primary">${currentCar.title}</h3>
                            ${currentCar.power ? `<span class="bg-error text-on-error font-label-sm text-xs px-2 py-1 rounded-full shadow-sm">${currentCar.power}</span>` : ''}
                        </div>
                        <span class="inline-flex items-center gap-1 bg-secondary-container text-on-secondary-container font-label-sm text-sm px-3 py-1 rounded-md">
                            <span class="material-symbols-outlined text-[16px]">engineering</span>
                            Instalație: ${currentCar.kit}
                        </span>
                    </div>
                    <button 
                        onclick="closeLightbox()"
                        class="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-surface-container text-on-surface items-center justify-center hover:bg-surface-container-high transition-colors z-20"
                        aria-label="Închide"
                    >
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">${currentCar.description}</p>
                
                <div class="mt-auto pt-6 border-t border-outline-variant/30">
                    <button onclick="openQuoteFromLightbox()" class="w-full bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-sm inline-flex items-center justify-center gap-2">
                        Solicită ofertă pentru mașina ta
                    </button>
                </div>
            </div>
        `;

        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
        
        // Expose touch handlers
        window.handleTouchStart = handleTouchStart;
        window.handleTouchEnd = handleTouchEnd;
    };

    window.closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
        setTimeout(() => {
            if (!lightbox.classList.contains('active')) {
                 lightboxContent.innerHTML = '';
                 currentCar = null;
            }
        }, 300); // Wait for transition
    };

    window.openQuoteFromLightbox = () => {
        closeLightbox();
        
        if (window.openQuoteForm) {
            window.openQuoteForm();
        }
    };

    // Event listeners for closing
    lightboxBackdrop.addEventListener('click', closeLightbox);
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });

    // Initial render
    renderGrid();
});
