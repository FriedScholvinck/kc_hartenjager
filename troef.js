function resetCards() {
    const cards = document.querySelectorAll('.troefcard');
    cards.forEach(card => {
        card.classList.remove('dimmed');
        card.style.transform = '';
        card.style.opacity = '1';
    });
}

function toggleSuit(event, suit) {
    event.stopPropagation();
    const card = event.currentTarget;
    const isShown = card.style.transform.includes('scale(1.5)');

    // Reset kaarten als ze al zijn getoond
    if (isShown) {
        resetCards();
        return;
    }

    // Dim alle kaarten behalve de geselecteerde
    const cards = document.querySelectorAll('.troefcard');
    cards.forEach(c => {
        if (c !== card) {
            c.classList.add('dimmed');
            c.style.opacity = '0.3';
        }
    });

    // Bereken de transformatie voor de geselecteerde kaart
    const rect = card.getBoundingClientRect();
    const centerX = window.innerWidth / 2 - rect.left - rect.width / 2;
    const centerY = window.innerHeight / 2 - rect.top - rect.height / 2;
    card.style.transform = `translate(${centerX}px, ${centerY}px) scale(1.5)`;
}

document.getElementById('TroefCardContainer').addEventListener('click', function(event) {
    if (event.target === this) {
        resetCards();
    }
});
