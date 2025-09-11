<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import imageData from '../../gallery.json';

const searchQuery = ref('');
const selectedTags = ref([]);
const selectedSeasons = ref([]);
const images = ref([]);
const selectedImage = ref(null);
const isModalOpen = ref(false);

const allTags = computed(() => {
    const tags = new Set();
    imageData.forEach(img => {
        img.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
});

const allSeasons = ["S6", "S7", "S8", "S9", "S10", "S11", "Galaxy"];

const filteredImages = computed(() => {
    return imageData.filter(img => {
        const tagMatch = selectedTags.value.length === 0 ||
            selectedTags.value.every(tag => img.tags.includes(tag));

        const seasonMatch = selectedSeasons.value.length === 0 ||
            selectedSeasons.value.includes(img.season);

        const searchMatch = searchQuery.value === '' ||
            img.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            img.alt.toLowerCase().includes(searchQuery.value.toLowerCase());

        return tagMatch && seasonMatch && searchMatch;
    });
});

const toggleTag = (tag) => {
    const index = selectedTags.value.indexOf(tag);
    if (index > -1) {
        selectedTags.value.splice(index, 1);
    } else {
        selectedTags.value.push(tag);
    }
};

const toggleSeason = (season) => {
    const index = selectedSeasons.value.indexOf(season);
    if (index > -1) {
        selectedSeasons.value.splice(index, 1);
    } else {
        selectedSeasons.value.push(season);
    }
};

const clearFilters = () => {
    selectedTags.value = [];
    selectedSeasons.value = [];
    searchQuery.value = '';
};

const openModal = (image) => {
    selectedImage.value = image;
    isModalOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    selectedImage.value = null;
    isModalOpen.value = false;
    document.body.style.overflow = '';
};

const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};

onMounted(() => {
    images.value = imageData;
    document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <div class="gallery-container">
        <h1>Galerie</h1>

        <div class="search-section">
            <input v-model="searchQuery" type="text" placeholder="Hledat..." class="search-input" />
        </div>

        <div class="filters-section">
            <div class="tags-container">
                <button v-for="season in allSeasons" :key="season" @click="toggleSeason(season)" :class="['VPButton medium alt', { active: selectedSeasons.includes(season) }]">
                    {{ season }}
                </button>
            </div>

            <div class="tags-container">
                <button v-for="tag in allTags" :key="tag" @click="toggleTag(tag)" :class="['VPButton medium alt', { active: selectedTags.includes(tag) }]">
                    {{ tag }}
                </button>
            </div>

            <div style="display: flex; justify-content: center;">
                <button v-if="selectedTags.length > 0 || selectedSeasons.length > 0 || searchQuery" @click="clearFilters" class="VPButton medium brand">
                    Vymazat filtry
                </button>
            </div>
        </div>

        <div class="results-info">
            Zobrazeno {{ filteredImages.length }} z {{ imageData.length }} obrázků
        </div>

        <div class="image-grid">
            <div v-for="image in filteredImages" :key="image.src" class="image-item" @click="openModal(image)">
                <img :src="image.src" :alt="image.alt" class="gallery-image" loading="lazy" />
                <div class="image-overlay">
                    <h4>{{ image.alt }}</h4>
                    <p>{{ image.description }}</p>
                    <div class="image-tags">
                        <span class="image-season">{{ image.season }}</span>
                        <span v-for="tag in image.tags" :key="tag" class="image-tag">
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <button class="modal-close" @click="closeModal">X</button>
                <img :src="selectedImage.src" :alt="selectedImage.alt" class="modal-image" />
                <div class="modal-description">
                    <h4>{{ selectedImage.alt }}</h4>
                    <p>{{ selectedImage.description }}</p>
                    <div class="modal-tags">
                        <span class="modal-season">{{ selectedImage.season }}</span>
                        <span v-for="tag in selectedImage.tags" :key="tag" class="modal-tag">
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filteredImages.length === 0" class="no-results">
            <p>Žádné obrázky neodpovídají zadaným filtrům.</p>
        </div>
    </div>
</template>
