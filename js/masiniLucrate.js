/**
 * Pentru a adăuga o mașină nouă în galerie, pur și simplu adaugă un nou obiect în acest array.
 * Câmpuri:
 * - id: un număr unic
 * - title: numele mașinii (ex: "Mercedes ML 63 BRABUS")
 * - kit: instalația GPL folosită (ex: "Landi Renzo")
 * - power: (Opțional) highlight pentru putere (ex: "600 CP")
 * - description: un scurt text descriptiv
 * - image: URL-ul către imagine
 */
const masiniLucrate = [
    {
        id: 1,
        title: "Mercedes ML 63 BRABUS",
        kit: "Landi Renzo",
        power: "600 CP",
        description: "Instalație premium calibrată perfect pentru performanță maximă fără pierdere de putere.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
        id: 2,
        title: "Porsche Cayenne",
        kit: "BRC Gas Equipment",
        power: "340 CP",
        description: "Conversie eficientă pentru SUV-uri de lux, menținând fiabilitatea motorului V6.",
        image: "https://images.unsplash.com/photo-1503376712351-1b2d41def336?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
        id: 3,
        title: "BMW X5 4.8i",
        kit: "Tomasetto",
        power: "355 CP",
        description: "Integrare impecabilă a sistemului GPL pe un motor V8 puternic și pretențios.",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
        id: 4,
        title: "Audi Q7",
        kit: "Stag 300 ISA2",
        power: "280 CP",
        description: "Economie substanțială de combustibil la drum lung cu o instalație de ultimă generație.",
        image: "https://images.unsplash.com/photo-1614026480209-cd9934144671?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
        id: 5,
        title: "Ford F-150 Raptor",
        kit: "Prins VSI",
        power: "450 CP",
        description: "Capacitate extinsă de rulare și costuri reduse pentru acest monstru american.",
        image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
        id: 6,
        title: "Toyota Tundra",
        kit: "Landi Renzo",
        power: "381 CP",
        description: "Autonomie crescută și funcționare silențioasă cu noul sistem de injecție directă.",
        image: "https://images.unsplash.com/photo-1582467029213-ce71667c2e28?auto=format&fit=crop&q=80&w=800&h=600"
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
                onclick="openLightbox(${car.id})"
                tabindex="0"
                role="button"
                aria-label="Vezi detalii ${car.title}"
            >
                <div class="relative w-full overflow-hidden bg-surface-container" style="aspect-ratio: 4/3;">
                    <img 
                        src="${car.image}" 
                        alt="Instalație GPL pe ${car.title}" 
                        loading="lazy"
                        width="400"
                        height="300"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    >
                    ${car.power ? `<span class="absolute top-4 right-4 bg-error text-on-error font-label-sm text-xs px-2 py-1 rounded-full shadow-md z-10">${car.power}</span>` : ''}
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

    // Lightbox state and functions
    window.openLightbox = (id) => {
        const car = masiniLucrate.find(c => c.id === id);
        if (!car) return;

        lightboxContent.innerHTML = `
            <div class="w-full md:w-1/2 relative bg-surface-container-lowest">
                <img 
                    src="${car.image}" 
                    alt="${car.title}" 
                    class="w-full h-64 md:h-full object-cover"
                >
                <button 
                    onclick="closeLightbox()"
                    class="absolute top-4 left-4 w-10 h-10 rounded-full bg-surface-container-lowest/80 text-on-surface flex items-center justify-center shadow-lg hover:bg-surface transition-colors md:hidden z-20"
                    aria-label="Închide"
                >
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <div class="w-full md:w-1/2 p-8 flex flex-col justify-center overflow-y-auto">
                <div class="flex justify-between items-start mb-6 gap-4">
                    <div>
                        <div class="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 class="font-headline-md text-headline-md font-bold text-primary">${car.title}</h3>
                            ${car.power ? `<span class="bg-error text-on-error font-label-sm text-xs px-2 py-1 rounded-full shadow-sm">${car.power}</span>` : ''}
                        </div>
                        <span class="inline-flex items-center gap-1 bg-secondary-container text-on-secondary-container font-label-sm text-sm px-3 py-1 rounded-md">
                            <span class="material-symbols-outlined text-[16px]">engineering</span>
                            Instalație: ${car.kit}
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
                <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">${car.description}</p>
                
                <div class="mt-auto pt-6 border-t border-outline-variant/30">
                    <button onclick="openQuoteFromLightbox(${car.id})" class="w-full bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-sm inline-flex items-center justify-center gap-2">
                        Solicită ofertă pentru mașina ta
                    </button>
                </div>
            </div>
        `;

        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
    };

    window.closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
        setTimeout(() => {
            if (!lightbox.classList.contains('active')) {
                 lightboxContent.innerHTML = '';
            }
        }, 300); // Wait for transition
    };

    window.openQuoteFromLightbox = (id) => {
        const car = masiniLucrate.find(c => c.id === id);
        if (!car) return;
        
        let prefillText = `${car.title}`;
        if (car.kit) {
            prefillText += ` cu instalație ${car.kit}`;
        }
        prefillText += ` — doresc o ofertă similară`;

        closeLightbox();
        
        if (window.openQuoteForm) {
            window.openQuoteForm({ dateAuto: prefillText });
        }
    };

    // Event listeners for closing
    lightboxBackdrop.addEventListener('click', closeLightbox);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Initial render
    renderGrid();
});
