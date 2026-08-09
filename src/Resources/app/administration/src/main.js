const MARGIN_PROPERTIES = [
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
];

function removeCmsBlockMargins(block) {
    if (!block) {
        return;
    }

    MARGIN_PROPERTIES.forEach((property) => {
        block[property] = null;
    });
}

function removeCmsBlockMarginsFromPage(page) {
    if (!page || !Array.isArray(page.sections)) {
        return;
    }

    page.sections.forEach((section) => {
        if (!section || !section.blocks) {
            return;
        }

        section.blocks.forEach(removeCmsBlockMargins);
    });
}

function removeCmsBlockRegistryMargins() {
    const cmsService = Shopware.Service('cmsService');
    const blocks = cmsService.getCmsBlockRegistry();

    Object.values(blocks).forEach((block) => {
        if (!block.defaultConfig) {
            block.defaultConfig = {};
        }

        removeCmsBlockMargins(block.defaultConfig);
    });
}

removeCmsBlockRegistryMargins();

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

            removeCmsBlockMargins(block);
        },
    },
});

Shopware.Component.override('sw-cms-detail', {
    methods: {
        processBlock(block, blockType) {
            this.$super('processBlock', block, blockType);
            removeCmsBlockMargins(block);
        },

        updateSectionAndBlockPositions() {
            removeCmsBlockMarginsFromPage(this.page);
            this.$super('updateSectionAndBlockPositions');
        },

        onSaveEntity() {
            removeCmsBlockMarginsFromPage(this.page);
            return this.$super('onSaveEntity');
        },
    },
});
