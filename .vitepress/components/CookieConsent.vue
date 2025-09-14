<template>
    <div v-show="showConsent" class="cookiesBanner">
        <div class="banner-content">
            <h1>
                <span>Cookies</span>
            </h1>
            <p>
                Používáme cookies k analýze provozu a zlepšení tvého zážitku.<br>Můžeš je přijmout nebo odmítnout.
            </p>
        </div>
        <div class="banner-actions">
            <button @click="consent(true)" class="VPButton medium brand">Accept</button>
            <button @click="consent(false)" class="VPButton medium alt">Deny</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showConsent = ref(false);

onMounted(() => {
    const savedConsent = localStorage.getItem('cookiesAccepted');
    if (!savedConsent) showConsent.value = true;
});

function consent(arg) {
    localStorage.setItem("cookiesAccepted", arg);
    const state = arg ? "granted" : "denied";
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'ad_storage': state,
            'ad_user_data': state,
            'ad_personalization': state,
            'analytics_storage': state
        });
    }
    showConsent.value = false;
}
</script>

<style scoped>
.cookiesBanner {
    position: fixed;
    z-index: 1000;
    bottom: 0;
    left: 0;
    max-width: 750px;
    background: var(--vp-c-bg-soft);
    color: #fff;
    padding: 24px 24px 20px 24px;
    box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
    font-family: inherit;
    border-radius: 12px;
    margin-bottom: 24px;
    margin-left: 24px;
}

.banner-content {
    min-width: 260px;
    flex: 1;
}

.banner-content h1 {
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 8px;
}

.banner-content p {
    color: #b3bbc9;
    font-size: 0.95rem;
    line-height: 1.6;
}

.banner-actions {
    min-width: 150px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.VPButton {
    display: inline-block;
    border: 1px solid transparent;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}

.VPButton.active {
    transition: color 0.1s, border-color 0.1s, background-color 0.1s;
}

.VPButton.medium {
    border-radius: 20px;
    padding: 0 20px;
    line-height: 38px;
    font-size: 14px;
}

.VPButton.big {
    border-radius: 24px;
    padding: 0 24px;
    line-height: 46px;
    font-size: 16px;
}

.VPButton.brand {
    border-color: var(--vp-button-brand-border);
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-bg);
}

.VPButton.brand:hover {
    border-color: var(--vp-button-brand-hover-border);
    color: var(--vp-button-brand-hover-text);
    background-color: var(--vp-button-brand-hover-bg);
}

.VPButton.brand.active {
    border-color: var(--vp-button-brand-active-border);
    color: var(--vp-button-brand-active-text);
    background-color: var(--vp-button-brand-active-bg);
}

.VPButton.alt {
    border-color: var(--vp-button-alt-border);
    color: var(--vp-button-alt-text);
    background-color: var(--vp-button-alt-bg);
}

.VPButton.alt:hover {
    border-color: var(--vp-button-alt-hover-border);
    color: var(--vp-button-alt-hover-text);
    background-color: var(--vp-button-alt-hover-bg);
}

.VPButton.alt.active {
    border-color: var(--vp-button-brand-active-border);
    color: var(--vp-button-brand-active-text);
    background-color: var(--vp-button-brand-active-bg);
}

@media (max-width: 600px) {
    .cookiesBanner {
        flex-direction: column;
        gap: 16px;
        max-width: 98vw;
        padding: 18px 8px 12px 8px;
    }

    .banner-content h1 {
        font-size: 1.05rem;
    }

    .banner-content {
        min-width: unset;
    }

}
</style>