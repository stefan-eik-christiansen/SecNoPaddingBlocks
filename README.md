# Zero Margin Blocks for Shopware 6

Removes Shopware's default `20px` margins from CMS blocks in Shopping Experiences.

## Behaviour

- New CMS blocks start without Shopware's `20px` default margins.
- Existing `20px` defaults are removed when a layout is loaded or saved.
- On update to version 3.2.0, a one-time database migration removes all margins from all existing CMS blocks.
- Custom values other than exactly `20px` remain unchanged.
- Standard blocks and blocks supplied by third-party extensions are supported.

## Requirements

- Shopware 6.6.10 or newer within the 6.6 release line.

## Installation after replacing an existing version

```bash
bin/console plugin:refresh
bin/console plugin:update MelvZeroMarginBlocks
bin/console cache:clear
bin/build-administration.sh
```

The ZIP already contains a compiled administration asset. Rebuilding is nevertheless recommended after updating administration extensions.

## License

MIT
