# Changelog

## [3.2.0] - 2026-07-23

- Added a one-time Shopware migration that clears all four margin fields from every existing CMS block in the database.
- Existing custom and default CMS block margins are set to `NULL`; future custom values remain possible.

## [3.1.0] - 2026-07-23

- Fixed compatibility with Shopware 6.6.10.20.
- Replaced the outdated, hard-coded administration bundle.
- Removes only Shopware's exact `20px` CMS block defaults and preserves custom spacing values.
- Handles newly added blocks, generated product-detail blocks, loaded layouts and saves.
- Supports standard and third-party CMS blocks without maintaining a fixed block list.

## [3.0.0]

- Shopware 6.6 compatibility.

## [2.0.1] - 11-01-2024

- Simplify default value handling.
- Removed JavaScript development source map.
- Added .gitignore.

## [2.0.0] - 03-08-2023

- Shopware 6.5 compatibility.

## [1.1.0] - 03-08-2022

- Fix Shopware 6.4.10+.

## [1.0.0] - 15-07-2021

- Initial release.
