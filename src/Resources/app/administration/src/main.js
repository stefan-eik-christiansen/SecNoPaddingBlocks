const DEFAULT_MARGIN = '20px';
const MARGIN_PROPERTIES = [
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
];

function removeShopwareDefaultMargins(block) {
    if (!block) {
        return;
    }

    MARGIN_PROPERTIES.forEach((property) => {
        if (block[property] === DEFAULT_MARGIN) {
            block[property] = '';
        }
    });
}

function removeShopwareDefaultMarginsFromPage(page) {
    if (!page || !Array.isArray(page.sections)) {
        return;
    }

    page.sections.forEach((section) => {
        if (!section || !section.blocks) {
            return;
        }

        section.blocks.forEach(removeShopwareDefaultMargins);
    });
}

Shopware.Component.override('sw-cms-sidebar', {
    methods: {
        onBlockStageDrop(dragData, dropData) {
            this.$super('onBlockStageDrop', dragData, dropData);

            if (!dropData || !dropData.section || dropData.dropIndex < 0) {
                return;
            }

            const section = this.page.sections[dropData.section.position];
            const block = section && section.blocks
                ? section.blocks[dropData.dropIndex]
                : null;

            removeShopwareDefaultMargins(block);
        },
    },
});

Shopware.Component.override('sw-cms-detail', {
    methods: {
        processBlock(block, blockType) {
            this.$super('processBlock', block, blockType);
            removeShopwareDefaultMargins(block);
        },

        updateSectionAndBlockPositions() {
            removeShopwareDefaultMarginsFromPage(this.page);
            this.$super('updateSectionAndBlockPositions');
        },

        onSaveEntity() {
            removeShopwareDefaultMarginsFromPage(this.page);
            return this.$super('onSaveEntity');
        },
    },
});
