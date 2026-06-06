document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modelCards = document.querySelectorAll('.model-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover estado activo previo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');

            modelCards.forEach(card => {
                const cardCategory = card.getAttribute('data-meta');

                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.classList.add('show');
                } else {
                    card.classList.remove('show');
                }
            });
        });
    });
});