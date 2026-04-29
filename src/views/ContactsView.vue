<template>
    <main class="contacts-page container">
        <div class="contacts-content">
            <h1 class="page-title">Contact Us</h1>
            <p class="description">
                We'd love to hear from you! Whether you have a question about
                products, pricing, or anything else, our team is ready to answer
                all your questions.
            </p>

            <div class="contact-details">
                <p>
                    <strong>Email:</strong>
                    <a href="mailto:support@seafood.com" class="contact-link"
                        >support@seafood.com</a
                    >
                </p>
                <p>
                    <strong>Phone:</strong>
                    <a href="tel:+77053408697" class="contact-link"
                        >+7 (705) 340-86-97</a
                    >
                </p>
                <p>
                    <strong>Address:</strong> Улица Маметовой, 67, 2 этаж
                    Алмалинский район, Алматы, 050004
                </p>
            </div>

            <h2 class="section-title">Business Hours</h2>
            <div class="hours">
                <p>Monday&ndash;Friday: 9:00 AM &ndash; 6:00 PM</p>
                <p>Saturday: 10:00 AM &ndash; 4:00 PM</p>
                <p>Sunday: Closed</p>
            </div>
        </div>
    </main>
</template>

<style scoped>
.contacts-page {
    padding: 60px 20px;
    max-width: 800px;
    margin: 0 auto;
}

.contacts-content {
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

.description {
    font-size: 1.1rem;
    color: var(--text-light);
    line-height: 1.6;
    margin-bottom: 30px;
}

.contact-details {
    margin-bottom: 40px;
}

.contact-details p {
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: var(--text-color);
}

.contact-link {
    color: #6a0dad;
    text-decoration: underline;
    transition: color 0.2s;
}

.contact-link:hover {
    color: var(--secondary-color);
}

.section-title {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin-bottom: 15px;
}

.hours p {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 8px;
}
</style>
