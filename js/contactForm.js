import { WHATSAPP_NUMBER } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('offer-modal');
    const modalBackdrop = document.getElementById('offer-modal-backdrop');
    const modalCloseBtn = document.getElementById('offer-modal-close');
    const form = document.getElementById('offer-form');
    const successMessage = document.getElementById('offer-success-message');
    const fallbackLink = document.getElementById('offer-fallback-link');
    const submitBtn = document.getElementById('offer-submit-btn');

    // Toate butoanele de deschidere a ofertei (le vom adăuga clasa js-open-offer-modal)
    const openBtns = document.querySelectorAll('.js-open-offer-modal');

    // Deschidere modal (expus global pentru a putea fi chemat din alte scripturi)
    window.openQuoteForm = (prefill = {}) => {
        // Resetăm formularul la redeschidere
        form.reset();
        form.style.display = 'block';
        successMessage.classList.add('hidden');
        clearErrors();

        if (prefill.dateAuto) {
            document.getElementById('offer-dateAuto').value = prefill.dateAuto;
        }

        // Afișăm modalul
        modal.classList.remove('opacity-0', 'pointer-events-none');
        document.body.classList.add('overflow-hidden'); // prevenim scroll-ul în spate
        
        // Focus pe primul input (ajută accesibilitatea, dar pe mobil poate deschide tastatura automat)
        // Omit pe mobil pt o experiență mai bună.
        if (window.innerWidth > 768) {
            setTimeout(() => {
                document.getElementById('offer-nume').focus();
            }, 100);
        }
    };

    const handleOpenClick = (e) => {
        e.preventDefault();
        window.openQuoteForm();
    };

    // Închidere modal
    const closeModal = () => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.classList.remove('overflow-hidden');
    };

    openBtns.forEach(btn => btn.addEventListener('click', handleOpenClick));
    modalBackdrop.addEventListener('click', closeModal);
    modalCloseBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) {
            closeModal();
        }
    });

    // Câmpurile active să facă scroll în vizor pe mobil când se deschide tastatura
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
        
        // Curăță eroarea la tastare
        input.addEventListener('input', () => {
            showError(input.id, '');
        });
    });

    const showError = (inputId, message) => {
        const errorEl = document.getElementById(`error-${inputId}`);
        const inputEl = document.getElementById(inputId);
        if (errorEl && inputEl) {
            errorEl.textContent = message;
            if (message) {
                errorEl.classList.remove('hidden');
                inputEl.classList.add('border-error');
                inputEl.classList.remove('border-outline-variant');
            } else {
                errorEl.classList.add('hidden');
                inputEl.classList.remove('border-error');
                inputEl.classList.add('border-outline-variant');
            }
        }
    };

    const clearErrors = () => {
        inputs.forEach(input => showError(input.id, ''));
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();
        let isValid = true;

        const nume = document.getElementById('offer-nume').value.trim();
        const telefon = document.getElementById('offer-telefon').value.trim();
        const email = document.getElementById('offer-email').value.trim();
        const localitate = document.getElementById('offer-localitate').value.trim();
        const dateAuto = document.getElementById('offer-dateAuto').value.trim();

        if (!nume) {
            showError('offer-nume', 'Te rog completează numele și prenumele.');
            isValid = false;
        }

        if (!telefon) {
            showError('offer-telefon', 'Te rog completează numărul de telefon.');
            isValid = false;
        } else if (!/^[0-9+\s-]{9,}$/.test(telefon)) {
            showError('offer-telefon', 'Introdu un număr de telefon valid.');
            isValid = false;
        }

        if (!email) {
            showError('offer-email', 'Te rog completează adresa de e-mail.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('offer-email', 'Introdu o adresă de e-mail validă.');
            isValid = false;
        }

        if (!localitate) {
            showError('offer-localitate', 'Te rog completează localitatea.');
            isValid = false;
        }

        if (!dateAuto) {
            showError('offer-dateAuto', 'Te rog completează datele mașinii.');
            isValid = false;
        }

        if (!isValid) return;

        // Construim mesajul
        const mesaj = `Nume si prenume: ${nume}\nTelefon: ${telefon}\nAdresă e-mail: ${email}\nLocalitate: ${localitate}\nDate Auto si observatii (Exemplu: Ford Focus 1.5 2016) doresc montaj GPL: ${dateAuto}`;
        
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mesaj)}`;

        // Arătăm mesajul de succes
        form.style.display = 'none';
        successMessage.classList.remove('hidden');
        fallbackLink.href = url;

        // Deschidem WhatsApp
        window.open(url, '_blank');
    });
});
