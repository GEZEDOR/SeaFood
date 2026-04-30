<template>
    <div class="aquarium-wrapper">
        <main class="aquarium-page container">
            <div class="aquarium-header">
                <h1>Live Virtual Aquarium</h1>
                <p class="subtitle">
                    Take a moment to relax and watch the beautiful marine life.
                </p>
            </div>

            <div class="video-wrapper">
                <div class="video-container">
                    <iframe
                        ref="ytIframe"
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/xCLTpcx9aO8?autoplay=1&mute=1&loop=1&playlist=xCLTpcx9aO8&vq=hd1080&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&enablejsapi=1"
                        title="The Best 4K Aquarium - Dive Into The Mesmerizing Underwater Realm"
                        frameborder="0"
                        allow="
                            accelerometer;
                            autoplay;
                            clipboard-write;
                            encrypted-media;
                            gyroscope;
                            picture-in-picture;
                        "
                        allowfullscreen
                    >
                    </iframe>
                </div>
                <button
                    class="sound-toggle-btn"
                    @click="toggleSound"
                    :title="isMuted ? 'Включить звук' : 'Выключить звук'"
                >
                    {{ isMuted ? "🔇" : "🔊" }}
                </button>
            </div>

            <div class="info-section">
                <h2>Why a virtual aquarium?</h2>
                <p>
                    At SeaFood, we believe in the beauty of the ocean. While we
                    provide the highest quality seafood to your table, we also
                    want to remind our visitors of the serene and stunning
                    underwater world. Enjoy this live feed from a beautiful
                    coral reef.
                </p>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from "vue";

const ytIframe = ref(null);
const isMuted = ref(true);

const toggleSound = () => {
    if (!ytIframe.value) return;

    if (isMuted.value) {
        ytIframe.value.contentWindow.postMessage(
            '{"event":"command","func":"unMute","args":""}',
            "*",
        );
        ytIframe.value.contentWindow.postMessage(
            '{"event":"command","func":"setVolume","args":[50]}',
            "*",
        );
        isMuted.value = false;
    } else {
        ytIframe.value.contentWindow.postMessage(
            '{"event":"command","func":"mute","args":""}',
            "*",
        );
        isMuted.value = true;
    }
};
</script>

<style scoped>
.aquarium-wrapper {
    background-color: #08080a;
    min-height: calc(100vh - 80px);
    width: 100%;
}

.aquarium-page {
    padding: 20px 20px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.aquarium-header {
    text-align: center;
    margin-bottom: 40px;
}

.aquarium-header h1 {
    font-size: 2.8rem;
    color: #ffffff;
    margin-bottom: 10px;
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    letter-spacing: 1px;
}

.subtitle {
    font-size: 1.2rem;
    color: #a0a0a5;
}

.video-wrapper {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 50px;
}

.video-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
    background: #000;
    border: 1px solid #222;
    position: relative;
}

.video-container iframe {
    pointer-events: none;
}

.sound-toggle-btn {
    position: absolute;
    top: 50%;
    right: -70px;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.15);
    font-size: 1.3rem;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
}

.sound-toggle-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-50%) scale(1.1);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

@media (max-width: 1350px) {
    .sound-toggle-btn {
        right: 20px;
        top: 20px;
        transform: none;
        background: rgba(0, 0, 0, 0.6);
    }
    .sound-toggle-btn:hover {
        transform: scale(1.1);
    }
}

.info-section {
    max-width: 800px;
    text-align: center;
    background: #111115;
    padding: 40px;
    border-radius: 12px;
    border: 1px solid #222228;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.info-section h2 {
    color: #ffffff;
    margin-bottom: 15px;
    font-size: 1.8rem;
}

.info-section p {
    color: #b0b0b5;
    line-height: 1.8;
    font-size: 1.1rem;
}
</style>
