<template>
    <main class="about-page container">
        <div class="about-content">
            <h1 class="page-title">About Us & Our Seafood</h1>
            <p class="description">
                We believe that real food starts with a deep respect for nature.
                From our buttery Smoked Atlantic Salmon to hand-packed Albacore
                Tuna in Olive Oil, we deliver the finest gifts of the ocean
                straight from trusted fishers to your table.
            </p>

            <h2 class="section-title">Our Premium Selection</h2>
            <p class="description">
                We thoughtfully curate and prepare every tin to ensure an
                unforgettable culinary experience. Whether it's our tender
                Albacore Tuna with Soy Ginger, zippy Smoked Rainbow Trout
                marinated in vibrant red chimichurri, or our bold Mussels in
                Sweet Pepper & Garlic, our selection is designed to elevate your
                everyday meals.
            </p>

            <h2 class="section-title">Why Choose Us</h2>
            <ul class="benefits-list">
                <li>
                    <strong>Exceptional Flavors:</strong> From slow-smoked
                    mackerel caramelized to perfection, to the richest
                    Cantabrian anchovies in organic extra virgin olive oil.
                </li>
                <li>
                    <strong>High-Quality Ingredients:</strong> We use clean,
                    simple ingredients like Spanish olive oil, fresh lemon
                    juice, and carefully selected spices.
                </li>
                <li>
                    <strong>Sustainability:</strong> We work exclusively with
                    responsibly managed farms and healthy, certified-sustainable
                    fisheries.
                </li>
                <li>
                    <strong>Convenience:</strong> Perfect for stirring into
                    pastas, piling onto toast, tossing into salads, or simply
                    enjoying straight from the tin.
                </li>
            </ul>
        </div>
    </main>
</template>

<style scoped>
.about-page {
    padding: 60px 20px;
    max-width: 800px;
    margin: 0 auto;
}

.about-content {
    background: var(--white);
    padding: 40px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

.page-title {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 20px;
}

.section-title {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin-top: 30px;
    margin-bottom: 15px;
}

.description {
    font-size: 1.1rem;
    color: var(--text-light);
    line-height: 1.6;
    margin-bottom: 20px;
}

.benefits-list {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.benefits-list li {
    font-size: 1.1rem;
    color: var(--text-color);
    line-height: 1.5;
    padding-left: 20px;
    position: relative;
}

.benefits-list li::before {
    content: "🐟";
    position: absolute;
    left: 0;
    top: 2px;
    font-size: 0.9rem;
}
</style>
