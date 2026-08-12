import { GPL_CONFIG } from './gplConfig.js';

document.addEventListener('DOMContentLoaded', () => {
    const kmInput = document.getElementById('km');
    const consumInput = document.getElementById('consum');
    const calcBtn = document.getElementById('calc-btn');
    const resultBox = document.getElementById('result-box');
    const economieLunaraEl = document.getElementById('economie-lunara');
    const economieAnualaEl = document.getElementById('economie-anuala');
    const amortizareEl = document.getElementById('amortizare');
    const errorKm = document.getElementById('error-km');
    const errorConsum = document.getElementById('error-consum');
    
    // Elements for dynamic disclaimer
    const disclPretBenzina = document.getElementById('discl-pret-benzina');
    const disclPretGpl = document.getElementById('discl-pret-gpl');
    
    if (disclPretBenzina && disclPretGpl) {
        disclPretBenzina.textContent = GPL_CONFIG.pretBenzina.toFixed(2);
        disclPretGpl.textContent = GPL_CONFIG.pretGPL.toFixed(2);
    }

    let hasCalculatedOnce = false;

    function validateInputs() {
        let isValid = true;
        
        const km = parseFloat(kmInput.value);
        if (isNaN(km) || km < 100 || km > 20000) {
            errorKm.classList.remove('hidden');
            isValid = false;
        } else {
            errorKm.classList.add('hidden');
        }

        const consum = parseFloat(consumInput.value);
        if (isNaN(consum) || consum < 3 || consum > 30) {
            errorConsum.classList.remove('hidden');
            isValid = false;
        } else {
            errorConsum.classList.add('hidden');
        }

        return { isValid, km, consum };
    }

    function calculate() {
        const { isValid, km, consum } = validateInputs();

        if (!isValid) {
            if (hasCalculatedOnce) {
                resultBox.classList.add('hidden');
                resultBox.classList.remove('opacity-100');
                resultBox.classList.add('opacity-0');
            }
            return;
        }

        const kmLunar = km;
        const consumBenzina = consum;
        
        // Exact formulas
        const litriBenzinaLunar = (kmLunar / 100) * consumBenzina;
        const costBenzinaLunar = litriBenzinaLunar * GPL_CONFIG.pretBenzina;
        
        const litriGPLLunar = (kmLunar / 100) * consumBenzina * GPL_CONFIG.coeficientConsumGPL;
        const costGPLLunar = litriGPLLunar * GPL_CONFIG.pretGPL;
        
        const economieLunara = costBenzinaLunar - costGPLLunar;
        const economieAnuala = economieLunara * 12;
        const luniAmortizare = Math.ceil(GPL_CONFIG.costInstalare / economieLunara);

        // Formatting
        const formatMoney = (val) => {
            return Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };

        economieLunaraEl.textContent = `~ ${formatMoney(economieLunara)} RON`;
        economieAnualaEl.textContent = `~ ${formatMoney(economieAnuala)} RON`;
        
        if (luniAmortizare > 0 && luniAmortizare < 120) {
            amortizareEl.textContent = `~ ${luniAmortizare} luni`;
        } else {
            amortizareEl.textContent = "N/A";
        }

        // Show results with fade
        resultBox.classList.remove('hidden');
        // Small delay to allow display:block to apply before changing opacity
        setTimeout(() => {
            resultBox.classList.remove('opacity-0');
            resultBox.classList.add('opacity-100');
        }, 10);
        
        hasCalculatedOnce = true;
    }

    calcBtn.addEventListener('click', calculate);

    // Live recalculation
    const liveUpdate = () => {
        if (hasCalculatedOnce) {
            calculate();
        }
    };

    kmInput.addEventListener('input', liveUpdate);
    consumInput.addEventListener('input', liveUpdate);
});
